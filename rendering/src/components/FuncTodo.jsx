import { useEffect, useState } from "react";

export default function FuncTodo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(()=>{
    setTimeout(() => {
        setTodos(["learn react", "learn MERN"])
      }, 1000);

      return ()=>{
        console.log("ComponentWillUnmount: Cleaning up resources");
      }
  },[]); // mounting 

  useEffect(()=>{
    console.log("updated todos list", todos);
  },[todos]) // on todos change

  const handleChange = (e)=>{
    setNewTodo(e.target.value);
  }

  const handleAddTodo = ()=>{
    setTodos([...todos,newTodo]);
    setNewTodo("");
  }

  return (
    <div>
      <h1>I am a Class Based Todo</h1>
      <input
        type="text"
        value={newTodo}
        onChange={handleChange}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
