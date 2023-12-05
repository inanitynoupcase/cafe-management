const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const NhanVien = sequelize.define(
  "NhanVien",
  {
    ID_NhanVien: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    HoTen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    NgaySinh: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    GioiTinh: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    DiaChi: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    SDT: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    CCCD: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Trang_Thai: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "NhanVien",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__NhanVien__EF603D12DDFA79F2",
        unique: true,
        fields: [{ name: "ID_NhanVien" }],
      },
    ],
  }
);

module.exports = NhanVien;
