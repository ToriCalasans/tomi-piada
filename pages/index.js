import Image from "next/image";
import David from "../src/assets/images/david-a-lagartixa-1.png";
//import piadas from "../src/assets/piadas.json";
import { useState } from "react";

function Home() {
  const [piada, setPiada] = useState("");
  /*
  const gerarPiada = () => {
    const tipo = document.querySelector(".seletor-piada").value;
    const lista = piadas[tipo];
    const piadaAleatoria = lista[Math.floor(Math.random() * lista.length)];
    setPiada(piadaAleatoria);
  };
  */
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
        <h1>Tomi Piadas</h1>
      </div>
      <div>
        <Image src={David} alt="David a lagartixa" title="David" />
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
