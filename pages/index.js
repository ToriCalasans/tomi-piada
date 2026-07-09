import Image from "next/image";
import David1 from "../src/assets/images/david-a-lagartixa-1.png";
import David2 from "../src/assets/images/david-a-lagartixa-2.png";
import David3 from "../src/assets/images/david-a-lagartixa-3.png";
import David4 from "../src/assets/images/david-a-lagartixa-4.png";
import David5 from "../src/assets/images/david-a-lagartixa-5.png";
import { useState, useEffect } from "react";
let ultimaPiadaMostrada = "";

function Home() {
  const imagensDavid = [David1, David2, David3, David4, David5];
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [indiceSom, setIndiceSom] = useState(0);
  const [piadaCompleta, setPiadaCompleta] = useState("");
  const [piadaExibida, setPiadaExibida] = useState(
    "Escolha uma categoria e clique em Procurar piada para começar!",
  );
  const [copiado, setCopiado] = useState(false);
  const [piada, setPiada] = useState("");

  useEffect(() => {
    // Se não houver piada completa, não faz nada
    if (!piadaCompleta) return;

    setPiadaExibida(""); // Garante o reset do balão
    let idDoTimer;

    const digitarLetra = () => {
      setPiadaExibida((textoAteAgora) => {
        // O tamanho atual do texto na tela nos diz exatamente qual é a próxima letra!
        const proximoIndice = textoAteAgora.length;

        // Se já digitou tudo, interrompe a corrente
        if (proximoIndice >= piadaCompleta.length) {
          return textoAteAgora;
        }

        // Adiciona a próxima letra de forma cirúrgica
        const proximoTexto =
          textoAteAgora + piadaCompleta.charAt(proximoIndice);

        // Agenda a próxima letra apenas se ainda houver texto para digitar
        if (proximoTexto.length < piadaCompleta.length) {
          idDoTimer = setTimeout(digitarLetra, 30);
        }

        return proximoTexto;
      });
    };

    // Dá uma micro pausa de 50ms antes de começar para o React estabilizar o estado
    idDoTimer = setTimeout(digitarLetra, 50);

    // Limpeza total de memória para evitar clones de cronômetros
    return () => clearTimeout(idDoTimer);
  }, [piadaCompleta]);

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
        piadaNova = dadosDaPiada.texto;
        tentativas++;
      }
      ultimaPiadaMostrada = piadaNova;
      som.play();
      setPiadaCompleta(piadaNova);
      setPiada(piadaNova);
    } catch (error) {
      console.error("Erro ao buscar piada na API interna:", error);
      setPiada("Ops, deu um erro ao conectar com o servidor de piadas.");
    }
  };
  const copiarPiada = () => {
    navigator.clipboard.writeText(piada);
    setCopiado(true);
    setTimeout(() => {
      setCopiado(false);
    }, 2000);
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

        <div className="coluna-conteudo-direita">
          <div className="piada-container">
            <p className="texto-piada">{piadaExibida}</p>
            <button
              onClick={copiarPiada}
              className={`botao-copiar-bola ${copiado ? "copiado-ativo" : ""}`}
              title="Copiar Piada"
            >
              {copiado ? "✓" : "📋"}
            </button>
          </div>

          <div className="controles-container">
            <select name="selectTipoPiada" className="seletor-piada">
              <option value="piadasAleatoria">Piadas Aleatorias</option>
              <option value="piadaProgramador">Piadas de Programador</option>
              <option value="piadasTio">Piadas de tio</option>
            </select>

            <button
              name="buttonPiada"
              className="botao-procurar"
              onClick={gerarPiada}
            >
              Procurar piada
            </button>
          </div>
        </div>
      </div>

      <footer className="rodape">
        <a
          href="https://github.com/ToriCalasans/tomi-piada"
          target="_blank"
          rel="noopener noreferrer"
          className="link-github"
          title="Ver código no GitHub"
        >
          <svg
            className="icone-github"
            viewBox="0 0 16 16"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
          <span>GitHub do Projeto</span>
        </a>
      </footer>
    </div>
  );
}
export default Home;
