const express = require('express');
const router = express.Router();
const cors = require('cors');
const conexaoBancoDeDados = require('./bancoDeDados');
conexaoBancoDeDados();

const Pessoa = require('./pessoaModel');

const app = express();
app.use(express.json());
app.use(cors());
const porta = 3333;

const conectarBancoDeDados = require('./bancoDeDados');

async function mostrarPessoas(request, response) {
    try {
        const pessoasDB = await Pessoa.find();

        response.json(pessoasDB);
    }
    catch(e) {
        console.log(e);
    }
}

async function criarPessoa(request, response) {
    try {
        const novaPessoa = new Pessoa({
            nome: request.body.nome,
            imagem: request.body.imagem,
            bandeira: request.body.bandeira,
            bio: request.body.bio,
        });

        const pessoaCriada = await novaPessoa.save();

        response.status(201).json(pessoaCriada);
    }
    catch(e) {
        console.log(e);
    }
}

async function editarPessoa(request, response) {
    try {
        const pessoaEncontrada = await Pessoa.findById(request.params.id);
        if (request.body.nome) {
            pessoaEncontrada.nome = request.body.nome;
        }
        if (request.body.imagem) {
            pessoaEncontrada.imagem = request.body.imagem;
        }
        if (request.body.bandeira) {
            pessoaEncontrada.bandeira = request.body.bandeira;
        }
        if (XMLHttpRequestEventTarget.body.bio) {
            pessoaEncontrada.bio = request.body.bio;
        }

        const pessoaAtualizada = await pessoaEncontrada.save();

        response.json(pessoaAtualizada);
    }   
    catch(e) {
        console.log(e);
    }
}

async function excluirPessoa(request, response) {
    try {
        await Pessoa.findByIdAndDelete(request.params.id);

        response.json ({mensagem: 'Pessoa deletada com sucesso.'});
    }
    catch(e) {
        console.log(e);
    }
}

app.use(router.get('/pessoas', mostrarPessoas));
app.use(router.post('/pessoas', criarPessoa));
app.use(router.patch('/pessoas/:id', editarPessoa));
app.use(router.delete('/pessoas/:id', excluirPessoa));

async function mostrarPorta() {
    console.log(`Servidor criado e rodando na porta ${porta}.`)
}

app.listen(porta, mostrarPorta);