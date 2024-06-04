### Question 1

What does the `async` keyword do in JavaScript?

A) Prevents a function from executing  
B) Automatically splits a function's execution into multiple threads  
C) Makes a function return a promise  
D) Converts a synchronous function into an asynchronous function without changing its behavior

**Correct Answer:** C) Makes a function return a promise


---

### Question 2

What is the purpose of the `await` keyword in async functions?

A) To pause the execution of an async function and wait for a Promise to resolve  
B) To create a new Promise  
C) To execute a callback function once a Promise is resolved  
D) To immediately resolve a Promise

**Correct Answer:** A) To pause the execution of an async function and wait for a Promise to resolve

### Explanation:

The `await` keyword is used inside an async function to pause the execution of the function until the Promise followed by `await` is settled (either resolved or rejected). The function execution resumes with the resolved value of the Promise, or throws an error if the Promise is rejected.

---

### Question 3

What happens if you try to use the `await` keyword outside an async function?

A) It throws a syntax error  
B) The `await` keyword is ignored, and the promise is not awaited  
C) It causes the script to pause execution indefinitely  
D) It automatically converts the surrounding function into an async function

**Correct Answer:** A) It throws a syntax error

### Explanation:

The `await` keyword can only be used inside an async function. If you try to use it outside of an async function, JavaScript will throw a syntax error, indicating that the `await` keyword is in an invalid context. This enforces the rule that waiting for asynchronous operations (in this syntactical way) must occur within asynchronous functions.