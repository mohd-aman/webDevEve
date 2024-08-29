---
title: Agenda
duration: 780
card_type: cue_card
---

## Agenda
- Intro to MongoDB
- Data storage in mongodb
- Connecting to Mongodb atlas
- Intro to Mongoose ORM : Model ,schema 
- CRUD with DB

---
title: Intro to Mongodb 
description:
duration: 670
card_type: cue_card
---

 ### Introduction to MongoDB
MongoDB, an open-source document-oriented database, is purpose-built for efficiently handling extensive datasets. It falls within the NoSQL (Not only SQL) database category due to its departure from the conventional table-based storage and retrieval of data.

### MongoDB Architecture
![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/049/544/original/Screenshot_2023-09-20_184157.png?1695215721)

Now we know that MongoDB serves as a database server where data is stored. In other words, MongoDB provides an environment where you can initiate a server and subsequently create multiple databases within it.

Data in MongoDB is organized into collections and documents. This establishes a hierarchical relationship between databases, collections, and documents.
 
 ### Core Concepts:

1. **BSON (Binary JSON):** <br> MongoDB stores data in BSON format. Think of BSON as a way to represent data in a binary-encoded form, much like how JSON represents data in a text-based format. It's used by MongoDB to efficiently store and retrieve data.
    
2. **Collections:** <br> Collections are like containers or folders in which MongoDB stores related documents. You can think of them as similar to tables in a traditional SQL database, but with a more flexible structure.
    
3. **Documents:** <br> Documents are the basic unit of data in MongoDB. They're similar to rows or records in a table, but unlike SQL databases where each row follows a fixed schema, MongoDB documents can have varying structures within the same collection.

### Real-World Example:

Let's consider a scenario where you're building an e-commerce platform. You have a MongoDB database to store product information.

#### Collection: Products

This collection stores information about various products available on your platform.

#### Documents: Product Information

Each document represents a specific product and can have different fields based on the product type. For instance:


```json
{
  "_id": ObjectId("61e65529b6fc4670e05a1c7a"),
  "name": "Smartphone",
  "brand": "XYZ",
  "price": 699,
  "specs": {
    "display": "6.5 inches",
    "storage": "128GB",
    "camera": "Quad-camera setup"
  }
}

```

Here, the Products collection holds documents representing different types of products. This document represents a smartphone with its name, brand, price, and specifications.


```jsonld
{
  "_id": ObjectId("61e65545b6fc4670e05a1c7b"),
  "name": "Laptop",
  "brand": "ABC",
  "price": 1299,
  "specs": {
    "display": "15.6 inches",
    "storage": "512GB SSD",
    "RAM": "16GB",
    "processor": "Intel Core i7"
  }
}

```


---
title: Getting Deployed DB link for express  
description: 
duration: 780
card_type: cue_card
---

- **Express and MongoDB:** <br> Express handles the incoming HTTP requests and responses. It interfaces with MongoDB to perform operations like reading, writing, updating, and deleting data from the database.
    
## Steps to get DB Link from Mongodb Atlas
* Signup to mongodb.com 
![Pasted image 20231123171056](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/057/784/original/upload_86111677dfec257e36b4bcc2a93fcfba.png?1700828387)
* follow the steps and create a cluster
* once cluster is created you will see this dashboard screen
![Pasted image 20231123171116](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/057/785/original/upload_a4cca7c2d80be2271a8fcef57804970d.png?1700828423)
* Usually server connecting with DB server has satatic IP and for security reasons this network access should only be given to creatin Ip address but for develop enviornment we can allow it to acces from anywhere. In `network access select allow access from anywhere`   
![Pasted image 20231123171247](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/057/786/original/upload_d43a548b812518332d9f455bf82c9b73.png?1700828507)
* Create a DB user , create it's password
![Pasted image 20231123171321](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/057/787/original/upload_ac12efc36c17feff1cc26beef9712d87.png?1700828572)
* Select Role as atlas admin
![Pasted image 20231123171346](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/057/788/original/upload_a9fcfa3177af770c1842ec11545420e5.png?1700828623)
* Go to Home Page and select connect . Choose Driver for node and copy the link
![Pasted image 20231123171402](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/057/789/original/upload_0bc2f97a718b86e0ed145b606c754fc0.png?1700828682)

