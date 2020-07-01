//express
const express = require('express');
const app = express();

//morgan
const morgan = require('morgan');
//Mongo
const mongoose = require('mongoose');
//cors
const cors = require('cors');
// Para acceder al directorio actual
const path = require('path');
const uri = 'mongodb://localhost:27017/restaurante_simple';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}; 
 
// Or using promises
mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Conectado a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);
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
app.use('/api', require('./router/datainventario'));

//app.get('/', function (req, res) {
  //res.send('Hello World!');
//});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});