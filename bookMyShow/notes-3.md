---
title:Agenda
description:
duration: 900
card_type: cue_card
---

1. Bearer Token Validation with AuthMiddleware 
2. axios Instance to get current user 
3. Protected Component (Route)
3. Setting up Redux for State management




---
title: Bearer Token Validation with AuthMiddleware 
description:
duration: 900
card_type: cue_card
---

## Bearer token Getting this for Local storage

In this code, the `authorization` field within the headers is being set up for an Axios instance. Here's a detailed explanation of what's happening:

### Code Explanation

1. **Importing Axios:**
   ```javascript
   import axios from 'axios'
   ```
   This line imports the Axios library, which is used to make HTTP requests from the browser.

2. **Creating an Axios Instance:**
   ```javascript
   export const axiosInstance = axios.create({
       headers : {
           'Content-Type' : 'application/json',
           'authorization' : `Bearer ${localStorage.getItem('token')}`
       }
   })
   ```
   This code creates a new instance of Axios with custom default settings, specifically setting the headers that will be included with every request made by this instance.

### Detailed Explanation of the `authorization` Field

- **Headers Configuration:**
  ```javascript
  headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
  }
  ```
  The headers object contains key-value pairs that specify HTTP headers to be included in every request made by this Axios instance.

- **Content-Type:**
  ```javascript
  'Content-Type': 'application/json'
  ```
  This header indicates that the body of the request will be in JSON format. It is commonly used in APIs that accept JSON-encoded data.

