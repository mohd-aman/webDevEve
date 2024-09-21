---
title:Creating a SingleMovie Page
description:
duration: 900
card_type: cue_card
---

When we click on any Movie on the `HomePage` A page that displays all the details about that Movie should open , We will call it `SingleMovie` component which will render the details of the particular movie that was clicked and also the Show timing of the movies


But before that you need to identify a Single Movie , we will be doing that wil the help of movie ID


So add this route in your movieRoutes files

```js
// Fetch single movie by id
router.get('/movie/:id', async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie fetched successfully!",
            data: movie
        })

    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});
```


and write an Axios Call for this as well
In your Calls - Movie file add this Axios Instance

```js

// Get a single movie by its id
export const getMovieById = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/movies/movie/${id}`)
        return response.data;
    }catch(err){
        return err.response
    }
}

```


Now let;s build the Single Movie Component

```SingleMovie.js``` Component


```js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../calls/movies";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { message, Input, Divider, Row, Col } from "antd";
import { CalendarOutlined } from '@ant-design/icons';
import moment from "moment";
import { getAllTheatresByMovie } from "../calls/shows";

const SingleMovie = () => {
    const params = useParams();
    const [movie, setMovie] = useState();
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDate = (e) => {
        setDate(moment(e.target.value).format("YYYY-MM-DD"));
        navigate(`/movie/${params.id}?date=${e.target.value}`);
    }

    const getData = async () => {
        try{
            dispatch(showLoading());
            const response = await getMovieById(params.id);
            if(response.success){
                setMovie(response.data)
            }else{
                message.error(response.message)
            }
            dispatch(hideLoading());
        }catch(err){
            message.error(err.message)
            dispatch(hideLoading());
        }
    }
    
    const getAllTheatres = async () => {
        try{
            dispatch(showLoading());
            const response = await getAllTheatresByMovie({movie: params.id, date});
            if(response.success){
                setTheatres(response.data);
            }else{
                message.error(response.message);

            }
            dispatch(hideLoading());
        }catch(err){
            dispatch(hideLoading());
            message.err(err.message)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getAllTheatres();
    }, [date])

    return (<>
        <div className="inner-container">
            {movie && <div className="d-flex single-movie-div">
                <div className="flex-Shrink-0 me-3 single-movie-img"><img src={movie.poster} width={150} alt="Movie Poster"/></div>
                <div className="w-100">
                    <h1 className="mt-0">{movie.title}</h1>
                    <p className="movie-data">Language: <span>{movie.language}</span></p>
                    <p className="movie-data">Genre: <span>{movie.genre}</span></p>
                    <p className="movie-data">Release Date: <span>{moment(movie.date).format("MMM Do YYYY")}</span></p>
                    <p className="movie-data">Duration: <span>{movie.duration} Minutes</span></p>
                    <hr/>
                    <div className="d-flex flex-column-mob align-items-center mt-3">
                        <label className="me-3 flex-shrink-0">Choose the date:</label>
                        <Input onChange={handleDate} type="date" min={moment().format("YYYY-MM-DD")} className="max-width-300 mt-8px-mob" value={date} placeholder="default size" prefix={<CalendarOutlined />} />
                    </div>
                </div>
            </div> }           
            {theatres.length === 0 && <div className="pt-3"><h2 className="blue-clr">Currently, no theatres available for this movie!</h2></div>}
            {theatres.length > 0 && <div className="theatre-wrapper mt-3 pt-3">
                <h2>Theatres</h2>
                 {theatres.map((theatre) => {
                    return <div key={theatre._id}>
                        <Row gutter={24} key={theatre._id}>
                            <Col xs={{span: 24}} lg={{span: 8}}>
                                <h3>{theatre.name}</h3>
                                <p>{theatre.address}</p>                            
                            </Col>
                            <Col xs={{span: 24}} lg={{span: 16}}>
                                <ul className="show-ul">
                                    {
                                        theatre.shows.sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm"))
                                        .map((singleShow => {
                                            return <li key={singleShow._id} onClick={() => navigate(`/book-show/${singleShow._id}`)} >{moment(singleShow.time, "HH:mm").format("hh:mm A")}</li>
                                        }))
                                    }                                    
                                </ul>
                            </Col>
                        </Row>
                        <Divider />
                    </div>
                })  
                }
            </div>}
        </div>
    </>
    );
}
export default SingleMovie;

```

**Note - Just make Sure before Creating this component you have atleast 2-3 shows created for a Movie**


**Note - Also add the Route for this component in App.js**
```App.js```

```js
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import SingleMovie from "./pages/SingleMovie";
import Partner from "./pages/Partner";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";

