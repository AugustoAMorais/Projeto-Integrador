const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./dbConfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'segredo';

// Middleware para autenticação de token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/cadastro', async (req, res) => {
    const { nome, cpf, senha, dataNascimento, genero, email, telefone, endereco } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        db.query(
            'INSERT INTO usuarios (cpf, senha, nome, data_nascimento, genero, email, telefone, endereco_completo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [cpf, hashedPassword, nome, dataNascimento, genero, email, telefone, endereco],
            (err, result) => {
                if (err) {
                    console.log(err); // LOG DO ERRO NO CONSOLE
                    return res.status(500).send('Erro ao registrar usuário.');
                }
                res.sendStatus(201);
            }
        );
    } catch (error) {
        console.log(error); // LOG DO ERRO NO CONSOLE
        res.status(500).send('Erro interno do servidor.');
    }
});

app.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;

    console.log('Tentativa de login com CPF:', cpf);

    // Busca o usuário pelo CPF
    const query = 'SELECT * FROM usuarios WHERE cpf = ?';
    db.query(query, [cpf], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuário ou senha incorretos!' });
        }

        const user = results[0];

        // Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Usuário ou senha incorretos!' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.id_usuario, cpf: user.cpf }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, message: 'Login bem-sucedido!', token });
    });
});

app.post('/salvar-alarme', authenticateToken, (req, res) => {
    const { horario, dias_semana, nome_remedio, som_alarme } = req.body;
    const id_usuario = req.user.id; // Obtendo o ID do usuário autenticado

    const query = `
        INSERT INTO alarmes (id_usuario, horario, dias_semana, nome_remedio, som_alarme) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [id_usuario, horario, dias_semana, nome_remedio, som_alarme], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Erro ao salvar alarme." });
        }
        res.status(201).json({ success: true, message: "Alarme salvo com sucesso!" });
    });
});

app.get('/listar-alarmes', authenticateToken, (req, res) => {
    const id_usuario = req.user.id; // Obtendo o ID do usuário autenticado

    const query = `SELECT id_alarme, horario, dias_semana, nome_remedio FROM alarmes WHERE id_usuario = ?`;
    
    db.query(query, [id_usuario], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Erro ao buscar alarmes." });
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});