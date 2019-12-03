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

// CHEERIO BITS

const axios = require('axios');
const cheerio = require('cheerio')

// Load the HTML code as a string, which returns a Cheerio instance
axios.get('https://ew.com/search/?q=comic+book').then((response) => {
    const $ = cheerio.load(response.data);
    // `response` is an HTTP response object, whose body is contained in it's `data` attribute        
    // This will print the HTML source code to the console
    
// CHEERIO SCRAPING BITS - SLF

    const urlElems = $('.search-result')

  // We now loop through all the elements found
  for (let i = 0; i < urlElems.length; i++) {
    // Since the URL is within the span element, we can use the find method
    // To get all span elements with the `s1` class that are contained inside the
    // pre element. We select the first such element we find (since we have seen that the first span
    // element contains the URL)
    const urlSpan = $(urlElems[i]).find('.search-result-image')[0]

    // We proceed, only if the element exists
    if (urlSpan) {
      // We wrap the span in `$` to create another cheerio instance of only the span
      // and use the `text` method to get only the text (ignoring the HTML)
      // of the span element
      const urlText = $(urlSpan).text();

      // We then print the text on to the console
      console.log(urlText)
    }
  }

// END CHEERIO SCRAPING BITS

});


// END CHEERIO BITS

app.use(express.static(process.cwd() + "/public"));

app.listen(port, function() {
    console.log(`App listeing on port ${port}`);
});
