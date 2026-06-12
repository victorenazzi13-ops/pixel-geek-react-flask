import { Link } from "react-router-dom";

function AreaSecreta() {
  return (
    <div className="container">
      <h1>🕹️ Área Secreta Pixel Geek</h1>

      <div className="painel-listagem area-secreta-card">
        <h2>🎉 Parabéns!</h2>

        <p>Você encontrou uma área escondida da Pixel Geek.</p>

        <p>
          Como recompensa por explorar nosso site antes do lançamento oficial,
          você desbloqueou benefícios exclusivos para membros da comunidade.
        </p>

        <h3>🎁 Benefícios Exclusivos</h3>

        <ul>
          <li>10% de desconto na primeira compra</li>
          <li>Acesso antecipado aos lançamentos</li>
          <li>Participação em sorteios especiais</li>
          <li>Promoções exclusivas para Founders</li>
        </ul>

        <div className="codigo-cupom">PIXELFOUNDER10</div>

        <p>
          Guarde este código. Ele será válido quando a Pixel Geek for lançada
          oficialmente.
        </p>

        <Link to="/">
          <button className="voltar">Voltar para a Home</button>
        </Link>
      </div>
    </div>
  );
}

export default AreaSecreta;
