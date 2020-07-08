
const { Players, Gamemasters, Games, Gamesessions, Notes, Scenes } = require('./models');


var express = require('express')
var path = require('path')
var session = require('express-session');
var bodyParser = require('body-parser');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

app = express();
app.set('port', 3002);

// setup handlebars and the view engine for res.render calls
// (more standard to use an extension like 'hbs' rather than
//  'html', but the Universiry server doesn't like other extensions)
app.use(express.static(path.join(__dirname, 'static')))
var engines = require('consolidate');

app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//authentication stuff

app.post('/player/auth', function(request, response) {
    var username = request.body.username;
    var password1 = request.body.password;
    //console.log(password1);
    //console.log(username);
	if (username && password1) {
        Players.findAll({
            limit: 1,
            where: {
                name: username,
                password: password1
              //your where conditions, or without them if you need ANY entry
            },
          }).then(function(entries){
              //console.log(entries);
              if(entries.length > 0){
              request.session.loggedin = true;
			  request.session.username = username;
              response.redirect('/player/home')
              }else {
                response.send('Incorrect Username and/or Password!'); 
              }
              //send error back to page
            //only difference is that you get users list limited to 1
            //entries[0]
          });
	} else {
        //send error back to page
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/gm/auth', function(request, response) {
    var username = request.body.username;
    var password1 = request.body.password;
    //console.log(password1);
    //console.log(username);
	if (username && password1) {
        Gamemasters.findAll({
            limit: 1,
            where: {
                name: username,
                password: password1
              //your where conditions, or without them if you need ANY entry
            },
          }).then(function(entries){
              //console.log(entries);
              if(entries.length > 0){
              request.session.loggedin = true;
			  request.session.username = username;
              response.redirect('/gm/home')
              }else {
                response.send('Incorrect Username and/or Password!'); 
              }
              //send error back to page
            //only difference is that you get users list limited to 1
            //entries[0]
          });
	} else {
        //send error back to page
		response.send('Please enter Username and Password!');
		response.end();
	}
});

function isGMLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.session.loggedin)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/gm/login');
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.session.loggedin)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/player/login');
}
//end of authentication stuff




//home stuff
app.get('/', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/home.html");
});

app.get('/gm/login', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/gm/login.html");
});
app.get('/gm/register', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/gm/register.html");
});
app.get('/gm/exists', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/gm/exists.html");
});

app.get('/player/login', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/player/login.html");
});

app.get('/player/register', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/player/register.html");
});
app.get('/player/exists', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/player/exists.html");
});

//end of homestuff


//player endpoints
app.get('/player/home', isLoggedIn, function(request, response) {
    response.sendFile(__dirname + "/static/player/home.html");
});

app.get('/player/exists', function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/player/exists.html");
});





//gamemaster stuff
app.get('/gm/home', isGMLoggedIn, function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/gm/home.html");
});

//gamemaster stuff
app.get('/gm/game/:id', isGMLoggedIn, function(request, response) {
    //serve the login page
    response.sendFile(__dirname + "/static/gm/games.html");
});



//create account stuff

app.post('/player/auth/register', function(request, response) {
            var username = request.body.username;
            var password1 = request.body.password;
            var email = request.body.email;
            var number = request.body.number;
    
    Players.findAll({
        limit: 1,
        where: {
            name: username
        },
      }).then(function(entries){
          if(entries.length > 0){
            //console.log("user already exists");
            response.redirect('/player/exists'); 
          }else{
            //console.log("New User Created: " + username +" Saved to database!")
            Players.create({name: username,email: email,password: password1,number: number});
            response.redirect('/player/login'); 
          }
      });
});


app.post('/gm/auth/register', function(request, response) {
    var username = request.body.username;
    var password1 = request.body.password;
    var email = request.body.email;
    var number = request.body.number;

Gamemasters.findAll({
limit: 1,
where: {
    name: username
},
}).then(function(entries){
  if(entries.length > 0){
    //console.log("user already exists");
    response.redirect('/gm/exists'); 
  }else{
    //console.log("New Game Master Created: " + username +" Saved to database!")
    Gamemasters.create({name: username,email: email,password: password1,number: number});
    response.redirect('/gm/login'); 
  }
});
});



app.get('/gm/games', isGMLoggedIn, function(request, response) {
    var name = request.body.createGame;
    Gamemasters.findAll({
        limit: 1,
        where: {
            name: request.session.username
        },
        }).then(function(entries){
            console.log("Gamemaster ID: " + entries[0].id + " requested the list if their games.");
            Games.findAll({
                where:{
                    gamemasterid: entries[0].id,
                    active: 1
                },
            }).then(function(entries){
                //console.log(entries);
                response.send(JSON.stringify(entries));
                })
            
            
            })
            
          });






//create new game
app.post('/gm/games/new', isGMLoggedIn, function(request, response) {
    var name = request.body.createGame;
//console.log(name);
Gamemasters.findAll({
    limit: 1,
    where: {
        name: request.session.username
    },
    }).then(function(entries){
        //console.log(entries[0].id);
        Games.create({name: name,gamemasterid: entries[0].id,active: 1});
      });

    console.log("New Game Sucessfully Created!")
    response.redirect('/gm/home'); 
});

//remove game
app.post('/gm/remGame/:id', isGMLoggedIn, function(request, response) {
    var ids = request.params.id
    Games.update(
        { active: 0 },
        { where: { id: ids } }
      )
        .then(result =>
            response.status(200)
        )
        .catch(err =>
            response.status(500)
        )
    

});







var server = app.listen(app.get('port'), function () {
    console.log("Game Server Initialized...")
});