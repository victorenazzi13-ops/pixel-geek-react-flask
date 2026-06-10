import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ temaEscuro, setTemaEscuro }) {
  return (
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
  );
}

export default Navbar;