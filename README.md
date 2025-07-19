<p align="center">
  <img src="home-service.png" alt="Home Service Logo" width="3000">
</p>

Link do site: https://valentelucass.github.io/home-service/

---


# 🏠 **Home Service** - Plataforma de Conexão de Serviços

## 📝 **Descrição**

**Home Service** é uma plataforma **full-stack** projetada para conectar clientes a profissionais de serviços locais de forma **direta, rápida e justa**. A aplicação funciona como uma **vitrine digital**, onde prestadores de serviços podem criar perfis, exibir seus portfólios e definir suas áreas de atendimento, enquanto clientes podem buscar, avaliar e contatar esses profissionais diretamente, sem intermediários ou taxas por serviço.

O objetivo do projeto é **empoderar profissionais autônomos**, oferecendo uma ferramenta para aumentar sua visibilidade e base de clientes, e ao mesmo tempo, fornecer aos usuários uma maneira **segura** e **transparente** de encontrar serviços de qualidade em sua região.

## ✨ **Funcionalidades Principais**

- **Busca Inteligente**: Encontre profissionais por **categoria** e **proximidade**.
- **Perfis Detalhados**: Visualize informações, portfólio de fotos e **avaliações** de outros clientes.
- **Contato Direto**: Fale com o profissional diretamente por **WhatsApp** ou **telefone**, sem intermediários.
- **Painel do Profissional**: Área de gerenciamento para editar suas informações, gerenciar o portfólio e acompanhar **estatísticas** de visualização e contato.
- **Design Responsivo**: Experiência otimizada para **desktops** e **dispositivos móveis**.

## 🚀 **Tecnologias Utilizadas**

Este projeto foi construído utilizando um conjunto de **tecnologias modernas** e robustas para proporcionar uma experiência incrível tanto no frontend quanto no backend.

### **Frontend**

| Tecnologia       | Descrição                                                                 |
| ---------------- | ------------------------------------------------------------------------- |
| HTML5            | Linguagem de marcação para a estrutura semântica das páginas.             |
| CSS3             | Estilização, layout e responsividade da aplicação.                        |
| JavaScript (ES6+) | Linguagem de programação para interatividade e manipulação do DOM.       |

### **Backend**

| Tecnologia   | Descrição                                                      |
| ------------ | -------------------------------------------------------------- |
| Node.js      | Ambiente de execução para código JavaScript no servidor.       |
| Express.js   | Framework web para Node.js, construindo a API RESTful e rotas.|
| Sequelize    | ORM para facilitar a interação com o banco de dados SQL.       |

### **Banco de Dados**

| Tecnologia       | Descrição                                                |
| ---------------- | -------------------------------------------------------- |
| PostgreSQL/MySQL | Banco de dados relacional para armazenar dados da aplicação.|

### **Desenvolvimento e Testes**

| Tecnologia | Descrição                                                            |
| ---------- | -------------------------------------------------------------------- |
| Nodemon    | Ferramenta que reinicia automaticamente o servidor durante o desenvolvimento. |
| Postman    | Plataforma para testar e documentar as rotas da API.                |

## ⚙️ **Instalação e Uso**

Para rodar este projeto localmente, siga os passos abaixo.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- Gerenciador de pacotes como [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Banco de dados SQL (PostgreSQL ou MySQL) instalado e em execução.

### **Passo a Passo**

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/home-service.git
   cd home-service
   ````

2. **Instale as dependências do backend**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:

   Renomeie o arquivo `.env.example` para `.env` e preencha com as informações do seu banco de dados, chaves secretas (JWT), etc.

   ```env
   DATABASE_URL=seu_banco_de_dados_url
   APP_SECRET=sua_chave_secreta_jwt
   APP_URL=http://localhost:3001
   ```

4. **Execute as migrações do banco de dados**:

   ```bash
   npx sequelize db:migrate
   ```

5. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

   O backend estará rodando em `http://localhost:3001`.

6. **Abra o Frontend**:

   Não há necessidade de build para o frontend. Abra o arquivo `index.html` diretamente no navegador. A comunicação com o backend já estará configurada.

## 🤝 **Contribuições**

Este projeto foi desenvolvido com dedicação e atenção aos detalhes. Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto.
2. Crie uma nova Branch (`git checkout -b feature/sua-feature-incrivel`).
3. Faça o Commit de suas alterações (`git commit -m 'Adiciona sua-feature-incrivel'`).
4. Faça o Push para a Branch (`git push origin feature/sua-feature-incrivel`).
5. Abra um Pull Request.


**Descrição:** Plataforma full-stack que conecta clientes a profissionais de serviços locais de forma direta, rápida e justa.
**Tecnologias:** Node.js, Express.js, Sequelize, MySQL/PostgreSQL, HTML5, CSS3, JavaScript
**Demo:** https://valentelucass.github.io/home-service/
**Destaque:** Empodera profissionais autônomos, eliminando intermediários e taxas, e oferece busca inteligente por categoria e proximidade.
**Imagem:** home-service.png

---

**Desenvolvido com ❤️ por Lucas Andrade!**

<!-- PORTFOLIO-FEATURED -->
