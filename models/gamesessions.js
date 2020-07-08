/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gamesessions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    playerid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gameid: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'gamesessions',
    timestamps: false
  });
};
