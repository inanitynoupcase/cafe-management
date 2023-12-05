const TaiKhoan_NhanVien = require("../models/TaiKhoan_NhanVien");

const testingController = {
  //Get User
  getUserTest: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.findAll();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSPUserTest: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.sequelize.query(
        "EXEC GetChiTietDonHang"
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = testingController;
