const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const DonHang = sequelize.define(
  "DonHang",
  {
    ID_DonHang: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ID_KhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "KhachHang",
        key: "ID_KhachHang",
      },
    },
    ID_ThanhToan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ThanhToan",
        key: "ID_ThanhToan",
      },
    },
    ID_NhanVien: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "NhanVien",
        key: "ID_NhanVien",
      },
    },
    TongTien: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NgayDat: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    DiaChi: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    SDT: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    TrangThai: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "DonHang",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__DonHang__99B7263941C81E89",
        unique: true,
        fields: [{ name: "ID_DonHang" }],
      },
    ],
  }
);

module.exports = DonHang;
