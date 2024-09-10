---
title:Agenda
description:
duration: 900
card_type: cue_card
---


1. Creating Admin Partner And User Page
2. Creating the Movie Api (CRUD) and testing via Postman to DB
3. Creating the Movie Form which can perform CRUD from the client side 


So far we are done with Login , Resigter , Logout , JWT Authentication and building our Protected route , this much was basic setup for the app , You can even use it for any other app that you want to build


But now from this part we will actually move to the features of our `Book my Show` App

---
title:Creating Admin Partner And User Page
description:
duration: 900
card_type: cue_card
---

In our app there are Three roles

1. Admin - Admin can add movies in the app and can approve partner Theatres who wants to run their shows for the movies

2. Partner - If a user logs in as a partner that means they can request the admin to get their theatres on the app , if the admin approves then they will be able to run shows for the movies in their approved Theatres

3. User - This role is a customer role , where people can go and book tickets for a currently showing movie , go watch eat popcorn and have fun!


Note- Select any user as Admin and assign the role of admin in the database manually


So to create these three roles we will have to create their separate pages where they can do the task that is assigned to them 

Admin features will be different , Partner features will be different and User feature will be different

So for this we will create three separate components in our Pages folder like this

Create three directories inside the Pages Directory `Admin` `Partner` `User` create a index.jsx file inside all of them which will act as root file and create three basic components

`Index.js for Admin`

```js

import React from 'react'

function Admin() {
  return (
    <div>
        <h1>Admin Page</h1>
    </div>
  )
}

export default Admin



```

`Index.js for Partner`

```js
import React from 'react'

function Partner() {
  return (
    <div>
        <h1>Partner Page</h1>
    </div>
  )
}

export default Partner
```

`Index.js for User`

```js
import React from 'react'

function Profile() {
  return (
    <div>
        <h1>Profile Page</h1>
    </div>
  )
}

export default Profile

```


At first we will start working with the admin Page

The admin will have these two rights

1. The admin can add movies of which shows will run
2. The admin can approve or decline Theatre request from a Partner


So the admin component  will have two sub components 

1. MovieList Component - Responsible for Movies CRUD
2. TheatresTable - Theatre request will come here for approval

So now create two Basic components again inside the admin Directory

```MovieList.js```

```js
import React from 'react'
import { Table } from 'antd'

function MovieList() {

  return (
    <div>
          <Table/>
    </div>
  )
}

export default MovieList
```

```TheatresTable.js```

```js
import { Table } from 'antd'
import React from 'react'


function TheatresTable() {
  return (
    <div>
       <Table/>
    </div>
  )
}

export default TheatresTable

```

we are getting the Table component from antd in this table only we will show Movies and theatre details


In your admin (index.js file) Now put this code

```js
import React, { Children } from 'react'

import {Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'

function Admin() {

    const tabItems = [
        { 
            key : '1',
            label : 'Movies',
            children : <MovieList/>

        },

        {
           key : '2',
           label : 'Theatres',
           children : <TheatresTable/>
        }
    ]


  return (
    <div>
        <h1>Admin Page</h1>

        <Tabs items={tabItems}/>


    </div>
  )
}

export default Admin
```

This code  sets up a tabbed interface using the `Tabs` component from the Ant Design library. Here is a detailed explanation of what each part of the code does:

1. **Imports**:
    ```javascript
    import React from 'react';
    import { Tabs } from 'antd';
    import MovieList from './MovieList';
    import TheatresTable from './TheatresTable';
    ```
    - `Tabs`: Importing the `Tabs` component from the Ant Design library.
    - `MovieList` and `TheatresTable`: Importing custom components that will be displayed within the tabs.


