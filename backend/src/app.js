const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();


app.use(cors()); //todas as aplicações front end podem acessar backend
app.use(express.json()); // express tranforma o JSON em algo compreensivel pelo node.js
app.use(routes);
app.use(errors());

/* 
Metódos HTTP:
    GET: Buscar/listar uma informação do back-end (enter no browser pra digitar url)
    POST: Criar uma informação no back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end

    é um conceito semantico, pois não há muita diferença, mas é bom para entendimento do código.
*/

/*
Tipos de parâmetros:
    Query Parms: Parâmetros nomeados enviados na rota após "?" (filtros, paginação) (request.query)
    Route Parms: Parâmetros utilizados utilizados para identificar recursos (/users:id ,onde id sera substituido por numeros id) (request.params)
    Request Body: Corpo da requisição, utilizado para criar ou alterar recursos (request.body)

*/


module.exports = app;