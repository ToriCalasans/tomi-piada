import piadas from "../../src/assets/piadas.json";

export default function handler(req, rest) {
  const { tipo } = req.query;
  //Aqui pegamos as piadas do tipo selecionado
  let listaDePiadas = piadas[tipo];
  if (!listaDePiadas || listaDePiadas.length === 0) {
    const chavesDisponiveis = Objects.keys(piadas);
    listaDePiadas = piadas[chavesDisponiveis[0]];
  } //Se não tiver nenhuma piada desse tipo, vai qualquer uma mesmo.
  const piadaAleatoria =
    listaDePiadas[Math.floor(Math.random() * listaDePiadas.length)];
  //Aqui pseudoaleatorizamos a piada (assista the big bang theory, temporada 12, pra entender pq não é verdadeiramente aleatório)
  rest.status(200).json({
    texto:
      piadaAleatoria ||
      "Eita! O David esqueceu a piada! Clica de novo que ele tenta lembrar.",
  });
  //aqui enviamos de volta a piada pro David fazer a vida de alguém melhor. (ou pior, dependendo da piada)
}
