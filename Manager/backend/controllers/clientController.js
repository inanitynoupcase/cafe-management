const TaiKhoan_NhanVien = require("../models/TaiKhoan_NhanVien");
const TaiKhoan_KhachHang = require("../models/TaiKhoan_KhachHang");
const KhachHang = require("../models/KhachHang");
const NhanVien = require("../models/NhanVien");
const DonHang = require("../models/DonHang");
const GiaDoUong = require("../models/GiaDoUong");

const CT_DonHang = require("../models/CT_DonHang");

const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mssql",
  }
);

const clientController = {
  getCategories: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getCategories"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getDrinks: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getDrinksClient"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await TaiKhoan_KhachHang.findOne({
        where: {
          TenTaiKhoan: req.body.TenTaiKhoan,
        },
      });
      if (!user) return res.status(404).json("Tài Khoản Không Chính Xác");
      const validPassword = await bcrypt.compare(
        req.body.MatKhau,
        user.MatKhau
      );
      if (!validPassword) {
        return res.status(404).json("Mật Khẩu Không Chính Xác");
      }
      if (user && validPassword) {
        const user1 = await KhachHang.findOne({
          where: { ID_KhachHang: user.ID_KhachHang },
        });
        const HoTenKH = user1.HoTen;
        const NgaySinhKH = user1.NgaySinh;
        const GioiTinhKH = user1.GioiTinh;
        const SDTKH = user1.SDT;
        const EmailKH = user1.Email;

        const { MatKhau, ...others } = user.toJSON();
        return res.status(200).json({
          ...others,
          HoTenKH,
          NgaySinhKH,
          GioiTinhKH,
          SDTKH,
          EmailKH,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  registerUser: async (req, res) => {
    try {
      // Kiểm tra xem tên tài khoản đã tồn tại trong bảng "TaiKhoan_KhachHang" chưa
      const user = await TaiKhoan_KhachHang.findOne({
        where: {
          TenTaiKhoan: req.body.TenTaiKhoan,
        },
      });

      // Kiểm tra xem email đã tồn tại trong bảng "KhachHang" chưa
      const user1 = await KhachHang.findOne({
        where: {
          Email: req.body.Email,
        },
      });

      // Nếu tên tài khoản đã tồn tại, trả về thông báo lỗi
      if (user) {
        return res.status(404).json("Tên tài khoản đã được sử dụng");
      }

      // Nếu email đã tồn tại, trả về thông báo lỗi
      if (user1) {
        return res.status(404).json("Email đã được sử dụng");
      }

      // Bắt đầu giao dịch
      const transaction = await sequelize.transaction();
      let transactionFinished = false;
      try {
        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.MatKhau, salt);
        const autoStatus = "1";
        // Tạo một bản ghi mới trong bảng KhachHang
        const newKhachHang = await KhachHang.create(
          {
            HoTen: req.body.HoTen,
            NgaySinh: req.body.NgaySinh,
            GioiTinh: req.body.GioiTinh,
            SDT: req.body.SDT,
            Email: req.body.Email,
          },
          { transaction }
        );
        const ID_KhachHang = newKhachHang.ID_KhachHang;
        // Thực hiện insert dữ liệu vào bảng "TaiKhoan_KhachHang"
        const newUser = await TaiKhoan_KhachHang.create(
          {
            TenTaiKhoan: req.body.TenTaiKhoan,
            MatKhau: hashed,
            ID_KhachHang: ID_KhachHang,
            TrangThai: autoStatus,
          },
          { transaction }
        );
        // Xác nhận giao dịch
        await transaction.commit();
        transactionFinished = true;
        return res.status(200).json("Tạo tài khoản thành công");
      } catch (error) {
        // Nếu có lỗi, thực hiện rollback nếu giao dịch chưa hoàn thành
        if (!transactionFinished) {
          await transaction.rollback();
        }
        console.log(error);
        return res.status(500).json({ message: "catch 1" });
      }
    } catch (error) {
      // Nếu có lỗi, thực hiện rollback
      return res.status(500).json({ message: "catch 2" });
    }
  },
  getOrderByIdKhachHang: async (req, res) => {
    try {
      const ID_KhachHang = req.body.ID_KhachHang;

      const donHangList = await DonHang.findAll({
        where: {
          ID_KhachHang: ID_KhachHang,
        },
      });

      return res.status(200).json(donHangList);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getOrderDetailByIdDonHang: async (req, res) => {
    try {
      const ID_DonHang = req.body.ID_DonHang;

      const ctDonHangList = await CT_DonHang.findAll({
        where: {
          ID_DonHang: ID_DonHang,
        },
      });

      return res.status(200).json(ctDonHangList);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // ...

  createOrder: async (req, res) => {
    const { ID_KhachHang, ID_ThanhToan, ID_NhanVien, DiaChi, SDT, DoUongList } =
      req.body;

    try {
      // Bắt đầu giao dịch
      const transaction = await sequelize.transaction();
      let transactionFinished = false;

      try {
        // Tạo một đơn hàng mới trong bảng DonHang
        const newDonHang = await DonHang.create(
          {
            ID_KhachHang: ID_KhachHang,
            ID_ThanhToan: ID_ThanhToan, // Thêm ID_ThanhToan nếu có
            ID_NhanVien: ID_NhanVien, // Thêm ID_NhanVien nếu có
            TongTien: 0, // Tính tổng tiền dựa trên GiaDoUong và SoLuong
            NgayDat: new Date(), // Thêm ngày đặt hàng (có thể dùng new Date() để lấy ngày hiện tại)
            DiaChi: DiaChi, // Thêm địa chỉ từ request body
            SDT: SDT, // Thêm số điện thoại từ request body
            TrangThai: 2, // Mặc định trạng thái đơn hàng
          },
          { transaction }
        );

        // Thêm dữ liệu vào bảng CT_DonHang
        for (const doUong of DoUongList) {
          // Truy vấn để lấy giá của đồ uống từ bảng GiaDoUong
          const giaDoUongInfo = await GiaDoUong.findOne({
            where: {
              ID_DoUong: doUong.ID_DoUong,
            },
          });

          if (!giaDoUongInfo) {
            return res
              .status(404)
              .json({ message: "Không tìm thấy thông tin giá đồ uống" });
          }

          const giaDoUong = giaDoUongInfo.Gia; // Lấy giá từ thông tin giá đồ uống

          const newCTDonHang = await CT_DonHang.create(
            {
              ID_DonHang: newDonHang.ID_DonHang,
              ID_DoUong: doUong.ID_DoUong,
              GiaDoUong: giaDoUong, // Sử dụng giá đồ uống lấy từ bảng GiaDoUong
              SoLuong: doUong.SoLuong,
            },
            { transaction }
          );

          // Cộng giá của đồ uống vào tổng tiền của đơn hàng
          newDonHang.TongTien += giaDoUong * doUong.SoLuong;
        }

        // Cập nhật tổng tiền của đơn hàng
        await newDonHang.save({ transaction });

        // Xác nhận giao dịch
        await transaction.commit();
        transactionFinished = true;

        return res
          .status(200)
          .json({ message: "Thanh toán và tạo đơn hàng thành công" });
      } catch (error) {
        // Nếu có lỗi, thực hiện rollback nếu giao dịch chưa hoàn thành
        if (!transactionFinished) {
          await transaction.rollback();
        }
        console.log(error);
        return res
          .status(500)
          .json({ message: "Đã xảy ra lỗi khi thanh toán và tạo đơn hàng" });
      }
    } catch (error) {
      // Nếu có lỗi, thực hiện rollback
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi thực hiện thanh toán" });
    }
  },
};

module.exports = clientController;
