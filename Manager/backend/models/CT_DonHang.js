const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const CT_DonHang = sequelize.define(
  "CT_DonHang",
  {
    ID_CTDonHang: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ID_DonHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DonHang",
        key: "ID_DonHang",
      },
    },
    ID_DoUong: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DoUong",
        key: "ID_DoUong",
      },
    },
    GiaDoUong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "CT_DonHang",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__CT_DonHa__B7451C286BBA7616",
        unique: true,
        fields: [{ name: "ID_CTDonHang" }],
      },
    ],
  }
);
module.exports = CT_DonHang;
