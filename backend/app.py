from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)


def conectar_banco():
    return sqlite3.connect("database.db")


def criar_tabelas():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            cpf TEXT NOT NULL,
            data_cadastro TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS candidatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            telefone TEXT NOT NULL,
            area TEXT NOT NULL,
            data_cadastro TEXT NOT NULL
        )
    """)

    conexao.commit()
    conexao.close()


criar_tabelas()


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "mensagem": "API da Pixel Geek funcionando!"
    })


@app.route("/clientes", methods=["POST"])
def cadastrar_cliente():
    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")
    cpf = dados.get("cpf")

    if not nome or not email or not cpf:
        return jsonify({
            "erro": "Nome, email e CPF são obrigatórios."
        }), 400

    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()

        data_cadastro = datetime.now().strftime("%d/%m/%Y %H:%M")

        cursor.execute("""
            INSERT INTO clientes (nome, email, cpf, data_cadastro)
            VALUES (?, ?, ?, ?)
        """, (nome, email, cpf, data_cadastro))

        conexao.commit()
        conexao.close()

        return jsonify({
            "mensagem": "Cliente cadastrado com sucesso!"
        }), 201

    except sqlite3.IntegrityError:
        return jsonify({
            "erro": "Este email já está cadastrado."
        }), 400


@app.route("/clientes", methods=["GET"])
def listar_clientes():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute("SELECT id, nome, email, cpf, data_cadastro FROM clientes")
    clientes = cursor.fetchall()

    conexao.close()

    lista_clientes = []

    for cliente in clientes:
        lista_clientes.append({
            "id": cliente[0],
            "nome": cliente[1],
            "email": cliente[2],
            "cpf": cliente[3],
            "data_cadastro": cliente[4]
        })

    return jsonify(lista_clientes)


@app.route("/clientes/<int:id>", methods=["PUT"])
def editar_cliente(id):
    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")
    cpf = dados.get("cpf")

    if not nome or not email or not cpf:
        return jsonify({
            "erro": "Nome, email e CPF são obrigatórios."
        }), 400

    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()

        cursor.execute("""
            UPDATE clientes
            SET nome = ?, email = ?, cpf = ?
            WHERE id = ?
        """, (nome, email, cpf, id))

        conexao.commit()

        if cursor.rowcount == 0:
            conexao.close()
            return jsonify({
                "erro": "Cliente não encontrado."
            }), 404

        conexao.close()

        return jsonify({
            "mensagem": "Cliente atualizado com sucesso!"
        })

    except sqlite3.IntegrityError:
        return jsonify({
            "erro": "Este email já está cadastrado."
        }), 400


@app.route("/clientes/<int:id>", methods=["DELETE"])
def excluir_cliente(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute("DELETE FROM clientes WHERE id = ?", (id,))

    conexao.commit()

    if cursor.rowcount == 0:
        conexao.close()
        return jsonify({
            "erro": "Cliente não encontrado."
        }), 404

    conexao.close()

    return jsonify({
        "mensagem": "Cliente excluído com sucesso!"
    })


@app.route("/candidatos", methods=["POST"])
def cadastrar_candidato():
    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")
    telefone = dados.get("telefone")
    area = dados.get("area")

    if not nome or not email or not telefone or not area:
        return jsonify({
            "erro": "Todos os campos são obrigatórios."
        }), 400

    conexao = conectar_banco()
    cursor = conexao.cursor()

    data_cadastro = datetime.now().strftime("%d/%m/%Y %H:%M")

    cursor.execute("""
        INSERT INTO candidatos (nome, email, telefone, area, data_cadastro)
        VALUES (?, ?, ?, ?, ?)
    """, (nome, email, telefone, area, data_cadastro))

    conexao.commit()
    conexao.close()

    return jsonify({
        "mensagem": "Candidato cadastrado com sucesso!"
    }), 201


@app.route("/candidatos", methods=["GET"])
def listar_candidatos():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute("SELECT id, nome, email, telefone, area, data_cadastro FROM candidatos")
    candidatos = cursor.fetchall()

    conexao.close()

    lista_candidatos = []

    for candidato in candidatos:
        lista_candidatos.append({
            "id": candidato[0],
            "nome": candidato[1],
            "email": candidato[2],
            "telefone": candidato[3],
            "area": candidato[4],
            "data_cadastro": candidato[5]
        })

    return jsonify(lista_candidatos)


@app.route("/candidatos/<int:id>", methods=["PUT"])
def editar_candidato(id):
    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")
    telefone = dados.get("telefone")
    area = dados.get("area")

    if not nome or not email or not telefone or not area:
        return jsonify({
            "erro": "Todos os campos são obrigatórios."
        }), 400

    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute("""
        UPDATE candidatos
        SET nome = ?, email = ?, telefone = ?, area = ?
        WHERE id = ?
    """, (nome, email, telefone, area, id))

    conexao.commit()

    if cursor.rowcount == 0:
        conexao.close()
        return jsonify({
            "erro": "Candidato não encontrado."
        }), 404

    conexao.close()

    return jsonify({
        "mensagem": "Candidato atualizado com sucesso!"
    })


@app.route("/candidatos/<int:id>", methods=["DELETE"])
def excluir_candidato(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute("DELETE FROM candidatos WHERE id = ?", (id,))

    conexao.commit()

    if cursor.rowcount == 0:
        conexao.close()
        return jsonify({
            "erro": "Candidato não encontrado."
        }), 404

    conexao.close()

    return jsonify({
        "mensagem": "Candidato excluído com sucesso!"
    })


if __name__ == "__main__":
    app.run(debug=True)