const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const port = 5000

const config = require('./config/key');

mongoose.connect(config.mongoURI,{
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})