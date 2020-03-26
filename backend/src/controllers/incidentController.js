const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .count();    

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//para relacionar dados de duas tabelas
            .limit(5)
            .offset((page - 1) * 5) // ex: com 0 ele pega os 5 primeiros registros, com 1 ele pula os primeiros 5 e mostra os 5 depois
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']); //total de itens será retornado no header

        return response.json(incidents); //mostrar contudo dos incidents em JSON
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        //request.headers; guarda informações do contexto da informação quem esta logado etc
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id }); //mostra apenas o id para a ong cadastrada


    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization; //para verificar se o incident que ira ser deletado é da ONG que criou o incident

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if (incident.ong_id != ong_id ){
            return response.status(401).json({ error: 'Operation not permitted' }); //status de não autorizado
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send(); //status sem conteudo para retornar

    }
};