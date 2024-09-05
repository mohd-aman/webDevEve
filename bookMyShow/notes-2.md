# Full Stack LLD & Projects: FullStack-5: Project Part 2- (Creating User's & Admins Route)
## Agenda
* Setup proxy to connect client and server
* Establish Axios and Axios Instance
* Establish Register and Login from the Client

Now as we have our Pages and Form created and we have also created our Server side Routes for `Login` and `Register` Now we will connect our client and server with using proxy 

In Your Package.json file at the bottom add this line mentioning the port in which you are running the server
```js
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^5.14.1",
    "axios": "^1.6.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:8081"
}
```

### Proxy in `package.json`

The `proxy` field in the `package.json` file of a Create React App project is used to redirect API requests during development to avoid CORS issues. 

### How it Works

1. **Setup:**
   In your `package.json`, you have:
   ```json
   "proxy": "http://localhost:8081"
   ```

2. **Request Interception:**
   When your React app (running on `http://localhost:3000`) makes an API request to, say, `/api/data`, the development server intercepts it.

3. **Forwarding:**
   The development server forwards this request to `http://localhost:8081/api/data`.

4. **Response Handling:**
   The backend server at `http://localhost:8081` processes the request and sends back the response. The development server then forwards this response back to your React app.

### Benefit

This setup helps you avoid CORS issues by making the browser think the API requests are coming from the same origin. 


Now in your Client Side Install `axios`

`npm install axios`

You are already familiar with axios as we have used this in our movies app with React , but there we only saw how to get data from an API , but axios is alot more it can handle post , put , delete methods as well from the client.

First we will set up axios and then will see how to use it for different requests

Inside your `src` directory create a directory by the name calls , in this directory we will have all our axios calls

Create a file by the name `index.js` inside it and add this code 

```js
import axios from 'axios'


export const axiosInstance = axios.create({
    headers : {
        'Content-Type' : 'application/json'
    }
})
```

This code snippet is setting up a custom instance of Axios, a popular HTTP client library for making HTTP requests in JavaScript, often used in front-end frameworks like React. Here's a breakdown of what the code is doing:

1. **Importing Axios**:
   ```javascript
   import axios from 'axios';
   ```
   This line imports the `axios` library so it can be used in the file.

2. **Creating an Axios Instance**:
   ```javascript
   export const axiosInstance = axios.create({
       headers: {
           'Content-Type': 'application/json'
       }
   });
   ```
   - `axios.create({ ... })`: This method is used to create a new Axios instance with a custom configuration.
   - The configuration object passed to `axios.create` includes a `headers` property, which sets default headers for all requests made using this instance.
   - `headers: { 'Content-Type': 'application/json' }`: This sets the `Content-Type` header to `'application/json'` for all requests made using this Axios instance. The `Content-Type` header indicates that the data being sent in the HTTP request is in JSON format.

### Why Use an Axios Instance?

Creating an Axios instance with custom configuration can be useful for several reasons:

- **Default Configuration**: You can set default headers, base URLs, timeouts, and other settings that will apply to all requests made with this instance, ensuring consistency across your API calls.
- **Custom Interceptors**: You can add request or response interceptors to handle things like authentication tokens or logging for all requests made with this instance.
- **Reusability**: Having a pre-configured instance makes it easy to reuse the same settings across different parts of your application.


Now create a file with the name inside the same `calls` directory with the name `users.js` this file will have all the user related calls for `register` `login` etc.


Inside the file `users.js` write your first axios instance

```js
const {axiosInstance} = require('./index')

//Register new User

export const RegisterUser = async (value) => {
    try{
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    }catch(err){
        console.log(err);
    }
}
```

Let's break down and explain the code step by step:

### 1. Importing axiosInstance
```javascript
const {axiosInstance} = require('./index');
```
This line imports `axiosInstance` from the `index` file in the same directory. `axiosInstance` is presumably a configured instance of Axios, which is a promise-based HTTP client for the browser and Node.js. By using an instance, you can set default configurations (like base URL, headers, etc.) that apply to all requests made using that instance.

