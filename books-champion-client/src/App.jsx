import "./App.css";
import Dashboard from "./components/library/dashboard/Dashboard";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/auth/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/notFound/NotFound";
import Protected from "./components/protected/Protected";
import MainLayout from "./components/mainLayout/MainLayout";
import Register from "./components/register/Register";
import { ToastContainer } from "react-toastify";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("book-champions-token");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<Protected isSignedIn={loggedIn} />}>
              <Route path="/libros/*" element={<Dashboard onLogOut={handleLogOut}/>} />
            </Route>
          </Route>
          <Route path="/login" element={<Login onLogin={handleLogIn} />} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
