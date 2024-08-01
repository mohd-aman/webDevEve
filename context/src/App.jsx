import Family from "./components/Family";
import FamilyContext from "./context/FamilyContext";

function App() {
  const familyInfo = {
    familyName: "The Griffin Family",

    onlyForParent: () => {
      return "Info for Parents Only";
    },

    onlyForGrandChildren: () => {
      return "Info for Grandchildren Only";
    },
  };

  return (
    <>
    <FamilyContext.Provider value={familyInfo}>
      <Family />
    </FamilyContext.Provider>
      
    </>
  );
}

export default App;
