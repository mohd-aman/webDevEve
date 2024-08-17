---
title: Agenda of the lecture
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---

- Class based Components
- Lifecycle of Components
- Functional vs Class based Components (COMPARISION)
- Higher Order Components
- Virtual Dom and all about React Rendering


---
title: Class Based Components
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---

 Let's start from scratch by explaining class-based components in React, including lifecycle methods, and then we'll compare them with functional components , So everyone will have better clarity on how these tow ways of creating components work in React

### Step 1: Introduction to Class-Based Components

Class-based components are one of the two main ways to define a React component. They are created using ES6 class syntax and extend from `React.Component`. 

#### Example Code

```jsx
import React from 'react';

// Define a class-based component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
```

### Explanation

This code defines a simple class-based React component that displays a greeting message. Here’s a step-by-step explanation of what each part of the code does:

### Importing React
```javascript
import React from 'react';
```
- This line imports the React library, which is necessary to define and use React components.

### Defining the Welcome Component
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
- `class Welcome extends React.Component`:
  - This defines a new class named `Welcome` that extends the `React.Component` class. By extending `React.Component`, the `Welcome` class becomes a React component.
  
- `render()`:
  - The `render` method is a required method in class-based components. It returns the JSX (JavaScript XML) that defines what the component's UI should look like.
  - In this case, the `render` method returns a JSX `<h1>` element that contains the text `Hello, {this.props.name}`. The `{this.props.name}` part is a placeholder that will be replaced with the value of the `name` prop passed to the `Welcome` component.

### Using Props
- `this.props.name`:
  - `props` are a way to pass data from a parent component to a child component. In this example, `this.props.name` refers to the `name` prop that is passed to the `Welcome` component. Whatever value is provided to the `name` prop will be inserted into the JSX and displayed inside the `<h1>` element.

### Exporting the Component
```javascript
export default Welcome;
```
- This line exports the `Welcome` component, making it available to be imported and used in other parts of the application.

### Example Usage
To see this component in action, you would need to import and use it in another file. For example:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';

