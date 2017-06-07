const express = require('express')
const app = express()

app.set('view engine', 'pug');
app.use("/r", express.static('res'));

app.get('/', function(req, res) {
  res.render('index');
})

app.listen(1806, function () {
})