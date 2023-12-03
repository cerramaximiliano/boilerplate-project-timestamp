// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', (req,res) => {

  res.json({
    "unix": new Date().getTime,
    "utc": new Date()
  })
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  console.log(date)
  let unix; let newDate
  if( isNaN(Number(date)) ) {
    unix = new Date(date).getTime();
    newDate = new Date(date).toString()
  }else {
    unix = Number(date)
    newDate = new Date(Number(date)).toString()
  }
  if( newDate === 'Invalid Date'){
    res.json({
      error : "Invalid Date"
      })
  }else {
    res.json({
      "unix": unix,
      "utc": newDate
      })
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
