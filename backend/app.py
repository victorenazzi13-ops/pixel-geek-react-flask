from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

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
            email TEXT UNIQUE NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS candidatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            telefone TEXT NOT NULL,
            area TEXT NOT NULL
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

    if not nome or not email:
        return jsonify({
            "erro": "Nome e email são obrigatórios."
        }), 400

    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()

        cursor.execute("""
            INSERT INTO clientes (nome, email)
            VALUES (?, ?)
        """, (nome, email))

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

    cursor.execute("SELECT id, nome, email FROM clientes")
    clientes = cursor.fetchall()

    conexao.close()

    lista_clientes = []

    for cliente in clientes:
        lista_clientes.append({
            "id": cliente[0],
            "nome": cliente[1],
            "email": cliente[2]
        })

    return jsonify(lista_clientes)


@app.route("/clientes/<int:id>", methods=["PUT"])
def editar_cliente(id):
    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")

    if not nome or not email:
        return jsonify({
            "erro": "Nome e email são obrigatórios."
        }), 400

    try:
        conexao = conectar_banco()
        cursor = conexao.cursor()

        cursor.execute("""
            UPDATE clientes
            SET nome = ?, email = ?
            WHERE id = ?
        """, (nome, email, id))

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

    cursor.execute("""
        INSERT INTO candidatos (nome, email, telefone, area)
        VALUES (?, ?, ?, ?)
    """, (nome, email, telefone, area))

    conexao.commit()
    conexao.close()

    return jsonify({
        "mensagem": "Candidato cadastrado com sucesso!"
    }), 201


@app.route("/candidatos", methods=["GET"])
def listar_candidatos():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute("SELECT id, nome, email, telefone, area FROM candidatos")
    candidatos = cursor.fetchall()

    conexao.close()

    lista_candidatos = []

    for candidato in candidatos:
        lista_candidatos.append({
            "id": candidato[0],
            "nome": candidato[1],
            "email": candidato[2],
            "telefone": candidato[3],
            "area": candidato[4]
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