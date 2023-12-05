const sequelize = require("../dbSequelize");
const { DataTypes } = require("sequelize");

const DanhMuc = sequelize.define(
  "DanhMuc",
  {
    ID_DanhMuc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    TenDanhMuc: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    HinhAnhDM: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    NgayCN: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "DanhMuc",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__DanhMuc__662ACB01F6847A1F",
        unique: true,
        fields: [{ name: "ID_DanhMuc" }],
      },
    ],
  }
);

module.exports = DanhMuc;
