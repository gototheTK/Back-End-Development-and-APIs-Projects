require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();
const tempHosts = {};

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post('/api/shorturl', function(req, res, next){
  console.log(req.body);
  const url = req.body.url;
  const urlFormat = /^(http|https):\/\/.*\..+$/;
  const testUrlFormat = urlFormat.test(url);

  console.log(testUrlFormat);
  
  if(testUrlFormat){
    res.json({original_url: url, short_url: 'short'});
    tempHosts.short = url;
  }else{
    next();
  } 
},function(req, res){
  res.json({error: 'invalid url'});
});

app.get('/api/shorturl/:short_url', function(req, res){

  res.redirect(tempHosts[req.params.short_url]);
  
});
  