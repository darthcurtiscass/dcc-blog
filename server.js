const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
var path = require('path');

const sessionSettings = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
}

const hbs = exphbs.create({});

const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const PORT = process.env.PORT || 3001;
app.use(session(sessionSettings));
//middleware to serve static assets (.js .css, images, etc)
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(routes);

//connect to database and synchronize our models with the db. force true drops the table.
//***Change to false after the tables have been populated with seeds***
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () =>{
        console.log(`App started in port ${PORT}`);
    })
});