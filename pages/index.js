import Image from "next/image";
import David1 from "../src/assets/images/david-a-lagartixa-1.png";
import David2 from "../src/assets/images/david-a-lagartixa-2.png";
import David3 from "../src/assets/images/david-a-lagartixa-3.png";
import David4 from "../src/assets/images/david-a-lagartixa-4.png";
import David5 from "../src/assets/images/david-a-lagartixa-5.png";
//import piadas from "../src/assets/piadas.json";
import { useState } from "react";

function Home() {
  const imagensDavid = [David1, David2, David3, David4, David5];
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [piada, setPiada] = useState("");
  /*
  const gerarPiada = () => {
    const tipo = document.querySelector(".seletor-piada").value;
    const lista = piadas[tipo];
    const piadaAleatoria = lista[Math.floor(Math.random() * lista.length)];
    setPiada(piadaAleatoria);
*/
    let novoIndice = indiceImagem;
    while (novoIndice === indiceImagem) {
      novoIndice = Math.floor(Math.random() * imagensDavid.length);
    }
    setIndiceImagem(novoIndice);
  };
   

  const gerarPiada = async () => {
    // 1. Pegamos o valor selecionado no <select>
    const tipo = document.querySelector(".seletor-piada").value;
    try {
      // 2. Colocamos a variável 'tipo' na URL e garantimos o formato JSON
      const respostaDaInternet = await fetch(
        `https://v2.jokeapi.dev/joke/${tipo}/Programming,Miscellaneous,Spooky,Christmas?lang=pt&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt`,
      );
      const dadosDaPiada = await respostaDaInternet.json();
      // 3. tratamos o erro caso a API não encontre piadas naquela catergoria"
      if (dadosDaPiada.error) {
        setPiada(
          "Não encontrei piadas dessa categoria em português, tente outra categoria",
        );
        return;
      }
      if (dadosDaPiada.type == "single") {
        setPiada(dadosDaPiada.joke);
      } else {
        setPiada(`${dadosDaPiada.setup} ... ${dadosDaPiada.delivery}`);
      }
    } catch (error) {
      console.error("Erro ao buscar piada:", error);
      setPiada("Ops, deu um erro ao conectar com o servidor de piadas");
    }
  };
  
  const gerarPiada = async () => {
    // 1. Pegamos o valor selecionado no <select>
    const tipo = document.querySelector(".seletor-piada").value;
    try {
      // 2. Colocamos a variável 'tipo' na URL e garantimos o formato JSON
      const respostaDaInternet = await fetch(
        `https://v2.jokeapi.dev/joke/${tipo}/Programming,Miscellaneous,Spooky,Christmas?lang=pt&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt`,
      );
      const dadosDaPiada = await respostaDaInternet.json();
      // 3. tratamos o erro caso a API não encontre piadas naquela catergoria"
      if (dadosDaPiada.error) {
        setPiada(
          "Não encontrei piadas dessa categoria em português, tente outra categoria",
        );
        return;
      }
      if (dadosDaPiada.type == "single") {
        setPiada(dadosDaPiada.joke);
      } else {
        setPiada(`${dadosDaPiada.setup} ... ${dadosDaPiada.delivery}`);
      }
    } catch (error) {
      console.error("Erro ao buscar piada:", error);
      setPiada("Ops, deu um erro ao conectar com o servidor de piadas");
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
          <option value="Any">Piadas Aleatorias</option>
          <option value="Programming">Piadas de Programador</option>
          <option value="Miscellaneous">Piadas Diversas</option>
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
        <h2>{piada}</h2>
      </div>
    </div>
  );
}
export default Home;
