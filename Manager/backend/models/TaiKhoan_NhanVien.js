const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const TaiKhoanNhanVien = sequelize.define(
  "TaiKhoan_NhanVien",
  {
    ID_TaiKhoan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    TenTaiKhoan: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    MatKhau: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID_NhanVien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "NhanVien",
        key: "ID_NhanVien",
      },
    },
    ID_ChucVu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ChucVu",
        key: "ID_ChucVu",
      },
    },
  },
  {
    sequelize,
    tableName: "TaiKhoan_NhanVien",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__TaiKhoan__0E3EC210151AFEF6",
        unique: true,
        fields: [{ name: "ID_TaiKhoan" }],
      },
    ],
  }
);

module.exports = TaiKhoanNhanVien;
