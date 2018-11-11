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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp endpoint
app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;
  let timestamp, unix, utc, convertDate, json;

  if (!dateString) {
    // if undefined...
    timestamp = new Date();
  } else {
    convertDate = Date.parse(dateString);

    // if parsed date is not a number
    if(isNaN(convertDate)) {
      convertDate = Number(dateString);
    }

    timestamp = new Date(convertDate);
  }

  unix = timestamp.getTime();
  utc = timestamp.toUTCString();

  if (utc == 'Invalid Date') {
    // if date is invalid, pass an error message
    json = {"error": utc};
  } else {
    json = {"unix": unix, "utc": utc};
  }

  res.json(json);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});