const TaiKhoan_NhanVien = require("../models/TaiKhoan_NhanVien");
const DoUong = require("../models/DoUong");
const DanhMuc = require("../models/DanhMuc");
const GiaDoUong = require("../models/GiaDoUong");

const { Op } = require("sequelize");

const drinksController = {
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
  // DanhMuc
  createCategories: async (req, res) => {
    try {
      const { TenDanhMuc, HinhAnhDM } = req.body;

      // Kiểm tra xem danh mục đã tồn tại hay chưa
      const existingCategory = await DanhMuc.findOne({
        where: { TenDanhMuc },
      });

      if (existingCategory) {
        return res.status(400).json("Trùng thông tin");
      }

      // Lấy thời gian ngay thời điểm gọi api
      const NgayCN = new Date();

      const category = await DanhMuc.create({
        TenDanhMuc,
        HinhAnhDM,
        NgayCN,
      });

      return res.status(201).json(category);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  updateCategories: async (req, res) => {
    try {
      const { ID_DanhMuc, TenDanhMuc, HinhAnhDM } = req.body;

      // Kiểm tra xem danh mục đã tồn tại hay chưa (nếu danh mục muốn cập nhật không phải là danh mục hiện tại)
      const existingCategory = await DanhMuc.findOne({
        where: {
          [Op.and]: [{ [Op.not]: { ID_DanhMuc: ID_DanhMuc } }, { TenDanhMuc }],
        },
      });

      if (existingCategory) {
        return res.status(400).json("Trùng thông tin");
      }

      // Tìm danh mục cần cập nhật
      const categoryToUpdate = await DanhMuc.findOne({
        where: { ID_DanhMuc: ID_DanhMuc },
      });

      // Cập nhật thông tin danh mục
      categoryToUpdate.TenDanhMuc = TenDanhMuc;
      categoryToUpdate.HinhAnhDM = HinhAnhDM;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await categoryToUpdate.save();

      return res.status(200).json("Cập nhật thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  deleteCategories: async (req, res) => {
    try {
      // Tìm danh mục cần xóa
      const categoryToDelete = await DanhMuc.findOne({
        where: { ID_DanhMuc: req.params.id },
      });

      if (!categoryToDelete) {
        return res.status(404).json("Không tìm thấy danh mục");
      }

      // Xóa danh mục
      await categoryToDelete.destroy();

      return res.status(200).json("Xóa danh mục thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  getDrinksInfo: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getDrinksInfo"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // CREATE DRINKS INFO
  createDrinksInfo: async (req, res) => {
    try {
      const { ID_DanhMuc, TenDoUong, HinhAnh, MoTa, TrangThai } = req.body;

      // Kiểm tra xem đồ uống đã tồn tại hay chưa
      const existingDrink = await DoUong.findOne({
        where: { TenDoUong },
      });

      if (existingDrink) {
        return res.status(400).json("Trùng thông tin");
      }

      const drink = await DoUong.create({
        ID_DanhMuc,
        TenDoUong,
        HinhAnh,
        MoTa,
        TrangThai,
      });

      return res.status(201).json(drink);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // UPDATE DRINKS INFO
  updateDrinksInfo: async (req, res) => {
    try {
      const { ID_DoUong, ID_DanhMuc, TenDoUong, HinhAnh, MoTa, TrangThai } =
        req.body;

      // Kiểm tra xem đồ uống đã tồn tại hay chưa (nếu đồ uống muốn cập nhật không phải là đồ uống hiện tại)
      const existingDrink = await DoUong.findOne({
        where: {
          [Op.and]: [{ [Op.not]: { ID_DoUong: ID_DoUong } }, { TenDoUong }],
        },
      });

      if (existingDrink) {
        return res.status(400).json("Trùng thông tin");
      }

      // Tìm đồ uống cần cập nhật
      const drinkToUpdate = await DoUong.findByPk(ID_DoUong);

      if (!drinkToUpdate) {
        return res.status(404).json("Không tìm thấy đồ uống");
      }

      // Cập nhật thông tin đồ uống
      drinkToUpdate.ID_DanhMuc = ID_DanhMuc;
      drinkToUpdate.TenDoUong = TenDoUong;
      drinkToUpdate.HinhAnh = HinhAnh;
      drinkToUpdate.MoTa = MoTa;
      drinkToUpdate.TrangThai = TrangThai;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await drinkToUpdate.save();

      return res.status(200).json("Cập nhật thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE DRINKS INFO
  deleteDrinksInfo: async (req, res) => {
    try {
      // Tìm đồ uống cần xóa
      const drinkToDelete = await DoUong.findByPk(req.params.id);

      if (!drinkToDelete) {
        return res.status(404).json("Không tìm thấy đồ uống");
      }

      // Xóa đồ uống
      await drinkToDelete.destroy();

      return res.status(200).json("Xóa đồ uống thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  getDrinksPrice: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC getDrinksPrice"
      );
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // CREATE DRINKS PRICE
  createDrinksPrice: async (req, res) => {
    try {
      const { ID_DoUong, ID_NhanVien, Gia } = req.body;

      // Lấy thời gian ngay thời điểm gọi api
      const Ngay = new Date();
      console.log(Ngay);
      const drinksPrice = await GiaDoUong.create({
        ID_DoUong,
        ID_NhanVien,
        Ngay,
        Gia,
      });

      return res.status(201).json(drinksPrice);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // UPDATE DRINKS PRICE
  updateDrinksPrice: async (req, res) => {
    try {
      const { ID_GiaDoUong, ID_DoUong, ID_NhanVien, Gia } = req.body;

      // Tìm giá đồ uống cần cập nhật
      const drinksPriceToUpdate = await GiaDoUong.findByPk(ID_GiaDoUong);

      if (!drinksPriceToUpdate) {
        return res.status(404).json("Không tìm thấy giá đồ uống");
      }
      const Ngay = new Date();

      // Cập nhật thông tin giá đồ uống
      drinksPriceToUpdate.ID_DoUong = ID_DoUong;
      drinksPriceToUpdate.ID_NhanVien = ID_NhanVien;
      drinksPriceToUpdate.Ngay = Ngay;
      drinksPriceToUpdate.Gia = Gia;

      // Lưu các thay đổi vào cơ sở dữ liệu
      await drinksPriceToUpdate.save();

      return res.status(200).json("Cập nhật giá đồ uống thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE DRINKS PRICE
  deleteDrinksPrice: async (req, res) => {
    try {
      // Tìm giá đồ uống cần xóa
      const drinksPriceToDelete = await GiaDoUong.findByPk(req.params.id);

      if (!drinksPriceToDelete) {
        return res.status(404).json("Không tìm thấy giá đồ uống");
      }

      // Xóa giá đồ uống
      await drinksPriceToDelete.destroy();

      return res.status(200).json("Xóa giá đồ uống thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

module.exports = drinksController;
