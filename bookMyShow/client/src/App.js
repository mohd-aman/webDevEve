import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import store from './redux/store';
import Admin from "./pages/Admin/Admin";

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
          <Route path='/admin' element={
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
