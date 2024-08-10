import React, { useCallback, useState } from "react";
import Item from "./Item";

function Todo() {
  const [list, setList] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [todo, setTodo] = useState("");

  const removeItem = useCallback((itemToDelete) => {
    console.log("function invoked");
    const filteredList = list.filter((item) => {
      return item !== itemToDelete;
    });
    setList(filteredList);
  }, [list]);

  console.log("re render Todo");
  return (
    <div>
      <h1>Tod</h1>
      <div>
        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      </div>
      {list.map((item, index) => {
        return <Item key={index} item={item} removeItem={removeItem} />;
      })}
    </div>
  );
}

export default Todo;
