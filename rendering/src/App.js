import './App.css';
import ClassCounter from './components/ClassCounter';
import ClassTodo from './components/ClassTodo';
import DataComp from './components/DataComp';
import FuncTodo from './components/FuncTodo';
import WithLoading from './components/WithLoading';


const EnhancedComp = WithLoading(DataComp);

function App() {
  return (
    <>
      <ClassCounter name="Class Based Component" />
      {/* <ClassTodo/> */}
      <FuncTodo/>
      <EnhancedComp data="Here is some data"/>

    </>
   
   
  );
}

export default App;
