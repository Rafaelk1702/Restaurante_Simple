//express
const express = require('express');
const app = express();

//morgan
const morgan = require('morgan');
//cors
const cors = require('cors');
// Para acceder al directorio actual
const path = require('path');

app.use(morgan('tiny'));
app.use(cors());
//json
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/', function (req, res) {
  //res.send('Hello World!');
//});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});