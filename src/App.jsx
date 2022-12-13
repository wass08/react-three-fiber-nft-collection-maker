import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import "./App.css";
import { Experience } from "./components/Experience";
import { useCollectionGenerator } from "./contexts/CollectionGenerator";

function App() {
  const [count, setCount] = useState(0);
  const { generateCollection } = useCollectionGenerator();
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={["#222222"]} />
        <Experience />
      </Canvas>
      <button className="generate" onClick={generateCollection}>
        Generate collection
      </button>
    </>
  );
}

export default App;