This DB link will help our express server to connect with mongodb Database and details like  password and username should not be exposed

---
title: connecting MongoDB database with Express server  
description:
duration: 780
card_type: cue_card
---
## Significance of Mongoose

Mongoose acts as an intermediary between your Express server and MongoDB. It helps define data models, schemas, and provides methods for interacting with MongoDB. It simplifies the process of querying and manipulating data in MongoDB from your Express application.

```jsonld
// driver 
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites = true&w = majority`;
// once 
mongoose.connect(dbURL)
    .then(function (connection) {
        console.log("connected to db",)
    }).catch(err => console.log(err))
```

---
title: creating schema and model
description:
duration: 780
card_type: cue_card
---

Now Let;s suppose in our database we want to crud operations with Products, so for that we weill need to define the Scehmas and Models now what are schemad and models let's understand


### Importing Required Modules
```javascript
const express = require("express");
const app = express();
const mongoose = require("mongoose");
```
- `express`: Imports the Express framework, which is used to build web applications and APIs.
- `app`: Initializes an instance of the Express application.
- `mongoose`: Imports Mongoose, an ODM (Object Data Modeling) library for MongoDB, which allows for easier data management and querying.

### Database Connection
```javascript
mongoose
  .connect(
    "mongodb+srv://mrinalbhattacharya:jrybX27vUUhJTnXs@cluster0.qkdrsui.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => {
    console.log(err);
  });
```
- `mongoose.connect()`: Connects to the MongoDB database using the provided connection string.
- `.then(() => { ... })`: Executes the callback if the connection is successful, logging "db Connected".
- `.catch((err) => { ... })`: Executes the callback if there's an error during connection, logging the error.

So far so good and we have done uptill this point.

### Defining a Schema and Model
```javascript
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ProductModel = mongoose.model("products", productSchema);
```
In Mongoose, a schema defines the structure of documents within a MongoDB collection. It serves as a blueprint for the data, specifying the types and properties of each field, as well as any constraints or validation rules.

Let's break down the example schema:

```javascript
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });
```

### Explanation:

1. **`mongoose.Schema`**:
   - This is a constructor provided by Mongoose to define a new schema. It takes an object that maps the structure of the documents in a collection.

2. **`product_name`**:
   - **`type: String`**: Specifies that the `product_name` field should be of type `String`.
   - **`required: true`**: This field is mandatory, and Mongoose will throw a validation error if this field is not provided when creating a new document.

3. **`product_price`**:
   - **`type: String`**: Specifies that the `product_price` field should be of type `String`. (Typically, you'd use `Number` for prices, but this example uses `String`.)
   - **`required: true`**: This field is also mandatory.

4. **`isInStock`**:
   - **`type: Boolean`**: Specifies that the `isInStock` field should be of type `Boolean`.
   - **`required: true`**: This field is mandatory.

5. **`category`**:
   - **`type: String`**: Specifies that the `category` field should be of type `String`.
   - **`required: true`**: This field is mandatory.

6. **Schema Options**:
   - **`timestamps: true`**: This option automatically adds two fields to the schema: `createdAt` and `updatedAt`. These fields store the timestamps for when the document was created and last updated, respectively.

### Summary:

The `productSchema` defines a structure for documents in a MongoDB collection. Each document must include the following fields:
- `product_name` (String, required)
- `product_price` (String, required)
- `isInStock` (Boolean, required)
- `category` (String, required)

Additionally, each document will automatically have `createdAt` and `updatedAt` timestamps managed by Mongoose. This schema helps ensure data consistency and integrity within the collection by enforcing the defined field types and constraints.


### Model
A model in Mongoose represents a MongoDB collection and allows you to interact with the database by providing methods to create, read, update, and delete documents. In the given example, `ProductModel` is a model created from a schema called `productSchema`.

Let's break down the example:

```javascript
const ProductModel = mongoose.model("products", productSchema);
```
 **Model**: A model is a class that we construct from a schema. It provides an interface to interact with the database and perform CRUD operations.

   By calling `mongoose.model("products", productSchema)`, we create a model named `ProductModel` associated with the `products` collection in the database. Mongoose automatically pluralizes the model name to determine the collection name.

   Now, `ProductModel` can be used to interact with the `products` collection:

   ```javascript
   const ProductModel = mongoose.model("products", productSchema);
   ```

So the Whole code now looks something like this

```js
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// DB Connection

