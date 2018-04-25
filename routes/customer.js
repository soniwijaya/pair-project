const express = require('express')
const router = express()
const Model = require('../models')

const db = require('../models');
const Customer = db.Customer;

// router.get('/', (req, res) => {
//   Customer.findAll()
//   .then((customers) => {
//     // res.send(customers)
//     res.render('index.ejs')
//   }).catch((err) => {
//     res.send(err)
//   });
// });

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/do_login',
  (req, res, next) => {
    let username = req.body.username
    Customer.find({ where: { username: username } })
    .then(user => {
      let passwordCheck = bcrypt.compare(req.body.password, user.password);
      if(passwordCheck) {
        next()
      }else {
        res.send('Wrong Password')
      }
    }).catch(err => {
      res.send(err)
    })
  },

  (req, res) => {

  })

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