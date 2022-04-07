var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
var multer = require('multer');
const upload = multer({data: 'uploads/'})


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile') ,function (req, res) {
  const file = {};

  file.name = req.file.originalname;
  file.type = req.file.mimetype;
  file.size = req.file.size;

  console.log(file);
    res.json(file);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
