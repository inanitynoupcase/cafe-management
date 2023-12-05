const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const KhachHang = sequelize.define(
  "KhachHang",
  {
    ID_KhachHang: {
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
    SDT: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "KhachHang",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__KhachHan__263C4E85FE4722CA",
        unique: true,
        fields: [{ name: "ID_KhachHang" }],
      },
    ],
  }
);
module.exports = KhachHang;
