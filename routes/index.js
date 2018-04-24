const express = require('express')
const router = express()

router.get('/',function(req,res){
    res.redirect('/singer')
})

module.exports = router