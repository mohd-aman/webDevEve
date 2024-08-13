import "./App.css";
import Modal from "./components/Modal";
import useVisible from "./hooks/useVisible";
function App() {
  const {isVisible,toggle,show,hide} = useVisible(true);
  return (
    <>
      <button onClick={show}>Show Modal</button>
      <button onClick={toggle}>Toggle Modal</button>
      <Modal isVisible={isVisible} hide={hide} />
    </>
  );
}

export default App;
