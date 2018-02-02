
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var fs = require('fs');

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/save-user', function (req, res) {
  console.log(req.body)
  fs.appendFile('users.txt', ',\n' + JSON.stringify(req.body), function (err) {
    if (err) throw err;
    console.log('Saved!');
    res.redirect('/');
  });
});

app.get('/add-user', function (req, res) {
  res.render('add-user.ejs');
})

app.get('*', function (req, res) {
  fs.readFile('users.txt', 'utf8', function (err, data) {
    if (err) throw err;
    res.render('index.ejs', {users: JSON.parse('['+data+']')});
  });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))