2. **Tab Items**:
    ```javascript
    const tabItems = [
        { 
            key : '1',
            label : 'Movies',
            children : <MovieList/>
        },
        {
           key : '2',
           label : 'Theatres',
           children : <TheatresTable/>
        }
    ];
    ```
    - `tabItems`: An array of objects where each object represents a tab.
    - Each object in the array has three properties:
        - `key`: A unique identifier for the tab.
        - `label`: The text displayed on the tab.
        - `children`: The content that will be rendered when the tab is active. In this case, it's either the `MovieList` or `TheatresTable` component.

4. **Render Method**:
    ```javascript
    return (
        <div>
            <h1>Admin Page</h1>
            <Tabs items={tabItems}/>
        </div>
    );
    ```
    - The component returns a `div` containing an `h1` header with the text "Admin Page".
    - The `Tabs` component is rendered with the `items` prop set to `tabItems`, which configures the tabs to display the `MovieList` and `TheatresTable` components.

5. **Export**:
    ```javascript
    export default Admin;
    ```
    - Exporting the `Admin` component as the default export, making it available for import in other parts of the application.

### Summary

This `Admin` component renders a page with an `h1` header and a tabbed interface. The tabs are set up using the Ant Design `Tabs` component, with two tabs labeled "Movies" and "Theatres", each displaying the respective `MovieList` and `TheatresTable` components when selected.



---
title:designing the Movies List by Adding static Data
description:
duration: 900
card_type: cue_card
---

Write this code in MovieList.js file

```js
import React from 'react'
import { Table } from 'antd'

function MovieList() {

    const movies = [
        {
          key: '1',
          poster: 'Image1',
          name: 'Mastaney',
          description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
          duration: 120,
          genre: "Action",
          language: "Hindi",
          releaseDate: "Oct  25, 2023",
        },
        {
          key: '2',
          poster: 'Image2',
          name: 'Mastaney',
          description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
          duration: 120,
          genre: "Action",
          language: "Hindi",
          releaseDate: "Oct  25, 2023",
          action: "Delete"
        },

      ]; 


const tableHeadings = [
    {
        title : "Poster"
    },
    {
        title : "Movie Name",
        dataIndex : 'name'
    },
    {
        title : "Description",
        dataIndex : 'description'
    },
    {
        title : "Duration",
        dataIndex: 'duration',
    },
    {
        title : "Genre",
        dataIndex: 'genre',
    },
    {
        title : "Language",
        dataIndex: 'language'
    },
    {
        title : "Release Date",
        dataIndex: 'releaseDate'
    },
    {
        title : "Action"
    },
]


  return (
    <div>
        <Table dataSource={movies} columns={tableHeadings}/>
    </div>
  )
}

```

Movie List now renders a table of movies using the Ant Design (antd) library. Here's a detailed explanation of the code:

1. **Imports**:
    ```javascript
    import React from 'react'
    import { Table } from 'antd'
    ```
    - The `React` library is imported to use React features.
    - The `Table` component from the Ant Design library (`antd`) is imported to display the table.

2. **MovieList Component**:
    ```javascript
    function MovieList() {
    ```
    - A functional component `MovieList` is defined.

3. **Movies Data**:
    ```javascript
    const movies = [
        {
          key: '1',
          poster: 'Image1',
          name: 'Mastaney',
          description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
          duration: 120,
          genre: "Action",
          language: "Hindi",
          releaseDate: "Oct  25, 2023",
        },
        {
          key: '2',
          poster: 'Image2',
          name: 'Mastaney',
          description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
          duration: 120,
          genre: "Action",
          language: "Hindi",
          releaseDate: "Oct  25, 2023",
          action: "Delete"
        },
      ]; 
    ```
    - An array of movie objects is created and stored in the `movies` constant.
    - Each movie object contains details like `key`, `poster`, `name`, `description`, `duration`, `genre`, `language`, `releaseDate`, and `action`.

