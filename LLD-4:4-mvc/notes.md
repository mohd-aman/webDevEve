
- MVC Architecture
- Refactoring Previous code with MVC Architecture
- Pre and Post hook


# MVC Architecture Overview

 we're using the following analogy to explain the MVC architecture:

"A customer (view) is ordering a pizza, so he makes a request to the waiter (controller). The waiter takes the request and goes to the chef (model) in the kitchen and fetches the items from the kitchen (database) to make the pizza. Once it's ready, the chef serves the pizza back to the waiter, who then serves it to the customer."

Now, let's break down the MVC architecture within this analogy.


**Model:**
- Represents the data and logic of the application.
- In the pizza example, the chef in the kitchen is the model.
- Manages and fetches data (ingredients) and performs operations (cooking) on it.
- The model is unaware of the user interface.

**View:**
- Represents the user interface or what the user interacts with.
- In the pizza example, the customer is the view.
- Displays information (menu options) to the user and captures user input (order).
- Passes user input to the controller.

**Controller:**
- Acts as an intermediary between the model and the view.
- In the pizza example, the waiter is the controller.
- Receives and processes user requests (orders) from the view.
- Interacts with the model (chef) to fetch data (ingredients) and perform actions (cooking).
- Sends updates back to the view to display the result (serving the pizza).


**The following image gives an idea about MVC architecture**:

![](https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/052/060/original/upload_24f17def1d1ac7e73c3a74069cf7b9f8.png?1696316119)


In essence, MVC separates the application into three distinct components, making it easier to manage and maintain. The view handles the presentation and user interaction, the model manages the data and logic, and the controller orchestrates the communication between the view and the model. This separation of concerns enhances code organization and promotes scalability and maintainability in software development.



# Question
What is the primary responsibility of the Model component in the MVC architecture?

# Choices
- [ ] Handles user interface interactions.
- [ ] Manages routing and URL handling.
- [x] Represents the data and logic of the application.
- [ ] Interacts with the user and captures input.


# Benifits of MVC architecture


- **Separation of Concerns:**
  - Divides the application into Model, View, and Controller for clear separation of responsibilities.
- **Modular Development:**
  - Supports development and maintenance of separate, reusable modules for each component.
- **Improved Code Reusability:**
  - Allows reuse of Models, Views, and Controllers in different parts of the application or other projects.
- **Enhanced Maintainability:**
  - Changes in one component have minimal impact on the others, simplifying maintenance and debugging.
- **Scalability:**
  - Facilitates parallel development and the addition of new features without major rework.
- **User Interface Flexibility:**
  - Adapts to various user interfaces while keeping the core logic intact.
- **Efficient Testing and Debugging:**
  - Enables isolated unit testing for each component, easing issue identification and resolution.
- **Parallel Development:**
  - Supports multiple developers or teams working on different components simultaneously.
- **Support for Multiple Views:**
  - Utilizes the same Model and Controller with multiple Views for diverse user interfaces.
- **Long-Term Maintainability:**
  - Promotes organized and understandable code, reducing technical debt over time.




So in the last class we wrote this code with Express and Mongoose

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

To refactor the given code into an MVC (Model-View-Controller) architecture, we'll break down the code into different files and directories. Here's a step-by-step process:

1. **Create Project Structure**:
   - `app.js` (main file)
   - `config/` (for database connection)
     - `db.js`
   - `models/` (for Mongoose schemas)
     - `product.js`
   - `controllers/` (for request handlers)
     - `productController.js`
   - `routes/` (for route definitions)
     - `productRoutes.js`
   - `middlewares/` (for any middlewares, if needed)

2. **Move the Database Connection to `config/db.js`**:
   ```javascript
   // config/db.js
   const mongoose = require('mongoose');

   const connectDB = async () => {
     try {
       await mongoose.connect("mongodb+srv://mrinalbhattacharya:jrybX27vUUhJTnXs@cluster0.qkdrsui.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log("DB connected");
     } catch (error) {
       console.error(error.message);
       process.exit(1);
     }
   };

   module.exports = connectDB;
   ```

3. **Move the Schema to `models/product.js`**:
   ```javascript
   // models/product.js
   const mongoose = require('mongoose');

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

   const Product = mongoose.model('Product', productSchema);

   module.exports = Product;
   ```

4. **Move Controllers to `controllers/productController.js`**:
   ```javascript
   // controllers/productController.js
   const Product = require('../models/product');

   exports.getAllProducts = async (req, res) => {
     try {
       const allProducts = await Product.find({});
       const html = `<ul> ${allProducts.map(product => `<li>${product.product_name}</li>`).join('')} </ul>`;
       res.send(html);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   };

   exports.getProductById = async (req, res) => {
     try {
       const product = await Product.findById(req.params.id);
       res.status(200).json({ productInfo: product });
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   };

   exports.createProduct = async (req, res) => {
     try {
       const { product_name, product_price, isInStock, category } = req.body;
       const product = new Product({
         product_name,
         product_price,
         isInStock,
         category,
       });
       await product.save();
       res.status(201).json({ message: 'Product Created' });
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   };

   exports.updateProduct = async (req, res) => {
     try {
       await Product.findByIdAndUpdate(req.params.id, req.body);
       res.status(200).json({ message: 'Resources Updated' });
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   };

   exports.deleteProduct = async (req, res) => {
     try {
       await Product.findByIdAndDelete(req.params.id);
       res.status(200).json({ message: 'Resource Deleted' });
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   };
   ```

