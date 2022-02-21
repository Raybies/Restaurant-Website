//add core node packages to top, then 3rd party packages
const path = require('path'); 

//to access util files & route files
const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

//require express --keep in main app.js file

const express = require('express');

const { render } = require('ejs');

// call function express
const app = express();

//templating engine (npm install ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*  
    note that the views that were .html have been renamed to 
    .ejs so they are now templates
*/
//static files like CSS and scripts
app.use(express.static('public'));

//routes middle ware
app.use(express.urlencoded({ extended: false}));

/*  tells express to use this const that points to the default.js 
    file to handle the routes this filters all incoming requests
    to default.js if no route in that file it continues in this
    file
*/
app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

/*  
    middleware acts on incoming requests, 1 step of many steps in 
    handling a request 
*/
app.use(function(req, res){
    res.status(404).render('404');
});

/*
    500 needs four parameters middleware for server/app errors
    error parameter is automatically populated by express, its more info
    about the error, next daisy chains different middleware together
*/
app.use(function(error, req, res, next){
    /*  
        we pass the status code through and it shows in the 
        developer tools
    */
    res.status(500).render('500'); //chaining methods 

});

//port to listen on 
app.listen(3000)