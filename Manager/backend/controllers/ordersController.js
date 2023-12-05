const TaiKhoan_NhanVien = require("../models/TaiKhoan_NhanVien");
const DonHang = require("../models/DonHang");
const CT_DonHang = require("../models/CT_DonHang");

const ordersController = {
  getOrders: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query("EXEC getOrders");
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // CREATE ORDERS
  createOrders: async (req, res) => {
    try {
      const {
        ID_KhachHang,
        ID_ThanhToan,
        ID_NhanVien,
        TongTien,
        DiaChi,
        SDT,
        TrangThai,
      } = req.body;

      // Lấy thời gian ngay thời điểm gọi api
      const NgayDat = new Date();

      const order = await DonHang.create({
        ID_KhachHang,
        ID_ThanhToan,
        ID_NhanVien,
        TongTien,
        NgayDat: NgayDat,
        DiaChi,
        SDT,
        TrangThai,
      });

      return res.status(201).json(order);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // UPDATE ORDERS
  updateOrders: async (req, res) => {
    try {
      const {
        ID_DonHang,
        ID_KhachHang,
        ID_ThanhToan,
        ID_NhanVien,
        TongTien,

        DiaChi,
        SDT,
        TrangThai,
      } = req.body;

      // Tìm đơn hàng cần cập nhật
      const orderToUpdate = await DonHang.findByPk(ID_DonHang);

      if (!orderToUpdate) {
        return res.status(404).json("Không tìm thấy đơn hàng");
      }
      const NgayDat = new Date();

      // Cập nhật thông tin đơn hàng
      orderToUpdate.ID_KhachHang = ID_KhachHang;
      orderToUpdate.ID_ThanhToan = ID_ThanhToan;
      orderToUpdate.ID_NhanVien = ID_NhanVien;
      orderToUpdate.TongTien = TongTien;
      orderToUpdate.NgayDat = NgayDat;
      orderToUpdate.DiaChi = DiaChi;
      orderToUpdate.SDT = SDT;
      orderToUpdate.TrangThai = TrangThai;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await orderToUpdate.save();

      return res.status(200).json("Cập nhật đơn hàng thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE ORDERS
  deleteOrders: async (req, res) => {
    try {
      // Tìm đơn hàng cần xóa
      const orderToDelete = await DonHang.findByPk(req.params.id);

      if (!orderToDelete) {
        return res.status(404).json("Không tìm thấy đơn hàng");
      }

      // Xóa đơn hàng
      await orderToDelete.destroy();

      return res.status(200).json("Xóa đơn hàng thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  getOrdersDetail: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getOrdersDetail"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // CREATE ORDERS DETAIL
  createOrdersDetail: async (req, res) => {
    try {
      const { ID_DonHang, ID_DoUong, GiaDoUong, SoLuong } = req.body;

      const orderDetail = await CT_DonHang.create({
        ID_DonHang,
        ID_DoUong,
        GiaDoUong,
        SoLuong,
      });

      return res.status(201).json(orderDetail);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // UPDATE ORDERS DETAIL
  updateOrdersDetail: async (req, res) => {
    try {
      const { ID_CTDonHang, ID_DonHang, ID_DoUong, GiaDoUong, SoLuong } =
        req.body;

      // Tìm chi tiết đơn hàng cần cập nhật
      const orderDetailToUpdate = await CT_DonHang.findByPk(ID_CTDonHang);

      if (!orderDetailToUpdate) {
        return res.status(404).json("Không tìm thấy chi tiết đơn hàng");
      }

      // Cập nhật thông tin chi tiết đơn hàng
      orderDetailToUpdate.ID_DonHang = ID_DonHang;
      orderDetailToUpdate.ID_DoUong = ID_DoUong;
      orderDetailToUpdate.GiaDoUong = GiaDoUong;
      orderDetailToUpdate.SoLuong = SoLuong;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await orderDetailToUpdate.save();

      return res.status(200).json("Cập nhật chi tiết đơn hàng thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE ORDERS DETAIL
  deleteOrdersDetail: async (req, res) => {
    try {
      // Tìm chi tiết đơn hàng cần xóa
      const orderDetailToDelete = await CT_DonHang.findByPk(req.params.id);

      if (!orderDetailToDelete) {
        return res.status(404).json("Không tìm thấy chi tiết đơn hàng");
      }

      // Xóa chi tiết đơn hàng
      await orderDetailToDelete.destroy();

      return res.status(200).json("Xóa chi tiết đơn hàng thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

module.exports = ordersController;
