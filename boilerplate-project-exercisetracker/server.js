const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const bodyParser = require('body-parser');
let count = 1;
let makingId = 100;

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const users = {};

function User(){
  this.username = {};
  this._id = '';
  this.count = 0;
  this.log = [];
}

function Log(description, duration=0, date=new Date().toDateString()) {
  this.description = description;
  this.duration = Number(duration);
  this.date= new Date(date).toDateString();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users',function(req, res){
  const result = [];
  for(let key in users){
      result.push(users[key]);
  }
  res.json(result);
  
});

app.post('/api/users',function(req, res){
  const user = new User();
  user._id = "id" + makingId++;
  user.count = count++;
  user.username = req.body.username;
  
  users[user._id] = user;
  res.json(user);
  
});


app.post('/api/users/:_id/exercises',function(req, res){

  const user = users[req.params._id];
  

  const log =  new Log(req.body.description, req.body.duration, req.body.date);

  delete req.body[':_id'];
  user.log.push(log);
  req.body._id = user._id;
  req.body.username = user.username;
  req.body.date = log.date;
  req.body.duration = Number(req.body.duration);
  res.json(req.body);
  
});

app.get('/api/users/:_id/logs',function(req, res){

  const user  = Object.assign({},users[req.params._id]);
  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;
  
  if(from && to){

   user.log = user.log.filter((item) => new Date(item.date)>=new Date(from) && new Date(item.date) <= new Date(to));
      
  }
    

  if(limit){
    user.log = user.log.filter((item, i) => i<Number(limit));
  }
  
  res.json(user);
  
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
