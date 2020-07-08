/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    playerid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Field4: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'notes',
    timestamps: false
  });
};
