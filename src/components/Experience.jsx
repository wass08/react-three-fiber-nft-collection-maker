import { Center, OrbitControls } from "@react-three/drei";
import { Pirate } from "./Pirate";

const Stage = () => {
  return (
    <>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <meshBasicMaterial transparent opacity={0.1} color={"black"} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, -4]}>
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <meshBasicMaterial color={"#b493c0"} />
      </mesh>

      <mesh receiveShadow position={[1, 1, -1]}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial color={"yellow"} />
      </mesh>
    </>
  );
};

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      {/* THREE POINT LIGHTING */}
      <pointLight position={[2, 1, 2]} intensity={2} />
      <spotLight position={[-1, 1, 1]} intensity={5} color={"#8758c4"} />
      <pointLight position={[-1, 0.5, -1]} intensity={4} color={"#47b6de"} />
      <Center>
        <Pirate />
      </Center>
      <Stage />
      <OrbitControls />
    </>
  );
};
