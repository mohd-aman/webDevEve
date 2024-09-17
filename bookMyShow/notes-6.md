```

---
title:Theatre Axios Instances
description:
duration: 900
card_type: cue_card
---

Now inside your calls folder at the client side create `AxiosInstaces` for all the Theatre routes


```js

import { axiosInstance } from ".";

export const addTheatre = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/theatres/add-theatre', payload);
        return response.data;
    }catch(err){
        return err.response;
    }
}

// Get all theatres for the Admin route
export const getAllTheatresForAdmin = async () => {
    try{
        const response = await axiosInstance.get('/api/theatres/get-all-theatres');
        return response.data;
    }catch(err){
        return err.response;
    }
}

// Get theatres of a specific owner
export const getAllTheatres = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/theatres/get-all-theatres-by-owner', payload);
        return response.data;
    }catch(err){
        return err.response;
    }
}

// Update Theatre
export const updateTheatre = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/theatres/update-theatre', payload);
        return response.data;
    }catch(err){
        return err.resposne;
    }
}

// Delete Theatre
export const deleteTheatre = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/theatres/delete-theatre', payload);
        return response.data;        
    }catch(err){
        return err.response;
    }
}


```

Here is a brief explanation of each function:

1. **addTheatre**
   - **Purpose:** Sends a POST request to add a new theatre.
   - **Implementation:** 
     - `axiosInstance.post` sends the payload to the specified endpoint.
     - If successful, it returns the response data.
     - If an error occurs, it returns the error response.

2. **getAllTheatresForAdmin**
   - **Purpose:** Sends a GET request to retrieve all theatres for the admin.
   - **Implementation:** 
     - `axiosInstance.get` requests data from the specified endpoint.
     - If successful, it returns the response data.
     - If an error occurs, it returns the error response.

3. **getAllTheatres**
   - **Purpose:** Sends a POST request to retrieve theatres for a specific owner.
   - **Implementation:** 
     - `axiosInstance.post` sends the payload to the specified endpoint.
     - If successful, it returns the response data.
     - If an error occurs, it returns the error response.

4. **updateTheatre**
   - **Purpose:** Sends a PUT request to update theatre details.
   - **Implementation:** 
     - `axiosInstance.put` sends the payload to the specified endpoint.
     - If successful, it returns the response data.
     - If an error occurs, it returns the error response.

5. **deleteTheatre**
   - **Purpose:** Sends a PUT request to delete a theatre.
   - **Implementation:** 
     - `axiosInstance.put` sends the payload to the specified endpoint.
     - If successful, it returns the response data.
     - If an error occurs, it returns the error response.


---
title:Creating Partners Page
description:
duration: 900
card_type: cue_card
---

Now inside your Partner.js component Page , we will create a Tab which will show the theatre list and from there we can also add update delete theatres


In the Partners page will have a component by the name TheatreList

Create TheatreList Component

```js

import React from 'react';

const TheatreList = () => {
   return <h1>TheatreList<h1>
    
}

export default TheatreList;

```
add it in the tab of Partners page

```js


import { Tabs } from 'antd';
import TheatreList from './TheatreList';


const Partner = () => {
      const items = [
        {
          key: '1',
          label: 'Theatres',
          children: <TheatreList/>,
        }
        
      ];

    return (
        <>
        <h1>Partner Page</h1>
            <Tabs defaultActiveKey="2" items={items} />
        </>
    )
}

export default Partner;



```


Inside the TheatreList we will use two more components by the name `TheatreFormModel` and `DeleteTheatreModel`

```TheatreList.js```

```js
import React, { useEffect, useState } from 'react';
import { Table, Button, message} from 'antd';
import TheatreFormModal from './TheatreFormModal';
import DeleteTheatreModal from './DeleteTheatreModal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllTheatres } from '../../calls/theatres';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import ShowModal from './ShowModal';


