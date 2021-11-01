const express = require('express')
const cors = require("cors")
const bodyparser = require('body-parser')
const app = express()
const apiRouter = require('./routes/api')
const userController = require('./controllers/user-controller')

app.use(cors({'origin': '*'}))
app.use(bodyparser.json())
// app.use((request, response, next) => {
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// })



// app.use('/', (request, response, next) => {
//     console.log(apiRouter)
//     next()
// })
// app.use('/api/add-user', (request, response) => {
//     console.log(request.body)
// })


app.use('/api', apiRouter)

// app.post('/api/add-user', userController.add)

module.exports = app