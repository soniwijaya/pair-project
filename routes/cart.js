const express = require('express')
const router = express()
const Model = require('../models')

router.get('/',function(req,res){
    let session = req.session.currentUser

    res.render('cart',{session})
})

router.get('/add/:bookId',function(req,res){
    let session = req.session.currentUser

    Model.Book.findById(req.params.bookId)
    .then(function(book){
        if(session.cart.length==0){
            let temporary = {}
            temporary["title"] = book.title
            temporary["stock"] = book.stock-1
            temporary["duration"] = 2
            temporary["quatity"] = 1
            temporary["BookId"] = Number(req.params.bookId)
            temporary["CustomerId"] = session.id
            session.cart.push(temporary)
        }
        else{
            let cek = true
            for(let i=0;i<session.cart.length;i++){
                if(req.params.bookId==session.cart[i].BookId){
                    session.cart[i].stock -= 1
                    session.cart[i].quatity += 1
                    session.cart[i].BookId = Number(req.params.bookId)
                    cek = false
                }
            }
            if(cek){
                let temporary = {}
                temporary["title"] = book.title
                temporary["stock"] = book.stock-1
                temporary["quatity"] = 1
                temporary["duration"] = 2
                temporary["BookId"] = Number(req.params.bookId)
                temporary["CustomerId"] = session.id
                session.cart.push(temporary)
            }
        }
        res.redirect('/book')
    })
})

module.exports = router