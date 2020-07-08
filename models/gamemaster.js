/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gamemaster', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    number: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'gamemaster',
    timestamps: false
  });
};