mongoose
  .connect(
    "mongodb+srv://mrinalbhattacharya:jrybX27vUUhJTnXs@cluster0.qkdrsui.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Schema for product

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },

  isInStock: {
    type: Boolean,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
} , {timestamps:true});

const ProductModel = mongoose.model("products", productSchema);


app.use(express.json()); // middleware for post request


app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});


```

So now DB connection , schema and model is ready
Now Let's see how to do CRUD with Mongoose


---
title: Database CRUD
description:
duration: 780
card_type: cue_card
---

### Creating a Product

let's see how to create a product and save it in the database


```js

app.post("/api/products", async (req, res) => {
   const body = req.body

    const product = await ProductModel.create({
      product_name : body.product_name,
      product_price : body.product_price,
      isInStock : body.isInStock,
      category : body.category
    })

    console.log(product)

    return res.status(201).json({message : 'Product Created'})


});
```

This code defines a POST endpoint `/api/products` for creating a new product in a Node.js Express application. Here's a step-by-step explanation of what this code does:

1. **Endpoint Definition**:
   ```javascript
   app.post("/api/products", async (req, res) => {
   ```
   This line sets up a POST route at the `/api/products` path. When a POST request is made to this endpoint, the provided callback function will be executed. The `req` and `res` parameters represent the request and response objects, respectively.

2. **Extracting Request Body**:
   ```javascript
   const body = req.body;
   ```
   This line extracts the body of the incoming request and assigns it to the variable `body`. The request body typically contains the data sent by the client in the POST request, such as JSON data. (Use Postman to show this)

3. **Creating a New Product**:
   ```javascript
   const product = await ProductModel.create({
      product_name : body.product_name,
      product_price : body.product_price,
      isInStock : body.isInStock,
      category : body.category
    });
   ```
   This block of code performs the following steps:
   - Uses the `await` keyword to wait for the asynchronous operation to complete.
   - Calls the `create` method on the `ProductModel` (presumably a Mongoose model or similar) to create a new product in the database.
   - The `create` method takes an object as an argument, where properties are assigned values from the `body` object (extracted from the request).
   - The properties include `product_name`, `product_price`, `isInStock`, and `category`.

4. **Logging the Created Product**:
   ```javascript
   console.log(product);
   ```
   This line logs the newly created product to the console. This is useful for debugging purposes to ensure the product was created correctly.

5. **Sending Response to Client**:
   ```javascript
   return res.status(201).json({message: 'Product Created'});
   ```
   This line sends a response back to the client:
   - Sets the HTTP status code to 201, which indicates that a resource has been successfully created.
   - Sends a JSON response containing a message indicating that the product has been created.

Here's the entire code snippet again for reference:

```javascript
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// DB Connection

mongoose
  .connect(
    "mongodb+srv://mrinalbhattacharya:jrybX27vUUhJTnXs@cluster0.qkdrsui.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Schema for product

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },

  isInStock: {
    type: Boolean,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
} , {timestamps:true});

const ProductModel = mongoose.model("products", productSchema);


app.use(express.json()); // middleware for post request


// Creating a Product
app.post("/api/products", async (req, res) => {
   const body = req.body;

    const product = await ProductModel.create({
      product_name : body.product_name,
      product_price : body.product_price,
      isInStock : body.isInStock,
      category : body.category
    });

    console.log(product);

    return res.status(201).json({message: 'Product Created'});
});


app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});

