const express = require('express');
const cors    = require('cors');
const mysql   = require('mysql2/promise');
const bcrypt  = require('bcryptjs');   // ← adicione esta linha


// Inicializa o aplicativo Express
const app = express();

// Habilita o CORS para permitir requisições do seu front-end
app.use(cors());
// Habilita o Express para entender requisições com corpo em JSON
app.use(express.json());

console.log('→ [INIT] server.js carregado, registrando rota /api/profissionais');

// --- CONFIGURAÇÃO DA CONEXÃO COM O BANCO DE DADOS ---
// IMPORTANTE: Altere 'user' e 'password' para os seus dados do MySQL!
const dbConfig = {
    host: 'localhost',
    user: 'root',       // Geralmente 'root' por padrão
    password: '36140888', // <-- COLOQUE SUA SENHA DO MYSQL AQUI
    database: 'home_service_db'
};

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API do Home Service!' });
});

// --- AQUI VAMOS ADICIONAR AS ROTAS DE LOGIN, CADASTRO, ETC. ---
// server.js

// --- ROTA PARA CADASTRO DE UM NOVO USUÁRIO ---
// app.post significa que esta rota recebe dados para criar algo novo.
// '/api/register' é o endereço que nosso front-end vai chamar.

// --- ROTA PARA CADASTRAR PROFISSIONAIS (USADA PELO FRONT) ---
app.post('/api/profissionais', async (req, res) => {
  console.log('→ [ROTA] /api/profissionais chamada com body:', req.body);

  try {
    const { nome, email, senha, descricao_perfil, telefone, cidade, servicos } = req.body;

    // Validação básica
    if (!nome || !email || !senha || !telefone || !cidade) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(senha, salt);

    const connection = await mysql.createConnection(dbConfig);

    // 1) Cria o usuário na tabela 'usuarios'
    const [usuarioResult] = await connection.execute(
      `INSERT INTO usuarios (nome_completo, email, senha_hash, tipo_usuario)
       VALUES (?, ?, ?, 'profissional')`,
      [nome, email, senha_hash]
    );

    const usuarioId = usuarioResult.insertId;

    // 2) Cria o perfil em 'perfis_profissionais' COM descrição
    await connection.execute(
      `INSERT INTO perfis_profissionais
       (usuario_id, descricao_perfil, telefone, cidade_estado, especialidades)
       VALUES (?, ?, ?, ?, ?)`,
      [usuarioId, descricao_perfil || '', telefone, cidade, servicos.join(', ')]
    );

    await connection.end();

    return res.status(201).json({
      message: 'Usuário e perfil profissional criados com sucesso!',
      usuarioId: usuarioId
    });

  } catch (err) {
    console.error('→ [ERRO /api/profissionais]', err.stack || err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }
    return res.status(500).json({ message: 'Erro interno ao criar perfil.' });
  }
});



app.post('/api/register', async (req, res) => {
    try {
        // 1. Pega os dados que o front-end enviou no corpo (body) da requisição.
        const { nome_completo, email, senha, tipo_usuario } = req.body;

        // 2. Validação simples para garantir que os campos essenciais não estão vazios.
        if (!nome_completo || !email || !senha || !tipo_usuario) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // 3. Criptografa a senha do usuário. NUNCA salve senhas em texto puro.
        const salt = await bcrypt.genSalt(10);
        const senha_hash = await bcrypt.hash(senha, salt);

        // 4. Conecta ao banco de dados.
        const connection = await mysql.createConnection(dbConfig);

        // 5. Executa o comando SQL para inserir o novo usuário na tabela.
        const sql = "INSERT INTO usuarios (nome_completo, email, senha_hash, tipo_usuario) VALUES (?, ?, ?, ?)";
        await connection.execute(sql, [nome_completo, email, senha_hash, tipo_usuario]);

        // 6. Fecha a conexão com o banco.
        await connection.end();

        // 7. Envia uma resposta de sucesso para o front-end.
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        // Se algo der errado (ex: e-mail já existe), envia uma mensagem de erro.
        console.error('Erro no cadastro:', error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário. O e-mail pode já estar em uso.' });
    }
});

// server.js

// --- ROTA PARA LOGIN DE USUÁRIO ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Conecta ao banco e procura por um usuário com o e-mail fornecido.
        const connection = await mysql.createConnection(dbConfig);
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [rows] = await connection.execute(sql, [email]);
        await connection.end();

        // 2. Se nenhum usuário for encontrado com esse e-mail, retorna um erro.
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const usuario = rows[0];

        // 3. Compara a senha enviada com a senha criptografada (hash) no banco.
        // O bcrypt faz essa comparação de forma segura.
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        // 4. Se a senha estiver incorreta, retorna um erro.
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        // 5. Se tudo estiver correto, a autenticação foi um sucesso!
        // (Futuramente, aqui vamos gerar e retornar o token JWT).
        res.status(200).json({ 
            message: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome_completo,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

// --- Inicia o Servidor ---
const PORT = 3000; // O nosso back-end vai rodar na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor back-end rodando na porta http://localhost:${PORT}`);
});