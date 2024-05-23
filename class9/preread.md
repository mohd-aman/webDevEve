## Title: Understanding Execution Context and Hoisting

Before we delve into the intricacies of execution context and hoisting in JavaScript, it's crucial to grasp the fundamental concepts that underpin these topics. This pre-read material aims to provide you with an overview of what to expect in the upcoming class.

1. **Execution Context:**
   - Execution context is the environment in which JavaScript code is executed. It consists of the scope chain, variable objects, and the 'this' keyword.
   - There are three types of execution contexts in JavaScript: Global Execution Context, Function Execution Context, and Eval Execution Context.
   - The Global Execution Context is created when the script is run, and it's where code that is not inside any function is executed.
   - Function Execution Context is created whenever a function is invoked. Each function call creates a new execution context


2. **Hoisting:**
   - Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase.
   - Variable declarations are hoisted but not their initializations. This means you can access a variable before it's declared, but its value will be undefined.
   - Function declarations are fully hoisted, allowing you to call a function before it's defined in the code.

By understanding execution context and hoisting, you'll gain insights into how JavaScript code is executed and how variables and functions are scoped and accessed. In our upcoming class, we'll delve deeper into these concepts with hands-on examples and exercises to solidify your understanding.

Happy learning!

See you in Class