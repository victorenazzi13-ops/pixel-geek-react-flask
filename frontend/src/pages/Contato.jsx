import { Link } from "react-router-dom";

function Contato() {
  return (
    <div className="container">
      <Link to="/">
        <button className="voltar">Voltar</button>
      </Link>

      <h1>Contato</h1>

      <div className="info-card">
        <h2>Fale com a Pixel Geek</h2>

        <p>
          Quer saber mais sobre o lançamento da Pixel Geek? Entre em contato com a nossa equipe.
        </p>

        <p>
          <strong>E-mail:</strong> contato@pixelgeek.com
        </p>

        <p>
          <strong>Instagram:</strong> @pixelgeek.store
        </p>

        <p>
          <strong>Telefone:</strong> (82) 99999-9999
        </p>

        <p>
          <strong>Endereço:</strong> Rua dos Consoles, 404 - Maceió/AL
        </p>
      </div>
    </div>
  );
}

export default Contato;