4. **Table Headings**:
    ```javascript
    const tableHeadings = [
        {
            title : "Poster"
        },
        {
            title : "Movie Name",
            dataIndex : 'name'
        },
        {
            title : "Description",
            dataIndex : 'description'
        },
        {
            title : "Duration",
            dataIndex: 'duration',
        },
        {
            title : "Genre",
            dataIndex: 'genre',
        },
        {
            title : "Language",
            dataIndex: 'language'
        },
        {
            title : "Release Date",
            dataIndex: 'releaseDate'
        },
        {
            title : "Action"
        },
    ]
    ```
    - An array of objects defining the columns of the table is created and stored in the `tableHeadings` constant.
    - Each object contains a `title` property that defines the column's header text.
    - The `dataIndex` property maps the column to the corresponding key in the movie objects.

5. **Return Statement**:
    ```javascript
    return (
        <div>
            <Table dataSource={movies} columns={tableHeadings}/>
        </div>
    )
    ```
    - The component returns a JSX structure.
    - A `div` element wraps the `Table` component.
    - The `Table` component is rendered with the `dataSource` prop set to the `movies` array and the `columns` prop set to the `tableHeadings` array.

### Summary
- The `MovieList` component renders a table displaying a list of movies.
- The movie data is hardcoded in the `movies` array.
- The table columns are defined in the `tableHeadings` array.
- The Ant Design `Table` component is used to create the table, with the `dataSource` prop supplying the data and the `columns` prop defining the column structure.



This design is created with adding static movie data , Now we have to make  the `Movie API` so we can add movies and save it in our database and perform all the CRUD operations


---
title:Buidling the Movie API
description:
duration: 900
card_type: cue_card
---


To add a Movie we will first need to create a `Movie` Model

Go to server -> Models and create a movieModel.js file

```js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String, 
        required: true    
    },
    description: {
        type: String, 
        required: true    
    },
    duration: {
        type: Number, 
        required: true    
    },
    genre: {
        type: String, 
        required: true    
    },
    language: {
        type: String, 
        required: true    
    },
     releaseDate: {
        type: Date, 
       required: true    
     },
     poster: {
         type: String, 
         required: true
     }
});

const Movies = mongoose.model('movies', movieSchema)


module.exports = Movies

```

This code defines a Mongoose schema and model for a MongoDB collection that will store movie information. Here's a detailed explanation of each part of the code:

1. **Importing Mongoose**:
    ```javascript
    const mongoose = require('mongoose');
    ```
    - The Mongoose library is imported. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model application data.

2. **Defining the Schema**:
    ```javascript
    const movieSchema = new mongoose.Schema({
        movieName: {
            type: String, 
            required: true    
        },
        description: {
            type: String, 
            required: true    
        },
        duration: {
            type: Number, 
            required: true    
        },
        genre: {
            type: String, 
            required: true    
        },
        language: {
            type: String, 
            required: true    
        },
         releaseDate: {
            type: Date, 
            required: true    
         },
         poster: {
             type: String, 
             required: true
         }
    });
    ```
    - A new Mongoose schema named `movieSchema` is defined using the `mongoose.Schema` constructor.
    - The schema specifies the structure of documents in the MongoDB collection.
    - Each field in the schema is an object that defines the field's type and other constraints:
        - `movieName`: A string that is required.
        - `description`: A string that is required.
        - `duration`: A number that is required.
        - `genre`: A string that is required.
        - `language`: A string that is required.
        - `releaseDate`: A date that is required.
        - `poster`: A string that is required.

3. **Creating the Model**:
    ```javascript
    const Movies = mongoose.model('movies', movieSchema)
    ```
    - A Mongoose model named `Movies` is created using the `mongoose.model` method.
    - The first argument, `'movies'`, is the name of the MongoDB collection that this model will interact with. Mongoose will automatically look for the lowercase, plural form of the model name.
    - The second argument, `movieSchema`, is the schema to be used for this model.

4. **Exporting the Model**:
    ```javascript
    module.exports = Movies
    ```
    - The `Movies` model is exported using `module.exports` so that it can be imported and used in other files.

