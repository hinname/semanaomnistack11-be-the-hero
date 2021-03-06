const connection = require('../database/connection');

module.exports = {
    async index(request, reponse) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id) //bucando incidents que a ong criou
            .select('*');
        return reponse.json(incidents);  
    }
}