const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


const ongController = require('./controllers/ongController'); //listar ongs e criar id para elas
const incidentController = require('./controllers/incidentController'); //incidents (listar , criar e deletar)
const profileController = require('./controllers/profileController'); //listar todos os incidents de uma ong
const sessionController = require('./controllers/sessionController'); //login

const routes = express.Router();

routes.post('/sessions', sessionController.create)
//falta validação

routes.get('/ongs', ongController.index); //listar ongs
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create); // usando o controller de ongs para deixar routes mais clean


routes.get('/profile', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),profileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),incidentController.index); //listar incidents


routes.post('/incidents', incidentController.create); // criar incidents
//falta fazer validação

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),incidentController.delete)
module.exports = routes; //exportar uma variavel