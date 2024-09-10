const authe = require('../controllers/autheController')
const express = require('express')
const router = express.Router()
//Route auth
router.post('/login', authe.login)
router.post('/logout', authe.logout)
module.exports = router