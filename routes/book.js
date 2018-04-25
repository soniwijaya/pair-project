const express = require('express')
const router = express()
const Model = require('../models')

router.get('/',function(req,res){
    Model.Book.findAll()
    .then(function(listBook){
        res.render('listBook',{listBook})
    })
})

module.exports = router