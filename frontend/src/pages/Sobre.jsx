import { Link } from "react-router-dom";

function Sobre() {
  return (
    <div className="container">
      <Link to="/">
        <button className="voltar">Voltar</button>
      </Link>

      <h1>Sobre a Pixel Geek</h1>

      <div className="info-card">
        <h2>Quem somos</h2>

        <p>
          A Pixel Geek é uma loja geek em fase de pré-lançamento, criada para fãs de games, animes, filmes, séries, tecnologia e cultura pop. O sistema permite cadastrar pessoas interessadas em receber novidades e candidatos que desejam fazer parte da equipe.
        </p>

        <h2>Missão</h2>

        <p>
          Conectar pessoas apaixonadas pela cultura geek a produtos que
          representem seus gostos, hobbies e estilo de vida.
        </p>

        <h2>Visão</h2>

        <p>
          Ser reconhecida como uma loja moderna, divertida e acessível para a
          comunidade geek.
        </p>

        <h2>Valores</h2>

        <p>
          Criatividade, inovação, respeito à comunidade, qualidade nos produtos
          e paixão pelo universo geek.
        </p>
      </div>
    </div>
  );
}

export default Sobre;