### 2. Exporting RegisterUser Function
```javascript
export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
```
This part of the code defines and exports an asynchronous function `RegisterUser`. Let's break down this function:

#### a. Function Definition
```javascript
export const RegisterUser = async (value) => {
```
The `RegisterUser` function is declared as an asynchronous function using `async`. This means it will return a promise and you can use `await` inside it to handle asynchronous operations more conveniently.

#### b. Try Block
```javascript
try {
    const response = await axiosInstance.post("api/users/register", value);
    return response.data;
} catch (err) {
    console.log(err);
}
```
The function uses a try-catch block to handle errors that might occur during the HTTP request.

##### i. Making a POST Request
```javascript
const response = await axiosInstance.post("api/users/register", value);
```
Here, an HTTP POST request is made using the `axiosInstance`. The URL endpoint for this request is `"api/users/register"`, and the data to be sent with the request is `value`, which is passed as an argument to the function. 

- **POST Method:** The `post` method is used to create a new resource on the server. In this case, it is registering a new user.
- **Endpoint:** `"api/users/register"` is the API endpoint where the request is sent.
- **Data:** `value` is an object containing the user information to be registered.

##### ii. Returning Response Data
```javascript
return response.data;
```
If the request is successful, the function returns the `data` property from the response. `response.data` contains the data returned from the server, typically including information about the newly registered user.

#### c. Catch Block
```javascript
} catch (err) {
    console.log(err);
}
```
If an error occurs during the request, it is caught in the catch block. The error is logged to the console using `console.log(err);`. This helps in debugging by providing information about what went wrong during the HTTP request.

### Summary
- The function `RegisterUser` is designed to register a new user by sending a POST request to the specified API endpoint with user data.
- It uses an `axiosInstance` for making the HTTP request, which is likely configured elsewhere in the application.
- The function handles potential errors using a try-catch block, logging any errors to the console.
- Upon successful registration, it returns the response data from the server.

This is a basic example of how to use Axios for making HTTP requests in a Node.js application with proper error handling.





Now we will use this exported  function `RegisterUser`in our `Register.js` page

Go to pages-> Register and import the function `RegisterUser` and add this function onFinish

```js
import React from "react";
import {Form, Input, Button, Radio, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from "../calls/users"; // Register User imported


function Register() {


// Newly added onFinish functions which takes form data and calls the RegisterUser function with the form data 
const onFinish = async (values)=>{
  try {
    const response = await RegisterUser(values)
    if(response.success){
     message.success(response.message)
    }
    else{
     message.error(response.message)
    }
  } catch (error) {
   message.error(error.message)
  }
}
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Register to BookMyShow</h1>
          </section>
          <section className="right-section">
   
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  rules={[{ required: true, message: "Email is required!" }]}
                ></Input>
              </Form.Item>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                ></Input>
              </Form.Item>
    

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;

```

The provided code is a React component that renders a registration form using the Ant Design library. The form includes fields for the user's name, email, and password. Here's an explanation of the `onFinish` part and form submission in the code:

### `onFinish` Function

The `onFinish` function is an asynchronous function that is called when the form is successfully submitted. The `values` parameter contains the data entered by the user in the form fields. Here's a step-by-step explanation of what happens inside `onFinish`:

1. **Async/Await**: The function is marked as `async` to allow the use of `await` for handling asynchronous operations.

2. **Try/Catch Block**: The function uses a try/catch block to handle potential errors that may occur during the form submission process.

3. **API Call**: The function calls the `RegisterUser` function, passing the `values` as an argument. This function likely sends a POST request to the server to register the user with the provided details.

4. **Response Handling**:
    - If the registration is successful (`response.success` is `true`), a success message is displayed using `message.success`.
    - If the registration fails (`response.success` is `false`), an error message is displayed using `message.error`.

5. **Error Handling**: If an error occurs during the API call, the catch block catches it and displays an error message using `message.error`.

### Form Submission

