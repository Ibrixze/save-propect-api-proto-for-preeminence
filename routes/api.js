const express = require('express')
const user = require('../controllers/user-controller')
const client = require('../controllers/client-controller')


const router = express.Router()

router.post('/add-user', user.add)
router.post('/login', user.login)
router.post('/update-user/:id', user.edit)
router.delete('/delete-user/:id', user.remove)
router.get('/users', user.getAll)
router.get('/user/:id', user.get)

router.post('/add-client', client.add)
router.post('/update-client/:id', client.edit)
router.delete('/delete-client/:id', client.remove)
router.get('/clients', client.getAll)
router.get('/client/:id', client.get)
module.exports = router