- **Authorization:**
  ```javascript
  'authorization': `Bearer ${localStorage.getItem('token')}`
  ```
  This header is used for authentication and authorization purposes. Let's break it down:

  - **Bearer Token:**
    The `authorization` header uses the "Bearer" authentication scheme. Bearer tokens are typically used in OAuth 2.0 protocols for accessing resources on behalf of a user.

  - **Retrieving the Token:**
    ```javascript
    ${localStorage.getItem('token')}
    ```
    The `localStorage.getItem('token')` retrieves a token stored in the browser's local storage. This token is usually set when a user logs in or authenticates.

  - **Template Literal:**
    The backticks (`` ` ``) indicate a template literal, which allows for embedding expressions (such as `${localStorage.getItem('token')}`) within strings. The resulting string is something like:
    ```plaintext
    Bearer some-token-value
    ```

### Example Scenario

Suppose a user logs in to an application and the server responds with a JWT (JSON Web Token). This token is stored in the browser's local storage:
```javascript
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
```

When making API requests using the `axiosInstance`, the `authorization` header will include this token:
```plaintext
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Importance of the `authorization` Header

- **Authentication:**
  The server uses the token to verify the identity of the client making the request. This is essential for accessing protected resources or endpoints that require authentication.

- **Security:**
  By including the token in the header, sensitive information is kept secure during transmission. The server can validate the token and ensure that the request is from an authenticated user.

In summary, the `authorization` field in the headers object of the Axios instance is crucial for making authenticated requests to a server, ensuring that only authorized users can access protected resources.


### Building the Auth Middleware Get Current user Route

First of all create a `middlewares` names directory and create the `authMiddleware `


## Code for AuthMiddleware ->

```js
const jwt = require("jsonwebtoken");

module.exports = function(req , res , next) {
try {
const token = req.headers.authorization.split(" ")[1];
const verifiedtoken = jwt.verify(token, process.env.secret_key_jwt);
req.body.userId = verifiedtoken.userId;
next();
} catch (error) {
res.status(401).send({ success: false, message: "Token Invalid" });
}
}


```


## Code for getCurrent user Route (this route will be added in the userRoutes File only) refer code to see the location (Server-> routes-> userRoutes)


```js
router.get("/get-current-user", authMiddleware, async (req, res) => {
const user = await User.findById(req.body.userId).select("-password");

res.send({
success: true,
message: 'You are authorized to go to the protected route!',
data: user
})
});
```

 Let's break down what each of these code snippets does and how they relate to the Axios instance you previously created.

### Middleware: `authMiddleware`

This middleware function is responsible for verifying the JWT token included in the authorization header of incoming requests. Here's the breakdown:

1. **Importing the `jsonwebtoken` library:**
   ```javascript
   const jwt = require("jsonwebtoken");
   ```
   This library is used to work with JSON Web Tokens (JWT).

2. **Middleware Function:**
   ```javascript
   module.exports = function(req, res, next) {
     try {
       const token = req.headers.authorization.split(" ")[1];
       const verifiedtoken = jwt.verify(token, process.env.secret_key_jwt);
       req.body.userId = verifiedtoken.userId;
       next();
     } catch (error) {
       res.status(401).send({ success: false, message: "Token Invalid" });
     }
   }
   ```
   - **Extracting the Token:**
     ```javascript
     const token = req.headers.authorization.split(" ")[1];
     ```
     The `authorization` header is split by a space (`" "`), and the second part (`split(" ")[1]`) is extracted, which is the token itself.

   - **Verifying the Token:**
     ```javascript
     const verifiedtoken = jwt.verify(token, process.env.secret_key_jwt);
     ```
     The token is verified using a secret key (`process.env.secret_key_jwt`). If the token is valid, it returns the decoded token.

   - **Attaching User ID to Request:**
     ```javascript
     req.body.userId = verifiedtoken.userId;
     ```
     The `userId` from the verified token is attached to the `req.body`, making it accessible in subsequent middleware or route handlers.

   - **Proceeding to the Next Middleware:**
     ```javascript
     next();
     ```
     If the token is valid, the request proceeds to the next middleware or route handler.

   - **Handling Errors:**
     ```javascript
     res.status(401).send({ success: false, message: "Token Invalid" });
     ```
     If the token is invalid or an error occurs, a 401 Unauthorized response is sent.

### Route: `/get-current-user`

This route uses the `authMiddleware` to ensure that only authenticated requests can access it. Here's the breakdown:

1. **Defining the Route:**
   ```javascript
   router.get("/get-current-user", authMiddleware, async (req, res) => {
   ```
   This route listens for GET requests at the `/get-current-user` endpoint and uses the `authMiddleware` for authentication.

2. **Fetching the User:**
   ```javascript
   const user = await User.findById(req.body.userId).select("-password");
   ```
   The user ID, which was attached to `req.body` by the middleware, is used to find the user in the database. The `select("-password")` method excludes the password field from the returned user data.

3. **Sending the Response:**
   ```javascript
   res.send({
     success: true,
     message: 'You are authorized to go to the protected route!',
     data: user
   });
   ```
   If the user is found, a success response is sent back with the user data (excluding the password).

### Relation to Axios Instance

The Axios instance you created includes an `authorization` header with a Bearer token:
```javascript
headers: {
  'Content-Type': 'application/json',
  'authorization': `Bearer ${localStorage.getItem('token')}`
}
```

- **Token Inclusion:**
  When a request is made using this Axios instance, it automatically includes the `authorization` header with the JWT token retrieved from `localStorage`.

- **Middleware Verification:**
  The `authMiddleware` extracts this token from the `authorization` header of the incoming request and verifies it using the secret key. If the token is valid, it allows the request to proceed to the protected route.

- **Route Handling:**
  Once the middleware verifies the token and attaches the `userId` to the request body, the `/get-current-user` route handler uses this `userId` to fetch and return the authenticated user's data.

In summary, the Axios instance ensures that each request includes the necessary token for authentication. The middleware then verifies this token to authorize access to protected routes, and the route handler fetches and returns user-specific data based on the verified token.


Test Upto this point in postman to see if the user data is coming up when we pass the bearer token with the request.


Take some time to explain al of these things that we just did to the learners again 

---
title: Axios Instance to get Current user
description:
duration: 900
card_type: cue_card
---


Inside your calls folder in the file `users.js` add one more function like this

```js

export const GetCurrentUser = async () =>{
       try {
           const response = await axiosInstance.get('api/users/get-current-user')
           return response.data
       } catch (error) {
          console.log(error)
       }
}
```

This function is making an authenticated request to the `/get-current-user` endpoint using the `axiosInstance` we discussed earlier. Here’s a short breakdown in relation to the previous response:

1. **Making the Request:**
   ```javascript
   const response = await axiosInstance.get('api/users/get-current-user');
   ```
   This line uses the `axiosInstance` to send a GET request to the `/get-current-user` endpoint. Because the `axiosInstance` includes the `authorization` header with the JWT token, this request will contain the token needed for authentication.

2. **Handling the Response:**
   ```javascript
   return response.data;
   ```
   If the request is successful, the function returns the response data, which includes information about the authenticated user (as returned by the route handler).

3. **Error Handling:**
   ```javascript
   } catch (error) {
      console.log(error);
   }
   ```
   If there’s an error (e.g., if the token is invalid or the server returns an error), it catches the error and logs it to the console.

### Relation to Previous Response

- **Token Verification:**
  The `axiosInstance` automatically includes the `authorization` header with the JWT token. The middleware on the server verifies this token before allowing access to the `/get-current-user` endpoint.

- **Accessing Protected Route:**
  Upon verification, the server retrieves the user information based on the `userId` attached by the middleware and sends this data back in the response.

- **Returning User Data:**
  This function captures the user data from the response and returns it, allowing the calling code to use the authenticated user's information.



---
title: Protected Route
description:
duration: 900
card_type: cue_card
---


Create a Home page , A bare minimum compoenet for now inside the pages folder 


```js
import React from 'react'

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home
```



Now Go to Client folder and create a directory by the name `Components` and add your first component as `ProtectedRoute.js`


Let's now build this protected component which will check if the token exists and will validate it and can get the current user


```javascript
import React from 'react'

const ProtectedRoute = ({childern}) => {
    return {
        <div>{children}</div>
    }
}
export default ProtectedRoute
```
Here,
**childern (home page):** We want to make our Home PAge Protected

In our app.js add this with login and register routes

```js

 <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

```

### Redux
As we move further manging a state is diffcult which is why we'll be using redux and then we will continue building the Protected Route

```javascript
npm install @reduxjs/toolkit
npm install react-redux
```

We're using redux here to basically use a loader whenever a user logs in

Three files can be created as following
```javascript
/redux
- loaderSlice.js
- store.js
- userSlice.js

```
**loaderSlice.js**
```javascript!
import {createSlice} from '@reduxjs/toolkit';

const loadersSlice = createSlice({
    name: "loaders",
    initialState: {
        loading: false,
    },
    reducers: {
        ShowLoading : (state) => {
            state.loading = true;
        },
        HideLoading : (state) => {
            state.loading = false;
        }
    }
});
export const {ShowLoading, HideLoading} = loaderSlice.actions;
export default loadersSlice.reducer;
```

**Store.js**
```javascript
import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loadersSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    loaders: loadersReducer,
    users: usersReducer,
  },
});

export default store;
```

**loaderSlice.js**

```javascript
import {createSlice} from '@reduxjs/toolkit';

const loadersSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading : false,
    },
    reducers: {
        ShowLoading : (state) => {
            state.loading = true;
        },
        HideLoading : (state) => {
            state.loading = false;
        }
    }
});

export const {ShowLoading, HideLoading} = loadersSlice.actions;
export default loadersSlice.reducer;
```

Our second step would be to show details if the existing user tries to login again, so the question here is how to get the details of a particular user

We can get user data from the following 
```javascript
const { user } = useSelector{(state) => state.users}
```

Thus our final `protectedroute.js` is:

```javascript
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../calls/users";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },

    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
            onClick={() => {
              if (user.role === 'admin') {
                navigate("/admin");
              } else if (user.role === 'partner') {
                navigate("/partner");
              } else {
                navigate("/profile");
              }
            }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },

        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      console.log(response)
      dispatch(setUser(response.data));
      dispatch(hideLoading());
      // Hide Loader
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;


```

## Explanation

Here's a brief explanation of the functions and their workings in the provided code:

1. **ProtectedRoute Component**:
   - This is a React functional component that ensures only authenticated users can access its children components.
   - It uses various hooks (`useState`, `useEffect`, `useDispatch`, `useSelector`, and `useNavigate`) to manage state and side effects, dispatch actions, select state from the Redux store, and navigate between routes, respectively.

2. **useSelector Hook**:
   - `const { user } = useSelector((state) => state.user);`
   - This hook extracts the `user` state from the Redux store. It ensures that the component reacts to any changes in the `user` state.

3. **useDispatch Hook**:
   - `const dispatch = useDispatch();`
   - This hook returns the Redux `dispatch` function, which is used to dispatch actions to the Redux store.

4. **useNavigate Hook**:
   - `const navigate = useNavigate();`
   - This hook provides a way to navigate programmatically in the React Router DOM.

5. **navItems**:
   - This array defines the items to be displayed in the navigation menu. Each item has a `label`, `icon`, and potentially `children` for nested menu items.

6. **getValidUser Function**:
   - This asynchronous function retrieves the current user's data by making an API call via `GetCurrentUser`.
   - `dispatch(showLoading())` shows a loading indicator.
   - If the API call is successful, it dispatches the `setUser` action to update the user state in the Redux store and hides the loading indicator.
   - If the API call fails, it dispatches the `setUser` action with `null` to reset the user state and displays an error message.

7. **useEffect Hook**:
   - This hook runs once when the component mounts.
   - It checks if a token is present in `localStorage`.
   - If a token is found, it calls the `getValidUser` function to validate the user.
   - If no token is found, it navigates the user to the login page.

8. **Return Statement**:
   - The component conditionally renders its children only if the `user` state is not `null`.
   - It uses Ant Design's `Layout` and `Header` components to create a sticky header with a navigation menu.
   - The `Menu` component is populated with `navItems`.

The overall functionality of the `ProtectedRoute` component is to provide a layout with a navigation menu that is accessible only to authenticated users. If the user is not authenticated, they are redirected to the login page.



## Summary so far
To sum up we have the following: 
* `userRoute.js` file
* Get current user route
* Middleware
* **API calls**: In order to get the current user
* **Redux**: contains slices and store.js files
* `Protected route.js` file

---
title: Login
description:
duration: 900
card_type: cue_card
---

## Login
In order to prevent the user from going back to login page after logging in we can do the following 

```javascript
useEffect{() => {
    if(localStorage.getItem("token")){
        navigate("/");
    }
}, []};
```

The Protected Route has been Build and now will work as we want it to 

In the next class we will be moving forward with our Movies API and Theatre API for users with diffrent Permissions.