ReactDOM.render(<Welcome name="Alice" />, document.getElementById('root'));
```
- Here, the `Welcome` component is imported and rendered with the `name` prop set to "Alice". The output would be:
```html
<h1>Hello, Alice</h1>
```

This is a basic example of a class-based component in React, demonstrating how to define a component, use props, and render JSX.

---
title: State with Class Components
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---

### Step 2: Adding State to Class-Based Components

Class-based components can have state, which is a way to manage data that changes over time.

Let's take a simple counter Example and understand how state can be added with class based components.

#### Example Code

```jsx
import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default Counter;
```

### Explanation

 let's break down this code step by step with a focus on the state.

### Code Breakdown

1. **Importing React**:
   ```javascript
   import React from 'react';
   ```
   - This line imports the React library, which is necessary for creating React components.

2. **Defining the `Counter` Class Component**:
   ```javascript
   class Counter extends React.Component {
   ```
   - Here, a class called `Counter` is defined, which extends `React.Component`. This means `Counter` is a React class component.

3. **Constructor Method**:
   ```javascript
   constructor(props) {
     super(props);
     this.state = { count: 0 };
   }
   ```
   - **Constructor Function**: This is a special method used to initialize an instance of the `Counter` class.
   - **Props**: The `props` parameter allows the component to access properties passed from its parent component.
   - **Super(props)**: This line calls the constructor of the parent class (`React.Component`), enabling the component to use `this` to refer to itself.
   - **State Initialization**: `this.state` is set to an object with a single property `count`, initialized to `0`.

4. **Render Method**:
   ```javascript
   render() {
   ```
   - The `render` method is required in class components and is responsible for returning the JSX that will be displayed on the screen.

5. **JSX Return**:
   ```javascript
   return (
     <div>
       <p>Count: {this.state.count}</p>
       <button onClick={() => this.setState({ count: this.state.count + 1 })}>
         Increment
       </button>
     </div>
   );
   ```
   - **JSX**: The `render` method returns a JSX structure.
   - **Displaying State**: The `<p>` element displays the current value of `count` from the component's state.
     ```html
     <p>Count: {this.state.count}</p>
     ```
   - **Button with OnClick Handler**: The `<button>` element has an `onClick` event handler.
     ```html
     <button onClick={() => this.setState({ count: this.state.count + 1 })}>
       Increment
     </button>
     ```
     - **Inline Arrow Function**: When the button is clicked, an arrow function is executed.
     - **Updating State**: The arrow function calls `this.setState` with an object that increments `count` by 1:
       ```javascript
       this.setState({ count: this.state.count + 1 })
       ```
       - `this.setState` is a React method used to update the component's state.
       - React will re-render the component whenever the state changes, causing the new `count` value to be displayed.

6. **Exporting the Component**:
   ```javascript
   export default Counter;
   ```
   - This line exports the `Counter` class, making it available for import in other files.

### How the state is working

- **State Initialization**: The state is initialized in the constructor with `{ count: 0 }`.
- **State Access**: The state is accessed in the `render` method via `this.state.count`.
- **State Update**: The state is updated when the button is clicked using `this.setState({ count: this.state.count + 1 })`.

Each time the state is updated using `this.setState`, React re-renders the component, displaying the updated count value. This is a fundamental concept in React, enabling interactive and dynamic UI updates.
---
title: Component Lifecycle
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---

### Step 3: Lifecycle Methods in Class-Based Components

 let's go through another example to understand the lifecycle methods in React class-based components using a more intuitive and real-world example of a simple `To-Do-List`

### Example Code

Imagine we are building a class-based React component for a simple to-do list application.

```javascript
import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
    console.log('Constructor: Setting up initial state and bindings.');
  }

  componentDidMount() {
    console.log('Component Did Mount: Fetching initial to-do items.');
    // Simulate fetching data from an API
    setTimeout(() => {
      this.setState({
        todos: ['Learn React', 'Read a book']
      });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component Did Update: Checking if new to-do was added.');
    if (prevState.todos !== this.state.todos) {
      console.log('Updated To-dos:', this.state.todos);
    }
  }

  componentWillUnmount() {
    console.log('Component Will Unmount: Cleaning up resources.');
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  }

  handleAddTodo = () => {
    this.setState((state) => ({
      todos: [...state.todos, state.newTodo],
      newTodo: ''
    }));
  }

  render() {
    console.log('Render: Rendering the to-do list.');
    return (
      <div>
        <h1>My To-Do List</h1>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
        <input
          type="text"
          value={this.state.newTodo}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleAddTodo}>Add To-Do</button>
      </div>
    );
  }
}

export default TodoList;
```

### Detailed Explanation with Real-World Analogies

1. **Constructor**

   ```javascript
   constructor(props) {
     super(props);
     this.state = {
       todos: [],
       newTodo: ''
     };
     console.log('Constructor: Setting up initial state and bindings.');
   }
   ```

   - **Analogy**: Think of the constructor as the setup phase when you first move into a new house. You decide where the furniture goes and set up your daily routines.
   - **Purpose**: Initializes the state and binds event handlers. In this case, we set up an empty to-do list and an empty string for the new to-do item.

2. **Render**

   ```javascript
   render() {
     console.log('Render: Rendering the to-do list.');
     return (
       <div>
         <h1>My To-Do List</h1>
         <ul>
           {this.state.todos.map((todo, index) => (
             <li key={index}>{todo}</li>
           ))}
         </ul>
         <input
           type="text"
           value={this.state.newTodo}
           onChange={this.handleInputChange}
         />
         <button onClick={this.handleAddTodo}>Add To-Do</button>
       </div>
     );
   }
   ```

   - **Analogy**: This is like arranging your furniture and decorations so that your house looks nice. Every time something changes, you rearrange to keep it up-to-date.
   - **Purpose**: Defines the UI. It runs initially and any time the state or props change.

3. **Component Did Mount**

   ```javascript
   componentDidMount() {
     console.log('Component Did Mount: Fetching initial to-do items.');
     // Simulate fetching data from an API
     setTimeout(() => {
       this.setState({
         todos: ['Learn React', 'Read a book']
       });
     }, 1000);
   }
   ```

   - **Analogy**: This is like the moment after you've moved into your new house and you start receiving your mail and packages.
   - **Purpose**: Runs after the component is inserted into the DOM. It's perfect for fetching initial data. Here, it simulates fetching to-do items.

4. **Component Did Update**

   ```javascript
   componentDidUpdate(prevProps, prevState) {
     console.log('Component Did Update: Checking if new to-do was added.');
     if (prevState.todos !== this.state.todos) {
       console.log('Updated To-dos:', this.state.todos);
     }
   }
   ```

   - **Analogy**: Imagine every time you rearrange your furniture, you check if any new items have arrived and then decide where to place them.
   - **Purpose**: Runs after the component updates. It's useful for responding to changes in state or props. Here, it checks if a new to-do was added.

5. **Component Will Unmount**

   ```javascript
   componentWillUnmount() {
     console.log('Component Will Unmount: Cleaning up resources.');
   }
   ```

   - **Analogy**: This is like the process of moving out of your house. You clean up, pack your belongings, and make sure everything is in order.
   - **Purpose**: Runs just before the component is removed from the DOM. It's used for cleanup, like cancelling network requests or removing event listeners.

### Lifecycle Sequence in Action

1. **Constructor**: Initializes the state with an empty to-do list and empty new to-do item.
2. **Render**: Renders the initial UI, which shows a heading, an empty list, an input box, and a button.
3. **Component Did Mount**: Fetches initial to-do items after the component is mounted. After 1 second, it updates the state with the fetched to-dos.
4. **Render**: Runs again due to the state change and updates the UI with the fetched to-dos.
5. **Component Did Update**: Runs after the state update and logs the new to-do items.
6. **Render**: Runs whenever a new to-do is added via the input box and button.
7. **Component Will Unmount**: Would run when the component is about to be removed from the DOM, cleaning up any resources.

### Conclusion

Each lifecycle method has a specific purpose and is called at different stages of the component's existence. By understanding and using these methods appropriately, you can manage your component's behavior more effectively, just like managing the different phases of living in a house.


---
title: Migrating to Functional Component
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---

### Step 4: Functional Components with Hooks

Now, let's recreate the same examples using functional components and hooks and then we will draw a comparison between the two


### Example with Functional Components and Hooks

Let's rewrite the same to-do list example using functional components and hooks.

```javascript
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    console.log('Component Did Mount: Fetching initial to-do items.');
    // Simulate fetching data from an API
    setTimeout(() => {
      setTodos(['Learn React', 'Read a book']);
    }, 1000);

    return () => {
      console.log('Component Will Unmount: Cleaning up resources.');
    };
  }, []);

  useEffect(() => {
    console.log('Component Did Update: Checking if new to-do was added.');
    console.log('Updated To-dos:', todos);
  }, [todos]); // Adding this useEffect to show component updation

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  }

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodo('');
  }

  console.log('Render: Rendering the to-do list.');
  return (
    <div>
      <h1>My To-Do List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Add To-Do</button>
    </div>
  );
}

