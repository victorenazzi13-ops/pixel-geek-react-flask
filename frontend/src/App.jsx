import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import TrabalheConosco from "./pages/TrabalheConosco";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

import "./App.css";

function App() {
  const [temaEscuro, setTemaEscuro] = useState(true);

  return (
    <div className={temaEscuro ? "tema-escuro" : "tema-claro"}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                temaEscuro={temaEscuro}
                setTemaEscuro={setTemaEscuro}
              />
            }
          />

          <Route path="/clientes" element={<Clientes />} />

          <Route
            path="/trabalhe-conosco"
            element={<TrabalheConosco />}
          />

          <Route path="/sobre" element={<Sobre />} />

          <Route path="/contato" element={<Contato />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;