5. **Move Routes to `routes/productRoutes.js`**:
   ```javascript
   // routes/productRoutes.js
   const express = require('express');
   const {
     getAllProducts,
     getProductById,
     createProduct,
     updateProduct,
     deleteProduct,
   } = require('../controllers/productController');

   const router = express.Router();

   router.get('/products', getAllProducts);
   router.get('/products/:id', getProductById);
   router.post('/products', createProduct);
   router.put('/products/:id', updateProduct);
   router.delete('/products/:id', deleteProduct);

   module.exports = router;
   ```

6. **Update `app.js`**:
   ```javascript
   // app.js
   const express = require('express');
   const connectDB = require('./config/db');
   const productRoutes = require('./routes/productRoutes');

   const app = express();

   // Connect Database
   connectDB();

   // Middleware
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());

   // Routes
   app.use('/api', productRoutes);

   // Default Route
   app.get('/', (req, res) => {
     res.send('Welcome to our Shop');
   });

   const PORT = process.env.PORT || 8006;

   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

7. **Explanation of Refactoring**:
   - **Separation of Concerns**: By separating the database connection, model definitions, controllers, and routes, the code becomes more modular and maintainable.
   - **Configuration Management**: The database connection is managed separately in the `config` folder, making it easier to manage connection settings.
   - **Modular Controllers**: Controllers handle the business logic and are separated into their own file, making it easier to manage and test.
   - **Dedicated Routes**: Routes are defined in a dedicated file, improving the readability of the main application file (`app.js`).

This refactoring not only organizes the code better but also aligns it with the MVC architecture, promoting best practices for scalability and maintainability.



### Pre and Post Hooks in MongoDB with Mongoose

Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, provides middleware (also called hooks) that can be executed at various points in the lifecycle of a document. Pre and post hooks are two types of middleware that allow you to run code before and after certain operations.

#### Pre Hooks

Pre hooks are functions that are executed before certain operations, such as saving or validating a document. They are useful for tasks like validation, normalization, and logging.

#### Post Hooks

Post hooks are functions that are executed after certain operations have completed. They are useful for tasks like sending notifications or updating related data.

### Example: Using Pre and Post Hooks in Mongoose

Let's go through an example step by step:

1. **Set up your environment:**

   - Install Node.js and npm if you haven't already.
   - Create a new directory for your project and navigate into it.
   - Initialize a new Node.js project with `npm init -y`.
   - Install Mongoose with `npm install mongoose`.

2. **Create a basic Mongoose model with hooks:**

   - Create a file named `app.js`.

   ```javascript
   const mongoose = require('mongoose');

   // Connect to MongoDB
   mongoose.connect('mongodb://localhost:27017/testdb', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });

   // Define a schema
   const userSchema = new mongoose.Schema({
     name: String,
     email: String,
     createdAt: Date,
     updatedAt: Date,
   });

   // Pre-save hook to add timestamps
   userSchema.pre('save', function (next) {
     const now = new Date();
     this.updatedAt = now;
     if (!this.createdAt) {
       this.createdAt = now;
     }
     next();
   });

   // Post-save hook to log a message
   userSchema.post('save', function (doc, next) {
     console.log(`User ${doc.name} has been saved.`);
     next();
   });

   // Create a model from the schema
   const User = mongoose.model('User', userSchema);

   // Create and save a new user
   const newUser = new User({ name: 'Alice', email: 'alice@example.com' });
   newUser.save((err) => {
     if (err) {
       console.error(err);
     } else {
       console.log('User saved successfully.');
     }
     // Close the connection
     mongoose.connection.close();
   });
   ```

3. **Explanation of the Code:**

   - **Connecting to MongoDB:**
     ```javascript
     mongoose.connect('mongodb://localhost:27017/testdb', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     ```
     This connects your application to a MongoDB instance running on `localhost` and using the database `testdb`.

   - **Defining a Schema:**
     ```javascript
     const userSchema = new mongoose.Schema({
       name: String,
       email: String,
       createdAt: Date,
       updatedAt: Date,
     });
     ```
     This defines a simple schema for a `User` with `name`, `email`, `createdAt`, and `updatedAt` fields.

   - **Pre-save Hook:**
     ```javascript
     userSchema.pre('save', function (next) {
       const now = new Date();
       this.updatedAt = now;
       if (!this.createdAt) {
         this.createdAt = now;
       }
       next();
     });
     ```
     This pre-save hook sets the `createdAt` and `updatedAt` timestamps before the document is saved.

   - **Post-save Hook:**
     ```javascript
     userSchema.post('save', function (doc, next) {
       console.log(`User ${doc.name} has been saved.`);
       next();
     });
     ```
     This post-save hook logs a message after the document has been saved.

   - **Creating and Saving a User:**
     ```javascript
     const newUser = new User({ name: 'Alice', email: 'alice@example.com' });
     newUser.save((err) => {
       if (err) {
         console.error(err);
       } else {
         console.log('User saved successfully.');
       }
       // Close the connection
       mongoose.connection.close();
     });
     ```
     This creates a new `User` instance and saves it to the database. The pre and post hooks will be executed during this process.

4. **Running the Code:**

   - Save the `app.js` file.
   - Run the file using `node app.js`.

   You should see output indicating that the user was saved, and the pre and post hooks were executed:

   ```
   User saved successfully.
   User Alice has been saved.
   ```

### Summary

Pre and post hooks in Mongoose are powerful tools that allow you to execute code at specific points in the lifecycle of a document. They can be used for tasks such as validation, normalization, logging, and updating related data. In this example, we saw how to use pre and post hooks to add timestamps and log messages when saving a document.

















