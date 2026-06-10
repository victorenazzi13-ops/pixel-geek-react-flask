# 🎮 Pixel Geek

A Pixel Geek é uma loja virtual fictícia desenvolvida para conectar fãs da cultura geek a produtos inspirados em games, animes, filmes, séries e tecnologia.

O sistema permite que usuários entrem em uma lista de espera para o lançamento da loja e também se candidatem para futuras vagas na equipe.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React
- React Router DOM
- Axios
- CSS3

### Backend
- Python
- Flask
- Flask-CORS

### Banco de Dados
- SQLite

---

## ✨ Funcionalidades

### Lista de Espera
- Cadastro de usuários
- Validação de campos
- Máscara de CPF
- Busca por nome e e-mail
- Edição de cadastro
- Exclusão de cadastro
- Confirmação antes de excluir

### Trabalhe Conosco
- Cadastro de candidatos
- Máscara de telefone
- Seleção de área de interesse
- Busca por nome, e-mail e área
- Edição de candidato
- Exclusão de candidato
- Confirmação antes de excluir

### Dashboard
- Total de pessoas na lista de espera
- Total de candidatos cadastrados
- Área mais procurada pelos candidatos

### Interface
- Tema Claro e Escuro
- Layout responsivo
- Componentização React
- Identidade visual personalizada Pixel Geek
- Animações e efeitos visuais

### Banco de Dados
- Persistência de dados com SQLite
- Registro automático de data e hora de cadastro

---

## 📂 Estrutura do Projeto

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

## ▶️ Como Executar

### Backend

Instalar dependências:

```bash
pip install -r requirements.txt
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

### Frontend

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

## 🗄️ Banco de Dados

O projeto utiliza SQLite para armazenar:

### Clientes

- Nome
- E-mail
- CPF
- Data de cadastro

### Candidatos

- Nome
- E-mail
- Telefone
- Área de interesse
- Data de cadastro

---

## 👥 Integrantes

- Denisson Victor
- João Pedro
- Iderval Neto
- Reginaldo Neto

---

## 📚 Projeto Acadêmico

Projeto desenvolvido para a disciplina de Desenvolvimento Web, utilizando React, Flask e SQLite para demonstrar conceitos de frontend, backend e integração com banco de dados.