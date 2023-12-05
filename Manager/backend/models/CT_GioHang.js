const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CT_GioHang', {
    ID_CTGioHang: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_GioHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'GioHang',
        key: 'ID_GioHang'
      }
    },
    ID_DoUong: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DoUong',
        key: 'ID_DoUong'
      }
    },
    Gia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Size: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CT_GioHang',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__CT_GioHa__12868028234CD292",
        unique: true,
        fields: [
          { name: "ID_CTGioHang" },
        ]
      },
    ]
  });
};
