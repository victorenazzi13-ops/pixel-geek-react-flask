import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TrabalheConosco() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [area, setArea] = useState("");
  const [candidatos, setCandidatos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [candidatoEditando, setCandidatoEditando] = useState(null);

  async function buscarCandidatos() {
    try {
      setCarregando(true);
      const resposta = await axios.get("http://127.0.0.1:5000/candidatos");
      setCandidatos(resposta.data);
    } catch (erro) {
      alert("Não foi possível carregar os candidatos.");
    } finally {
      setCarregando(false);
    }
  }

  function formatarTelefone(valor) {
    let numero = valor.replace(/\D/g, "");

    if (numero.length > 11) {
      numero = numero.slice(0, 11);
    }

    if (numero.length <= 2) {
      return numero;
    }

    if (numero.length <= 7) {
      return `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    }

    return `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
  }

  async function salvarCandidato(e) {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !telefone.trim() || !area.trim()) {
      alert("Preencha todos os campos para continuar.");
      return;
    }

    try {
      if (candidatoEditando) {
        await axios.put(
          `http://127.0.0.1:5000/candidatos/${candidatoEditando.id}`,
          {
            nome,
            email,
            telefone,
            area,
          },
        );

        alert("Candidato atualizado com sucesso!");
      } else {
        await axios.post("http://127.0.0.1:5000/candidatos", {
          nome,
          email,
          telefone,
          area,
        });

        alert("Cadastro enviado com sucesso! Em breve entraremos em contato.");
      }

      limparFormulario();
      buscarCandidatos();
    } catch (erro) {
      alert("Erro ao salvar candidato.");
    }
  }

  function editarCandidato(candidato) {
    setCandidatoEditando(candidato);
    setNome(candidato.nome);
    setEmail(candidato.email);
    setTelefone(candidato.telefone);
    setArea(candidato.area);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function excluirCandidato(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este candidato?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:5000/candidatos/${id}`);
      alert("Candidato excluído com sucesso!");

      if (candidatoEditando?.id === id) {
        limparFormulario();
      }

      buscarCandidatos();
    } catch (erro) {
      alert("Não foi possível excluir o candidato.");
    }
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setTelefone("");
    setArea("");
    setCandidatoEditando(null);
  }

  useEffect(() => {
    buscarCandidatos();
  }, []);

  const candidatosFiltrados = candidatos.filter((candidato) => {
    const textoBusca = busca.toLowerCase();

    return (
      candidato.nome.toLowerCase().includes(textoBusca) ||
      candidato.email.toLowerCase().includes(textoBusca) ||
      candidato.area.toLowerCase().includes(textoBusca)
    );
  });

  return (
    <div className="container">
      <Link to="/">
        <button className="voltar">Voltar</button>
      </Link>

      <h1>Venha Fazer Parte da Nossa Equipe</h1>

      <form onSubmit={salvarCandidato}>
        <input
          type="text"
          placeholder="Seu nome completo"
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
          placeholder="Telefone para contato"
          value={telefone}
          onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
          required
        />

        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          className="select-area"
        >
          <option value="">Selecione sua área de interesse</option>
          <option value="Animes">Animes</option>
          <option value="Atendimento ao Cliente">Atendimento ao Cliente</option>
          <option value="Desenvolvimento Web">Desenvolvimento Web</option>
          <option value="Design Gráfico">Design Gráfico</option>
          <option value="Games">Games</option>
          <option value="Gestão de Produtos">Gestão de Produtos</option>
          <option value="Logística">Logística</option>
          <option value="Marketing Digital">Marketing Digital</option>
          <option value="Redes Sociais">Redes Sociais</option>
          <option value="Tecnologia">Tecnologia</option>
        </select>

        <button type="submit">
          {candidatoEditando
            ? "Salvar Alterações"
            : "Quero Ser um Pixel Geek"}
        </button>

        {candidatoEditando && (
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
            <h2>Candidatos Pixel Geek</h2>
            <p>{candidatos.length} candidato(s) cadastrado(s)</p>
          </div>

          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou área..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-busca"
          />
        </div>

        <div className="lista">
          {carregando ? (
            <p className="mensagem-vazia">Carregando candidatos...</p>
          ) : candidatosFiltrados.length > 0 ? (
            candidatosFiltrados.map((candidato) => (
              <div className="card" key={candidato.id}>
                <h3>🚀 {candidato.nome}</h3>
                <p>{candidato.email}</p>
                <p>{candidato.telefone}</p>
                <span className="badge-area">{candidato.area}</span>

                <div className="acoes-card">
                  <button
                    type="button"
                    onClick={() => editarCandidato(candidato)}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    type="button"
                    className="botao-perigo"
                    onClick={() => excluirCandidato(candidato.id)}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mensagem-vazia">Nenhum candidato encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrabalheConosco;
