// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});*/

app.get("/api/timestamp/", function(req, res) {
  let currentDate = new Date();
  console.log("blank date");
  res.json({"unix": currentDate.getTime(), "utc": currentDate.toUTCString()});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  //code here
  let str = req.params.date_string;
  
  let yearTest = /^\d{5,}/;
  
  if (yearTest.test(str)) {
    console.log("year first");
    res.json({"unix": str, "utc": new Date(parseInt(str)).toUTCString()});
  } else {
    let date = new Date(str);
    if (date.toString() == "Invalid Date") {
      console.log("error");
      res.json({"error": "Invalid Date"});
    } else {
      console.log("milliseconds");
      res.json({"unix": date.getTime(), "utc": date.toUTCString()});
    }
  }
});

//{"unix":"1451001600000","utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
//{"unix":"2015-12-25","utc":"Thu, 01 Jan 1970 00:00:02 GMT"}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});