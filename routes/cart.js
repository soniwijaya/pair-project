const express = require('express')
const router = express()
const Model = require('../models')

router.get('/', function (req, res) {
    if (req.session.currentUser) {
    let session = req.session.currentUser
    res.render('cart', { session })
    } else {
        res.redirect('/')
    }
})

router.post('/', function (req, res) {
    if (req.session.currentUser) {
        let session = req.session.currentUser

        Model.Transaction.create({
            bookDate: session.cart[0].bookDate,
            returnDate: session.cart[0].returnDate
        })
            .then(function (result) {
                let listCart = []
                for (let i = 0; i < session.cart.length; i++) {
                    listCart.push({ CustomerId: session.cart[i].CustomerId, quantity: session.cart[i].quatity, duration: 2, BookId: session.cart[i].BookId, TransactionId: result.id }, )
                }

                Model.Cart.bulkCreate(listCart)
                    .then(() => {
                        Model.Book.findAll()
                            .then(books => {
                                books.forEach(book => {
                                    listCart.forEach(bookCart => {
                                        if (book.id == bookCart.BookId) {
                                            let newStock = book.stock - bookCart.quantity
                                            Model.Book.update({
                                                stock: newStock
                                            }, {
                                                    where: {
                                                        id: book.id
                                                    }
                                                }
                                            )
                                        }
                                    })
                                })
                                req.session.currentUser.cart= []
                                res.redirect('/book')
                            })
                    })
            })
    } else {
        res.redirect('/')
    }

})

router.get('/add/:bookId', function (req, res) {
    if (req.session.currentUser) {

        let session = req.session.currentUser
        let someDate = new Date();
        let numberOfDaysToAdd = 2;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd)

        Model.Book.findById(req.params.bookId)
            .then(function (book) {
                if (session.cart.length == 0) {
                    let temporary = {}
                    temporary["title"] = book.title
                    temporary["stock"] = book.stock - 1
                    temporary["bookDate"] = new Date()
                    temporary["returnDate"] = someDate
                    temporary["duration"] = 2
                    temporary["quatity"] = 1
                    temporary["BookId"] = Number(req.params.bookId)
                    temporary["CustomerId"] = session.id
                    session.cart.push(temporary)
                }
                else {
                    let cek = true
                    for (let i = 0; i < session.cart.length; i++) {
                        if (req.params.bookId == session.cart[i].BookId) {
                            session.cart[i].stock -= 1
                            session.cart[i].quatity += 1
                            session.cart[i].BookId = Number(req.params.bookId)
                            cek = false
                        }
                    }
                    if (cek) {
                        let temporary = {}
                        temporary["title"] = book.title
                        temporary["stock"] = book.stock - 1
                        temporary["bookDate"] = new Date()
                        temporary["returnDate"] = someDate
                        temporary["quatity"] = 1
                        temporary["duration"] = 2
                        temporary["BookId"] = Number(req.params.bookId)
                        temporary["CustomerId"] = session.id
                        session.cart.push(temporary)
                    }
                }
                res.redirect('/book')
            })
    } else {
        res.redirect('/')
    }
})

module.exports = router