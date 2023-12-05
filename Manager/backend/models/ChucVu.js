const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChucVu', {
    ID_ChucVu: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenChucVu: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ChucVu',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__ChucVu__64B4615D71AFEF9B",
        unique: true,
        fields: [
          { name: "ID_ChucVu" },
        ]
      },
    ]
  });
};
