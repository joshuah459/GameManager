/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('games', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gamemasterid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'games',
    timestamps: false
  });
};