### Summary
- The code sets up a Mongoose schema and model for a MongoDB collection that stores information about movies.
- The `movieSchema` defines the structure and constraints for the movie documents.
- The `Movies` model provides an interface to interact with the `movies` collection in the database.
- This model can be used to create, read, update, and delete movie records in the MongoDB database.

If you need more detailed explanations or further breakdowns, feel free to ask!


---
title:Buidling the Movie Route
description:
duration: 900
card_type: cue_card
---

Now in Your Route folder Create a movieRoute.js file and create you first Route

```js
const router = require('express').Router();
const Movie = require('../models/movieModel')

// Add a Movie

router.post('/add-movie' , async (req , res)=>{
    try {
         const newMovie = new Movie(req.body)
         await newMovie.save()
         res.send({
            success: true,
            message: 'New movie has been added!'
        })
    } catch (error) {
        res.send({
            success: false,
            message: err.message
        })
    }
})


module.exports = router
```

This code is an Express route handler for handling POST requests to the endpoint `/add-movie`. Let's break down each part of the code:

1. **Setting up the route**:
   ```javascript
   router.post('/add-movie', async (req, res) => {
   ```
   - `router.post('/add-movie', ...)`: This sets up a POST route at `/add-movie`. When a POST request is made to this endpoint, the provided callback function will be executed.
   - `async (req, res) => { ... }`: The callback function is declared as an asynchronous function, which allows the use of `await` inside it for handling asynchronous operations.

2. **Handling the request**:
   ```javascript
   try {
        const newMovie = new Movie(req.body)
        await newMovie.save()
        res.send({
           success: true,
           message: 'New movie has been added!'
       })
   } catch (error) {
       res.send({
           success: false,
           message: error.message
       })
   }
   ```
   - `try { ... } catch (error) { ... }`: This block is used to handle potential errors that might occur during the execution of the code within the `try` block.
   
   - `const newMovie = new Movie(req.body)`: A new instance of the `Movie` model is created using the data sent in the request body (`req.body`). This assumes that `Movie` is a Mongoose model representing a movie document in a MongoDB collection.
   
   - `await newMovie.save()`: This saves the new movie document to the database. The `await` keyword is used because `save()` returns a promise, and we want to wait for the save operation to complete before proceeding.
   
   - `res.send({ success: true, message: 'New movie has been added!' })`: If the movie is successfully saved, a response is sent back to the client indicating success, with a message saying that the new movie has been added.
   
   - `catch (error) { ... }`: If any error occurs during the execution of the `try` block, the code within the `catch` block will be executed.
   
   - `res.send({ success: false, message: error.message })`: If an error occurs, a response is sent back to the client indicating failure, with the error message.

3. **Exporting the router**:
   ```javascript
   module.exports = router
   ```
   - This exports the `router` so it can be used in other parts of the application. This is typically done in a file that sets up the routes, which is then included in the main application file.

In summary, this code defines a POST route at `/add-movie` to add a new movie to the database. It creates a new movie from the request body, attempts to save it to the database, and sends an appropriate success or error response back to the client.


Add this to the main server file 

```js
const app = express()

const userRoutes = require('./routes/userRoutes')
const movieRoute = require('./routes/movieRoutes')
app.use(cors())
app.use(express.json())
app.use('/api/users' , userRoutes)
app.use('/api/movies' , movieRoute)
```


Test this with Postman if the Movie is getting Added or not and the continue to add more Routes

---
title:Implementing Update Delete and Get Routes
description:
duration: 900
card_type: cue_card
---

Add these three routes after the add a movie is done

```js

// Get all the movies

router.get('/get-all-movies' , async(req , res)=>{
  try {
        const allMovies = await Movie.find()
        res.send({
            success: true,
            message: 'All movies have been fetched!',
            data: allMovies
        });
        
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})


// Update a movie

// Update a movie
router.put('/update-movie', async (req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: 'The movie has been updated!',
            data: movie
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

router.put('/delete-movie', async (req, res) => {
    try{
        await Movie.findByIdAndDelete(req.body.movieId);
        console.log(req.body.movieId);
        res.send({
            success: true,
            message: 'The movie has been deleted!',
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
})


module.exports = router


```