The form submission is handled by Ant Design's `Form` component:

1. **Form Component**: The form is created using the `Form` component from Ant Design. The `onFinish` prop is set to the `onFinish` function, which means that when the form is submitted successfully (i.e., all validation rules pass), the `onFinish` function is called.

2. **Form.Item Components**: Each input field is wrapped in a `Form.Item` component, which provides the validation and layout for the field. The `name` prop in each `Form.Item` matches the keys in the `values` object passed to the `onFinish` function.

3. **Validation Rules**: Each `Form.Item` has a `rules` prop that defines the validation rules for the input field. For example, the `name` field is required, and if it's empty, the message "Name is required!" is displayed.

4. **Submit Button**: The submit button has the `htmlType` set to `submit`, which means clicking the button will trigger the form submission. When the form is submitted, Ant Design automatically performs validation, and if all fields are valid, the `onFinish` function is called with the form values.

### Example Code Explanation

```jsx
<Form layout="vertical" onFinish={onFinish}>
  <Form.Item
    label="Name"
    name="name"
    rules={[{ required: true, message: "Name is required!" }]}
  >
    <Input placeholder="Enter your name" />
  </Form.Item>
  <Form.Item
    label="Email"
    name="email"
    rules={[{ required: true, message: "Email is required!" }]}
  >
    <Input type="email" placeholder="Enter your email" />
  </Form.Item>
  <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: "Password is required!" }]}
  >
    <Input type="password" placeholder="Enter the password" />
  </Form.Item>
  <Form.Item>
    <Button block type="primary" htmlType="submit">
      Sign Up
    </Button>
  </Form.Item>
</Form>
```

- The form is set to a vertical layout.
- The `onFinish` prop specifies the function to be called on successful submission.
- Each `Form.Item` defines a form field with a label, input type, placeholder, and validation rules.
- The submit button triggers the form submission, which calls `onFinish` with the form values if all validations pass.

In summary, the `onFinish` function handles the form submission, performs an API call to register the user, and displays appropriate messages based on the success or failure of the registration. The form submission process is managed by Ant Design's `Form` component, which validates the fields and triggers the `onFinish` function with the form values.


Test uptill this point and see if the Register Instance works 


Similary now add an Axios Instance for the Login in the same way we have added it for register , just the route will change from `resgiter` to `login` , add this in the same file 

src-> calls-> users.js


```js
// login user

export const LoginUser = async (value) =>{
    try {
        const response = await axiosInstance.post("api/users/login", value);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
```

The `LoginUser` function is an asynchronous function designed to log in a user. Here's a short explanation of what this code is doing:

1. **Function Declaration**: The `LoginUser` function is declared as an asynchronous function, meaning it returns a promise.
2. **HTTP POST Request**: The function makes a POST request to the endpoint `"api/users/login"` using `axiosInstance` and sends `value` (which contains the login credentials) as the request body.
3. **Returning Response Data**: If the request is successful, it returns the `data` property from the response, which typically includes information such as a token or user details.
4. **Error Handling**: If an error occurs during the request, it is caught in the catch block, and the error is logged to the console.

In summary, this function attempts to log in a user by sending their credentials to the server and returns the server's response data or logs an error if the request fails.

Now Similary add the OnFinish Function in Login and if the user will be able to successfully login we will send the user to the home page by using the `useNaviagte` from `react-router-dom`

```js
import React from 'react'
import { Button, Form, Input } from "antd";
import { Link , useNavigate } from "react-router-dom";
import { LoginUser } from '../calls/users';
import {message} from 'antd'


function Login() {
  const navigate = useNavigate()
  const onFinish = async (values)=>{
    try {
      const response = await LoginUser(values)
      if(response.success){
       message.success(response.message)
       navigate('/')
      }
      else{
       message.error(response.message)
      }
    } catch (error) {
     message.error(error.message)
    }
  }
  return (
    <>
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>

        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
    
          <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  </>
  )
}

export default Login
```

In the provided code, the `onFinish` method and `useNavigate` from React Router are used for handling form submission and navigation in a React component.

