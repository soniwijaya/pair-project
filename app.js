const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:false }))
app.set('view engine', 'ejs')

// index
const staticPage = require('./routes/index')
app.use('/', staticPage)

const customer = require('./routes/customer')
app.use('/customer', customer)

const book = require('./routes/book')
app.use('/book', book)

app.listen(3000)