export default TodoList;
```

### Detailed Explanation

1. **useState Hook**

   ```javascript
   const [todos, setTodos] = useState([]);
   const [newTodo, setNewTodo] = useState('');
   ```

   - **Purpose**: Manages state in functional components. `useState` initializes state variables and provides a function to update them.
   - **Analogy**: Like setting up initial states and routines in a house, similar to the constructor in class components.

2. **useEffect Hook**

   ```javascript
   useEffect(() => {
     console.log('Component Did Mount: Fetching initial to-do items.');
     // Simulate fetching data from an API
     setTimeout(() => {
       setTodos(['Learn React', 'Read a book']);
     }, 1000);

     return () => {
       console.log('Component Will Unmount: Cleaning up resources.');
     };
   }, []);
   ```

   - **Purpose**: Manages side effects in functional components. `useEffect` runs after the initial render and any state or prop updates.
   - **Analogy**: Like fetching initial data when you first move into your house.
   - **Dependency Array**: `[]` ensures this effect runs only once, similar to `componentDidMount`.
   - **Cleanup Function**: `return () => { ... }` runs during the component unmount phase, similar to `componentWillUnmount`.

3. **Second useEffect Hook**
 Adding this useEffect to show component updation and compare with componentDidUpdate()

   ```javascript
   useEffect(() => {
     console.log('Component Did Update: Checking if new to-do was added.');
     console.log('Updated To-dos:', todos);
   }, [todos]);
   ```

   - **Purpose**: Runs when the `todos` state updates, similar to `componentDidUpdate`.
   - **Dependency Array**: `[todos]` ensures this effect runs whenever `todos` changes.

4. **Render**

   ```javascript
   console.log('Render: Rendering the to-do list.');
   return (
     <div>
       <h1>My To-Do List</h1>
       <ul>
         {todos.map((todo, index) => (
           <li key={index}>{todo}</li>
         ))}
       </ul>
       <input
         type="text"
         value={newTodo}
         onChange={handleInputChange}
       />
       <button onClick={handleAddTodo}>Add To-Do</button>
     </div>
   );
   ```

   - **Purpose**: Defines the UI, just like the `render` method in class components.


---
title: Difference between Class and Functional components
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---


### Differences and Comparison

| Feature                    | Class Component                         | Functional Component                |
|----------------------------|------------------------------------------|-------------------------------------|
| **State Management**       | `this.state` and `this.setState`         | `useState`                          |
| **Side Effects**           | Lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) | `useEffect`                         |
| **Syntax**                 | ES6 class syntax                         | Functions                           |
| **Event Handlers**         | Bound in constructor or using arrow functions | Directly defined within the component |
| **Component Structure**    | More verbose and involves more boilerplate code | More concise and less boilerplate   |

### Why Functional Components are Better

1. **Simplicity and Readability**: Functional components are generally easier to read and write. They involve less boilerplate code and are more concise.

2. **Hooks**: Hooks provide powerful features that are not available in class components, such as `useState`, `useEffect`, `useContext`, etc. They allow you to reuse stateful logic without changing your component hierarchy.

3. **Avoiding `this` Keyword**: Functional components do not use the `this` keyword, which can be confusing and error-prone in class components.

4. **Better Performance**: Functional components can be more performant because they are stateless by default. With hooks, you can manage state more efficiently.

5. **Encapsulation of Logic**: Hooks allow you to encapsulate and reuse logic more easily. Custom hooks enable the extraction of complex logic into reusable functions.

### Conclusion

Both class-based and functional components have their places in React development, but functional components with hooks offer a more modern, simpler, and powerful approach to building components. They improve code readability, make it easier to manage state and side effects, and avoid common pitfalls associated with class-based components.

---
title: Higher Order Components
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---

### Higher Order Components (HOCs) in React

Higher Order Components (HOCs) are an advanced technique in React for reusing component logic. HOCs are functions that take a component and return a new component with additional props or behaviors. They can be used to abstract and share functionality across different components without duplicating code.

#### Concept

A Higher Order Component is a function that takes a component and returns a new component.

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

#### Detailed Example

Let's create an example to understand HOCs better. We'll create a simple `withLoading` HOC that adds loading functionality to any component.

1. **Creating the HOC:**

```jsx
import React from 'react';

