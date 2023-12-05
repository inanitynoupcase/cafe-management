var DataTypes = require("sequelize").DataTypes;
var _TaiKhoan_NhanVien = require("./TaiKhoan_NhanVien");

function initModels(sequelize) {
  var TaiKhoan_NhanVien = _TaiKhoan_NhanVien(sequelize, DataTypes);

  TaiKhoan_NhanVien.belongsTo(ChucVu, { as: "ID_ChucVu_ChucVu", foreignKey: "ID_ChucVu"});
  ChucVu.hasMany(TaiKhoan_NhanVien, { as: "TaiKhoan_NhanViens", foreignKey: "ID_ChucVu"});
  TaiKhoan_NhanVien.belongsTo(NhanVien, { as: "ID_NhanVien_NhanVien", foreignKey: "ID_NhanVien"});
  NhanVien.hasMany(TaiKhoan_NhanVien, { as: "TaiKhoan_NhanViens", foreignKey: "ID_NhanVien"});

  return {
    TaiKhoan_NhanVien,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
