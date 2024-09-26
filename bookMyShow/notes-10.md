

1. Hashing Password with Bcrypt
2. Rate Limiter
3. Helmet
4. SQL Injection
5. Deploying The app




---
title:Hashing Password with Bcrypt
description:
duration: 900
card_type: cue_card
---

This is How our Register Route Looks right now

```js

const router = require('express').Router();
const User = require('../models/userModel');

// Register a user
router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.send({
        success: false,
        message: 'User Already Exists'
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.send({ success: true, message: 'Registration Successful, Please login' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
```

### Explanation of the Current Route and Password Storage

The provided route handles user registration but stores the password in plain text in the database, which is insecure. If an attacker gains access to the database, they can easily read all user passwords. 

Now lets understand why it is suggested to not use commonly used passwords like password, 12345678


For a given input, if we know the algo, the generated hash will be always same

To store passwords securely, we can use a hashing algorithm like bcrypt.

### What is Bcrypt?

Bcrypt is a password hashing function that incorporates a salt to protect against rainbow table attacks. It’s designed to be computationally intensive to slow down brute-force attacks.

### Encryption, Decryption, Hashing, and Salt

**Encryption and Decryption:**
- **Encryption** is a reversible process that transforms data into an unreadable format using a key. Only with the corresponding decryption key can the original data be restored.
- **Decryption** is the process of converting the encrypted data back to its original form using a decryption key.

**Hashing:**
- **Hashing** is a one-way process that converts data into a fixed-length string of characters. It is designed to be irreversible. This is useful for storing passwords because even if the hash is exposed, the original password cannot be easily recovered.

**Salt:**
- **Salt** is a random string added to the password before hashing to ensure that even if two users have the same password, their hashes will be different. It protects against precomputed attacks like rainbow tables.

### Steps to Securely Store Passwords using Bcrypt

1. **Install bcrypt:**
   ```sh
   npm install bcrypt
   ```

2. **Modify the registration route to hash passwords:**

   ```javascript
   const bcrypt = require('bcrypt');
   const router = require('express').Router();
   const User = require('../models/userModel');

   // Register a user
   router.post('/register', async (req, res) => {
     try {
       const userExists = await User.findOne({ email: req.body.email });

       if (userExists) {
         return res.send({
           success: false,
           message: 'User Already Exists'
         });
       }

       // Hash the password
       const saltRounds = 10; // The higher the number, the more secure but slower the hashing process
       const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

       const newUser = new User({
         ...req.body,
         password: hashedPassword // Store the hashed password
       });

       await newUser.save();

       res.send({ success: true, message: 'Registration Successful, Please login' });
     } catch (error) {
       console.log(error);
       res.status(500).send({ success: false, message: 'Server Error' });
     }
   });

   module.exports = router;
   ```

### Detailed Explanation:

1. **Salting and Hashing Password:**
   - `bcrypt.hash(req.body.password, saltRounds)`: This function takes the plain text password and a salt round factor. It generates a random salt and combines it with the password before hashing. The result is a secure, hashed version of the password.

2. **Saving the Hashed Password:**
   - The hashed password is stored in the database instead of the plain text password. This ensures that even if the database is compromised, the actual passwords are not exposed.

### Example of Hash Verification during Login:

To verify the hashed password during login, compare the provided password with the stored hash:

```javascript
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/userModel');

// Login a user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: 'User Not Found'
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: 'Invalid Credentials'
      });
    }

    res.send({ success: true, message: 'Login Successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
```

### Explanation of Login Verification:

1. **Password Comparison:**
   - `bcrypt.compare(req.body.password, user.password)`: This function compares the plain text password provided during login with the stored hashed password. If they match, the login is successful.

By using bcrypt, we ensure that passwords are stored securely and protect user data from potential breaches.

---
title: Rate Limiter
description:
duration: 900
card_type: cue_card
---

### What is a Rate Limiter?

A rate limiter is a mechanism used to control the number of requests a client can make to a server within a specific time frame. This helps to prevent abuse, ensure fair usage, and protect the server from being overwhelmed by too many requests in a short period. Rate limiting is commonly used to:

1. **Prevent Denial of Service (DoS) attacks:** By limiting the number of requests, the server can avoid being overwhelmed by malicious users.
2. **Manage API usage:** Ensures that no single user consumes too many resources, ensuring fair usage across all users.
3. **Reduce server load:** Helps in managing server load and ensuring consistent performance.
4. **Enhance security:** Protects against brute-force attacks, where an attacker tries to guess credentials by making multiple requests.