// Higher Order Component
const withLoading = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      // Simulating an async operation like fetching data
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
    }

    render() {
      if (this.state.isLoading) {
        return <div>Loading...</div>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoading;
```

2. **Creating a Wrapped Component:**

```jsx
import React from 'react';

const DataComponent = ({ data }) => {
  return (
    <div>
      <h1>Data Loaded</h1>
      <p>{data}</p>
    </div>
  );
};

export default DataComponent;
```

3. **Using the HOC:**

```jsx
import React from 'react';
import withLoading from './withLoading';
import DataComponent from './DataComponent';

const EnhancedDataComponent = withLoading(DataComponent);

const App = () => {
  return (
    <div>
      <EnhancedDataComponent data="Here is some data!" />
    </div>
  );
};

export default App;
```

#### Explanation

1. **HOC (`withLoading`):**
   - The `withLoading` function is a HOC that takes a component (`WrappedComponent`) and returns a new component.
   - The new component maintains its own state (`isLoading`) and simulates an async operation (like fetching data) in `componentDidMount`.
   - If `isLoading` is `true`, it renders a loading message. Otherwise, it renders the `WrappedComponent` with the passed props.

2. **Wrapped Component (`DataComponent`):**
   - A simple component that displays some data.

3. **Using the HOC:**
   - The `DataComponent` is wrapped with `withLoading` to create `EnhancedDataComponent`.
   - In the `App` component, `EnhancedDataComponent` is rendered, and it shows a loading message for 2 seconds before displaying the data.

### When to Use Higher Order Components

- **Code Reusability:** When you have logic that needs to be reused across multiple components, HOCs can help avoid code duplication.
- **Separation of Concerns:** HOCs can encapsulate specific behaviors or logic, making your components more focused on their primary concerns.
- **Enhancing Existing Components:** When you need to add additional functionality to existing components without modifying them directly.

### When Not to Use Higher Order Components

- **Complexity:** Overusing HOCs can make the code harder to understand and maintain due to the added layers of abstraction.
- **Performance Concerns:** Wrapping components in multiple HOCs can sometimes introduce performance issues due to the increased number of renders.


### Conclusion

HOCs are a powerful tool in React for reusing logic across components. However, they should be used judiciously, considering the complexity and performance implications. With the advent of hooks, many use cases for HOCs can now be achieved more elegantly, so it's essential to evaluate the best approach for your specific scenario.

---
title: All about Virtual DOM
description: What will be covered in the topic?
duration: 369
card_type: cue_card
---

## Real DOM

First things first, DOM stands for “Document Object Model”. The DOM in simple words represents the UI of your application. Every time there is a change in the state of your application UI, the DOM gets updated to represent that change. Now the catch is frequently manipulating the DOM affects performance, making it slow.

## What makes DOM manipulation slow?
The DOM is represented as a tree data structure. Because of that, the changes and updates to the DOM are fast. But after the change, the updated element and its children have to be re-rendered to update the application UI. The re-rendering or re-painting of the UI is what makes it slow. Therefore, the more UI components you have, the more expensive the DOM updates could be, since they would need to be re-rendered for every DOM update.

DOM manipulation is the heart of the modern, interactive web. Unfortunately, it is also a lot slower than most JavaScript operations. This slowness is made worse by the fact that most JavaScript frameworks update the DOM much more than they have to.

As an example, let’s say that you have a list that contains ten items. You check off the first item. Most JavaScript frameworks would rebuild the entire list. That’s ten times more work than necessary! Only one item changed, but the remaining nine get rebuilt exactly how they were before.

Rebuilding a list is no big deal to a web browser, but modern websites can use huge amounts of DOM manipulation. Inefficient updating has become a serious problem. To address this problem, the people at React popularized something called the virtual DOM.


## The Virtual DOM
In React, for every DOM object, there is a corresponding “virtual DOM object.” A virtual DOM object is a representation of a DOM object, like a lightweight copy. A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing’s power to directly change what’s on the screen.

“The Virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.”

Manipulating the DOM is slow. Manipulating the virtual DOM is much faster because nothing gets drawn onscreen. Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.


### How is Virtual DOM faster?

When new elements are added to the UI, a virtual DOM, which is represented as a tree is created. Each element is a node on this tree. If the state of any of these elements changes, a new virtual DOM tree is created. This tree is then compared or “diffed” with the previous virtual DOM tree.

Once this is done, the virtual DOM calculates the best possible method to make these changes to the real DOM. This ensures that there are minimal operations on the real DOM. Hence, reducing the performance cost of updating the real DOM.

The image below shows the virtual DOM tree and the diffing process.

<img src='https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Ps8GIxbQspLkXXDC'>

The red circles represent the nodes that have changed. These nodes represent the UI elements that have had their state changed. The difference between the previous version of the virtual DOM tree and the current virtual DOM tree is then calculated. The whole parent subtree then gets re-rendered to give the updated UI. This updated tree is then batch updated to the real DOM.


Process of Reconciliation

<img src='https://miro.medium.com/v2/resize:fit:1276/format:webp/1*InX4By1HRVlNV2qqAMXtMA.jpeg'>

### How does React use Virtual DOM?
Now that you have a fair understanding of what a Virtual DOM is, and how it can help with the performance of your app, let's look into how React leverages the virtual DOM.

1. React follows the observable pattern and listens for state changes.
2. In React every UI piece is a component, and each component has a state. When the state of a component changes, React updates the virtual DOM tree. 

3. Once the virtual DOM has been updated, React then compares the current version of the virtual DOM with the previous version of the virtual DOM. This process is called “diffing”.

4. Once React knows which virtual DOM objects have changed, then React updates only those objects, in the real DOM. This makes the performance far better when compared to manipulating the real DOM directly. This makes React stand out as a high-performance JavaScript library.

5. React follows a batch update mechanism to update the real DOM.
Hence, leading to increased performance. This means that updates to the real DOM are sent in batches, instead of sending updates for every single change in state.

The repainting of the UI is the most expensive part, and React efficiently ensures that the real DOM receives only batched updates to repaint the UI.


3. React follows an efficient Diffing Algorithm
React implements a heuristic O(n) algorithm based on two assumptions:

a. Two elements of different types will produce different trees.
b. The developer can hint at which child elements may be c. stable across different renders with a key prop.
d. In practice, these assumptions are valid for almost all practical use cases.

When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of root elements.



### Elements Of Different Types

- Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch.

- When tearing down a tree, old DOM nodes are destroyed. Component instances receive componentWillUnmount(). When building up a new tree, new DOM nodes are inserted into the DOM.
- Any state associated with the old tree is lost.
Any components below the root will also get unmounted and have their state destroyed. For example, when diffing:


```
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>

```

This will destroy the old Counter and remount a new one.


### Recursing On Children Issue

By default, when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference.

For example, when adding an element at the end of the children, converting between these two trees works well:

```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

React will match the two <li>first</li> trees, match the two <li>second</li> trees, and then insert the <li>third</li> tree.

If you implement it naively, inserting an element at the beginning has worse performance. For example, converting between these two trees works poorly:

```html
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```
React will mutate every child instead of realizing it can keep the <li>Duke</li> and <li>Villanova</li> subtrees intact. This inefficiency can be a problem.


### Use of Keys
In order to solve this issue, React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key to our inefficient example above can make the tree conversion efficient:

```html
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

Now React knows that the element with key '2014' is the new one, and the elements with the keys '2015' and '2016' have just moved.

In practice, finding a key is usually not hard. The element you are going to display may already have a unique ID, so the key can just come from your data:


```html
<li key={item.id}>{item.name}</li>
```

In this way you can use Keys for better performance in React!


***Start the Doubt session!***


### React Fibre Architecture (Post Reads)


# React Fiber Architecture

## Introduction

React Fiber is an ongoing reimplementation of React's core algorithm. It is the culmination of over two years of research by the React team.

The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

Other key features include the ability to pause, abort, or reuse work as new updates come in; the ability to assign priority to different types of updates; and new concurrency primitives.

### About this document

Fiber introduces several novel concepts that are difficult to grok solely by looking at code. This document began as a collection of notes I took as I followed along with Fiber's implementation in the React project. As it grew, I realized it may be a helpful resource for others, too.

I'll attempt to use the plainest language possible, and to avoid jargon by explicitly defining key terms. I'll also link heavily to external resources when possible.

Please note that I am not on the React team, and do not speak from any authority. **This is not an official document**. I have asked members of the React team to review it for accuracy.

This is also a work in progress. **Fiber is an ongoing project that will likely undergo significant refactors before it's completed.** Also ongoing are my attempts at documenting its design here. Improvements and suggestions are highly welcome.

My goal is that after reading this document, you will understand Fiber well enough to [follow along as it's implemented](https://github.com/facebook/react/commits/master/src/renderers/shared/fiber), and eventually even be able to contribute back to React.

### Prerequisites

I strongly suggest that you are familiar with the following resources before continuing:

- [React Components, Elements, and Instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html) - "Component" is often an overloaded term. A firm grasp of these terms is crucial.
- [Reconciliation](https://facebook.github.io/react/docs/reconciliation.html) - A high-level description of React's reconciliation algorithm.
- [React Basic Theoretical Concepts](https://github.com/reactjs/react-basic) - A description of the conceptual model of React without implementation burden. Some of this may not make sense on first reading. That's okay, it will make more sense with time.
- [React Design Principles](https://facebook.github.io/react/contributing/design-principles.html) - Pay special attention to the section on scheduling. It does a great job of explaining the *why* of React Fiber.

## Review

Please check out the prerequisites section if you haven't already.

Before we dive into the new stuff, let's review a few concepts.

### What is reconciliation?

<dl>
  <dt>reconciliation</dt>
  <dd>The algorithm React uses to diff one tree with another to determine which parts need to be changed.</dd>

  <dt>update</dt>
  <dd>A change in the data used to render a React app. Usually the result of `setState`. Eventually results in a re-render.</dd>
</dl>

The central idea of React's API is to think of updates as if they cause the entire app to re-render. This allows the developer to reason declaratively, rather than worry about how to efficiently transition the app from any particular state to another (A to B, B to C, C to A, and so on).

Actually re-rendering the entire app on each change only works for the most trivial apps; in a real-world app, it's prohibitively costly in terms of performance. React has optimizations which create the appearance of whole app re-rendering while maintaining great performance. The bulk of these optimizations are part of a process called **reconciliation**.

Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM." A high-level description goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment — for example, in the case of a browser application, it's translated to a set of DOM operations. When the app is updated (usually via `setState`), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.

Although Fiber is a ground-up rewrite of the reconciler, the high-level algorithm [described in the React docs](https://facebook.github.io/react/docs/reconciliation.html) will be largely the same. The key points are:

- Different component types are assumed to generate substantially different trees. React will not attempt to diff them, but rather replace the old tree completely.
- Diffing of lists is performed using keys. Keys should be "stable, predictable, and unique."

### Reconciliation versus rendering

The DOM is just one of the rendering environments React can render to, the other major targets being native iOS and Android views via React Native. (This is why "virtual DOM" is a bit of a misnomer.)

The reason it can support so many targets is because React is designed so that reconciliation and rendering are separate phases. The reconciler does the work of computing which parts of a tree have changed; the renderer then uses that information to actually update the rendered app.

This separation means that React DOM and React Native can use their own renderers while sharing the same reconciler, provided by React core.

Fiber reimplements the reconciler. It is not principally concerned with rendering, though renderers will need to change to support (and take advantage of) the new architecture.

### Scheduling

<dl>
  <dt>scheduling</dt>
  <dd>the process of determining when work should be performed.</dd>

  <dt>work</dt>
  <dd>any computations that must be performed. Work is usually the result of an update (e.g. <code>setState</code>).
</dl>

React's [Design Principles](https://facebook.github.io/react/contributing/design-principles.html#scheduling) document is so good on this subject that I'll just quote it here:

> In its current implementation React walks the tree recursively and calls render functions of the whole updated tree during a single tick. However in the future it might start delaying some updates to avoid dropping frames.
>
> This is a common theme in React design. Some popular libraries implement the "push" approach where computations are performed when the new data is available. React, however, sticks to the "pull" approach where computations can be delayed until necessary.
>
> React is not a generic data processing library. It is a library for building user interfaces. We think that it is uniquely positioned in an app to know which computations are relevant right now and which are not.
>
> If something is offscreen, we can delay any logic related to it. If data is arriving faster than the frame rate, we can coalesce and batch updates. We can prioritize work coming from user interactions (such as an animation caused by a button click) over less important background work (such as rendering new content just loaded from the network) to avoid dropping frames.

The key points are:

- In a UI, it's not necessary for every update to be applied immediately; in fact, doing so can be wasteful, causing frames to drop and degrading the user experience.
- Different types of updates have different priorities — an animation update needs to complete more quickly than, say, an update from a data store.
- A push-based approach requires the app (you, the programmer) to decide how to schedule work. A pull-based approach allows the framework (React) to be smart and make those decisions for you.

React doesn't currently take advantage of scheduling in a significant way; an update results in the entire subtree being re-rendered immediately. Overhauling React's core algorithm to take advantage of scheduling is the driving idea behind Fiber.

---

Now we're ready to dive into Fiber's implementation. The next section is more technical than what we've discussed so far. Please make sure you're comfortable with the previous material before moving on.

## What is a fiber?

We're about to discuss the heart of React Fiber's architecture. Fibers are a much lower-level abstraction than application developers typically think about. If you find yourself frustrated in your attempts to understand it, don't feel discouraged. Keep trying and it will eventually make sense. (When you do finally get it, please suggest how to improve this section.)

Here we go!

---

We've established that a primary goal of Fiber is to enable React to take advantage of scheduling. Specifically, we need to be able to

- pause work and come back to it later.
- assign priority to different types of work.
- reuse previously completed work.
- abort work if it's no longer needed.

In order to do any of this, we first need a way to break work down into units. In one sense, that's what a fiber is. A fiber represents a **unit of work**.

To go further, let's go back to the conception of [React components as functions of data](https://github.com/reactjs/react-basic#transformation), commonly expressed as

```
v = f(d)
```

It follows that rendering a React app is akin to calling a function whose body contains calls to other functions, and so on. This analogy is useful when thinking about fibers.

The way computers typically track a program's execution is using the [call stack](https://en.wikipedia.org/wiki/Call_stack). When a function is executed, a new **stack frame** is added to the stack. That stack frame represents the work that is performed by that function.

When dealing with UIs, the problem is that if too much work is executed all at once, it can cause animations to drop frames and look choppy. What's more, some of that work may be unnecessary if it's superseded by a more recent update. This is where the comparison between UI components and function breaks down, because components have more specific concerns than functions in general.

Newer browsers (and React Native) implement APIs that help address this exact problem: `requestIdleCallback` schedules a low priority function to be called during an idle period, and `requestAnimationFrame` schedules a high priority function to be called on the next animation frame. The problem is that, in order to use those APIs, you need a way to break rendering work into incremental units. If you rely only on the call stack, it will keep doing work until the stack is empty.

Wouldn't it be great if we could customize the behavior of the call stack to optimize for rendering UIs? Wouldn't it be great if we could interrupt the call stack at will and manipulate stack frames manually?

That's the purpose of React Fiber. Fiber is reimplementation of the stack, specialized for React components. You can think of a single fiber as a **virtual stack frame**.

The advantage of reimplementing the stack is that you can [keep stack frames in memory](https://www.facebook.com/groups/2003630259862046/permalink/2054053404819731/) and execute them however (and *whenever*) you want. This is crucial for accomplishing the goals we have for scheduling.

Aside from scheduling, manually dealing with stack frames unlocks the potential for features such as concurrency and error boundaries. We will cover these topics in future sections.

In the next section, we'll look more at the structure of a fiber.

### Structure of a fiber

*Note: as we get more specific about implementation details, the likelihood that something may change increases. Please file a PR if you notice any mistakes or outdated information.*

In concrete terms, a fiber is a JavaScript object that contains information about a component, its input, and its output.

A fiber corresponds to a stack frame, but it also corresponds to an instance of a component.

Here are some of the important fields that belong to a fiber. (This list is not exhaustive.)

#### `type` and `key`

The type and key of a fiber serve the same purpose as they do for React elements. (In fact, when a fiber is created from an element, these two fields are copied over directly.)

The type of a fiber describes the component that it corresponds to. For composite components, the type is the function or class component itself. For host components (`div`, `span`, etc.), the type is a string.

Conceptually, the type is the function (as in `v = f(d)`) whose execution is being tracked by the stack frame.

Along with the type, the key is used during reconciliation to determine whether the fiber can be reused.

#### `child` and `sibling`

These fields point to other fibers, describing the recursive tree structure of a fiber.

The child fiber corresponds to the value returned by a component's `render` method. So in the following example

```js
function Parent() {
  return <Child />
}
```

The child fiber of `Parent` corresponds to `Child`.

The sibling field accounts for the case where `render` returns multiple children (a new feature in Fiber!):

```js
function Parent() {
  return [<Child1 />, <Child2 />]
}
```

The child fibers form a singly-linked list whose head is the first child. So in this example, the child of `Parent` is `Child1` and the sibling of `Child1` is `Child2`.

Going back to our function analogy, you can think of a child fiber as a [tail-called function](https://en.wikipedia.org/wiki/Tail_call).

#### `return`

The return fiber is the fiber to which the program should return after processing the current one. It is conceptually the same as the return address of a stack frame. It can also be thought of as the parent fiber.

If a fiber has multiple child fibers, each child fiber's return fiber is the parent. So in our example in the previous section, the return fiber of `Child1` and `Child2` is `Parent`.

#### `pendingProps` and `memoizedProps`

Conceptually, props are the arguments of a function. A fiber's `pendingProps` are set at the beginning of its execution, and `memoizedProps` are set at the end.

When the incoming `pendingProps` are equal to `memoizedProps`, it signals that the fiber's previous output can be reused, preventing unnecessary work.

#### `pendingWorkPriority`

A number indicating the priority of the work represented by the fiber. The [ReactPriorityLevel](https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactPriorityLevel.js) module lists the different priority levels and what they represent.

With the exception of `NoWork`, which is 0, a larger number indicates a lower priority. For example, you could use the following function to check if a fiber's priority is at least as high as the given level:

```js
function matchesPriority(fiber, priority) {
  return fiber.pendingWorkPriority !== 0 &&
         fiber.pendingWorkPriority <= priority
}
```

*This function is for illustration only; it's not actually part of the React Fiber codebase.*

The scheduler uses the priority field to search for the next unit of work to perform. This algorithm will be discussed in a future section.

#### `alternate`

<dl>
  <dt>flush</dt>
  <dd>To flush a fiber is to render its output onto the screen.</dd>

  <dt>work-in-progress</dt>
  <dd>A fiber that has not yet completed; conceptually, a stack frame which has not yet returned.</dd>
</dl>

At any time, a component instance has at most two fibers that correspond to it: the current, flushed fiber, and the work-in-progress fiber.

The alternate of the current fiber is the work-in-progress, and the alternate of the work-in-progress is the current fiber.

A fiber's alternate is created lazily using a function called `cloneFiber`. Rather than always creating a new object, `cloneFiber` will attempt to reuse the fiber's alternate if it exists, minimizing allocations.

You should think of the `alternate` field as an implementation detail, but it pops up often enough in the codebase that it's valuable to discuss it here.

#### `output`

<dl>
  <dt>host component</dt>
  <dd>The leaf nodes of a React application. They are specific to the rendering environment (e.g., in a browser app, they are `div`, `span`, etc.). In JSX, they are denoted using lowercase tag names.</dd>
</dl>

Conceptually, the output of a fiber is the return value of a function.

Every fiber eventually has output, but output is created only at the leaf nodes by **host components**. The output is then transferred up the tree.

The output is what is eventually given to the renderer so that it can flush the changes to the rendering environment. It's the renderer's responsibility to define how the output is created and updated.

## Future sections

That's all there is for now, but this document is nowhere near complete. Future sections will describe the algorithms used throughout the lifecycle of an update. Topics to cover include:

- how the scheduler finds the next unit of work to perform.
- how priority is tracked and propagated through the fiber tree.
- how the scheduler knows when to pause and resume work.
- how work is flushed and marked as complete.
- how side-effects (such as lifecycle methods) work.
- what a coroutine is and how it can be used to implement features like context and layout.

## Related Videos
- [What's Next for React (ReactNext 2016)](https://youtu.be/aV1271hd9ew)











