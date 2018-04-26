const express = require('express')
const router = express()
const Model = require('../models')

router.get('/',function(req,res){
    Model.Book.findAll({
        order: [
            ['id','ASC']
        ]
    })
    .then(function(listBook){
        if(req.session.currentUser) {
            let quantity = 0
            for(let i=0;i<req.session.currentUser.cart.length;i++){
                quantity += req.session.currentUser.cart[i].quatity
            }
            res.render('listBook',{listBook,quantity:JSON.stringify(quantity)})
        }else {
            res.redirect('/')          
        }
    })
})

module.exports = router