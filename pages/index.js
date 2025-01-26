import Image from "next/image";

function Home() {
  return (
    <div style={{ backgroundColor: "#157F58", height: "100vh" }}>
      <h1>Tomi Piadas</h1>
      <div>
        <Image src="/src/assets/Davidalagartixa.png" width={500} height={500} />
      </div>
    </div>
  );
}
export default Home;
