const express = require("express");
const app = express();
const mongoose = require('mongoose')
const config = require('./config/db')
const bodyParser = require('body-parser')

//Database connection
mongoose.connect(config.DB_URI_LOCAL, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

  //middleware
  app.use(bodyParser.json());

app.use('/api/items',require('./routes/items'));

const port = 8070;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;