```

In summary, this code handles a POST request to create a new product, saves it to the database, logs the created product, and responds to the client with a success message.


### Get Products and get a Single Product

Now you have created a product , Now if you want to get all the products that you have created or if you want to get a single product from the database , let's see how will we do this


```js
app.get("/api/products", async (req, res) => {
  const allProducts = await ProductModel.find({})
  // const allProducts = await ProductModel.find({isInStock :true})
  console.log(allProducts)
  const html = `<ul> ${allProducts.map(
    (product) => `<li>${product.product_name} </li>`
  )}  </ul>
    `;

  return res.send(html);
});
```

This code is a route handler for a GET request to the endpoint `/api/products` in an Express.js application. Let's break down what each part of the code is doing:

1. **Route Definition**:
   ```javascript
   app.get("/api/products", async (req, res) => {
   ```
   This line defines a route handler for the GET request to the `/api/products` endpoint. It uses an asynchronous callback function to handle the request.

2. **Fetching Data**:
   ```javascript
   const allProducts = await ProductModel.find({});
   // const allProducts = await ProductModel.find({isInStock: true});
   ```
   The code uses Mongoose's `find` method to fetch all products from the database. The commented-out line shows an alternative query that would fetch only the products that are in stock (`isInStock: true`). This query is awaited because it returns a promise.

3. **Logging Data**:
   ```javascript
   console.log(allProducts);
   ```
   This logs the array of product objects retrieved from the database to the console for debugging purposes.

4. **Generating HTML**:
   ```javascript
   const html = `<ul> ${allProducts.map(
     (product) => `<li>${product.product_name}</li>`
   )} </ul>`;
   ```
   This line creates an HTML string representing an unordered list (`<ul>`). It maps over the array of products (`allProducts`), and for each product, it creates a list item (`<li>`) containing the product's name (`product.product_name`).

5. **Sending Response**:
   ```javascript
   return res.send(html);
   ```
   Finally, the generated HTML string is sent as the response to the client.

### Example
If `allProducts` contains the following data:
```javascript
[
  { product_name: "Product A" },
  { product_name: "Product B" },
  { product_name: "Product C" }
]
```
The generated HTML will be:
```html
<ul>
  <li>Product A</li>
  <li>Product B</li>
  <li>Product C</li>
</ul>
```
This HTML is then sent back to the client as the response.

### Summary
The code fetches all products from the database, logs them to the console, creates an HTML unordered list from the product names, and sends this HTML back as the response to the client.

## getting a single product

 **Finding a Product by ID**:
   ```javascript
   const product = await ProductModel.findById(req.params.id)
   ```
   Inside the handler, the code uses `await` to wait for the result of `ProductModel.findById(req.params.id)`. This function call is expected to query the database (or any data source defined by `ProductModel`) to find a product document with the `_id` that matches the value of `req.params.id`.

### Full Explanation

1. **Route Setup**: When a client makes a GET request to `/api/products/:id` (for example, `/api/products/12345`), this route handler is triggered.

2. **Asynchronous Product Retrieval**: The route handler is asynchronous, allowing it to handle the asynchronous operation of querying the database for the product without blocking the execution. `ProductModel.findById` is used to fetch the product with the specified `id` from the database.


This approach ensures that the server responds with the requested product information in a structured JSON format, making it easy for clients to process and use the data.

## Update a product in the DB (put method)

```js

app.put("/api/products/:id", async (req, res) => {
    await ProductModel.findByIdAndUpdate(req.params.id , req.body)
    return res.status(201).json({message : 'Resources Updated'})
});
```

The code is a route handler for an Express.js application that handles HTTP PUT requests to update a product's information in a MongoDB database. Here's a detailed breakdown of what the code is doing:

1. **Route Definition**: 
   ```javascript
   app.put("/api/products/:id", async (req, res) => {
   ```
   This line sets up an Express.js route to handle PUT requests to the URL pattern `/api/products/:id`. The `:id` part of the URL is a route parameter, meaning it will capture the value in that part of the URL and make it available as `req.params.id`.

2. **Asynchronous Function**:
   ```javascript
   async (req, res) => {
   ```
   This is an asynchronous function that takes `req` (the request object) and `res` (the response object) as parameters. The `async` keyword indicates that the function contains asynchronous operations.

3. **Finding and Updating a Product**:
   ```javascript
   await ProductModel.findByIdAndUpdate(req.params.id, req.body)
   ```
   This line uses the `findByIdAndUpdate` method of the `ProductModel` to find a product by its ID (extracted from `req.params.id`) and update it with the new data provided in `req.body`. 
   
   The `await` keyword is used to wait for the operation to complete before moving on to the next line of code.

4. **Sending a Response**:
   ```javascript
   return res.status(201).json({message: 'Resources Updated'})
   ```
   Once the product has been updated, this line sends a JSON response with a status code of 201 (Created) and a message indicating that the resource has been updated. The `return` statement ensures that the response is sent and the function exits.


   **Note- Please use Postman to test the code with any random examples**

### Summary

The code sets up an API endpoint to update a product in the database by its ID. When a PUT request is made to `/api/products/:id` with the updated product data in the request body, it:

1. Extracts the product ID from the URL.
2. Uses the `ProductModel` to find and update the product with the new data.
3. Sends a response indicating that the resource has been successfully updated.

## Delete a product in the DB

```js

app.delete("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id)
  return res.status(201).json({message : 'Resource Deleted'})
});
```
 delete a product from a database. 

1. **Endpoint Definition**: The endpoint is defined with the route `"/api/products/:id"`. The `:id` part is a route parameter that will be replaced with the actual product ID when a DELETE request is made.
2. **Async Handler Function**: The handler function is defined as `async` to use `await` inside it.
3. **Find and Delete Product**: `ProductModel.findByIdAndDelete(req.params.id)` finds a product by its ID (extracted from the route parameters) and deletes it from the database.
4. **Response**: After the product is deleted, it sends a response with a status code `201` (typically used for resource creation but used here to indicate success) and a JSON object containing the message `"Resource Deleted"`.

Now the whole code Looks like this


```js
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// DB Connection

mongoose
  .connect(
    "mongodb+srv://mrinalbhattacharya:jrybX27vUUhJTnXs@cluster0.qkdrsui.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Schema for product

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },

  isInStock: {
    type: Boolean,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
} , {timestamps:true});

const ProductModel = mongoose.model("products", productSchema);

const PORT = 8006;

app.use(express.urlencoded());
app.use(express.json());

// Routing

app.get("/", (req, res) => {
  res.send("Welcome to the our Shop");
});


app.get("/api/products", async (req, res) => {
  const allProducts = await ProductModel.find({})
  // const allProducts = await ProductModel.find({isInStock :true})
  console.log(allProducts)
  const html = `<ul> ${allProducts.map(
    (product) => `<li>${product.product_name} </li>`
  )}  </ul>
    `;

  return res.send(html);
});

// Route parameters

app.get("/api/products/:id", async (req, res) => {
    const product = await ProductModel.findById(req.params.id)

    return res.status(200).json({productInfo : product})
});

// Post Put Delete

// Post Method

// create a DB Entry

app.post("/api/products", async (req, res) => {
   const body = req.body

    const product = await ProductModel.create({
      product_name : body.product_name,
      product_price : body.product_price,
      isInStock : body.isInStock,
      category : body.category
    })

    console.log(product)

    return res.status(201).json({message : 'Product Created'})


});

app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});

// put

app.put("/api/products/:id", async (req, res) => {
    await ProductModel.findByIdAndUpdate(req.params.id , req.body)
    return res.status(201).json({message : 'Resources Updated'})
});

//Delete

app.delete("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id)
  return res.status(201).json({message : 'Resource Deleted'})
});

```


If you see we have a populated as well as we have polluted the whole code , DB connection is in the same file , models and schema are in the same file , all the CRUD operations are in the same file

As our project goes larger this kind of code can become very hard to mainatain

So to maintain a cleaner approach we will discuss MVC architecture in the Next class and will make everything organized

Start the doubt session



