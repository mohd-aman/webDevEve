import React from "react";

export default class ClassTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
    };
    console.log("Contructor: Setting up initial state");
    console.log(this);
  }

  componentDidMount() {
    console.log("ComponentDidMount: Fetching initial data");
    setTimeout(() => {
      this.setState({ todos: ["learn react", "learn MERN"] });
    }, 1000);
  }

  componentDidUpdate(prevProps,prevState){
    console.log("ComponentDidUpdate: Checking for updates");
    if(prevState.todos !== this.state.todos){
        console.log("updated todos list", this.state.todos);
    }
  }

  componentWillUnmount(){
    console.log("ComponentWillUnmount: Cleaning up resources");
    // perform any necessary cleanup here
  }

  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleAddTodo = () => {
    this.setState((prevState) => {
      return {
        todos: [...this.state.todos, this.state.newTodo],
        newTodo: "",
      };
    });
  };

  render() {
    return (
      <div>
        <h1>I am a Class Based Todo</h1>
        <input
          type="text"
          value={this.state.newTodo}
          onChange={this.handleChange}
        />
        <button onClick={this.handleAddTodo}>Add Todo</button>
        <ul>
          {this.state.todos.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
