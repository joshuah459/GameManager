/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scenes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gameid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    img_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sound_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    soundtrue: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'scenes',
    timestamps: false
  });
};
