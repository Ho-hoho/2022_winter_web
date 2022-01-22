const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const port = 5000

mongoose.connect('mongodb+srv://kennyya:ky9322ky&@cluster0.h4ayv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})