import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Clientes() {
  const [nome, setNome] = useState("");
  const [clientes, setClientes] = useState([]);
  const [email, setEmail] = useState("");
  const [busca, setBusca] = useState("");
  const [clienteEditando, setClienteEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function buscarClientes() {
    try {
      setCarregando(true);

      const resposta = await axios.get("http://127.0.0.1:5000/clientes");
      setClientes(resposta.data);
    } catch (erro) {
      alert(
        "Não foi possível carregar os cadastros. Verifique se o backend está rodando.",
      );
    } finally {
      setCarregando(false);
    }
  }

  async function salvarCliente(e) {
    e.preventDefault();

    if (!nome.trim() || !email.trim()) {
      alert("Preencha nome e e-mail para continuar.");
      return;
    }

    try {
      if (clienteEditando) {
        await axios.put(
          `http://127.0.0.1:5000/clientes/${clienteEditando.id}`,
          {
            nome,
            email,
          },
        );

        alert("Cadastro atualizado com sucesso!");
      } else {
        await axios.post("http://127.0.0.1:5000/clientes", {
          nome,
          email,
        });

        alert(
          "Cadastro realizado com sucesso! Bem-vindo à comunidade Pixel Geek.",
        );
      }

      limparFormulario();
      buscarClientes();
    } catch (erro) {
      alert(
        "Não foi possível salvar. Verifique se esse e-mail já está cadastrado.",
      );
    }
  }

  function editarCliente(cliente) {
    setClienteEditando(cliente);
    setNome(cliente.nome);
    setEmail(cliente.email);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function excluirCliente(id) {
    const confirmar = window.confirm("Deseja realmente excluir este usuário?");

    if (!confirmar) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:5000/clientes/${id}`);
      alert("Usuário excluído com sucesso!");

      if (clienteEditando?.id === id) {
        limparFormulario();
      }

      buscarClientes();
    } catch (erro) {
      alert("Não foi possível excluir o usuário.");
    }
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setClienteEditando(null);
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const textoBusca = busca.toLowerCase();

    return (
      cliente.nome.toLowerCase().includes(textoBusca) ||
      cliente.email.toLowerCase().includes(textoBusca)
    );
  });

  return (
    <div className="container">
      <Link to="/">
        <button className="voltar">Voltar</button>
      </Link>

      <h1>Lista de Espera Pixel Geek</h1>

      <form onSubmit={salvarCliente}>
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {clienteEditando
            ? "Salvar Alterações"
            : "Quero ser Avisado no Lançamento"}
        </button>

        {clienteEditando && (
          <button
            type="button"
            className="botao-secundario"
            onClick={limparFormulario}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <div className="painel-listagem">
        <div className="painel-topo">
          <div>
            <h2>Lista de Espera</h2>
            <p>{clientes.length} pessoa(s) aguardando o lançamento</p>
          </div>

          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-busca"
          />
        </div>

        <div className="lista">
          {carregando ? (
            <p className="mensagem-vazia">Carregando cadastros...</p>
          ) : clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (
              <div className="card" key={cliente.id}>
                <h3>👾 {cliente.nome}</h3>
                <p>{cliente.email}</p>

                <div className="acoes-card">
                  <button type="button" onClick={() => editarCliente(cliente)}>
                    ✏️ Editar
                  </button>

                  <button
                    type="button"
                    className="botao-perigo"
                    onClick={() => excluirCliente(cliente.id)}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mensagem-vazia">Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Clientes;