### `onFinish` Method
The `onFinish` method is a handler function that is triggered when the form is successfully submitted. Here is a detailed explanation of its functionality:

1. **Async/Await Function**: The `onFinish` method is an asynchronous function, which means it can handle asynchronous operations using the `await` keyword.
   
2. **Form Values**: It takes `values` as a parameter, which contains the form data entered by the user.

3. **API Call**: 
    - It calls `LoginUser(values)`, an asynchronous function that presumably sends the login credentials to a server for authentication.
    - `await` is used to wait for the response from the server.

4. **Success Handling**:
    - If the `response.success` is `true`, a success message is displayed using `message.success(response.message)`.
    - The user is then navigated to the home page (`'/'`) using `navigate('/')`.

5. **Error Handling**:
    - If the `response.success` is `false`, an error message is displayed using `message.error(response.message)`.

6. **Exception Handling**:
    - Any exceptions during the API call are caught in the `catch` block, and an error message is displayed using `message.error(error.message)`.

### `useNavigate`
The `useNavigate` hook from `react-router-dom` is used to programmatically navigate the user to different routes within the application.

- **Import**: `import { useNavigate } from "react-router-dom";`
- **Usage**: 
    - `const navigate = useNavigate();` initializes the `navigate` function.
    - `navigate('/')` is used to redirect the user to the home page when the login is successful.

### Component Structure
1. **Form Component**:
    - The `Form` component from `antd` is used to create a form with two input fields: email and password.
    - The `onFinish` prop is set to the `onFinish` method, which will be called when the form is submitted.

2. **Form Items**:
    - `Form.Item` components are used to wrap the `Input` components for email and password.
    - Validation rules are provided to ensure that both fields are required.

3. **Button Component**:
    - A `Button` component with `htmlType="submit"` is used to submit the form.

4. **Link to Register**:
    - A `Link` component from `react-router-dom` is used to navigate to the registration page for new users.

### Code Explanation
```jsx
function Login() {
  const navigate = useNavigate(); // Initialize the navigate function

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values); // Call the login API
      if (response.success) {
        message.success(response.message); // Show success message
        navigate('/'); // Navigate to home page
      } else {
        message.error(response.message); // Show error message
      }
    } catch (error) {
      message.error(error.message); // Show error message on exception
    }
  };

  return (
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to BookMyShow</h1>
        </section>
        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input id="email" type="text" placeholder="Enter your Email"></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input id="password" type="password" placeholder="Enter your Password"></Input>
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  );
}

export default Login;
```

This code handles user login, displaying appropriate messages based on the success or failure of the login attempt, and navigates the user to the home page upon successful login.


Now as you have implemented `Login` and `Register` Route and you can now go into `Home` screen.

Now you may have seen that once you login into any app , even you close the window and open that app again you are still logged in and you will not have to validate yourself again and again! have you?

This happens by generating a token from the server side when a user logs in and saving it in the clinet side as well in local storage or as cookies and when a user comes back these two tokens are matched , if match is successfull you will be redirected to the app without the need of login again!  and this token is Know as a JWT token and hence helps us in creating Protected Routes


## JSON Web Token (JWT) in Web Development

### Overview
JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. JWTs are commonly used for authentication and authorization in web applications.

### Components of JWT
A JWT is composed of three parts:
1. **Header**
2. **Payload**
3. **Signature**

These parts are separated by dots (`.`) and are encoded in Base64 URL format.

