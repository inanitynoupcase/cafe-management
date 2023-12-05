const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mssql",
  }
);

const TaiKhoanNhanVien = sequelize.define(
  "TaiKhoan_NhanVien",
  {
    ID_TaiKhoan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    TenTaiKhoan: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    MatKhau: {
      type: DataTypes.STRING(50),
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
    timestamps: false,
    tableName: "TaiKhoan_NhanVien",
  }
);

module.exports = TaiKhoanNhanVien;
