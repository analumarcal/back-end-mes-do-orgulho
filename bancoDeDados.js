const mongoose = require('mongoose');
require('dotenv').config();

async function conectarBancoDeDados() {
    try {
        console.log('Conexão com banco de dados iniciou.');

        await mongoose.connect(process.env.MONGO_URL);
    
        console.log('Conexão com banco de dados feita com sucesso.');
    } 
    catch(e) {
        console.log(e);
    }
}

module.exports = conectarBancoDeDados;