#### 1. Header
The header typically consists of two parts: the type of token (JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 2. Payload
The payload contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims:
- **Registered claims**: Predefined claims which are not mandatory but recommended, e.g., `iss` (issuer), `exp` (expiration time), `sub` (subject), `aud` (audience).
- **Public claims**: Custom claims created to share information, e.g., `name`, `role`.
- **Private claims**: Custom claims agreed upon between parties, e.g., `user_id`.

Example payload:
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```

#### 3. Signature
To create the signature, the encoded header, encoded payload, a secret, and the algorithm specified in the header are used. For example, if using HMAC SHA256, the signature is created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

### JWT Structure
A JWT looks like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### How JWT Works
1. **Client Authentication**: When a user logs in, the server generates a JWT and sends it back to the client.
2. **Client Storage**: The client stores the JWT (usually in localStorage or a cookie).
3. **Subsequent Requests**: The client includes the JWT in the header of each subsequent request to the server, usually in the `Authorization` header as a Bearer token.
   ```
   Authorization: Bearer <token>
   ```
4. **Server Validation**: The server validates the JWT using the secret key. If the JWT is valid, the server processes the request; otherwise, it rejects the request.

### Benefits of Using JWT
- **Stateless**: The server does not need to store session information, making it easier to scale.
- **Compact**: JWTs are small in size, making them suitable for being sent via URLs, POST parameters, or inside HTTP headers.
- **Self-contained**: JWTs contain all the necessary information about the user, eliminating the need for multiple database queries.

### Use Cases
- **Authentication**: Ensures that the client is logged in before accessing protected routes.
- **Information Exchange**: Securely transfers information between parties, ensuring data integrity and authenticity.


## JWT Generation


* JWT stands for **JSON Web Token**.
* Tell the students that in most of the websites, we do not need to login again and again. In sites like FB, Instagram, when we login before, it does not ask us to login again whenever we open the app. It is possible because of **JWT**.
* JWT is important to get logged in for a particular session. 
* Send [JWT](https://jwt.io/) token link to the students.
* JWT tokens are unique for each session.

### Generate Tokens
 Let us try to generate a unique token for in our `userRoute.js` file for login.
 
 We will first require the jwt package. 
 
 ```javascript
 const jwt = require('jsonwebtoken')
 ```
 
 We will define a `token` variable and use the `sign` method that creates a token. We have to pass it an ID for it to generate a token. 
 
In our `.env` file, we will define `jwt-secret` is a text that you create by yourself. It should not be exposed which might cause harm to the system. 

In our case, we will assign it-
```javascript
jwt_secret = scaler-movies
```

The `expiresIn` function is used to mention for how much time we want the token to remain alive. 
 ```javascript!
 const token = jwt.sign({userId : user._id} , process.env.jwt_secret , {expiresIn :"1d"})

console.log(token)
````

Using the above token, a session will be available to us. A session is a time period. In the above example, we have used `1d` which means 1 day. The token is alive for 1 day and will expire after it.

We will also send data as token using the following-

```javascript
 res.send({
        success : true,
        message : 'User Logged in',
        data : token
})
```
In the Postman app, let us try to login and check whether we receive tokens or not. 

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/051/345/original/upload_737138f77bbf2405b8dd1a6bccbd797e.png?1695973009)


Now, paste the data part as selected above and let us go to the JWT website and paste it.

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/051/346/original/upload_ccaf8a491276cc6f0702d41fa1e16f30.png?1695973028)

In the payload part, you can see the `userId` starts with `64` and ends with `56`. Now, when we check in database in postman, we can see the a user with same starting and ending id. 

If you want to check for which particular user a token was generated, we can go to JWT website, paste the token and get the ID of that user. 

In our frontend, we will be going to our `index.js` file and setting the token in our local storage. 

```javascript
 if(response.success){
        message.success(response.message)
        localStorage.setItem('token' , response.data)
        window.location.href = "/";
       }
```
The token saved as `response.data` will be saved as token in the local storage. That token will be saved for the time period set by us earlier.

Many times we see the message **session expired** that means the token saved in the local storage has gone. 

we login again now. After logging in we can see under the Applications tab and under local storage the token being stored. 

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/051/347/original/upload_86e590e42dbba2888f15677de6f5857f.png?1695973053)


Now you See a Token has been Generated for the logged in user and also saved in the localstorage


In the next class we will create a Protected Route with the help of JWT validation and verification so a valid user will be only able to go inside the web app.

More on Protected Routes and it's details in the next class

Start the Doubt session







