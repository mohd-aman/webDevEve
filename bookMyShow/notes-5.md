Now we need to create a movie Form , In the Admin directory create a Movie Form Component and a deletemovieModal

Let's break down and explain each component in relation to the others and the provided code, step by step.

### 1. MoviesList Component

#### Code
```javascript
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import MovieForm from "./MovieForm";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../calls/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(showLoading());
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: `movie${item._id}` };
      })
    );
    dispatch(hideLoading());
  };

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
            src={data.poster}
          />
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} Min`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Movie
        </Button>
      </div>

      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedMovie={selectedMovie}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </>
  );
}

export default MovieList;
```

#### Explanation

- **State Management**:
  - `isModalOpen`, `isDeleteModalOpen`: Boolean states to control the visibility of the modals.
  - `movies`: An array to store the list of movies fetched from the database.
  - `selectedMovie`: The movie selected for editing or deletion.
  - `formType`: A string to determine if the form is for adding a new movie or editing an existing one.

- **Data Fetching**:
  - `getData`: An asynchronous function that fetches all movies from the server using the `getAllMovies` function and updates the `movies` state.

- **Table Configuration**:
  - `tableHeadings`: An array defining the columns of the table, including custom render functions for the poster, duration, release date, and action buttons.

- **Event Handling**:
  - `useEffect`: Calls `getData` when the component mounts to fetch and display all movies.
  - Buttons for adding, editing, and deleting movies, which open the corresponding modals and set the necessary states.

- **Modal Integration**:
  - Conditionally renders `MovieForm` and `DeleteMovieModal` components, passing necessary props such as `isModalOpen`, `selectedMovie`, `formType`, and `getData`.

### 2. MovieForm Component

#### Code
```javascript
import { Col, Modal, Row, Form, Input, Select, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { addMovie, updateMovie } from '../../calls/movies';
import moment from 'moment';

const MovieForm = ({ isModalOpen, setIsModalOpen, selectedMovie, setSelectedMovie, formType, getData }) => {
  const dispatch = useDispatch();

  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format('YYYY-MM-DD');
  }

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        response = await addMovie(values);
      } else {
        response = await updateMovie({ ...values, movieId: selectedMovie._id });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      setSelectedMovie(null);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Movie" : "Edit Movie"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form layout="vertical" initialValues={selectedMovie} onFinish={onFinish}>
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item label="Movie Name" name="title" rules={[{ required: true, message: "Movie name is required!" }]}>
              <Input placeholder="Enter the movie name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description is required!" }]}>
              <TextArea rows="4" placeholder="Enter the description" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={8}>
                <Form.Item label="Movie Duration (in min)" name="duration" rules={[{ required: true, message: "Movie duration is required!" }]}>
                  <Input type="number" placeholder="Enter the movie duration" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Select Movie Language" name="language" rules={[{ required: true, message: "Movie language is required!" }]}>
                  <Select
                    placeholder="Select Language"
                    options={[
                      { value: 'English', label: 'English' },
                      { value: 'Hindi', label: 'Hindi' },
                      { value: 'Punjabi', label: 'Punjabi' },
                      { value: 'Telugu', label: 'Telugu' },
                      { value: 'Bengali', label: 'Bengali' },
                      { value: 'German', label: 'German' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Release Date" name="releaseDate" rules={[{ required: true, message: "Movie Release Date is required!" }]}>
                  <Input type="date" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={8}>
                <Form.Item label="Select Movie Genre" name="genre" rules={[{ required: true, message: "Movie genre is required!" }]}>
                  <Select
                    placeholder

="Select Movie"
                    options={[
                      { value: 'Action', label: 'Action' },
                      { value: 'Comedy', label: 'Comedy' },
                      { value: 'Horror', label: 'Horror' },
                      { value: 'Love', label: 'Love' },
                      { value: 'Patriot', label: 'Patriot' },
                      { value: 'Bhakti', label: 'Bhakti' },
                      { value: 'Thriller', label: 'Thriller' },
                      { value: 'Mystery', label: 'Mystery' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="Poster URL" name="poster" rules={[{ required: true, message: "Movie Poster is required!" }]}>
                  <Input placeholder="Enter the poster URL" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button block type="primary" htmlType="submit" style={{ fontSize: "1rem", fontWeight: "600" }}>
            Submit the Data
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieForm;
```

#### Explanation

- **Props**:
  - `isModalOpen`, `setIsModalOpen`: Controls the visibility of the modal.
  - `selectedMovie`, `setSelectedMovie`: The movie selected for editing.
  - `formType`: Determines if the form is for adding a new movie or editing an existing one.
  - `getData`: Function to refresh the movie list.

- **State Management**:
  - Uses `dispatch` to trigger Redux actions for showing and hiding loading indicators.

- **Form Handling**:
  - `onFinish`: Submits the form data, calling either `addMovie` or `updateMovie` depending on the `formType`, then refreshes the movie list and closes the modal.
  - `handleCancel`: Closes the modal without submitting.

- **Form Configuration**:
  - Uses Ant Design `Form` component with various input fields for movie details.
  - Fields include movie name, description, duration, language, release date, genre, and poster URL.

- **Conditional Rendering**:
  - Sets initial form values to `selectedMovie` if editing.

### 3. DeleteMovieModal Component

#### Code
```javascript
import { Modal, message } from 'antd';
import { deleteMovie } from '../../calls/movies';
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';

const DeleteMovieModal = ({ isDeleteModalOpen, setIsDeleteModalOpen, selectedMovie, setSelectedMovie, getData }) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const movieId = selectedMovie._id;
      const response = await deleteMovie({ movieId });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      setSelectedMovie(null);
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      setIsDeleteModalOpen(false);
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      title="Delete Movie?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className='pt-3 fs-18'>Are you sure you want to delete this movie?</p>
      <p className='pb-3 fs-18'>This action can't be undone and you'll lose this movie data.</p>
    </Modal>
  );
};

export default DeleteMovieModal;
```

#### Explanation

- **Props**:
  - `isDeleteModalOpen`, `setIsDeleteModalOpen`: Controls the visibility of the modal.
  - `selectedMovie`, `setSelectedMovie`: The movie selected for deletion.
  - `getData`: Function to refresh the movie list.

- **State Management**:
  - Uses `dispatch` to trigger Redux actions for showing and hiding loading indicators.

- **Event Handling**:
  - `handleOk`: Deletes the selected movie by calling `deleteMovie` with the movie ID, then refreshes the movie list and closes the modal.
  - `handleCancel`: Closes the modal without deleting.

- **Modal Configuration**:
  - Uses Ant Design `Modal` component with confirmation messages and action buttons for deleting the movie.

### Summary

1. **MoviesList**:
   - Fetches and displays a list of movies.
   - Opens modals for adding, editing, and deleting movies.

2. **MovieForm**:
   - A form for adding or editing movie details.
   - Handles form submission and validation.

3. **DeleteMovieModal**:
   - A modal for confirming and deleting a selected movie.
   - Ensures the movie is deleted from the database and updates the movie list.

Together, these components manage the display, addition, editing, and deletion of movie data within an application, leveraging Ant Design components for UI, Redux for state management, and Axios for API calls.


This is how we have created the Complete Movie CRUD in our app now the admin can add edit delete see all the movies



---
title:Building the Theatre Model and Route
description:
duration: 900
card_type: cue_card
---

In your Server- Models - create a file with the `theatreModel.js` and define the schema and model for it

```theatreModel.js``` code below

```js
 const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive: {
        type: Boolean,
        default: false
    },
},
{timestamps: true}
)

const Theatre = mongoose.model("theatres", theatreSchema);
module.exports = Theatre
```


### Detailed Explanation:

1. **Importing Mongoose:**
   ```javascript
   const mongoose = require('mongoose');
   ```
   - This line imports the Mongoose library, which is required to interact with MongoDB.

2. **Defining the Schema:**
   ```javascript
   const theatreSchema = new mongoose.Schema({
       name: {
           type: String,
           required: true,
       },
       address: {
           type: String,
           required: true,
       },
       phone: {
           type: Number,
           required: true,
       },
       email: {
           type: String,
           required: true,
       },
       owner: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'users'
       },
       isActive: {
           type: Boolean,
           default: false
       },
   },
   {timestamps: true}
   )
   ```
   - `theatreSchema` defines the structure of the documents within the `theatres` collection.
   - The schema has fields: `name`, `address`, `phone`, `email`, `owner`, and `isActive`.
     - `name`: A required string that represents the name of the theatre.
     - `address`: A required string that represents the address of the theatre.
     - `phone`: A required number that represents the phone number of the theatre.
     - `email`: A required string that represents the email address of the theatre.
     - `owner`: A reference to another document in the `users` collection, represented by an ObjectId.
     - `isActive`: A boolean that indicates whether the theatre is active or not, with a default value of `false`.
   - The schema also includes timestamps (`{ timestamps: true }`), which automatically adds `createdAt` and `updatedAt` fields to the documents.

3. **Creating the Model:**
   ```javascript
   const Theatre = mongoose.model("theatres", theatreSchema);
   ```
   - This line creates a Mongoose model named `Theatre` based on the `theatreSchema`. The model corresponds to the `theatres` collection in MongoDB.

4. **Exporting the Model:**
   ```javascript
   module.exports = Theatre;
   ```
   - This line exports the `Theatre` model so that it can be used in other parts of the application.

### Summary:
This code defines a Mongoose schema for a theatre, specifying its fields and types, and then creates a model based on that schema. The model is used to interact with the `theatres` collection in MongoDB, allowing you to create, read, update, and delete theatre documents in the database.


---
title:Theatre CRUD Route
description:
duration: 900
card_type: cue_card
---

Now same as we have done for Movies create CRUD route for Theatres

server-routes-theatre.js

```js
const router = require('express').Router();
const Theatre = require('../models/theatreModel');

router.post('/add-theatre',  async (req, res) => {
    try{
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "New theatre has been added!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});




// Update theatre
router.put('/update-theatre',  async (req, res) => {
    try{
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        // console.log(req.body.theatreId)
        res.send({
            success: true,
            message: "Theatre has been updated!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
})

// Delete theatre
router.put('/delete-theatre', async (req, res) => {
    try{
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: "The theatre has been deleted!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});



module.exports = router;

```
 Below is a detailed explanation of each part of the code:

1. **Importing Dependencies:**
   ```javascript
   const router = require('express').Router();
   const Theatre = require('../models/theatreModel');
   ```
   - `express.Router()`: This creates a new router object which can be used to define routes.
   - `Theatre`: This is the Mongoose model for the theatre, which interacts with the MongoDB collection for theatres.

2. **Adding a New Theatre:**
   ```javascript
   router.post('/add-theatre',  async (req, res) => {
       try{
           const newTheatre = new Theatre(req.body);
           await newTheatre.save();
           res.send({
               success: true,
               message: "New theatre has been added!"
           });
       }catch(err){
           res.send({
               success: false,
               message: err.message
           });
       }
   });
   ```
   - `POST /add-theatre`: This route handles the addition of a new theatre.
   - `req.body`: The request body contains the details of the new theatre to be added.
   - `new Theatre(req.body)`: Creates a new instance of the `Theatre` model with the data provided in the request body.
   - `await newTheatre.save()`: Saves the new theatre to the database.
   - On success, sends a response with a success message. On error, sends a response with an error message.

3. **Updating an Existing Theatre:**
   ```javascript
   router.put('/update-theatre',  async (req, res) => {
       try{
           await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
           res.send({
               success: true,
               message: "Theatre has been updated!"
           });
       }catch(err){
           res.send({
               success: false,
               message: err.message
           });
       }
   });
   ```
   - `PUT /update-theatre`: This route handles the updating of an existing theatre.
   - `req.body.theatreId`: The ID of the theatre to be updated.
   - `await Theatre.findByIdAndUpdate(req.body.theatreId, req.body)`: Finds the theatre by its ID and updates it with the new data provided in the request body.
   - On success, sends a response with a success message. On error, sends a response with an error message.

4. **Deleting a Theatre:**
   ```javascript
   router.put('/delete-theatre', async (req, res) => {
       try{
           await Theatre.findByIdAndDelete(req.body.theatreId);
           res.send({
               success: true,
               message: "The theatre has been deleted!"
           });
       }catch(err){
           res.send({
               success: false,
               message: err.message
           });
       }
   });
   ```
   - `PUT /delete-theatre`: This route handles the deletion of a theatre.
   - `req.body.theatreId`: The ID of the theatre to be deleted.
   - `await Theatre.findByIdAndDelete(req.body.theatreId)`: Finds the theatre by its ID and deletes it from the database.
   - On success, sends a response with a success message. On error, sends a response with an error message.

5. **Exporting the Router:**
   ```javascript
   module.exports = router;
   ```
   - This exports the router object so that it can be used in other parts of the application.

### Summary

- The code defines three routes for adding, updating, and deleting theatres.
- Each route uses async/await to handle asynchronous operations with the MongoDB database via Mongoose.
- Proper error handling is implemented to provide meaningful responses to the client based on the success or failure of each operation.

1. Now here As you see there can be different partners and every different partner will have their own set of theatres so for the partner we will have to fetch only the Theatres that he owns


2. For the Admin because he should have all the theatres request in the Admin table we will have have to fetch all the theatre and show who is the partner there


So we will need to have to get routes

1. First get route will get the theatres for the partner that he owns
2. Admin theatres where we will get all theatres so admin can approve or decline a theatrer


So we will write 2 get routes

```js
// Get all theatres for Admin route
router.get('/get-all-theatres', async (req, res) => {
    try{
        const allTheatres = await Theatre.find().populate('owner');
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatres
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Get the theatres of a specific owner
router.post('/get-all-theatres-by-owner',  async (req, res) => {
    try{
        const allTheatres = await Theatre.find({owner: req.body.owner});
        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

```
Here’s an explanation of both routes in the provided code:

### Route 1: Get all theatres for Admin

**Route Definition:**
```javascript
router.get('/get-all-theatres', async (req, res) => {
    try {
        const allTheatres = await Theatre.find().populate('owner');
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatres
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});
```

**Explanation:**
1. **HTTP Method:** GET
2. **Endpoint:** `/get-all-theatres`
3. **Functionality:** 
   - This route is intended to fetch all theatres from the database. It is typically used by an admin to view all the theatres.
4. **Logic:**
   - **Fetching Data:** The route uses `Theatre.find()` to retrieve all theatre documents from the `Theatre` collection.
   - **Populating Owner Field:** The `.populate('owner')` method is used to populate the `owner` field in the theatre documents with the related owner data from the `Owner` collection. This provides detailed information about the owner of each theatre.
   - **Sending Response:** 
     - If the data retrieval is successful, the route sends a response with a success status, a message indicating success, and the fetched theatre data.
     - If an error occurs during the process, the route catches the error and sends a response with a failure status and the error message.

### Route 2: Get the theatres of a specific owner

**Route Definition:**
```javascript
router.post('/get-all-theatres-by-owner', async (req, res) => {
    try {
        const allTheatres = await Theatre.find({ owner: req.body.owner });
        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
});
```

**Explanation:**
1. **HTTP Method:** POST
2. **Endpoint:** `/get-all-theatres-by-owner`
3. **Functionality:** 
   - This route is designed to fetch theatres owned by a specific owner. It is useful when the client wants to see theatres associated with a particular owner.
4. **Logic:**
   - **Request Body:** The route expects the owner ID to be provided in the request body (`req.body.owner`).
   - **Fetching Data:** It uses `Theatre.find({ owner: req.body.owner })` to find and retrieve theatre documents that have the specified owner ID.
   - **Sending Response:** 
     - If the data retrieval is successful, the route sends a response with a success status, a message indicating success, and the fetched theatre data.
     - If an error occurs during the process, the route catches the error and sends a response with a failure status and the error message.

### Key Differences:
1. **HTTP Methods:**
   - The first route uses a `GET` method, which is typically used to retrieve data without any side effects.
   - The second route uses a `POST` method, which is generally used to send data to the server (in this case, the owner ID) to create or retrieve resources based on the provided data.
   
2. **Purpose:**
   - The first route retrieves all theatres for administrative purposes.
   - The second route retrieves theatres specific to a particular owner, based on the owner ID provided in the request body. 

These routes provide the necessary functionality to manage and retrieve theatre information based on different requirements.

Your complete Theatre Route will now look like this

```js
const router = require('express').Router();
const Theatre = require('../models/theatreModel');

router.post('/add-theatre',  async (req, res) => {
    try{
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "New theatre has been added!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

// Get all theatres for Admin route
router.get('/get-all-theatres', async (req, res) => {
    try{
        const allTheatres = await Theatre.find().populate('owner');
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatres
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Get the theatres of a specific owner
router.post('/get-all-theatres-by-owner',  async (req, res) => {
    try{
        const allTheatres = await Theatre.find({owner: req.body.owner});
        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});


// Update theatre
router.put('/update-theatre',  async (req, res) => {
    try{
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        // console.log(req.body.theatreId)
        res.send({
            success: true,
            message: "Theatre has been updated!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
})

// Delete theatre
router.put('/delete-theatre', async (req, res) => {
    try{
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: "The theatre has been deleted!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});



module.exports = router;
















