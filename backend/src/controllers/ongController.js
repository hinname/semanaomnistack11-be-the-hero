const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*'); //seleciona todos os campos da tabela ongs          
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); //criação do id utilizando crypto

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id }); //retorna o id pois ela sera necessario para o login
    }
};