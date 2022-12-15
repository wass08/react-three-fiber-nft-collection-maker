import { Center, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useCollectionGenerator } from "../contexts/CollectionGenerator";
import { sleep } from "../utils/sleep";
import { Pirate } from "./Pirate";

const Stage = () => {
  const { currentItem, saveScreenshot } = useCollectionGenerator();
  return (
    <>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <meshBasicMaterial transparent opacity={0.1} color={"black"} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, -4]}>
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <meshBasicMaterial color={currentItem["Background"].value} />
      </mesh>

      <mesh receiveShadow position={[1.5, 1.5, -1]}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          color={currentItem["Sun"].value}
          transparent
          opacity={0.82}
        />
      </mesh>
    </>
  );
};

export const Experience = () => {
  const gl = useThree((state) => state.gl);
  const { saveScreenshot, currentItem, screenshotTaken, collectionItemNumber } =
    useCollectionGenerator();
  const screenshot = () => {
    const link = document.createElement("a");
    link.setAttribute("download", `${collectionItemNumber}.png`);
    link.setAttribute(
      "href",
      gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    );
    link.click();
  };

  const saveMetadatas = () => {
    const metadatas = {
      name: `Pirate #${collectionItemNumber}`,
      description: `Wawa Pirates by Wawa Sensei is a collection of 100 unique pirate NFTs. Buy me, I'm gonna be the King of Pirates!`,
      image: `ipfs://IPFS_URI/${collectionItemNumber}.png`,
      attributes: Object.keys(currentItem).map((key) => ({
        trait_type: key,
        value: currentItem[key].txt_value,
      })),
    };
    const link = document.createElement("a");
    link.setAttribute("download", `${collectionItemNumber}.json`);
    let file = new Blob([JSON.stringify(metadatas, null, 2)], {
      type: "text/plain",
    });
    link.setAttribute("href", URL.createObjectURL(file));
    link.click();
  };

  const processScreenshot = async () => {
    screenshot();
    await sleep(120);
    saveMetadatas();
    await sleep(120);
    screenshotTaken();
  };

  useEffect(() => {
    if (saveScreenshot) {
      processScreenshot();
    }
  }, [saveScreenshot, currentItem]);

  return (
    <>
      <ambientLight intensity={0.1} />
      {/* THREE POINT LIGHTING */}
      <pointLight position={[2, 1, 2]} intensity={1.2} />
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
