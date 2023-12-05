const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const TaiKhoan_KhachHang = sequelize.define(
  "TaiKhoan_KhachHang",
  {
    ID_TaiKhoan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    TenTaiKhoan: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    MatKhau: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ID_KhachHang: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "KhachHang",
        key: "ID_KhachHang",
      },
    },
    TrangThai: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "TaiKhoan_KhachHang",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__TaiKhoan__0E3EC2107E545A2A",
        unique: true,
        fields: [{ name: "ID_TaiKhoan" }],
      },
    ],
  }
);

module.exports = TaiKhoan_KhachHang;
