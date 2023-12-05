const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const GiaDoUong = sequelize.define(
  "GiaDoUong",
  {
    ID_GiaDoUong: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ID_DoUong: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DoUong",
        key: "ID_DoUong",
      },
    },
    ID_NhanVien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "NhanVien",
        key: "ID_NhanVien",
      },
    },
    Ngay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Gia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "GiaDoUong",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__GiaDoUon__31E23414182F29D2",
        unique: true,
        fields: [{ name: "ID_GiaDoUong" }],
      },
    ],
  }
);
module.exports = GiaDoUong;
