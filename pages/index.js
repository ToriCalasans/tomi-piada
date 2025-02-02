import Image from "next/image";
import David from "../src/assets/david-a-lagartixa-1.png";
function Home() {
  return (
    <div style={{ backgroundColor: "#157F58", height: "100vh" }}>
      <div>
        <h1>Tomi Piadas</h1>
      </div>
      <div>
        <Image
          src={David}
          alt="David a lagartixa"
          title="David"
          style={{ width: "300px", height: "auto" }}
        />
      </div>
      <div>
        <select name="selectTipoPiada">
          <option value="piadaTio">Piadas de tio</option>
          <option value="piadaTio">Piadas de tio</option>
          <option value="piadaTio">Piadas de tio</option>
        </select>
      </div>
      <div>
        <button name="buttonPiada">Procurar piada</button>
      </div>
      <div>
        <h1>Aqui fica nossa piadinha</h1>
      </div>
    </div>
  );
}
export default Home;
