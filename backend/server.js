// ================================================================
// --- ARQUIVO: server.js (VERSÃO FINAL, ORGANIZADA E CORRIGIDA) ---
// ================================================================

// --- 1. IMPORTAÇÕES E CONFIGURAÇÃO INICIAL ---
// Todas as importações ficam juntas no topo do arquivo.
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Usaremos a versão com Promises para um código mais limpo
const bcrypt = require('bcryptjs');      // Usando 'bcryptjs' conforme seu package.json

const app = express();
const port = 3000;
const saltRounds = 10; // Fator de complexidade para a criptografia

// --- 2. MIDDLEWARE ---
// Habilita o CORS para permitir que seu frontend acesse a API
app.use(cors());
// Habilita o Express para entender requisições com corpo em JSON
app.use(express.json());

// --- 3. CONEXÃO COM O BANCO DE DADOS ---
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '36140888', // Sua senha do MySQL
    database: 'home_service_db'
};

// --- 4. ROTAS DA API ---

// ROTA DE TESTE
app.get('/', (req, res) => {
    res.json({ message: 'API do Home Service está no ar!' });
});

/**
 * ROTA PARA CADASTRAR UM NOVO PROFISSIONAL (VERSÃO CORRIGIDA E MAIS SEGURA)
 */
app.post('/api/profissionais', async (req, res) => {
    console.log('→ [ROTA] /api/profissionais chamada com body:', req.body);
    let connection; // Declara a conexão aqui fora para que o bloco 'finally' a acesse

    try {
        const { nome, email, senha, telefone, cidade, servicos, categoria } = req.body;

        if (!nome || !email || !senha || !telefone || !cidade || !categoria) {
            return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
        }

        const senha_hash = await bcrypt.hash(senha, saltRounds);
        connection = await mysql.createConnection(dbConfig);

        await connection.beginTransaction();

        // 1) Cria o usuário na tabela 'usuarios'
        const [usuarioResult] = await connection.execute(
            `INSERT INTO usuarios (nome_completo, email, senha_hash, tipo_usuario) VALUES (?, ?, ?, 'profissional')`,
            [nome, email, senha_hash]
        );
        const usuarioId = usuarioResult.insertId;

        // 2) Cria o perfil em 'perfis_profissionais'
        await connection.execute(
            `INSERT INTO perfis_profissionais (usuario_id, telefone, cidade_estado, especialidades, categoria) VALUES (?, ?, ?, ?, ?)`,
            [usuarioId, telefone, cidade, servicos ? servicos.join(', ') : '', categoria]
        );

        await connection.commit();

        return res.status(201).json({
            message: 'Usuário e perfil profissional criados com sucesso!',
            usuarioId: usuarioId
        });

    } catch (err) {
        console.error('→ [ERRO /api/profissionais]', err.stack || err);
        
        // Se a transação foi iniciada, desfaz ela em caso de erro
        if (connection) await connection.rollback();

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }
        return res.status(500).json({ message: 'Erro interno ao criar perfil.' });
    } finally {
        // Garante que a conexão com o banco seja sempre fechada, mesmo se ocorrer um erro
        if (connection) await connection.end();
    }
});

/**
 * ROTA PARA VERIFICAR SE O E-MAIL JÁ EXISTE (Para validação em tempo real)
 */
app.get('/api/check-email', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Parâmetro e-mail é obrigatório' });
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const sql = "SELECT id FROM usuarios WHERE email = ?";
        const [rows] = await connection.execute(sql, [email]);
        await connection.end();
        
        res.json({ exists: rows.length > 0 });

    } catch (err) {
        console.error("Erro ao verificar e-mail:", err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


/**
 * ROTA PARA FAZER LOGIN
 */
app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }
        
        const connection = await mysql.createConnection(dbConfig);
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [rows] = await connection.execute(sql, [email]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }

        const usuario = rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
        }

        // Login bem-sucedido!
        res.status(200).json({ 
            message: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome_completo,
                email: usuario.email,
                tipo_usuario: usuario.tipo_usuario
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});


// --- 5. INICIALIZAÇÃO DO SERVIDOR ---
app.listen(port, () => {
    console.log(`Servidor back-end rodando na porta http://localhost:${port}`);
});
