const TaiKhoan_NhanVien = require("../models/TaiKhoan_NhanVien");
const NhanVien = require("../models/NhanVien");
const KhachHang = require("../models/KhachHang");
const TaiKhoan_KhachHang = require("../models/TaiKhoan_KhachHang");

const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query("EXEC getAllUsers");
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getStaffAccount: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getStaffAccount"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getStaffInfo: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query("EXEC getStaffInfo");
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getCustomerAccount: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getCustomerAccount"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getCustomerInfo: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getCustomerInfo"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getCurrentStaffInfo: async (req, res) => {
    try {
      const account_name = req.params.user;
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getCurrentStaffInfo @account_name = :account_name",
        { replacements: { account_name } }
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // CREATE A STAFF INFO
  createUser: async (req, res) => {
    try {
      const {
        HoTen,
        NgaySinh,
        GioiTinh,
        DiaChi,
        SDT,
        Email,
        CCCD,
        Trang_Thai,
      } = req.body;

      // Check if CCCD already exists
      const existingUser = await NhanVien.findOne({ where: { CCCD } });
      if (existingUser) {
        return res.status(400).json("CCCD đã tồn tại");
      }

      const user = await NhanVien.create({
        HoTen,
        NgaySinh,
        GioiTinh,
        DiaChi,
        SDT,
        Email,
        CCCD,
        Trang_Thai,
      });
      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //UPDATE STAFF INFO
  updateStaffInfo: async (req, res) => {
    try {
      const {
        ID_NhanVien,
        HoTen,
        NgaySinh,
        GioiTinh,
        DiaChi,
        SDT,
        Email,
        CCCD,
        Trang_Thai,
      } = req.body;

      const existingUser = await NhanVien.findOne({
        where: {
          CCCD,
          ID_NhanVien: { [Op.not]: ID_NhanVien },
        },
      });
      if (existingUser) {
        return res.status(400).json("CCCD đã tồn tại");
      }

      // Find the user to update
      const userToUpdate = await NhanVien.findByPk(ID_NhanVien);
      if (!userToUpdate) {
        return res.status(404).json("Không tìm thấy nhân viên");
      }

      // Update user's information
      userToUpdate.HoTen = HoTen;
      userToUpdate.NgaySinh = NgaySinh;
      userToUpdate.GioiTinh = GioiTinh;
      userToUpdate.DiaChi = DiaChi;
      userToUpdate.SDT = SDT;
      userToUpdate.Email = Email;
      userToUpdate.CCCD = CCCD;
      userToUpdate.Trang_Thai = Trang_Thai;

      // Save the changes to the database
      await userToUpdate.save();

      return res.status(200).json("Update thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE STAFF INFO
  deleteUser: async (req, res) => {
    try {
      const user = await NhanVien.findOne({
        where: { ID_NhanVien: req.params.id },
      });
      if (!user) return res.status(404).json("User not found");

      await NhanVien.destroy({ where: { ID_NhanVien: req.params.id } });
      return res.status(200).json("User deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //Staff Account
  createStaffAccount: async (req, res) => {
    try {
      const { TenTaiKhoan, MatKhau, ID_NhanVien, ID_ChucVu } = req.body;

      // Kiểm tra xem tài khoản đã tồn tại hay chưa
      const existingAccount = await TaiKhoan_NhanVien.findOne({
        where: { [Op.or]: [{ TenTaiKhoan }, { ID_NhanVien }] },
      });

      if (existingAccount) {
        return res.status(400).json("Trùng thông tin");
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(MatKhau, salt);
      const account = await TaiKhoan_NhanVien.create({
        TenTaiKhoan,
        MatKhau: hashed,
        ID_NhanVien,
        ID_ChucVu,
      });

      return res.status(201).json(account);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  updateStaffAccount: async (req, res) => {
    try {
      const { ID_TaiKhoan, TenTaiKhoan, MatKhau, ID_NhanVien, ID_ChucVu } =
        req.body;

      // Kiểm tra xem tài khoản đã tồn tại hay chưa (nếu tài khoản muốn cập nhật không phải là tài khoản hiện tại)
      const existingAccount = await TaiKhoan_NhanVien.findOne({
        where: {
          [Op.and]: [
            { [Op.not]: { ID_TaiKhoan: ID_TaiKhoan } },
            { [Op.or]: [{ TenTaiKhoan }, { ID_NhanVien }] },
          ],
        },
      });

      if (existingAccount) {
        return res.status(400).json("Trùng thông tin");
      }

      // Tìm tài khoản nhân viên cần cập nhật
      const accountToUpdate = await TaiKhoan_NhanVien.findOne({
        where: { ID_TaiKhoan: ID_TaiKhoan },
      });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(MatKhau, salt);

      // Cập nhật thông tin tài khoản nhân viên
      accountToUpdate.ID_TaiKhoan = ID_TaiKhoan;
      accountToUpdate.TenTaiKhoan = TenTaiKhoan;
      accountToUpdate.MatKhau = hashed;
      accountToUpdate.ID_NhanVien = ID_NhanVien;
      accountToUpdate.ID_ChucVu = ID_ChucVu;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await accountToUpdate.save();

      return res.status(200).json("Cập nhật thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  deleteStaffAccount: async (req, res) => {
    try {
      // Tìm tài khoản nhân viên cần xóa
      const accountToDelete = await TaiKhoan_NhanVien.findOne({
        where: { ID_TaiKhoan: req.params.id },
      });

      if (!accountToDelete) {
        return res.status(404).json("Không tìm thấy tài khoản");
      }

      // Xóa tài khoản nhân viên
      await accountToDelete.destroy();

      return res.status(200).json("Xóa tài khoản thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Customer Info
  createCustomerInfo: async (req, res) => {
    try {
      const { HoTen, NgaySinh, GioiTinh, SDT, Email } = req.body;

      // Kiểm tra xem email đã tồn tại hay chưa
      const existingEmail = await KhachHang.findOne({
        where: { Email: Email },
      });

      if (existingEmail) {
        return res.status(400).json("Email đã tồn tại");
      }

      const customerInfo = await KhachHang.create({
        HoTen,
        NgaySinh,
        GioiTinh,
        SDT,
        Email,
      });

      return res.status(201).json(customerInfo);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  updateCustomerInfo: async (req, res) => {
    try {
      const { ID_KhachHang, HoTen, NgaySinh, GioiTinh, SDT, Email } = req.body;

      // Kiểm tra xem email đã tồn tại hay chưa (nếu thông tin muốn cập nhật không phải là thông tin khách hàng hiện tại)
      const existingEmail = await KhachHang.findOne({
        where: {
          [Op.and]: [
            { [Op.not]: { ID_KhachHang: ID_KhachHang } },
            { [Op.or]: [{ Email }] },
          ],
        },
      });

      if (existingEmail) {
        return res.status(400).json("Email đã tồn tại");
      }

      // Tìm thông tin khách hàng cần cập nhật
      const customerInfoToUpdate = await KhachHang.findOne({
        where: { ID_KhachHang: ID_KhachHang },
      });

      // Cập nhật thông tin khách hàng
      customerInfoToUpdate.HoTen = HoTen;
      customerInfoToUpdate.NgaySinh = NgaySinh;
      customerInfoToUpdate.GioiTinh = GioiTinh;
      customerInfoToUpdate.SDT = SDT;
      customerInfoToUpdate.Email = Email;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await customerInfoToUpdate.save();

      return res.status(200).json("Cập nhật thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  deleteCustomerInfo: async (req, res) => {
    try {
      // Tìm thông tin khách hàng cần xóa
      const customerInfoToDelete = await KhachHang.findOne({
        where: { ID_KhachHang: req.params.id },
      });

      if (!customerInfoToDelete) {
        return res.status(404).json("Không tìm thấy thông tin khách hàng");
      }

      // Xóa thông tin khách hàng
      await customerInfoToDelete.destroy();

      return res.status(200).json("Xóa thông tin khách hàng thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Customer Account
  createCustomerAccount: async (req, res) => {
    try {
      const { TenTaiKhoan, MatKhau, ID_KhachHang, TrangThai } = req.body;

      // Kiểm tra xem tài khoản đã tồn tại hay chưa
      const existingAccount = await TaiKhoan_KhachHang.findOne({
        where: { [Op.or]: [{ TenTaiKhoan }, { ID_KhachHang }] },
      });

      if (existingAccount) {
        return res.status(400).json("Trùng thông tin");
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(MatKhau, salt);

      const account = await TaiKhoan_KhachHang.create({
        TenTaiKhoan,
        MatKhau: hashed,
        ID_KhachHang,
        TrangThai,
      });

      return res.status(201).json(account);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  updateCustomerAccount: async (req, res) => {
    try {
      const { ID_TaiKhoan, TenTaiKhoan, MatKhau, ID_KhachHang, TrangThai } =
        req.body;

      // Kiểm tra xem tài khoản đã tồn tại hay chưa (nếu tài khoản muốn cập nhật không phải là tài khoản hiện tại)
      const existingAccount = await TaiKhoan_KhachHang.findOne({
        where: {
          [Op.and]: [
            { [Op.not]: { ID_TaiKhoan: ID_TaiKhoan } },
            { [Op.or]: [{ TenTaiKhoan }, { ID_KhachHang }] },
          ],
        },
      });

      if (existingAccount) {
        return res.status(400).json("Trùng thông tin");
      }

      // Tìm tài khoản khách hàng cần cập nhật
      const accountToUpdate = await TaiKhoan_KhachHang.findOne({
        where: { ID_TaiKhoan: ID_TaiKhoan },
      });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(MatKhau, salt);

      // Cập nhật thông tin tài khoản khách hàng
      accountToUpdate.TenTaiKhoan = TenTaiKhoan;
      accountToUpdate.MatKhau = hashed;
      accountToUpdate.ID_KhachHang = ID_KhachHang;
      accountToUpdate.TrangThai = TrangThai;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await accountToUpdate.save();

      return res.status(200).json("Cập nhật thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  deleteCustomerAccount: async (req, res) => {
    try {
      // Tìm tài khoản khách hàng cần xóa
      const accountToDelete = await TaiKhoan_KhachHang.findOne({
        where: { ID_TaiKhoan: req.params.id },
      });

      if (!accountToDelete) {
        return res.status(404).json("Không tìm thấy tài khoản");
      }

      // Xóa tài khoản khách hàng
      await accountToDelete.destroy();

      return res.status(200).json("Đã xóa Tài Khoản Khách Hàng Thành Công");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = userController;