const TheatreList = () => {
    const { user } = useSelector( (state) => state.user );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add"); 
    const [theatres, setTheatres] = useState(null);
    const dispatch = useDispatch();

    const getData = async () => {
        try{
          dispatch(showLoading());
          const response = await getAllTheatres({ owner: user._id });
          if(response.success){
            const allTheatres = response.data;
            // console.log(allTheatres);
            setTheatres(
                allTheatres.map(function(item){
                return {...item, key: `theatre${item._id}`}
              })
            );
          }else{
            message.error(response.message)
          }
          dispatch(hideLoading())
  
        }catch(err){
          dispatch(hideLoading());
          message.error(err.message);
        }
      }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (status, data) => {
            if(data.isActive){
                return `Approved`
            }else{
                return `Pending/ Blocked`
            }
          }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (text, data) => {
            return(
              <div className='d-flex align-items-center gap-10'>
                <Button onClick={() => { setIsModalOpen(true); setFormType("edit"); setSelectedTheatre(data) }}><EditOutlined/></Button>
                <Button onClick={ () => { setIsDeleteModalOpen(true); setSelectedTheatre(data); }}><DeleteOutlined/></Button>
                { data.isActive && <Button onClick={ () => { setIsShowModalOpen(true); setSelectedTheatre(data); }}>+ Shows</Button> }
              </div>
            )
          }
        },
      ];

      useEffect(() => {
        getData();
      }, [])

    return(
        <>
        <div className='d-flex justify-content-end'>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setFormType("add") }}>Add Theatre</Button>
        </div>   
        <Table dataSource={theatres} columns={columns} />
        { isModalOpen && <TheatreFormModal isModalOpen={isModalOpen} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre} setIsModalOpen={setIsModalOpen} formType={formType} getData={getData} /> }
        { 
            isDeleteModalOpen && <DeleteTheatreModal isDeleteModalOpen={isDeleteModalOpen} selectedTheatre={selectedTheatre} setIsDeleteModalOpen={setIsDeleteModalOpen} setSelectedTheatre={setSelectedTheatre} getData={getData} /> 
        }
        {
          isShowModalOpen && <ShowModal isShowModalOpen={isShowModalOpen} setIsShowModalOpen={setIsShowModalOpen} selectedTheatre={selectedTheatre}/>
        }
        </>
    );
}

export default TheatreList;
```
`TheatreFormModal.js`

```js
import { Col, Modal, Row, Form,  Input, Button, message} from 'antd';
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { addTheatre, updateTheatre } from '../../calls/theatres';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';

const TheatreFormModal = ({isModalOpen, setIsModalOpen, selectedTheatre, setSelectedTheatre, formType, getData}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // }

  const onFinish = async (values)  => {
    try{
      dispatch(showLoading());
      let response = null;
      if(formType === "add"){
        response = await addTheatre({...values, owner: user._id});
      }else{
        values.theatreId = selectedTheatre._id;
        response = await updateTheatre(values);
      }
      console.log(response);
      if(response.success){
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      }else{
        message.error(response.message)
      }
      dispatch(hideLoading());     
    }catch(err){
      dispatch(hideLoading());
      message.error(err.message);
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  }

    return(
        <Modal centered title={formType === "add" ? "Add Theatre" : "Edit Theatre"} open={isModalOpen} onCancel={handleCancel} width={800} footer={null} >
        <Form layout='vertical' style={{width: "100%"}} initialValues={selectedTheatre} onFinish={onFinish}>
          <Row gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}>
            <Col span={24}>
              <Form.Item label="Theatre Name" htmlFor='name' name="name" className='d-block' rules={[{required: true, message: "Theatre name is required!"}]}>
                <Input id="name" type="text" placeholder='Enter the theatre name'></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Theatre Address" htmlFor='address' name="address" className='d-block' rules={[{required: true, message: "Theatre name is required!"}]}>
                <TextArea id="address" rows="3" placeholder='Enter the theatre name'></TextArea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row  gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}>
              <Col span={12}>
                  <Form.Item  label="Email" htmlFor='email' name="email" className='d-block' rules={[{required: true, message: "Email  is required!"}]}>
                        <Input id="email" type="email" placeholder='Enter the email'></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item  label="Phone Number" htmlFor='phone' name="phone" className='d-block' rules={[{required: true, message: "Phone number is required!"}]}>
                    <Input id="phone" type="number" placeholder='Enter the phone number'></Input>
                </Form.Item>                
              </Col>
            </Row>
            </Col>          
          </Row>          
          <Form.Item>
              <Button block type="primary" htmlType='submit' style={{fontSize: "1rem", fontWeight: "600"}}>Submit the Data</Button>
              <Button className='mt-3' block onClick={handleCancel}>Cancel</Button>
          </Form.Item>
      </Form>
      </Modal>
    )
}
export default TheatreFormModal;
```
`DeleteTheatreModel.js`

```js
import { Modal, message } from "antd";
import { deleteTheatre } from "../../calls/theatres";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) => {
  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      dispatch(showLoading);
      const theatreId = selectedTheatre._id;
      const response = await deleteTheatre({ theatreId });
      console.log(theatreId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedTheatre(null);
      }
      setIsDeleteModalOpen(false);
      dispatch(hideLoading);
    } catch (err) {
      dispatch(hideLoading);
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <>
      <Modal
        title="Delete Theatre?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this theatre?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theatre data.
        </p>
      </Modal>
    </>
  );
};

