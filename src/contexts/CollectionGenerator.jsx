import { createContext, useContext, useState } from "react";
import { randInt } from "three/src/math/MathUtils";

const COLLECTION_SIZE = 100;

const CollectionGeneratorContext = createContext({});

const traitsCollections = {
  Background: [
    {
      txt_value: "Sea",
      value: "#00b4ff",
      weight: 40,
    },
    {
      txt_value: "Desert",
      value: "#ffd63a",
      weight: 30,
    },
    {
      txt_value: "Tropical",
      value: "#03ab0e",
      weight: 20,
    },
    {
      txt_value: "Space",
      value: "#424242",
      weight: 10,
    },
  ],
  Sun: [
    {
      txt_value: "Yellow",
      value: "yellow",
      weight: 90,
    },
    {
      txt_value: "Red",
      value: "#ff4100",
      weight: 10,
    },
  ],
  Beard: [
    {
      txt_value: "Brown",
      value: "#854b34",
      weight: 50,
    },
    {
      txt_value: "Blond",
      value: "#fbec1f",
      weight: 25,
    },
    {
      txt_value: "White",
      value: "#ffffff",
      weight: 15,
    },
    {
      txt_value: "Red",
      value: "#bd0f03",
      weight: 10,
    },
  ],
  Eyes: [
    {
      txt_value: "Brown",
      value: "#693e17",
      weight: 50,
    },
    {
      txt_value: "Blue",
      value: "#0b80f4",
      weight: 25,
    },
    {
      txt_value: "White",
      value: "#aaaaaa",
      weight: 15,
    },
    {
      txt_value: "Red",
      value: "#bd0f03",
      weight: 10,
    },
  ],
  Shirt: [
    {
      txt_value: "Red",
      value: "#941b1b",
      weight: 50,
    },
    {
      txt_value: "Blue",
      value: "#1763c7",
      weight: 25,
    },
    {
      txt_value: "Black",
      value: "#383a3c",
      weight: 15,
    },
    {
      txt_value: "Pink",
      value: "#ce6ed0",
      weight: 10,
    },
  ],
  Pants: [
    {
      txt_value: "Brown",
      value: "#693e17",
      weight: 50,
    },
    {
      txt_value: "White",
      value: "#ffffff",
      weight: 25,
    },
    {
      txt_value: "Black",
      value: "#383a3c",
      weight: 15,
    },
    {
      txt_value: "Pink",
      value: "#ce6ed0",
      weight: 10,
    },
  ],
  Pose: [
    {
      txt_value: "Brave",
      value: "Brave",
      weight: 40,
    },
    {
      txt_value: "Sailing",
      value: "Sailing",
      weight: 30,
    },
    {
      txt_value: "Zombie",
      value: "Zombie",
      weight: 20,
    },
    {
      txt_value: "Luffy",
      value: "Luffy",
      weight: 10,
    },
  ],
};

const generatedItemsDna = [];

export const CollectionGeneratorProvider = ({ children }) => {
  const [saveScreenshot, setSaveScreenshot] = useState(false);
  const [collectionItemNumber, setCollectionItemNumber] = useState(1);
  const generateCollection = () => {
    setSaveScreenshot(true);
  };

  const generateItem = () => {
    const item = {};
    let itemDna = "";
    // Loop over each attributes
    Object.keys(traitsCollections).forEach((key) => {
      const traits = traitsCollections[key];
      let totalTraitWeight = 0;
      traits.forEach((trait) => {
        totalTraitWeight += trait.weight;
        trait.combinedWeight = totalTraitWeight;
      });
      const rarity = randInt(0, totalTraitWeight);
      itemDna += rarity;
      let selectedTrait = traits[0];
      for (let i = 0; i < traits.length; i++) {
        const trait = traits[i];
        if (rarity < trait.combinedWeight) {
          selectedTrait = trait;
          break;
        }
      }
      item[key] = selectedTrait;
    });

    if (generatedItemsDna.includes(itemDna)) {
      return generateItem(); // BEWARE OF INFINITE RECURSION FOR BIG COLLECTION SIZE WITH NOT ENOUGH POSSIBILITES
    }
    generatedItemsDna.push(itemDna);
    return item;
  };

  const screenshotTaken = () => {
    if (collectionItemNumber < COLLECTION_SIZE) {
      setCollectionItemNumber(collectionItemNumber + 1);
      setCurrentItem(generateItem());
    } else {
      setSaveScreenshot(false);
      setCollectionItemNumber(1);
      generatedItemsDna.length = 0;
    }
  };

  const [currentItem, setCurrentItem] = useState(generateItem());

  return (
    <CollectionGeneratorContext.Provider
      value={{
        generateCollection,
        currentItem,
        saveScreenshot,
        screenshotTaken,
        collectionItemNumber,
      }}
    >
      {children}
    </CollectionGeneratorContext.Provider>
  );
};

export const useCollectionGenerator = () => {
  return useContext(CollectionGeneratorContext);
};
