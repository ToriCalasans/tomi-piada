import Image from "next/image";
import David from "../src/assets/images/david-a-lagartixa-1.png";
import piadas from "../src/assets/piadas.json";
import { useState } from "react";

function Home() {
  const [piada, setPiada] = useState("");
  const gerarPiada = () => {
    const tipo = document.querySelector(".seletor-piada").value;
    const lista = piadas[tipo];
    const piadaAleatoria = lista[Math.floor(Math.random() * lista.length)];
    setPiada(piadaAleatoria);
  };

  return (
    <div className="container-principal">
      <div>
        <h1>Tomi Piadas</h1>
      </div>
      <div>
        <Image src={David} alt="David a lagartixa" title="David" />
      </div>
      <div>
        <select name="selectTipoPiada" className="seletor-piada">
          <option value="piadasTio">Piadas de Tio</option>
          <option value="piadasAleatoria">Piadas Aleatorias</option>
          <option value="piadaProgramador">Piadas de Programador</option>
        </select>
      </div>
      <div>
        <button
          name="buttonPiada"
          className="botao-procurar"
          onClick={gerarPiada}
        >
          Procurar piada
        </button>
      </div>
      <div>
        <h1>{piada}</h1>
      </div>
    </div>
  );
}
export default Home;
