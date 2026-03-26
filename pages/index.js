import Image from "next/image";
import David1 from "../src/assets/images/david-a-lagartixa-1.png";
import David2 from "../src/assets/images/david-a-lagartixa-2.png";
import David3 from "../src/assets/images/david-a-lagartixa-3.png";
import David4 from "../src/assets/images/david-a-lagartixa-4.png";
import David5 from "../src/assets/images/david-a-lagartixa-5.png";
import piadas from "../src/assets/piadas.json";
import { useState } from "react";

function Home() {
  const imagensDavid = [David1, David2, David3, David4, David5];
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [piada, setPiada] = useState("");
  const gerarPiada = () => {
    const tipo = document.querySelector(".seletor-piada").value;
    const lista = piadas[tipo];
    const piadaAleatoria = lista[Math.floor(Math.random() * lista.length)];
    setPiada(piadaAleatoria);

    let novoIndice = indiceImagem;
    while (novoIndice === indiceImagem) {
      novoIndice = Math.floor(Math.random() * imagensDavid.length);
    }
    setIndiceImagem(novoIndice);
  };

  return (
    <div className="container-principal">
      <div>
        <h1 className="titulo-principal">Tomi Piadas</h1>
      </div>
      <div className="principal-wrap">
        <div className="avatar-container">
          <div className="circulo-fundo"></div>
          <Image
            src={imagensDavid[indiceImagem]}
            alt="David a lagartixa"
            title="David"
            className="imagem-mascote"
          />
        </div>
          <div className="piada-container">
            <p className="texto-piada">{piada}</p>
        </div>
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
    </div>
  );
}
export default Home;