export default DeleteTheatreModal;
```

Let's break down the relationship and details of the three components: `TheatreList.js`, `TheatreFormModal.js`, and `DeleteTheatreModal.js`.

### 1. `TheatreList.js`

This component manages and displays the list of theatres. It has several responsibilities:
- Fetching the list of theatres from the server.
- Displaying the theatres in a table with actions to edit, delete, or add shows.
- Managing the state for modals used to add/edit and delete theatres.

#### Key Parts:

1. **State Management:**
   - `isModalOpen`, `isDeleteModalOpen`, `isShowModalOpen`: Control the visibility of the respective modals.
   - `selectedTheatre`: Holds the theatre data that is currently selected for editing or deletion.
   - `formType`: Determines if the modal is used for adding or editing a theatre.
   - `theatres`: Holds the list of theatres fetched from the server.

2. **Fetching Data:**
   - `getData`: An asynchronous function that fetches the list of theatres based on the user ID and updates the state.

3. **Columns Configuration:**
   - Defines the columns for the `Table` component, including actions like edit and delete.

4. **useEffect:**
   - Calls `getData` when the component mounts to fetch the list of theatres.

5. **Rendering:**
   - Renders a button to add a theatre and the `Table` component.
   - Conditionally renders `TheatreFormModal`, `DeleteTheatreModal`, and `ShowModal` based on the state.

### 2. `TheatreFormModal.js`

This component handles the form for adding or editing a theatre. It is displayed as a modal.

#### Key Parts:

1. **Props:**
   - `isModalOpen`, `setIsModalOpen`: Control the visibility of the modal.
   - `selectedTheatre`, `setSelectedTheatre`: Manage the data of the theatre being edited or added.
   - `formType`: Determines if the form is for adding or editing a theatre.
   - `getData`: Function to refresh the theatre list after an operation.

2. **Form Submission:**
   - `onFinish`: Handles the form submission. Depending on `formType`, it either adds a new theatre or updates an existing one.
   - Uses `addTheatre` and `updateTheatre` API calls.
   - Displays messages based on the success or failure of the operation.

3. **Form Layout:**
   - Uses `Form` from `antd` to handle form rendering and validation.
   - Fields include name, address, email, and phone number.
   - Submit and cancel buttons to handle the form actions.

### 3. `DeleteTheatreModal.js`

This component handles the deletion of a theatre. It is also displayed as a modal.

#### Key Parts:

1. **Props:**
   - `isDeleteModalOpen`, `setIsDeleteModalOpen`: Control the visibility of the modal.
   - `selectedTheatre`, `setSelectedTheatre`: Manage the data of the theatre being deleted.
   - `getData`: Function to refresh the theatre list after deletion.

2. **Deletion Handling:**
   - `handleOk`: Handles the confirmation of the delete action. Calls `deleteTheatre` API and displays appropriate messages based on the success or failure of the operation.
   - `handleCancel`: Closes the modal and resets the selected theatre.

3. **Rendering:**
   - Renders a confirmation message asking if the user is sure about deleting the theatre.
   - Provides `OK` and `Cancel` buttons to handle user actions.

### Relationship and Flow:

1. **User Interaction:**
   - **Viewing Theatres:** `TheatreList` fetches and displays the list of theatres. 
   - **Adding/Editing Theatres:** Clicking "Add Theatre" or the edit button opens `TheatreFormModal` where users can add a new theatre or edit an existing one. The form submission triggers the respective API call and refreshes the list in `TheatreList`.
   - **Deleting Theatres:** Clicking the delete button opens `DeleteTheatreModal`, which asks for confirmation and, upon confirmation, deletes the theatre and refreshes the list in `TheatreList`.

2. **State Management:**
   - `TheatreList` manages the state for the list of theatres and the visibility of modals.
   - `TheatreFormModal` and `DeleteTheatreModal` rely on `TheatreList` for their visibility and to refresh the list upon completion of their respective actions.

3. **Data Flow:**
   - The data (list of theatres) is fetched in `TheatreList` and passed to the respective modals through props.
   - Actions taken in the modals (add, edit, delete) update the data on the server and refresh the list in `TheatreList`.

### Integration:

The integration of these components ensures a smooth user experience for managing theatres. The list is always up-to-date, and modals provide a clean interface for adding, editing, and deleting theatres.

---
title:Admin Approval
description:
duration: 900
card_type: cue_card
---

Now go the admin page and there we have a TheatreTable.js component where we can recieve theatre request and can approve and deny it , let's start buidling that


```TheatresTable.js``` in admin Directory

```js

