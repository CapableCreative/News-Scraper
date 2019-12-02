var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');

var port = process.envPORT || 3000;

var app = express();

app.use( logger("dev") );
app.use( bodyParser.urlencoded({extended: false}) );
app.engine( "handlbars", exphbs({ defaultLaout: "main" }));
app.set( "view engine", "handlebars" );

app.use(express.static(process.cwd() + "/public"));

app.listen(port, function() {
    console.log(`App listeing on port ${port}`);
});
