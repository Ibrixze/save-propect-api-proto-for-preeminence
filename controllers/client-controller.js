const models = require('../models')



const add = (request, response) => {
    models.Client.create({...request.body}).then(result => {
        response.json({
            message: 'Client saved',
            clients: result.data
        })
    }).catch(error => response.status(500).json({
        message: 'An error occurred: ' + error
    }))
}


const getAll = (request, response) => {
    models.Client.findAll().then(result => {
        response.json({
            clients: result.data
        })
    }).catch(error => response.status(500).json({
        message: 'An error occurred: ' + error
    }))
}

const get = (request, response) => {
    const id = request.params.id
    models.Client.findByPk(id).then(result => {
        response.json({
            clients: result.data
        })
    }).catch(error => response.status(500).json({
        message: 'An error occurred:' + error
    }))
}

const edit = (request, response) => {
    models.Client.update({...request.body}, {where: {id:request.params.id}}).then(result => {
        response.json({
            message: 'Client updated',
            clients: result.data
        })
    }).catch(error => response.status(500).json({
        message: 'An error occurred: ' + error
    }))
}

const remove = (request, response) => {
    models.Client.destroy({where: {id:request.params.id}}).then(results => {
        response.json({
            message: 'Client destroyed',
            result: results.data
        })
    }).catch(error => response.status(500).json({
        message: 'An error occurred: ' + error
    }))
}


module.exports = {
    add : add,
    get: get,
    getAll: getAll,
    edit: edit,
    remove: remove
}