import { useState, useEffect } from 'react';
import { getAllTheatresForAdmin, updateTheatre } from '../../calls/theatres';
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { message, Button, Table } from 'antd';

const TheatresTable = () => {
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try{
          dispatch(showLoading());
          const response = await getAllTheatresForAdmin();
          if(response.success){
            const allTheatres = response.data;
            setTheatres(
              allTheatres.map(function(item){
                return {...item, key: `theatre${item._id}`}
              })
              );
          }else{
            message.error(response.message)
          }
          dispatch(hideLoading())
  
        }catch(err){
          dispatch(hideLoading());
          message.error(err.message);
        }
      }

      const handleStatusChange = async (theatre) => {
        try{
          dispatch(showLoading);
          let values = {...theatres, theatreId: theatre._id, isActive: !theatre.isActive}
          const response = await updateTheatre(values);
          console.log(response, theatre);
          if(response.success){
            message.success(response.message);
            getData();
          }
          dispatch(hideLoading);
        }catch(err){
          dispatch(hideLoading);
          message.error(err.message);
        }
      }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            render: (text, data) => {
                return data.owner && data.owner.name;
            }
        },
        {
          title: 'Phone Number',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (status, data) => {
            if(data.isActive){
                return 'Approved'
            }else{
                return 'Pending/ Blocked'
            }
          }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (text, data) => {
            return(
              <div className='d-flex align-items-center gap-10'>
                { data.isActive ? <Button onClick={() => handleStatusChange(data)}>Block</Button> : <Button onClick={() => handleStatusChange(data)}>Approve</Button>  }
              </div>
            )
          }
        },
      ];

      useEffect(() => {
        getData();
      }, []);

      // console.log(theatres.length > 0 && theatres);

    return(
      <>
        {theatres && theatres.length > 0 && <Table dataSource={theatres} columns={columns} />}
      </>
    )
}

export default TheatresTable;