### Implementing a Rate Limiter in an Express Application

To implement a rate limiter in your Express application, you can use the `express-rate-limit` middleware. Below are the steps to add a rate limiter to your existing Express application.

1. **Install `express-rate-limit`**:
   ```sh
   npm install express-rate-limit
   ```

2. **Modify your Express application to use the rate limiter**:

```javascript
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const app = express();

const userRoutes = require('./routes/userRoutes');
const movieRoute = require('./routes/movieRoutes');
const theatreRoute = require('./routes/theatreRoute');
const showRoute = require('./routes/showRoute');
const bookingRoute = require('./routes/bookingRoute');

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(cors());
app.use(express.json());

// Apply rate limiter to all API routes
app.use('/api/', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoute);
app.use('/api/theatres', theatreRoute);
app.use('/api/shows', showRoute);
app.use('/api/bookings', bookingRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('server running');
});
```

### Explanation

1. **Install `express-rate-limit`**: This middleware helps in setting up rate limiting in your Express application.
2. **Require `express-rate-limit`**: Add `rateLimit` to your list of required modules.
3. **Configure the rate limiter**: The `apiLimiter` variable configures the rate limiter with a time window of 15 minutes and a maximum of 100 requests per IP within that window. If the limit is exceeded, a message is sent to the client.
4. **Apply the rate limiter**: The `app.use('/api/', apiLimiter)` line applies the rate limiter to all routes that start with `/api/`.

By following these steps, you can add a rate limiter to your Express application to help protect against abuse and ensure fair usage of your server resources.


---
title: Helmet
description:
duration: 900
card_type: cue_card
---

### What is `helmet`?

`helmet` is a collection of middleware functions for Express.js applications that help secure your app by setting various HTTP headers. It's designed to protect your app from some well-known web vulnerabilities by configuring HTTP headers appropriately.

### Key Features of `helmet`

1. **XSS Protection**: Helps in preventing Cross-Site Scripting (XSS) attacks.
2. **HSTS (HTTP Strict Transport Security)**: Forces HTTPS connection to the server.
3. **Content Security Policy (CSP)**: Helps in preventing a wide range of attacks, including XSS and data injection attacks.
4. **Hide Powered-By Header**: Removes the `X-Powered-By` header, which can give attackers useful information about your stack.
5. **NoSniff**: Prevents browsers from trying to guess (“sniff”) the MIME type, which can have security implications.
6. **Frameguard**: Helps to prevent clickjacking by controlling whether the browser allows your site to be framed.

### Installing and Using `helmet` in Your Express Application

1. **Install `helmet`**:
   ```sh
   npm install helmet
   ```

2. **Modify your Express application to use `helmet`**:

```javascript
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const app = express();

const userRoutes = require('./routes/userRoutes');
const movieRoute = require('./routes/movieRoutes');
const theatreRoute = require('./routes/theatreRoute');
const showRoute = require('./routes/showRoute');
const bookingRoute = require('./routes/bookingRoute');

// Use helmet for setting various HTTP headers for security
app.use(helmet());

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(cors());
app.use(express.json());

// Apply rate limiter to all API routes
app.use('/api/', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoute);
app.use('/api/theatres', theatreRoute);
app.use('/api/shows', showRoute);
app.use('/api/bookings', bookingRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('server running');
});
```

### Explanation

1. **Install `helmet`**: Run the command `npm install helmet` to install the package.
2. **Require `helmet`**: Add `helmet` to your list of required modules.
3. **Use `helmet` middleware**: The line `app.use(helmet())` initializes and configures `helmet` to set various HTTP headers for improving security.

### Benefits

- **Improved Security**: Adds multiple layers of security by setting appropriate HTTP headers.
- **Easy to Use**: Integrates seamlessly with Express applications with minimal configuration.
- **Customizable**: Allows you to enable or disable specific middleware functions as per your needs.

By incorporating `helmet` into your Express application, you can enhance the security of your app and protect it against a range of web vulnerabilities.

### Further Reading For Helmet

Certainly! Let's take a closer look at how `helmet` secures your Express application by examining one of the headers it sets: **Content Security Policy (CSP)**.

### Content Security Policy (CSP)

Content Security Policy is an HTTP header that helps prevent cross-site scripting (XSS) attacks, data injection attacks, and other types of code injection attacks by specifying which sources of content are allowed to be loaded and executed by the browser.

### Example of CSP with `helmet`

To see how CSP works with `helmet`, let's modify your Express application to include a custom CSP configuration.

