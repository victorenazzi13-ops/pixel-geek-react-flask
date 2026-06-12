import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Clientes() {
  const [nome, setNome] = useState("");
  const [clientes, setClientes] = useState([]);
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [busca, setBusca] = useState("");
  const [clienteEditando, setClienteEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);

  function ocultarEmail(emailCompleto) {
    if (!emailCompleto || !emailCompleto.includes("@")) {
      return emailCompleto;
    }

    const [usuario, dominio] = emailCompleto.split("@");

    if (usuario.length <= 2) {
      return `${usuario[0]}***@${dominio}`;
    }

    return `${usuario.slice(0, 3)}***@${dominio}`;
  }

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

  function ocultarCpf(cpfCompleto) {
  if (!cpfCompleto) {
    return "";
  }

  const somenteNumeros = cpfCompleto.replace(/\D/g, "");

  if (somenteNumeros.length !== 11) {
    return cpfCompleto;
  }

  return `${somenteNumeros.slice(0, 3)}.***.***-${somenteNumeros.slice(9, 11)}`;
}

  async function salvarCliente(e) {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !cpf.trim()) {
      alert("Preencha nome, CPF e e-mail para continuar.");
      return;
    }

    try {
      if (clienteEditando) {
        await axios.put(
          `http://127.0.0.1:5000/clientes/${clienteEditando.id}`,
          {
            nome,
            email,
            cpf,
          },
        );

        alert(`Cadastro de ${nome} atualizado com sucesso!`);
      } else {
        await axios.post("http://127.0.0.1:5000/clientes", {
          nome,
          email,
          cpf,
        });

        alert(`Bem-vindo à lista de espera da Pixel Geek, ${nome}!`);
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
    setCpf(cliente.cpf);
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
    setCpf("");
    setClienteEditando(null);
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const textoBusca = busca.toLowerCase();

    return (
      cliente.nome.toLowerCase().includes(textoBusca) ||
      cliente.email.toLowerCase().includes(textoBusca) ||
      cliente.cpf.includes(textoBusca)
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

        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          maxLength={14}
          onChange={(e) => {
            let valor = e.target.value.replace(/\D/g, "");

            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

            setCpf(valor);
          }}
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
            <p className="resultado-busca">
              {clientesFiltrados.length} resultado(s) encontrado(s)
            </p>
          </div>

          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou CPF..."
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
                <p>{ocultarEmail(cliente.email)}</p>
                <p>CPF: {ocultarCpf(cliente.cpf)}</p>

                <p className="data-cadastro">📅 {cliente.data_cadastro}</p>

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
            <p className="mensagem-vazia">
              👾 Nenhuma pessoa encontrada na lista de espera.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Clientes;