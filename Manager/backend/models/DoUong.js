const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const DoUong = sequelize.define(
  "DoUong",
  {
    ID_DoUong: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ID_DanhMuc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DanhMuc",
        key: "ID_DanhMuc",
      },
    },
    TenDoUong: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    HinhAnh: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    MoTa: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    TrangThai: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "DoUong",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__DoUong__CEBB193F0E2D54E4",
        unique: true,
        fields: [{ name: "ID_DoUong" }],
      },
    ],
  }
);

module.exports = DoUong;
