const express = require('express')
const path = require('path')
require('dotenv').config();
const fs = require('fs')
const app = express()


app.use(express.static(path.resolve(__dirname, '../client')))

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.listen(3000, () => {
  console.log('Running on port 3000')
})