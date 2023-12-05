const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ThanhToan', {
    ID_ThanhToan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenThanhToan: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ThanhToan',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__ThanhToa__AB2E5631A7106C2E",
        unique: true,
        fields: [
          { name: "ID_ThanhToan" },
        ]
      },
    ]
  });
};
