import David from "../src/assets/david-a-lagartixa-1.png";
import Image from "next/image";
function Home() {
  return (
    <div style={{ backgroundColor: "#157F58", height: "100vh" }}>
      <h1>Tomi Piadas</h1>
      <div>
        <img src={David} alt="David a lagartixa" title="David" />
      </div>
    </div>
  );
}
export default Home;