function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <div className="App">
      {loading && (
        <div className="loader-container">
          {" "}
          <div className="loader"> </div>{" "}
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner"
            element={
              <ProtectedRoute>
                <Partner />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/forget' element={<Forget/>}/>
          <Route path='/reset' element={<Reset/>}/>
          <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

```

Here's a detailed explanation of the `SingleMovie` component:

### Component Explanation

```jsx
const SingleMovie = () => {
    // Using React Hooks for state management and router navigation
    const params = useParams(); // Accessing route parameters
    const [movie, setMovie] = useState(); // State for storing movie data
    const [date, setDate] = useState(moment().format("YYYY-MM-DD")); // State for selected date
    const [theatres, setTheatres] = useState([]); // State for theatres related to the movie
    const dispatch = useDispatch(); // Redux dispatch function for managing state
    const navigate = useNavigate(); // Function for navigation

    // Function to handle date selection changes
    const handleDate = (e) => {
        setDate(moment(e.target.value).format("YYYY-MM-DD")); // Updating selected date state
        navigate(`/movie/${params.id}?date=${e.target.value}`); // Navigating to the selected date URL
    }

    // Function to fetch movie details by ID
    const getData = async () => {
        try {
            dispatch(showLoading()); // Dispatching Redux action to show loading indicator
            const response = await getMovieById(params.id); // Fetching movie details
            if(response.success) {
                setMovie(response.data); // Updating movie state with fetched data
            } else {
                message.error(response.message); // Displaying error message if fetching fails
            }
            dispatch(hideLoading()); // Dispatching Redux action to hide loading indicator
        } catch (err) {
            message.error(err.message); // Handling and displaying error message
            dispatch(hideLoading()); // Dispatching Redux action to hide loading indicator
        }
    }

    // Function to fetch all theatres showing the movie on selected date
    const getAllTheatres = async () => {
        try {
            dispatch(showLoading()); // Dispatching Redux action to show loading indicator
            const response = await getAllTheatresByMovie({ movie: params.id, date }); // Fetching theatres data
            if(response.success) {
                setTheatres(response.data); // Updating theatres state with fetched data
            } else {
                message.error(response.message); // Displaying error message if fetching fails
            }
            dispatch(hideLoading()); // Dispatching Redux action to hide loading indicator
        } catch (err) {
            dispatch(hideLoading()); // Dispatching Redux action to hide loading indicator
            message.error(err.message); // Handling and displaying error message
        }
    }

    // Effect hook to fetch movie details on component mount
    useEffect(() => {
        getData();
    }, []);

    // Effect hook to fetch theatres data whenever date changes
    useEffect(() => {
        getAllTheatres();
    }, [date]);

    // JSX to render the component UI
    return (
        <>
            <div className="inner-container">
                {/* Conditionally rendering movie details */}
                {movie && (
                    <div className="d-flex single-movie-div">
                        <div className="flex-Shrink-0 me-3 single-movie-img">
                            <img src={movie.poster} width={150} alt="Movie Poster" />
                        </div>
                        <div className="w-100">
                            <h1 className="mt-0">{movie.title}</h1>
                            <p className="movie-data">Language: <span>{movie.language}</span></p>
                            <p className="movie-data">Genre: <span>{movie.genre}</span></p>
                            <p className="movie-data">Release Date: <span>{moment(movie.date).format("MMM Do YYYY")}</span></p>
                            <p className="movie-data">Duration: <span>{movie.duration} Minutes</span></p>
                            <hr />
                            <div className="d-flex flex-column-mob align-items-center mt-3">
                                <label className="me-3 flex-shrink-0">Choose the date:</label>
                                <Input onChange={handleDate} type="date" min={moment().format("YYYY-MM-DD")} className="max-width-300 mt-8px-mob" value={date} placeholder="default size" prefix={<CalendarOutlined />} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Conditionally rendering theatre information */}
                {theatres.length === 0 && (
                    <div className="pt-3">
                        <h2 className="blue-clr">Currently, no theatres available for this movie!</h2>
                    </div>
                )}

                {theatres.length > 0 && (
                    <div className="theatre-wrapper mt-3 pt-3">
                        <h2>Theatres</h2>
                        {/* Mapping through theatres and rendering theatre details */}
                        {theatres.map((theatre) => (
                            <div key={theatre._id}>
                                <Row gutter={24} key={theatre._id}>
                                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                                        <h3>{theatre.name}</h3>
                                        <p>{theatre.address}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                                        <ul className="show-ul">
                                            {/* Sorting shows by time and mapping through them */}
                                            {theatre.shows.sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm"))
                                                .map((singleShow) => (
                                                    <li key={singleShow._id} onClick={() => navigate(`/book-show/${singleShow._id}`)}>
                                                        {moment(singleShow.time, "HH:mm").format("hh:mm A")}
                                                    </li>
                                                ))}
                                        </ul>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
```

### Explanation:

1. **State Management**: 
   - `useState`: Manages state variables like `movie`, `date`, and `theatres`.
   - `useParams`: Retrieves parameters from the URL using React Router.
   - `useDispatch` and `useNavigate`: Hooks from React Redux and React Router respectively for dispatching actions and navigation.

2. **Lifecycle Management**: 
   - `useEffect`: Executes `getData` on component mount to fetch movie details.
   - `useEffect` with `[date]` dependency: Executes `getAllTheatres` whenever `date` changes to fetch theatres for the selected date.

3. **Event Handling**: 
   - `handleDate`: Updates the `date` state and navigates to the selected date URL when the date input changes.

4. **Data Fetching**: 
   - `getData`: Fetches movie details by ID using `getMovieById`.
   - `getAllTheatres`: Fetches theatres showing the movie on the selected `date` using `getAllTheatresByMovie`.

5. **Conditional Rendering**: 
   - Conditionally renders movie details (`movie`) and theatre information (`theatres`).

6. **UI Components**: 
   - Uses Ant Design components like `Input`, `Divider`, `Row`, `Col`, and `CalendarOutlined` for structured UI rendering.

7. **Error Handling**: 
   - Displays error messages using Ant Design `message.error` for any API call failures.

This component displays a dynamic UI displaying movie details and available theatres based on selected dates.

The Page will look somthing like this

<img src='https://i.ibb.co/PjJYKMd/Screenshot-2024-06-29-at-1-03-21-PM.png'/>

Now you will be able to see Complete Movie and Show details and will be able to select Shows


---
title:Selecting Shows and Seating Arrangement
description:
duration: 900
card_type: cue_card
---

When we select a Show the Next thing that we need is the seating arrangement that should be visible to the user so they can go and book seats and then also make payment to get the tickets

**Create a Page by the name `BookShow.js` in your Pages directory and make sure to add a Route of this in app.js file**

```BookShow.js```


```js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getShowById } from "../calls/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from 'moment';

const BookShow = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [show, setShow] = useState();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const getData = async () => {
        try{
            dispatch(showLoading());
            const response = await getShowById({showId: params.id});
            if(response.success){
                setShow(response.data);
                // message.success(response.message);
                console.log(response.data)
            }else{
                message.error(response.message)
            }
            dispatch(hideLoading());
        }catch(err){
            message.error(err.message);
            dispatch(hideLoading());
        }
    }

    const getSeats = () => {
        let columns = 12;
        let totalSeats = 120;
        let rows = totalSeats / columns; // 10

        return(
            <div className="d-flex flex-column align-items-center">
                <div className="w-100 max-width-600 mx-auto mb-25px">
                    <p className="text-center mb-10px">Screen this side, you will be watching in this direction</p>
                    <div className="screen-div">
                    </div>
                </div>
                <ul className="seat-ul justify-content-center">
                    { Array.from(Array(rows).keys()).map((row) => 
                        { return (Array.from(Array(columns).keys()).map((column) => {
                            let seatNumber = row * columns + column + 1;

                            let seatClass = "seat-btn";
                            if(selectedSeats.includes(seatNumber)){
                                seatClass += " selected"
                            }
                            if(show.bookedSeats.includes(seatNumber)){
                                seatClass += " booked"
                            }
                            if(seatNumber <= totalSeats)
                                return(
                                    <li><button className={seatClass} onClick={() => {
                                        if(selectedSeats.includes(seatNumber)){
                                            setSelectedSeats(selectedSeats.filter((curSeatNumber => curSeatNumber !== seatNumber)))
                                        }else{
                                            setSelectedSeats([...selectedSeats, seatNumber]);
                                        }
                                    }}>{seatNumber}</button></li>
                                )                            
                            })
                        )
                    })}
                </ul>

                <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
                    <div className="flex-1">Selected Seats: <span>{ selectedSeats.join(", ") }</span></div>
                    <div className="flex-shrink-0 ms-3">Total Price: <span>Rs. { selectedSeats.length * show.ticketPrice  }</span></div>
                </div>
            </div>
        )
    }


    useEffect(() => {
        getData();
    }, [])

    return (<>
            
        {show && <Row gutter={24}>
            <Col span={24}>
            
                <Card
                title={<div className="movie-title-details">
                    <h1>{show.movie.title}</h1>
                    <p>Theatre: {show.theatre.name}, {show.theatre.address}</p>
                </div>}
                extra={<div className="show-name py-3">
                <h3><span>Show Name:</span> {show.name}</h3>
                <h3><span>Date & Time: </span>{moment(show.date).format("MMM Do YYYY")} at {moment(show.time, "HH:mm").format("hh:mm A")}</h3> 
                <h3><span>Ticket Price:</span> Rs. {show.ticketPrice}/-</h3>
                <h3><span>Total Seats:</span> {show.totalSeats}<span> &nbsp;|&nbsp; Available Seats:</span> {show.totalSeats - show.bookedSeats.length}  </h3>
                </div>}
                style={{ width: "100%" }}
                >
                { getSeats() }

                
                { selectedSeats.length > 0 && <li> {selectedSeats} </li>}
                </Card>                
            </Col>
        </Row>}
        

    </>)
}
export default BookShow;
```
adding comments to the code to explain each part, and then provide detailed explanations outside the code blocks.

```javascript
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getShowById } from "../calls/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from 'moment';

const BookShow = () => {
    // Redux state and hooks
    const { user } = useSelector((state) => state.user); // Extracting user from Redux state
    const dispatch = useDispatch(); // Redux dispatch function
    const [show, setShow] = useState(); // State for holding show details
    const [selectedSeats, setSelectedSeats] = useState([]); // State for managing selected seats
    const params = useParams(); // Extracting URL parameters
    const navigate = useNavigate(); // Navigation hook

    // Function to fetch show data by ID
    const getData = async () => {
        try {
            dispatch(showLoading()); // Dispatching action to show loading state
            const response = await getShowById({ showId: params.id }); // API call to fetch show details
            if (response.success) {
                setShow(response.data); // Setting state with fetched show data
                // message.success(response.message); // Optional success message
                console.log(response.data); // Logging show data to console
            } else {
                message.error(response.message); // Displaying error message if API call fails
            }
            dispatch(hideLoading()); // Dispatching action to hide loading state
        } catch (err) {
            message.error(err.message); // Handling errors from API call
            dispatch(hideLoading()); // Hiding loading state on error
        }
    };

    // Function to generate seat layout dynamically
    const getSeats = () => {
        let columns = 12; // Number of columns for seating arrangement
        let totalSeats = 120; // Total number of seats
        let rows = totalSeats / columns; // Calculating number of rows

        return (
            <div className="d-flex flex-column align-items-center">
                <div className="w-100 max-width-600 mx-auto mb-25px">
                    <p className="text-center mb-10px">Screen this side, you will be watching in this direction</p>
                    <div className="screen-div">
                        {/* Placeholder for screen display */}
                    </div>
                </div>
                <ul className="seat-ul justify-content-center">
                    {Array.from(Array(rows).keys()).map((row) => (
                        // Mapping rows
                        Array.from(Array(columns).keys()).map((column) => {
                            let seatNumber = row * columns + column + 1; // Calculating seat number

                            let seatClass = "seat-btn"; // Default class for seat button
                            if (selectedSeats.includes(seatNumber)) {
                                seatClass += " selected"; // Adding 'selected' class if seat is selected
                            }
                            if (show.bookedSeats.includes(seatNumber)) {
                                seatClass += " booked"; // Adding 'booked' class if seat is already booked
                            }
                            if (seatNumber <= totalSeats) {
                                // Rendering seat button if seat number is valid
                                return (
                                    <li key={seatNumber}>
                                        {/* Key added for React list rendering optimization */}
                                        <button
                                            className={seatClass}
                                            onClick={() => {
                                                // Function to handle seat selection/deselection
                                                if (selectedSeats.includes(seatNumber)) {
                                                    setSelectedSeats(selectedSeats.filter((curSeatNumber) => curSeatNumber !== seatNumber));
                                                } else {
                                                    setSelectedSeats([...selectedSeats, seatNumber]);
                                                }
                                            }}
                                        >
                                            {seatNumber}
                                        </button>
                                    </li>
                                );
                            }
                        })
                    ))}
                </ul>

                <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
                    <div className="flex-1">
                        Selected Seats: <span>{selectedSeats.join(", ")}</span>
                    </div>
                    <div className="flex-shrink-0 ms-3">
                        Total Price: <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
                    </div>
                </div>
            </div>
        );
    };

    // Effect hook to fetch data on component mount
    useEffect(() => {
        getData();
    }, []);

    // JSX rendering
    return (
        <>
            {show && (
                <Row gutter={24}>
                    <Col span={24}>
                        <Card
                            title={
                                <div className="movie-title-details">
                                    <h1>{show.movie.title}</h1>
                                    <p>Theatre: {show.theatre.name}, {show.theatre.address}</p>
                                </div>
                            }
                            extra={
                                <div className="show-name py-3">
                                    <h3>
                                        <span>Show Name:</span> {show.name}
                                    </h3>
                                    <h3>
                                        <span>Date & Time: </span>
                                        {moment(show.date).format("MMM Do YYYY")} at{" "}
                                        {moment(show.time, "HH:mm").format("hh:mm A")}
                                    </h3>
                                    <h3>
                                        <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                                    </h3>
                                    <h3>
                                        <span>Total Seats:</span> {show.totalSeats}
                                        <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                                        {show.totalSeats - show.bookedSeats.length}
                                    </h3>
                                </div>
                            }
                            style={{ width: "100%" }}
                        >
                            {getSeats()} {/* Rendering dynamic seat layout */}
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default BookShow;
```

### Detailed Explanation:

1. **Redux Setup**: 
   - `useSelector` and `useDispatch` are used to interact with Redux store. `user` is extracted from Redux state to determine current user details.

2. **State Management**:
   - `useState` hooks manage `show` (current show details), `selectedSeats` (array of selected seat numbers).

3. **Fetching Show Data (`getData` function)**:
   - This asynchronous function fetches show details using `getShowById` API call with `showId` from `params`.
   - Redux `dispatch` is used to manage loading state (`showLoading`, `hideLoading`).
   - Handles success and failure responses from the API, updating `show` state accordingly.

4. **Rendering Seat Layout (`getSeats` function)**:
   - Calculates the number of rows and columns based on `totalSeats`.
   - Maps through rows and columns to dynamically generate seat buttons.
   - Applies CSS classes (`selected`, `booked`) based on whether seats are selected or already booked (`show.bookedSeats`).

The seat number calculation logic in the `getSeats` function determines the numerical identifier for each seat in a grid layout. Let's break down the logic mathematically:

### Understanding the Seat Number Calculation

In the provided code:

```javascript
let columns = 12; // Number of columns for seating arrangement
let totalSeats = 120; // Total number of seats
// Added static value fo seat number as of now this can be dynamic
let rows = totalSeats / columns; // Calculating number of rows
```

- **`columns`**: Represents the number of columns in the seating arrangement. In this case, each row will contain 12 seats.

- **`totalSeats`**: Indicates the total number of seats available in the venue.

- **`rows`**: Calculated as `totalSeats / columns`, gives the number of rows needed to accommodate all seats in a grid formation.

### Mathematical Calculation of Seat Number

The seat number calculation within the nested `Array.map` function is performed as follows:

```javascript
let seatNumber = row * columns + column + 1;
```

- **`row`**: Iterating over each row index within the grid.
- **`column`**: Iterating over each column index within the grid.
- **`+1`**: Adjusts the seat numbering to start from 1 instead of 0.

### Detailed Explanation:

1. **Row and Column Calculation**:
   - The `Array.from(Array(rows).keys())` creates an array of row indices (`0` to `rows-1`).
   - The `Array.from(Array(columns).keys())` creates an array of column indices (`0` to `columns-1`).

2. **Seat Number Calculation**:
   - For each combination of `row` and `column`, `seatNumber` is calculated using the formula:
     ```
     seatNumber = row * columns + column + 1;
     ```
   - This formula ensures that each seat gets a unique identifier within the range from `1` to `totalSeats`.

### Example Calculation:

Assuming `columns = 12` and `totalSeats = 120`:

- Rows (`rows`) would be `totalSeats / columns = 10`.
- Iterating through each row (`0` to `9`) and each column (`0` to `11`), the seat number calculation progresses as follows:

   - For `row = 0` and `column = 0`, `seatNumber = 0 * 12 + 0 + 1 = 1`.
   - For `row = 0` and `column = 1`, `seatNumber = 0 * 12 + 1 + 1 = 2`.
   - ...
   - For `row = 1` and `column = 0`, `seatNumber = 1 * 12 + 0 + 1 = 13`.
   - ...
   - For `row = 9` and `column = 11`, `seatNumber = 9 * 12 + 11 + 1 = 120`.

### Conclusion:

The seat number calculation logic efficiently assigns a unique identifier to each seat in a grid layout, ensuring that seats are sequentially numbered starting from 1. This approach facilitates easy tracking and management of seat selection within the `BookShow` component, enabling users to interact with and select seats dynamically based on availability and user preferences.

5. **Effect Hook (`useEffect`)**:
   - Executes `getData` function once on component mount (`[]` dependency ensures it runs once).

6. **JSX Rendering**:
   - Conditional rendering (`{show && ...}`) ensures that the component waits for show data before rendering.
   - Displays show details (`show.movie.title`, `show.theatre.name`, etc.) in an `antd Card` component.
   - Calls `getSeats()` to render the dynamic seat layout based on fetched show data.
   - Calculates and displays total price based on the number of selected seats (`selectedSeats.length * show.ticketPrice`).

 Now you will be able to select seats and the UI will look something like this

 <img src='https://i.ibb.co/1d4CshL/Screenshot-2024-06-29-at-1-36-21-PM.png'>



---
title:Book seats and Make Payment
description:
duration: 900
card_type: cue_card
---


Now the Next Step is to book tickets , for that we will use Stripe

#### What is Stripe

Stripe is an online payment processing platform that enables businesses to accept payments over the internet. It provides a suite of APIs (Application Programming Interfaces) that allows developers to integrate payment processing into websites and mobile applications easily. Here are some key aspects of Stripe:

1. **Payment Methods**: Stripe supports various payment methods including credit cards, debit cards, digital wallets (like Apple Pay and Google Pay), and bank transfers.

2. **Integration**: Developers can integrate Stripe into their applications using Stripe's APIs and SDKs (Software Development Kits). This integration allows businesses to securely capture and process payments without handling sensitive card information directly.

3. **Security**: Stripe is known for its robust security measures. It handles compliance and security requirements such as PCI-DSS (Payment Card Industry Data Security Standard) compliance, ensuring that payment information is handled securely.

4. **Features**: Apart from basic payment processing, Stripe offers features like subscription billing, recurring payments, invoicing, and customizable checkout experiences.

5. **Dashboard and Reporting**: Businesses using Stripe have access to a dashboard that provides insights into transactions, customer data, and other analytics related to payments.

6. **Global Reach**: Stripe supports payments in over 135 currencies and facilitates international transactions, making it suitable for businesses operating globally.

Overall, Stripe simplifies the process of online payment acceptance for businesses of all sizes, from startups to large enterprises, by providing a flexible and developer-friendly platform.


**Stripe Website - https://stripe.com/in**

Visit this webiste and log yourself in , after that make sure to generate your API keys - there will be two keys , one will be publishable key and another will be secret key , Generate both of them

In Stripe, the **publishable key** and **secret key** are both essential for securely integrating Stripe's payment services into your website or application:

1. **Publishable Key**:
   - The publishable key is used on the client-side (in the browser or mobile app) to identify your Stripe account when making API requests.
   - It is safe to expose this key in your frontend code (e.g., JavaScript), as it does not grant access to sensitive actions like issuing refunds or viewing transactions.
   - Its primary purpose is to initialize Stripe.js (Stripe's JavaScript library) on the client side and to generate secure tokens for handling payment details securely.

2. **Secret Key**:
   - The secret key, also known as the API key, is used on the server-side of your application to authenticate API requests to Stripe.
   - This key must be kept confidential and should never be exposed in frontend code or client-side applications.
   - It grants full access to your Stripe account, including the ability to perform actions like processing charges, creating refunds, managing subscriptions, and accessing sensitive data.

To summarize, the publishable key is used on the client-side for initiating transactions securely, while the secret key is used on the server-side for authenticating and performing operations securely with Stripe's API. It's crucial to handle these keys with care to maintain the security and integrity of your Stripe integration.


<img src='https://i.ibb.co/ySXgJyD/Screenshot-2024-06-29-at-3-32-49-PM.png'>

Here at the bottom left you will see two key copy them and save them somehwhere


Now install this npm library in your client folder `npm i react-stripe-checkout`

This will give you a checkout button and then will generate a payment component for card details

<img src='https://i.ibb.co/3FsC94j/Screenshot-2024-06-29-at-1-46-40-PM.png'>


How to add add this in our code

Go to BookShow.js Component and import `React-stripe-checkout` and then add that component like this at the bottom


```js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getShowById } from "../calls/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
 import { bookShow, makePayment } from "../calls/bookings";
import StripeCheckout from 'react-stripe-checkout'; // Stripe Checkout

const BookShow = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
        // message.success(response.message);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const getSeats = () => {
    let columns = 12;
    let totalSeats = 120;
    let rows = totalSeats / columns; // 10

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div"></div>
        </div>
        <ul className="seat-ul justify-content-center">
          {Array.from(Array(rows).keys()).map((row) => {
            return Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1;

              // Calculation for the first iteration
              // 0*12 + 0+1 = 1
              // 0*12 + 1+1 = 2
              // 0*12 + 2+1 = 3
              // So on up till 12th seat

              // Calculation for the second iteration
              // 1*12 + 0+1 = 13
              // 1*12 + 1+1 = 14
              // 1*12 + 2+1 = 15
              // So on up till 24th seat

              // Calculation for the third iteration
              // 2*12 + 0+1 = 25
              // 2*12 + 1+1 = 26
              // 2*12 + 2+1 = 27
              // So on up till 36th seat

              // So on...

              // this part

              let seatClass = "seat-btn";

              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected";
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked";
              }

              if (seatNumber <= totalSeats)
                return (
                  <li>
                    <button
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
            });
          })}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };


  const onToken=(token)=>{
   console.log(token)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.title}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}{" "}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}


              { selectedSeats.length > 0 && <StripeCheckout  token={onToken}  billingAddress amount={selectedSeats.length * show.ticketPrice * 100} stripeKey="pk_test_51JKPQWSJULHQ0FL7VOkMrOMFh0AHMoCFit29EgNlVRSvFkDxSoIuY771mqGczvd6bdTHU1EkhJpojOflzoIFGmj300Uj4ALqXa">
                    { /* Use this one in some situation=> pk_test_eTH82XLklCU1LJBkr2cSDiGL001Bew71X8  */ }
                    <div className="max-width-600 mx-auto">
                        <Button type="primary" shape="round" size="large" block>Pay Now</Button>
                    </div></StripeCheckout>}

            
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default BookShow;

```

In your code snippet, you're using `react-stripe-checkout` to integrate Stripe for payments. Here’s an explanation of the key aspects:

1. **Stripe Checkout Integration**:
   - `StripeCheckout` component from `react-stripe-checkout` is used to handle the payment process. It takes several props, including `token`, `billingAddress`, `amount`, and `stripeKey`.

2. **Publishable Key**:
   - The `stripeKey` prop (`pk_test_51JKPQWSJULHQ0FL7VOkMrOMFh0AHMoCFit29EgNlVRSvFkDxSoIuY771mqGczvd6bdTHU1EkhJpojOflzoIFGmj300Uj4ALqXa`) is the publishable key obtained from your Stripe dashboard. This key is used on the client side to securely communicate with Stripe and generate a token representing the payment details.

3. **Generating Token**:
   - When a user clicks "Pay Now", `StripeCheckout` calls the `token` callback function (`onToken`) you provided. This function (`onToken`) receives a token object from Stripe containing payment details, which you can then use to process the payment on your server.

4. **Handling Payment**:
   - The `token` callback (`onToken`) logs the token object to the console in your example. Typically, you would send this token to your server (via an API call) along with other relevant information (like the total amount and selected items) to process the payment securely using Stripe’s API.



   This is how the token will be generated as soon as you make payment

   <img src='https://i.ibb.co/D93GNFC/Screenshot-2024-06-29-at-3-40-15-PM.png'>


   
---
title:Booking Model
description:
duration: 900
card_type: cue_card
---
This is the token that has been generated from the client side, this is not complete payment , we need to validate this token from our server as well

For that we will create a Booking Model in our server side
   `BookingModel.js`

```js
   const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shows"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    seats: {
        type: Array,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("bookings", bookingSchema);
```
 Let's break down the schema and its components:

### Schema Explanation:

1. **Dependencies**: 
   - `const mongoose = require('mongoose');`: This imports Mongoose, the MongoDB object modeling tool.
   - `mongoose.Schema`: This defines the structure of the document that will be stored in MongoDB.

2. **Schema Definition**:
   - `bookingSchema`: This variable defines the schema for the booking model using `new mongoose.Schema({...})`.

3. **Fields in the Schema**:
   - **show**: 
     - Type: `mongoose.Schema.Types.ObjectId`
     - Refers to another collection named "shows" using `ref: "shows"`. This implies a relationship where each booking is associated with a specific show.
   
   - **user**: 
     - Type: `mongoose.Schema.Types.ObjectId`
     - Refers to another collection named "users" using `ref: "users"`. This implies a relationship where each booking is associated with a specific user.

   - **seats**: 
     - Type: `Array`
     - Required: `true`
     - Represents an array of seats booked. This field is mandatory (`required: true`), meaning every booking document must include information about the seats booked.

   - **transactionId**: 
     - Type: `String`
     - Required: `true`
     - Represents the transaction ID associated with the booking. This field is mandatory (`required: true`), indicating that every booking must have a valid transaction ID.

4. **Options**:
   - `{ timestamps: true }`: This option automatically adds `createdAt` and `updatedAt` fields to the document, which record the creation and last modification times of each booking. 

5. **Export**:
   - `module.exports = mongoose.model("bookings", bookingSchema);`: This exports the Mongoose model named "bookings", which uses the `bookingSchema` schema defined above. This allows other parts of the application to interact with the "bookings" collection in MongoDB using methods provided by Mongoose (e.g., `find`, `findOne`, `create`, `update`, `delete`).

### Summary:
This Mongoose schema defines a "bookings" collection in MongoDB. Each document (booking) in this collection will have fields for a reference to a show, a reference to a user, an array of booked seats, and a transaction ID. The schema also includes automatic timestamps for tracking creation and update times of each booking. This setup facilitates relationships between bookings, users, and shows while ensuring mandatory fields are present for each booking entry.

---
title:Booking Routes
description:
duration: 900
card_type: cue_card
---

Now we will create Booking Routes

Create a file by the name bookingRoutes.js and make sure to attach it with your main server file

before that in your server side Install stripe

```npm install stripe```
also make sure you add your secret key in .env file

Booking Route File

```js
const router = require('express').Router();
const stripe = require('stripe')(process.env.stripe_key);
const authMiddleware = require('../middlewares/authMiddleware');
const Booking = require('../models/bookingModel');
const Show = require('../models/showModel');

router.post('/make-payment', authMiddleware, async (req, res) => {
    try{
        const {token, amount} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            payment_method_types: ['card'],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!"
        });
        
        const transactionId = paymentIntent.id;

        res.send({
            success: true,
            message: "Payment Successful! Ticket(s) booked!",
            data: transactionId
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

// Create a booking after the payment
router.post('/book-show', authMiddleware, async (req, res) => {
    try{
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, { bookedSeats: updatedBookedSeats });
        res.send({
            success: true,
            message: 'New Booking done!',
            data: newBooking
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});


router.get("/get-all-bookings", authMiddleware, async (req, res) => {
    try{
        const bookings = await Booking.find({ user: req.body.userId })
        .populate("user")
        .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies"
                }
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres"
                }
            });
        
        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings
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

Sure, let's go through each route in detail:

### Route 1: POST /make-payment

This route handles the payment process using Stripe.

- **Middleware Used:** `authMiddleware` is used to authenticate the user making the payment.
  
- **Functionality:** 
  - It expects `token` (containing payment information) and `amount` in the request body.
  - Creates a customer in Stripe using the provided email and payment source (token).
  - Creates a payment intent with the specified amount in USD, associating it with the customer.
  - Sends back a success response with the transaction ID if the payment is successful.
  - Sends back an error message if the payment fails.

### Route 2: POST /book-show

This route creates a new booking after successful payment.

- **Middleware Used:** `authMiddleware` ensures that the user is authenticated before booking a show.
  
- **Functionality:** 
  - Creates a new instance of `Booking` model using the data from the request body and saves it to the database.
  - Retrieves the show details associated with the booking (`show`) and updates the list of booked seats (`bookedSeats`) by adding the new booking's seats.
  - Sends back a success response with the newly created booking details if successful.
  - Sends back an error message if there's an issue with saving the booking or updating the show details.

### Route 3: GET /get-all-bookings

This route fetches all bookings made by the authenticated user.

- **Middleware Used:** `authMiddleware` ensures that only authenticated users can access their bookings.
  
- **Functionality:** 
  - Retrieves all bookings from the database where the `user` field matches the authenticated user's ID (`req.body.userId`).
  - Populates the `user` and `show` fields of each booking with their respective details.
  - Further populates the `show` field with details of the associated `movie` and `theatre`.
  - Sends back a success response with all bookings and their associated details if successful.
  - Sends back an error message if there's an issue with fetching the bookings.

### Summary

- **POST /make-payment:** Handles payment processing using Stripe, creating a customer and initiating a payment intent.
- **POST /book-show:** Creates a new booking after successful payment, updating the show's booked seats.
- **GET /get-all-bookings:** Fetches all bookings made by the authenticated user, populating detailed show, movie, and theatre information.

These routes collectively manage the flow from making a payment to booking a show and retrieving booking details for the authenticated user. Each route utilizes middleware for authentication and integrates with Mongoose models (`Booking` and `Show`).


**Create Axios Instances for all these Routes inside Booking.js file in your calls folder at the client side**

bookings.js file

```js

import { axiosInstance } from ".";

export const makePayment = async (token, amount) => {
    try{
        const response = await axiosInstance.post('/api/bookings/make-payment', {token, amount});
        // console.log(token, amount, response);
        return response.data;
    }catch(err){
        return err.response
    }
}

export const bookShow = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/bookings/book-show', payload);
        console.log(response.data);
        return response.data;
    }catch(err){
        return err.response
    }
}

export const getAllBookings = async () => {
    try{
        const response = await axiosInstance.get('/api/bookings/get-all-bookings');
        return response.data;
    }catch(err){
        return err.response;
    }
}

```


---
title:Send Token from client and Make Payment
description:
duration: 900
card_type: cue_card
---

Now add these two functions in your BookingShow.js page in the client side , Here we will extend our onToken function and will also write a new function by the name `book`

```js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getShowById } from "../calls/shows";
import { useNavigate, useParams } from "react-router-dom";
import { message, Card, Row, Col, Button } from "antd";
import moment from "moment";
import { bookShow, makePayment } from "../calls/bookings";
import StripeCheckout from "react-stripe-checkout";

const BookShow = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
        // message.success(response.message);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const getSeats = () => {
    let columns = 12;
    let totalSeats = show.totalSeats;
    let rows = Math.ceil(totalSeats / columns);

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div"></div>
        </div>
        <ul className="seat-ul justify-content-center">
          {Array.from(Array(rows).keys()).map((row) => {
            return Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1;

              // Calculation for the first iteration
              // 0*12 + 0+1 = 1
              // 0*12 + 1+1 = 2
              // 0*12 + 2+1 = 3
              // So on up till 12th seat

              // Calculation for the second iteration
              // 1*12 + 0+1 = 13
              // 1*12 + 1+1 = 14
              // 1*12 + 2+1 = 15
              // So on up till 24th seat

              // Calculation for the third iteration
              // 2*12 + 0+1 = 25
              // 2*12 + 1+1 = 26
              // 2*12 + 2+1 = 27
              // So on up till 36th seat

              // So on...

              // this part

              let seatClass = "seat-btn";

              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected";
              }
              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked";
              }

              if (seatNumber <= totalSeats)
                return (
                  <li>
                    <button
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber
                            )
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                      className={seatClass}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
            });
          })}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await bookShow({
        show: params.id,
        transactionId,
        seats: selectedSeats,
        user: user._id,
      });
      if (response.success) {
        message.success("Show Booking done!");
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(showLoading());
      const response = await makePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
         console.log(response);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };




  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.title}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Show Name:</span> {show.name}
                  </h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> {show.totalSeats}
                    <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                    {show.totalSeats - show.bookedSeats.length}{" "}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()}

              {selectedSeats.length > 0 && (
                <StripeCheckout
                  token={onToken}
                  amount={selectedSeats.length * show.ticketPrice*100}
            
        
                  stripeKey="pk_test_51JKPQWSJULHQ0FL7VOkMrOMFh0AHMoCFit29EgNlVRSvFkDxSoIuY771mqGczvd6bdTHU1EkhJpojOflzoIFGmj300Uj4ALqXa"
                >
                  {/* Use this one in some situation=> pk_test_eTH82XLklCU1LJBkr2cSDiGL001Bew71X8  */}
                  <div className="max-width-600 mx-auto">
                    <Button type="primary" shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default BookShow;

```
 Let's go through the functions `onToken` and `book` in detail with comments added in the code where they are working.

### Function `onToken`

```javascript
const onToken = async (token) => {
  try {
    dispatch(showLoading()); // Show loading spinner

    // Make payment using token and calculate amount in cents
    const response = await makePayment(
      token,
      selectedSeats.length * show.ticketPrice * 100
    );

    if (response.success) {
      message.success(response.message); // Display success message
      book(response.data); // Proceed to book the show with transaction data
      console.log(response); // Log payment response
    } else {
      message.error(response.message); // Display error message
    }

    dispatch(hideLoading()); // Hide loading spinner
  } catch (err) {
    message.error(err.message); // Display error message if payment fails
    dispatch(hideLoading()); // Hide loading spinner
  }
};
```

#### Explanation:
- **Purpose**: Handles the payment process using Stripe's token, initiates the payment request, and handles the response.
- **Steps**:
  1. **Dispatch Loading**: Shows a loading spinner while processing.
  2. **Make Payment**: Calls the `makePayment` function with the Stripe token and calculates the payment amount in cents.
  3. **Handle Response**: If payment is successful (`response.success`), displays a success message, calls `book()` to confirm the booking, and logs the response.
  4. **Error Handling**: If there's an error during payment, displays an error message.
  5. **Dispatch Hide Loading**: Hides the loading spinner after processing completes.

### Function `book`

```javascript
const book = async (transactionId) => {
  try {
    dispatch(showLoading()); // Show loading spinner

    // Book the show with provided details
    const response = await bookShow({
      show: params.id,
      transactionId,
      seats: selectedSeats,
      user: user._id,
    });

    if (response.success) {
      message.success("Show Booking done!"); // Display success message
      navigate("/profile"); // Navigate to user profile page after booking
    } else {
      message.error(response.message); // Display error message if booking fails
    }

    dispatch(hideLoading()); // Hide loading spinner
  } catch (err) {
    message.error(err.message); // Display error message if booking fails
    dispatch(hideLoading()); // Hide loading spinner
  }
};
```

#### Explanation:
- **Purpose**: Handles the booking process after successful payment.
- **Steps**:
  1. **Dispatch Loading**: Shows a loading spinner while processing.
  2. **Book Show**: Calls the `bookShow` function to reserve seats for the user with the provided transaction ID, selected seats, and user ID.
  3. **Handle Response**: If booking is successful (`response.success`), displays a success message, navigates the user to their profile page.
  4. **Error Handling**: If there's an error during booking, displays an error message.
  5. **Dispatch Hide Loading**: Hides the loading spinner after processing completes.

These functions together manage the flow of selecting seats, making a payment via Stripe, and booking the show once payment is successful, handling errors and displaying appropriate messages throughout the process.