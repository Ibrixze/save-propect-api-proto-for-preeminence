const bcrypt = require('bcryptjs')
const models = require('../models')
const jwt = require('jsonwebtoken')


const add = (request, response) => {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(request.body.password, salt, (error, hash) => {
            const user = {
                name: request.body.name,
                pseudo: request.body.pseudo,
                password: hash
            }
            models.User.create(user).then(result => {
                response.status(201)
                response.json({message : "User created"})
            }).catch(error => {
                response.status(500)
                response.json({message: "An error occured"})
            })
        })
    })


}


const login = (request, response) => {

    models.User.findOne({where: {pseudo:request.body.pseudo}})
        .then(user => {
            if(user === null)
                response.status(200).json({message: "Invalid credentials"})
            else{
                bcrypt.compare(request.body.password, user.password, (err, result)=>{
                    if(result){
                        jwt.sign({
                            email: user.email,
                            userId: user.id
                        }, 'secret', (tokenError, token) => {
                                response.status(201).json({
                                    message: "Authentication successful", 
                                    user: user.id,
                                    token:token
                                })
                        })
                    }else{
                        result.status(200).json({
                            message: 'Invalid credentials'
                        })
                    }
                })
            }
        }).catch(error => {
            response.status(500).json({message: 'An error occured : ' + error})
        })
    
}


const getAll = (request, response) => {
   models.User.findAll().then(result => {
        response.status(201).json({
            user: result.data
        })
   }).catch(error => {
       response.status(500).json({
           message: 'An error occured : ' + error
       })
   })

}
const get = (request, response) => {
    models.User.findByPk({where: {id: request.params.id}}).then(result => {
         response.status(201).json({
             user: result.data
         })
    }).catch(error => {
        response.status(500).json({
            message: 'An error occured : ' + error
        })
    })
 
 }

const edit = (request, response) => {
    models.User.update({
        ...request.body
    }, 
    {
        where: {id: request.params.id}
    }).then(result=> response.status(201).json({
        message: 'Update successful',
        user: result.data
    })).catch(error => {
        response.status(403).json({
            message: 'An error occured : ' + error
        })
    })
}

const remove = (request, response) => {
    models.User.destroy({where: {id: request.params.id}})
        .then(result => response.status(201).json({
            message: 'user deleted successful',
            result: result.data
        })).catch(error => {
            response.status(403).json({
                message: 'An error occured : ' + error
            })
        })
}

module.exports = {
    add : add,
    login: login,
    get: get,
    getAll: getAll,
    edit: edit,
    remove: remove
}