1. **Install `helmet`**:
   ```sh
   npm install helmet
   ```

2. **Modify your Express application to use `helmet` with CSP**:

```javascript
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const app = express();

const userRoutes = require('./routes/userRoutes');
const movieRoute = require('./routes/movieRoutes');
const theatreRoute = require('./routes/theatreRoute');
const showRoute = require('./routes/showRoute');
const bookingRoute = require('./routes/bookingRoute');

// Use helmet for setting various HTTP headers for security
app.use(helmet());

// Custom Content Security Policy (CSP) configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"], // Allow scripts from 'self' and example.com
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
      imgSrc: ["'self'", "data:", "example.com"], // Allow images from 'self', data URLs, and example.com
      connectSrc: ["'self'", "api.example.com"], // Allow connections to 'self' and api.example.com
      fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
      objectSrc: ["'none'"], // Disallow object, embed, and applet elements
      upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
    },
  })
);

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(cors());
app.use(express.json());

// Apply rate limiter to all API routes
app.use('/api/', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoute);
app.use('/api/theatres', theatreRoute);
app.use('/api/shows', showRoute);
app.use('/api/bookings', bookingRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log('server running');
});
```

### Explanation of CSP Configuration

- **defaultSrc**: Specifies the default source for all content types. Here, it's set to `'self'`, which means only content from the same origin is allowed.
- **scriptSrc**: Specifies valid sources for JavaScript. It's set to `'self'` and `example.com`, allowing scripts from your domain and `example.com`.
- **styleSrc**: Specifies valid sources for stylesheets. It's set to `'self'` and allows inline styles (denoted by `'unsafe-inline'`), which is generally unsafe but sometimes necessary.
- **imgSrc**: Specifies valid sources for images. It's set to `'self'`, `data:` URLs, and `example.com`.
- **connectSrc**: Specifies valid sources for fetching resources like AJAX, WebSocket, etc. It's set to `'self'` and `api.example.com`.
- **fontSrc**: Specifies valid sources for fonts. It's set to `'self'` and `fonts.gstatic.com`.
- **objectSrc**: Specifies valid sources for plugins like `<object>`, `<embed>`, and `<applet>`. It's set to `'none'` to disallow all such plugins.
- **upgradeInsecureRequests**: Tells browsers to upgrade insecure requests to HTTPS.

### Benefits of CSP

- **Prevents XSS Attacks**: By specifying allowed sources, CSP helps prevent the execution of malicious scripts.
- **Mitigates Data Injection Attacks**: Ensures that only trusted content is loaded.
- **Enhanced Security**: Provides a robust mechanism to control the resources that can be loaded on your site.

By using `helmet` and configuring CSP, you can significantly enhance the security of your Express application.

---
title: SQL Injection
description:
duration: 900
card_type: cue_card
---

### Explanation of SQL Injection

**SQL Injection** is a code injection technique that exploits a security vulnerability in an application's software by manipulating the SQL queries made to the database. It typically occurs when user input is improperly sanitized and then included in SQL queries, allowing attackers to execute arbitrary SQL commands.

### Example of SQL Injection

Consider a login system where user input directly constructs a SQL query:

```javascript
const userInput = "admin' OR '1'='1";
const query = `SELECT * FROM users WHERE username = '${userInput}' AND password = '${password}'`;
// Resulting query: SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = ''
```

The injected SQL statement always returns true (`'1'='1'`), bypassing the login system.

### Protecting Against SQL Injection Using `express-mongo-sanitize`

To protect against SQL injection, especially when using MongoDB, we can use the `express-mongo-sanitize` npm package. This package sanitizes user input and prevents MongoDB query injection.

### Steps to Integrate `express-mongo-sanitize`

1. **Install the package**:
   ```bash
   npm install express-mongo-sanitize
   ```

