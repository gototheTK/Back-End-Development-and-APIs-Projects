// server.js
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  const isDate = new Date(req.params.date);
  const isNum = isNaN(Number(req.params.date));


  if(isDate.toString()!=="Invalid Date"){
    res.json({unix: Number(new Date(req.params.date).valueOf()), utc: new Date(req.params.date).toUTCString()});
  }else if(!isNum){
    res.json({unix: Number(req.params.date), utc: new Date(Number(req.params.date)).toUTCString()});
  }else if(req.params.date === undefined){
    console.log("hhh");
    res.json({unix: Number(new Date().valueOf()), utc: new Date().toUTCString()});
  }else {
    res.json({error : "Invalid Date"});
    
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
