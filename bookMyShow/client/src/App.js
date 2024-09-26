import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import store from './redux/store';
import Admin from "./pages/Admin/Admin";
import Partner from "./pages/Partner/Partner";
import Profile from "./pages/Profile/Profile";
import SingleMovie from "./components/SingleMovie";
import BookShow from "./components/BookShow";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";

function App() {
  return (
    <Provider store={store}>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forget />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path='/admin' element={
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          }/>
          <Route path='/partner' element={
            <ProtectedRoute>
              <Partner/>
            </ProtectedRoute>
          }/>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          />
          <Route path="/movie/:id" element={
            <ProtectedRoute>
              <SingleMovie/>
            </ProtectedRoute>
          }/>
          <Route path="/book-show/:id"
          element={
            <ProtectedRoute>
              <BookShow/>
            </ProtectedRoute>
          }
          />
        </Routes>
        
      </BrowserRouter>
    </Provider>
  );
}

export default App;
