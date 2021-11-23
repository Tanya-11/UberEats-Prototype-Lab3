const mongoose = require("mongoose")
require('dotenv').config();

const url =  process.env.MONGO_DB_CONNECTION_STRING;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
connect
  .then(db => {
    console.log("connected to database!")
  })
  .catch(err => {
    console.log(err)
  })