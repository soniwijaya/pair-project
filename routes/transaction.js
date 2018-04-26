const express = require('express')
const router = express()
const db = require('../models')

router.get('/', (req, res) => {
  if (req.session.currentUser) {
    let user = req.session.currentUser
    db.Customer.findOne({
      include: {
        model: db.Transaction
      },
      where: {
        id: user.id
      }
    })
      .then(customer => {
        let transactions = customer.Transactions
        res.render('listTrans', { transactions: transactions, user:user })
      })
  } else {
    res.redirect('/')
  }
})

router.get('/:id/detail', (req, res) => {
  if (req.session.currentUser) {
    db.Cart.findAll({
      include: {
        model: db.Book
      },
      where: {
        TransactionId: req.params.id
      }
    })
      .then(carts => {
        res.render('detail', { carts: carts })
      })
      .catch(err => {
        res.redirect('/')
      })
  } else {
    res.redirect('/')
  }
})

module.exports = router