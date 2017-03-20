const express = require('express')
const bodyParser = require('body-parser')

const config = require('./package.json').config
const customers = require('./customers.js')

const app = express()
app.use(express.static('views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/scripts', express.static('scripts'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.status(200).render('index', { customers })
})

app.get('/edit/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id)

  if (!customer) {
    return res.status(404).send('customer not found')
  }

  res.status(200).render('edit', { customer })
})

app.post('/', (req, res) => {
  const updatedCustomer = req.body
  const index = customers.findIndex(c => c.id === updatedCustomer.id)
  customers[index] = updatedCustomer
  res.status(200).render('index', { customers })
})

const port = process.env.PORT || config.port
console.log(`start listening on port ${port}`)
app.listen(port)
