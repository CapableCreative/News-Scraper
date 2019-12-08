var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = process.envPORT || 3000;

app.use( logger("dev") );
app.use( bodyParser.urlencoded({extended: false}) );
app.engine( "handlbars", exphbs({ defaultLaout: "main" }));
app.set( "view engine", "handlebars" );

const axios = require('axios');
const cheerio = require('cheerio')

// Load the HTML code as a string, which returns a Cheerio instance
axios.get('https://www.nytimes.com/search?query=Superman').then((response) => {
    const $ = cheerio.load(response.data); 
    const urlElems = $('body').find('ol');

    for (let i = 0; i < 10; i++) {
      if (urlElems) {
        const headline = $(urlElems[i]).find('h4').text();
          console.log('<===================================================== Url Span =======================================================>' + headline);
      } 
    }
}).catch(function(err) { console.log('Error connecting to scraped site.')});

app.use(express.static(process.cwd() + "/public"));

app.listen(port, function() {
    console.log(`App listeing on port ${port}`);
});