This code defines multiple route handlers for an Express application that interacts with a MongoDB database using Mongoose. Each route handler performs a specific operation on movie documents. Let's break down each part of the code:


### 2. Route: Get all movies
```javascript
router.get('/get-all-movies', async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.send({
            success: true,
            message: 'All movies have been fetched!',
            data: allMovies
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
```
- `router.get('/get-all-movies', ...)`: Sets up a GET route at `/get-all-movies`.
- `const allMovies = await Movie.find()`: Fetches all movie documents from the database.
- `res.send({ ... })`: Sends a response with the fetched movies or an error message.

### 3. Route: Update a movie
```javascript
router.put('/update-movie', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body, { new: true });
        res.send({
            success: true,
            message: 'The movie has been updated!',
            data: movie
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});
```
- `router.put('/update-movie', ...)`: Sets up a PUT route at `/update-movie`.
- `const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body, { new: true })`: Updates a movie document with the given `movieId` using the data from the request body, returning the updated document.
- `res.send({ ... })`: Sends a response with the updated movie or an error message.

### 4. Route: Delete a movie
```javascript
router.put('/delete-movie', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({
            success: true,
            message: 'The movie has been deleted!'
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});
```
- `router.put('/delete-movie', ...)`: Sets up a PUT route at `/delete-movie`.
- `await Movie.findByIdAndDelete(req.body.movieId)`: Deletes a movie document with the given `movieId`.
- `res.send({ ... })`: Sends a response confirming deletion or an error message.

### 5. Exporting the router
```javascript
module.exports = router;
```
- This exports the `router` object so it can be used in other parts of the application.

### Summary
- **Get all movies**: Fetches and returns all movie documents.
- **Update a movie**: Updates a specific movie document and returns the updated document.
- **Delete a movie**: Deletes a specific movie document and confirms the deletion.

Each route is set up with appropriate error handling, sending success or error responses based on the outcome of the database operations.

The Movie API as of now looks like this


```js
const router = require('express').Router();
const Movie = require('../models/movieModel')

// Add a Movie

router.post('/add-movie' , async (req , res)=>{
    try {
         const newMovie = new Movie(req.body)
         await newMovie.save()
         res.send({
            success: true,
            message: 'New movie has been added!'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


// Get all the movies

router.get('/get-all-movies' , async(req , res)=>{
  try {
        const allMovies = await Movie.find()
        res.send({
            success: true,
            message: 'All movies have been fetched!',
            data: allMovies
        });
        
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})


// Update a movie

// Update a movie
router.put('/update-movie', async (req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: 'The movie has been updated!',
            data: movie
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

router.put('/delete-movie', async (req, res) => {
    try{
        await Movie.findByIdAndDelete(req.body.movieId);
        console.log(req.body.movieId);
        res.send({
            success: true,
            message: 'The movie has been deleted!',
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
})


//APi end 


// update the movie , delete the movie , get all the movies


module.exports = router

```


Now we need to write axios Instance calls for our movies

In the calls directory - create movies.js file and add these instances which will work in accordnce with differnent routes

```js
import {axiosInstance} from './index'



//get all Movies
export const getAllMovies = async ()=> {
    try {
        const response = await axiosInstance.get('api/movies/get-all-movies')
       return response.data
    } catch (error) {
        console.error(error)
    }
    
}



// Add a movie

export const addMovie = async (values)=> {
    try {
        const response = await axiosInstance.post('api/movies/add-movie' , values)
       return response.data
    } catch (error) {
        console.error(error)
    }
    
}


export const updateMovie = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/movies/update-movie', payload);
        return response.data;
    }catch(err){
        return err.message
    }
}

// Delete a movie
export const deleteMovie = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/movies/delete-movie', payload);
        return response.data;
    }catch(err){
        return err.message
    }
}