2. **Require and use the package in your Express server**:
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const rateLimit = require('express-rate-limit');
   const helmet = require('helmet');
   const mongoSanitize = require('express-mongo-sanitize');
   require('dotenv').config();
   const dbConfig = require('./config/dbConfig');

   const app = express();

   const userRoutes = require('./routes/userRoutes');
   const movieRoute = require('./routes/movieRoutes');
   const theatreRoute = require('./routes/theatreRoute');
   const showRoute = require('./routes/showRoute');
   const bookingRoute = require('./routes/bookingRoute');

   // Use helmet for setting various HTTP headers for security
   app.use(helmet());

   // Rate limiter middleware
   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per windowMs
     message: 'Too many requests from this IP, please try again after 15 minutes'
   });

   app.use(cors());
   app.use(express.json());

   // Sanitize user input to prevent MongoDB Operator Injection
   app.use(mongoSanitize());

   // Apply rate limiter to all API routes
   app.use('/api/', apiLimiter);

   app.use('/api/users', userRoutes);
   app.use('/api/movies', movieRoute);
   app.use('/api/theatres', theatreRoute);
   app.use('/api/shows', showRoute);
   app.use('/api/bookings', bookingRoute);

   const PORT = process.env.PORT || 8081;

   app.listen(PORT, () => {
     console.log('server running');
   });
   ```

### How `express-mongo-sanitize` Works

The `express-mongo-sanitize` package works by checking for keys in objects that begin with `$` or contain `.`. These characters are used in MongoDB queries for operators and thus could be exploited for injection attacks. The middleware strips these characters from the input, effectively sanitizing it.

By adding `app.use(mongoSanitize());`, the server ensures that any malicious input attempting to manipulate MongoDB queries is sanitized, providing a layer of protection against injection attacks.

### Conclusion

In summary, SQL injection is a severe security vulnerability that can be mitigated by sanitizing user inputs. Using `express-mongo-sanitize` in your Express application ensures that user inputs are cleaned, reducing the risk of injection attacks in MongoDB operations.


---
title: Deploying The app
description:
duration: 900
card_type: cue_card
---

Deploying a MERN (MongoDB, Express, React, Node.js) app on Render involves several steps. Here’s a detailed guide to help you through the process:

### Step 1: Prepare Your MERN App

1. **Set Up Your MERN App:** Make sure your MERN app is working perfectly on your local machine. Your app should be divided into client (React) and server (Node.js, Express) directories.
2. **Create a Production Build:** Navigate to your React client directory and run:
   ```bash
   npm run build
   ```
   This will create a production build of your React app in a `build` folder.

### Step 2: Set Up a Git Repository

1. **Initialize a Git Repository:** If you haven’t already, initialize a git repository in the root directory of your project:
   ```bash
   git init
   ```
2. **Commit Your Code:** Add your files and make an initial commit:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```
3. **Push to GitHub:** Create a repository on GitHub and push your code to it:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Step 3: Set Up Render Account and New Web Service

1. **Sign Up or Log In to Render:** Go to [Render](https://render.com/) and sign up or log in to your account.
2. **Create a New Web Service:** Click on the “New” button and select “Web Service.”

### Step 4: Connect to Your GitHub Repository

1. **Authorize GitHub:** Connect Render to your GitHub account if you haven't done so already.
2. **Select Repository:** Choose the repository that contains your MERN app.

### Step 5: Configure the Service

1. **Basic Settings:**
   - **Name:** Choose a name for your service.
   - **Region:** Select a region close to your users.
   
2. **Build Command:** Add the build commands to set up your project. If your server code is in a folder named `server`, you might use:
   ```bash
   cd server && npm install && npm run build
   ```
   
3. **Start Command:** Specify the command to start your server. For example:
   ```bash
   cd server && npm start
   ```
   
4. **Root Directory:** Specify the root directory if your code is not in the root of the repository. If your server code is in a folder named `server`, set this to `server`.

### Step 6: Environment Variables

1. **Add Environment Variables:** Click on “Add Environment Variable” to add any necessary environment variables such as `MONGODB_URI`, `JWT_SECRET`, etc.

### Step 7: Deploy

1. **Deploy Your App:** Click “Create Web Service” to deploy your app. Render will pull the code from your GitHub repository, install dependencies, build the app, and start the server.

### Step 8: Configure the Client Side

1. **Serve the React App:** Ensure your Express server is set up to serve your React app. Typically, this involves adding the following code in your Express server configuration:
   ```javascript
   const path = require('path');
   app.use(express.static(path.join(__dirname, 'build')));
   app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'build', 'index.html'));
   });
   ```

### Step 9: Verify Deployment

1. **Check the Deployment:** Once the deployment is complete, Render will provide a URL for your web service. Open this URL in your browser to verify that your MERN app is running correctly.

### Additional Tips

- **Monitoring and Logs:** Use Render’s dashboard to monitor your app’s performance and access logs for debugging purposes.
- **Automatic Deploys:** Enable automatic deploys in Render’s settings to automatically deploy new commits to your main branch.
- **Custom Domain:** If you have a custom domain, you can configure it in Render’s settings to point to your deployed MERN app.

Following these steps, you should have your MERN app successfully deployed on Render.














