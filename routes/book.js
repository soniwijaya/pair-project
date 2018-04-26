const express = require('express')
const router = express()
const Model = require('../models')

router.get('/',function(req,res){
    Model.Book.findAll()
    .then(function(listBook){
        if(req.session.currentUser) {
            res.render('listBook',{listBook})
        }else {
            res.redirect('/')
        }
    })
})

module.exports = router