```

The provided code is a React component named `TheatresTable` that uses various hooks and libraries to display and manage a list of theatres for an admin. Here's a detailed breakdown of the code:

1. **Imports**:
   - `useState` and `useEffect` from React for managing state and side effects.
   - `getAllTheatresForAdmin` and `updateTheatre` from a module named `theatres` for API calls.
   - `showLoading` and `hideLoading` from a Redux slice named `loaderSlice` to manage loading state.
   - `useDispatch` from `react-redux` to dispatch actions.
   - `message`, `Button`, and `Table` from the Ant Design (`antd`) library for UI components and notifications.

2. **Component Definition**: 
   - The `TheatresTable` component is defined as a functional component.

3. **State Management**:
   - `theatres` state is initialized as an empty array to hold the list of theatres.
   - `useDispatch` is used to get the dispatch function from the Redux store.

4. **getData Function**:
   - This asynchronous function fetches the list of theatres from the server.
   - It dispatches `showLoading` to indicate loading state.
   - It calls `getAllTheatresForAdmin` to get the theatres data.
   - If the response is successful, it maps over the data to add a `key` property to each theatre and sets it in the `theatres` state.
   - It handles any errors by displaying an error message and hiding the loading state using `hideLoading`.

5. **handleStatusChange Function**:
   - This function is used to toggle the active status of a theatre.
   - It dispatches `showLoading` to indicate loading state.
   - It updates the theatre's status and calls `updateTheatre` to send the update to the server.
   - If the update is successful, it displays a success message and fetches the updated data.
   - It handles any errors by displaying an error message and hiding the loading state using `hideLoading`.

6. **Columns Definition**:
   - The `columns` array defines the columns for the Ant Design `Table` component.
   - Each column has a title, data index, and key.
   - The `render` function is used for custom rendering, such as displaying the owner's name, status, and action buttons.

7. **useEffect Hook**:
   - The `useEffect` hook is used to fetch the initial data when the component mounts by calling `getData`.

8. **Return Statement**:
   - The component returns a `Table` component from Ant Design if there are theatres to display.
   - The `Table` is populated with the `theatres` data and the defined `columns`.

```javascript
import { useState, useEffect } from 'react';
import { getAllTheatresForAdmin, updateTheatre } from '../../calls/theatres';
import { showLoading, hideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { message, Button, Table } from 'antd';

const TheatresTable = () => {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatresForAdmin();
      if (response.success) {
        const allTheatres = response.data;
        setTheatres(
          allTheatres.map(function(item) {
            return { ...item, key: `theatre${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(showLoading());
      let values = { ...theatres, theatreId: theatre._id, isActive: !theatre.isActive };
      const response = await updateTheatre(values);
      if (response.success) {
        message.success(response.message);
        getData();
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      render: (text, data) => {
        return data.owner && data.owner.name;
      }
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status, data) => {
        return data.isActive ? 'Approved' : 'Pending/Blocked';
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, data) => {
        return (
          <div className='d-flex align-items-center gap-10'>
            <Button onClick={() => handleStatusChange(data)}>
              {data.isActive ? 'Block' : 'Approve'}
            </Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {theatres && theatres.length > 0 && <Table dataSource={theatres} columns={columns} />}
    </>
  );
};

export default TheatresTable;
```
---

title:Show API
description:
duration: 900
card_type: cue_card

---

Now we need to create CRUD api for Show, So first we will create a Show Model

`ShowModel.js`

```js
const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Array,
      default: [],
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatres",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shows", showSchema);
```

1. **Schema Definition:**
   Inside the schema, various fields are defined with their respective types and constraints:

   - `name`: A string field that is required.
   - `date`: A date field that is required.
   - `time`: A string field that is required.
   - `movie`: A field that stores an ObjectId (a special type used by MongoDB to represent document IDs). This field creates a reference to another model (`movies`). This is used for establishing relationships between different documents. It's marked as required.
   - `ticketPrice`: A number field that is required.
   - `totalSeats`: A number field that is required.
   - `bookedSeats`: An array field with a default value of an empty array. This array is intended to store the details of seats that have been booked.
   - `theatre`: Similar to `movie`, it stores an ObjectId and references the `theatres` model, indicating which theatre the show is in. This field is also required.

2. **Timestamps Option:**

   ```javascript
   {
     timestamps: true;
   }
   ```

   This option automatically adds two new fields—`createdAt` and `updatedAt`—to the schema. These fields store the date and time when a document is created and last updated, respectively.

3. **Model Export:**
   ```javascript
   module.exports = mongoose.model("shows", showSchema);
   ```
   This line creates and exports a model from the defined schema. `mongoose.model` takes two arguments: the model name ("shows") and the schema (`showSchema`). This model represents the `shows` collection in the MongoDB database, where documents conforming to `showSchema` will be stored. By exporting this model, other parts of the application can import and use it to interact with the `shows` collection.

In summary, this code snippet sets up a Mongoose model for a "Show" entity that represent a movie show in a theatre, including various details like showtimes, movie references, pricing, seats, etc., with automatic tracking of creation and modification times.

---

title:Creating Routes for Shows
description:
duration: 900
card_type: cue_card

---

Let's write the API for our Shows

`showRoutes.js`

```js
const router = require("express").Router();

const Show = require("../models/showModel");

// Add Show
router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show has been added!",
    });
    // console.log(req.body, res.success, res.message);
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

router.post("/delete-show", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "The show has been deleted!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

// Update mshow
router.put("/update-show", async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "The show has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/get-all-shows-by-theatre", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
    // console.log(req.body, res.data, shows)
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Get all theatres by movie which has some shows
router.post("/get-all-theatres-by-movie", async (req, res) => {
  try {
    const { movie, date } = req.body;
    // First get all the shows of the selected date
    const shows = await Show.find({ movie, date }).populate("theatre");

    // Filter out the unique theatres now
    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    res.send({
      success: true,
      message: "All theatres fetched!",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/get-show-by-id", async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show fetched!",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
```

let's delve deeper into each part of the code and explain what each section does:

### 1. Setting Up Express Router and Importing Dependencies

```javascript
const router = require("express").Router();
const Show = require("../models/showModel");
```

- **Express Router**:

  - `const router = require('express').Router();` initializes an instance of Express Router, which allows us to define routes for handling HTTP requests.

- **Show Model**:
  - `const Show = require('../models/showModel');` imports the `Show` model from `showModel.js` (assuming it defines a Mongoose schema and methods for interacting with show data in MongoDB).

### 2. Adding a Show (`POST /add-show`)

```javascript
router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body); // Create a new Show instance with data from req.body
    await newShow.save(); // Save the new show to the database
    res.send({
      success: true,
      message: "New show has been added!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
```

- **Functionality**:
  - This route handles a `POST` request to `/add-show`.
  - It expects the request body (`req.body`) to contain data for a new show.
  - It creates a new instance of `Show` using `req.body`, saves it to the database using `await newShow.save()`, and sends a success response if the operation is successful.
  - If there's an error (e.g., validation error or database error), it catches the error and sends a failure response with an error message.

### 3. Deleting a Show (`POST /delete-show`)

```javascript
router.post("/delete-show", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId); // Find and delete a show by its ID
    res.send({
      success: true,
      message: "The show has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
```

- **Functionality**:
  - This route handles a `POST` request to `/delete-show`.
  - It expects the request body (`req.body`) to contain `showId`, which is used to find and delete the corresponding show from the database (`await Show.findByIdAndDelete(req.body.showId)`).
  - If the deletion is successful, it sends a success response.
  - If there's an error (e.g., the show ID is not found or a database error occurs), it sends a failure response with an error message.

### 4. Updating a Show (`PUT /update-show`)

```javascript
router.put("/update-show", async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body); // Find and update a show by its ID
    res.send({
      success: true,
      message: "The show has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
```

- **Functionality**:
  - This route handles a `PUT` request to `/update-show`.
  - It expects the request body (`req.body`) to contain `showId` and updated data (`req.body`).
  - It updates the show identified by `showId` with the new data using `await Show.findByIdAndUpdate(req.body.showId, req.body)`.
  - If the update is successful, it sends a success response.
  - If there's an error (e.g., validation error or database error), it sends a failure response with an error message.

### 5. Getting All Shows by Theatre (`POST /get-all-shows-by-theatre`)

```javascript
router.post("/get-all-shows-by-theatre", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
```

- **Functionality**:
  - This route handles a `POST` request to `/get-all-shows-by-theatre`.
  - It expects the request body (`req.body`) to contain `theatreId`, which is used to find all shows associated with that theatre in the database (`await Show.find({ theatre: req.body.theatreId }).populate('movie')`).
  - It populates each show with details of the associated movie.
  - If shows are found, it sends a success response with the fetched shows.
  - If there's an error (e.g., database error), it sends a failure response with an error message.

### 6. Getting All Theatres by Movie and Date (`POST /get-all-theatres-by-movie`)

```javascript
router.post("/get-all-theatres-by-movie", async (req, res) => {
  try {
    const { movie, date } = req.body;
    // First get all the shows of the selected date
    const shows = await Show.find({ movie, date }).populate("theatre");

    // Filter out the unique theatres now
    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    res.send({
      success: true,
      message: "All theatres fetched!",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
```

- **Functionality**:
  - This route handles a `POST` request to `/get-all-theatres-by-movie`.
  - It expects the request body (`req.body`) to contain `movie` and `date`.
  - It retrieves all shows of the specified `movie` and `date` from the database (`await Show.find({ movie, date }).populate('theatre')`).
  - It then filters out unique theatres and organizes shows under each unique theatre.
  - It sends a success response with the fetched theatres and associated shows.
  - If there's an error (e.g., database error), it sends a failure response with an error message.

### 7. Getting a Show by ID (`POST /get-show-by-id`)

```javascript
router.post("/get-show-by-id", async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show fetched!",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
```

- **Functionality**:
  - This route handles a `POST` request to `/get-show-by-id`.
  - It expects the request body (`req.body`) to contain `showId`.
  - It retrieves a specific show by its `showId` from the database (`await Show.findById(req.body.showId).populate('movie').populate('theatre')`).
  - It populates the retrieved show with details of the associated movie and theatre.
  - It sends a success response with the fetched show.
  - If there's an error (e.g., the show ID is not found or a database error occurs), it sends a failure response with an error message.

### 8. Exporting the Router

```javascript
module.exports = router;
```

- **Functionality**:
  - This line exports the `router` instance, allowing it to be used in other parts of the application where this file (`showRoutes.js`) is imported.

### Summary

This code defines routes (`/add-show`, `/delete-show`, `/update-show`, `/get-all-shows-by-theatre`, `/get-all-theatres-by-movie`, `/get-show-by-id`) for managing shows . Each route handles specific CRUD operations related to shows, interacting with the database via the `Show` model and sending appropriate responses based on the success or failure of the operations.

