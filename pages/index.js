import Image from "next/image";
import David1 from "../src/assets/images/david-a-lagartixa-1.png";
import David2 from "../src/assets/images/david-a-lagartixa-2.png";
import David3 from "../src/assets/images/david-a-lagartixa-3.png";
import David4 from "../src/assets/images/david-a-lagartixa-4.png";
import David5 from "../src/assets/images/david-a-lagartixa-5.png";
import { useState } from "react";

let ultimaPiadaMostrada = "";

function Home() {
  const imagensDavid = [David1, David2, David3, David4, David5];
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [indiceSom, setIndiceSom] = useState(0);
  const [piadaCompleta, setPiadaCompleta] = useState("");
  const [piadaExibida, setPiadaExibida] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [piada, setPiada] = useState("");

  const gerarPiada = async () => {
    const listasDeSons = [
      "/sons/badumtss.mp3",
      "/sons/grilo.mp3",
      "/sons/risada.mp3",
    ];

    let novoIndiceSom = indiceSom;
    while (novoIndiceSom === indiceSom) {
      novoIndiceSom = Math.floor(Math.random() * listasDeSons.length);
    }
    setIndiceSom(novoIndiceSom);
    const som = new Audio(listasDeSons[novoIndiceSom]);

    // Aqui pegamos o valor selecionado do select
    const tipo = document.querySelector(".seletor-piada").value;
    //sorteira uma imagem do David diferente da atual.
    let novoIndice = indiceImagem;
    while (novoIndice === indiceImagem) {
      novoIndice = Math.floor(Math.random() * imagensDavid.length);
    }
    setIndiceImagem(novoIndice);
    try {
      let piadaNova = "";
      let tentativas = 0;
      while (
        (piadaNova === "" || piadaNova === ultimaPiadaMostrada) &&
        tentativas < 5
      ) {
        const resposta = await fetch(`/api/piadas?tipo=${tipo}`);
        const dadosDaPiada = await resposta.json();
        setPiada(dadosDaPiada.texto);
        piadaNova = dadosDaPiada.texto;
        tentativas++;
      }
      ultimaPiadaMostrada = piadaNova;
      som.play();
      setPiada(piadaNova);
    } catch (error) {
      console.error("Erro ao buscar piada na API interna:", error);
      setPiada("Ops, deu um erro ao conectar com o servidor de piadas.");
    }
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
          <option value="piadasAleatoria">Piadas Aleatorias</option>
          <option value="piadaProgramador">Piadas de Programador</option>
          <option value="piadasTio">Piadas de tio</option>
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
      <div></div>
    </div>
  );
}
export default Home;
