import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import empresaImg from "../assets/empresa.png";
import logo from "../assets/logo.png";

function Home({ temaEscuro, setTemaEscuro }) {
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalCandidatos, setTotalCandidatos] = useState(0);
  const [areaMaisProcurada, setAreaMaisProcurada] = useState("Nenhuma ainda");

  useEffect(() => {
    async function carregarDados() {
      try {
        const respostaClientes = await axios.get(
          "http://127.0.0.1:5000/clientes",
        );
        const respostaCandidatos = await axios.get(
          "http://127.0.0.1:5000/candidatos",
        );

        setTotalClientes(respostaClientes.data.length);
        setTotalCandidatos(respostaCandidatos.data.length);

        const contagemAreas = {};

        respostaCandidatos.data.forEach((candidato) => {
          contagemAreas[candidato.area] =
            (contagemAreas[candidato.area] || 0) + 1;
        });

        const areaPrincipal = Object.entries(contagemAreas).sort(
          (a, b) => b[1] - a[1],
        )[0];

        if (areaPrincipal) {
          setAreaMaisProcurada(areaPrincipal[0]);
        }
      } catch (erro) {
        console.log("Erro ao carregar dados do dashboard.");
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Pixel Geek" className="logo-img" />
          <span>Pixel Geek</span>
        </div>

        <div className="menu">
          <Link to="/clientes">
            <button>Entrar na Lista de Espera</button>
          </Link>

          <Link to="/trabalhe-conosco">
            <button>Seja da Equipe</button>
          </Link>

          <Link to="/sobre">
            <button>Sobre</button>
          </Link>

          <Link to="/contato">
            <button>Contato</button>
          </Link>

          <button
            className="botao-tema"
            onClick={() => setTemaEscuro(!temaEscuro)}
          >
            {temaEscuro ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <h1>A nova loja geek está prestes a entrar no jogo</h1>

          <p>
            A Pixel Geek está chegando com produtos inspirados em games, animes,
            filmes, séries, tecnologia e cultura pop. Cadastre-se para receber
            novidades e garantir acesso antecipado ao seu mais novo mundo Geek.
          </p>

          <div className="dashboard-home">
            <div className="dashboard-card">
              <span>👾</span>
              <strong>{totalClientes}</strong>
              <p>na lista de espera</p>
            </div>

            <div className="dashboard-card">
              <span>🚀</span>
              <strong>{totalCandidatos}</strong>
              <p>candidatos cadastrados</p>
            </div>

            <div className="dashboard-card">
              <span>🎮</span>
              <strong>{areaMaisProcurada}</strong>
              <p>área mais procurada</p>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <img src={empresaImg} alt="Produtos geek" className="hero-imagem" />

          <h2>Sobre a Pixel Geek</h2>

          <p>
            A Pixel Geek conecta fãs da cultura geek aos melhores produtos do
            universo gamer, dos animes, dos filmes e da tecnologia, com uma
            experiência moderna e divertida.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
