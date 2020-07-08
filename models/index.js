// this file makes the database connection, collects all the models
// and sets the associations
// other files can use this for database access by requiring it and
// assigning the exports

// assuming that this file (index.js) is in a subdirectory called models:
//  const models = require('./models');

'use strict';

// database connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'players.db'
});

// import models
const Players = sequelize.import("./player.js");
const Gamemasters = sequelize.import("./gamemaster.js");
const Games = sequelize.import("./games.js");
const Gamesessions = sequelize.import("./gamesessions.js");
const Notes = sequelize.import("./notes.js");
const Scenes = sequelize.import("./scenes.js");
// Add association here
//Album.hasMany(Track);
//Track.belongsTo(Album);


module.exports = {
    Players, Gamemasters, Games, Gamesessions, Notes, Scenes
};