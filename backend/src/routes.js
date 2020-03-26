const express = require('express');


const ongController = require('./controllers/ongController'); //listar ongs e criar id para elas
const incidentController = require('./controllers/incidentController'); //incidents (listar , criar e deletar)
const profileController = require('./controllers/profileController'); //listar todos os incidents de uma ong
const sessionController = require('./controllers/sessionController'); //login

const routes = express.Router();

routes.post('/sessions', sessionController.create)

routes.get('/ongs', ongController.index); //listar ongs
routes.post('/ongs', ongController.create); // usando o controller de ongs para deixar routes mais clean

routes.get('/profile', profileController.index);

routes.get('/incidents', incidentController.index); //listar incidents
routes.post('/incidents', incidentController.create); // criar incidents
routes.delete('/incidents/:id', incidentController.delete)
module.exports = routes; //exportar uma variavel