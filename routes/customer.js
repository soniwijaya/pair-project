const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const Model = require('../models')

const db = require('../models');
const Customer = db.Customer;

router.get('/', (req, res) => {
  if(req.session.currentUser) {
    res.send('hello')
  }else {
    res.render('index')
  }
})

router.post('/do_login',
  (req, res, next) => {
    let username = req.body.username
    Customer.find({ where: { username: username } })
      .then(user => {
        let passwordCheck = bcrypt.compareSync(req.body.password, user.password);
        if (user && passwordCheck) {
          req.session.currentUser = user
          next()
        } else {
          res.send('Username or Password Wrong')
        }
      }).catch(err => {
        res.send(err)
      })
  },
  (req, res) => {
    res.redirect('/book')
  })

router.get('/do_logout', (req,res) => {
  req.session.currentUser = null;
  res.redirect('/')
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


router.get('/register',function(req,res){
  res.render('register')
})

router.post('/register',function(req,res){
  let salt = bcrypt.genSaltSync(5)
  let encryptPass = bcrypt.hashSync(req.body.password,salt)
  Model.Customer.create(
    {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: encryptPass
    }
  )
  .then(function(){
    res.redirect('/')
  })
})

module.exports = router