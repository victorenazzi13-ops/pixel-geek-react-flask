# 🎮 Pixel Geek

A **Pixel Geek** é uma aplicação web desenvolvida como projeto para o Jovem Tech com o objetivo de modernizar um sistema previamente fornecido pela disciplina, aplicando conceitos de desenvolvimento Full Stack através da integração entre Front-End, Back-End e Banco de Dados.

O sistema simula o lançamento de uma loja geek fictícia voltada para fãs de games, animes, filmes, séries e tecnologia, permitindo que usuários entrem em uma lista de espera para o lançamento da loja e também se candidatem para futuras oportunidades de trabalho.

---

# 🚀 Tecnologias Utilizadas

## Front-End

* React
* React Router DOM
* Axios
* CSS3

## Back-End

* Python
* Flask
* Flask-CORS

## Banco de Dados

* SQLite

## Ferramentas

* Visual Studio Code
* Git
* GitHub
* DB Browser for SQLite
* Figma

---

# 🎯 Objetivo do Projeto

O principal objetivo do projeto foi transformar uma aplicação básica em uma solução Full Stack completa, conectando interface, regras de negócio e persistência de dados através da integração entre React, Flask e SQLite.

Além disso, foram implementadas melhorias visuais e funcionais para tornar o sistema mais moderno, intuitivo e alinhado ao público-alvo da Pixel Geek.

---

# 👾 Público-Alvo

A Pixel Geek foi desenvolvida para:

* Fãs de games
* Fãs de animes
* Consumidores de produtos geek
* Entusiastas de tecnologia
* Interessados em futuras vagas da empresa

---

# ✨ Funcionalidades

## 🎟️ Lista de Espera

* Cadastro de usuários
* Validação de campos obrigatórios
* Máscara de CPF durante o cadastro
* Busca em tempo real
* Busca por nome, e-mail e CPF
* Edição de cadastro
* Exclusão de cadastro
* Confirmação antes da exclusão
* Cancelamento de edição
* Exibição da data de cadastro
* Ocultação parcial de CPF
* Ocultação parcial de e-mail

---

## 💼 Trabalhe Conosco

* Cadastro de candidatos
* Máscara de telefone
* Seleção de área de interesse
* Busca em tempo real
* Busca por nome, e-mail e área
* Contador de resultados encontrados
* Edição de candidatos
* Exclusão de candidatos
* Confirmação antes da exclusão
* Cancelamento de edição
* Exibição da data de cadastro
* Ocultação parcial de telefone
* Ocultação parcial de e-mail
* Badge visual para áreas de interesse
* Emojis dinâmicos nos perfis

---

## 📊 Dashboard Inteligente

* Total de clientes cadastrados
* Total de candidatos cadastrados
* Área mais procurada
* Atualização automática das estatísticas

---

## 🎨 Interface e Experiência do Usuário

* Tema Claro e Escuro
* Layout responsivo
* Componentização React
* Navbar reutilizável
* Identidade visual própria
* Logotipo personalizado
* Mensagens de erro mais claras
* Feedback personalizado ao usuário
* Scroll automático ao editar registros
* Rodapé institucional
* Animações e efeitos visuais

---

## 🎁 Funcionalidades Extras

### Dashboard de Estatísticas

O sistema apresenta um painel inicial contendo:

* Quantidade total de clientes
* Quantidade total de candidatos
* Área mais procurada pelos candidatos

---

### Registro Automático de Data e Hora

Todos os registros recebem automaticamente:

* Data de cadastro
* Hora de cadastro

Sem necessidade de preenchimento manual.

---

### Ocultação de Dados Sensíveis

Para aumentar a privacidade dos usuários:

* CPF é parcialmente ocultado
* Telefone é parcialmente ocultado
* E-mail é parcialmente ocultado

---

### Área Secreta Pixel Geek

Foi implementado um Easter Egg acessível através do rodapé da aplicação.

Ao encontrar a área secreta, o usuário recebe:

* Benefícios exclusivos
* Cupom promocional fictício
* Conteúdo especial da comunidade Pixel Geek

---

# 🗄️ Banco de Dados

O sistema utiliza SQLite para persistência dos dados.

## Tabela Clientes

| Campo         | Tipo    |
| ------------- | ------- |
| id            | INTEGER |
| nome          | TEXT    |
| email         | TEXT    |
| cpf           | TEXT    |
| data_cadastro | TEXT    |

---

## Tabela Candidatos

| Campo         | Tipo    |
| ------------- | ------- |
| id            | INTEGER |
| nome          | TEXT    |
| email         | TEXT    |
| telefone      | TEXT    |
| area          | TEXT    |
| data_cadastro | TEXT    |

---

# 📂 Estrutura do Projeto

```text
Pixel Geek
│
├── backend
│   ├── app.py
│   ├── database.db
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md
```

---

# ▶️ Como Executar

## Backend

Instalar dependências:

```bash
pip install flask flask-cors
```

Executar servidor:

```bash
python app.py
```

Servidor disponível em:

```text
http://127.0.0.1:5000
```

---

## Frontend

Instalar dependências:

```bash
npm install
```

Executar projeto:

```bash
npm run dev
```

Frontend disponível em:

```text
http://localhost:5173
```

---

# 📈 Melhorias Implementadas

Durante o desenvolvimento foram implementadas melhorias relacionadas a:

* Interface visual
* Experiência do usuário
* Organização dos componentes React
* Organização das rotas
* Responsividade
* Integração Front-End e Back-End
* Persistência de dados
* Segurança visual dos dados
* Funcionalidades adicionais próprias

---

# 👥 Integrantes

* Denisson Victor
* João Pedro
* Iderval Neto
* Reginaldo Neto

---

# 📚 Projeto Acadêmico

Projeto desenvolvido para o curso Jovem Tech com o objetivo de aplicar conceitos de Front-End, Back-End e Banco de Dados através da construção de uma aplicação Full Stack moderna.

A Pixel Geek demonstra a integração entre React, Flask e SQLite, utilizando boas práticas de desenvolvimento, organização de código, persistência de dados e experiência do usuário.

# ❌ Erros Percebidos

Ao efetuar o cadastrado com email repetido, o sistema travou para novos cadastros.
A Área Secreta não está funcionando no modo claro. 
