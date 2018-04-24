const express = require('express')
const router = express()
const Model = require('../models')

const db = require('../models');
const Customer = db.Customer;

router.get('/', (req, res) => {
  Customer.findAll()
  .then((customers) => {
    res.send(customers)
  }).catch((err) => {
    res.send(err)
  });
});

router.get('/add', (req, res) => {
  res.send('PAGE FOR ADD CUSTOMER')
});

router.post('/add', (req, res) => {
  let newCustomer = req.body
  Customer.create()
  .then((customer) => {
    res.send(customer)
  }).catch((err) => {
    res.send(err)
  });
});

router.get('/:customerId/transactions', (req, res) => {
  let customerId = req.params.customerId;
  Customer.findAll({
    include: {
      models: db.Transaction
    },
    where: {
      id: customerId
    }
  })
  .then(transaction => {
    res.send(transaction)
  }).catch(err => {
    res.send(err)
  })
})

router.get('/:customerId/transactions/:transactionId', (req, res) => {
  let customerId = req.params.customerId;
  let transactionId = req.params.transactionId;
  Customer.findAll({
    include: {
      models: db.Transaction,
      include: {
        models: db.Book
      },
      where: {
        id: transactionId
      }
    },
    where: {
      id: customerId
    }
  })
  .then(transaction => {
    res.send(transaction)
  }).catch(err => {
    res.send(err)
  })
});

module.exports = router