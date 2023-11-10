// import logo from './logo.svg';
// import React, { useState } from 'react';
// import './App.css';
// import Navbar from './components/Navbar';
// import PurchaseOrder from './components/PurchaseOrder'
// import Order from './components/Order'
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

// function App() {
//   const [mode, setMode] = useState('light');
//   const [notice, setNotice] = useState(null);
//   const showAlert = (message, typ) => {
//     setNotice({
//       msg: message,
//       type: typ
//     })
//     setTimeout(() => {
//       setNotice(null)
//     }, 1500);
//   }
//   const toggleMode = () => {
//     if (mode === 'light') {
//       setMode('dark');
//       document.body.style.backgroundColor = '#410F44';
//       showAlert("dark mode has been enbled", "Success")
//     }
//     else {
//       setMode('light');
//       document.body.style.backgroundColor = 'white';
//       showAlert("light mode has been enbled", "Success")
//     }
//   }
//   const toggleTitleHome = () => {
//     document.title = "Enhance text - Home"
//   }
//   const toggleTitleAbout = () => {
//     document.title = "Enhance text - About"
//   }

//   return (
//     <>
//       <Router>
//         <Navbar mode={mode} toggleMode={toggleMode} toggleTitleHome={toggleTitleHome} toggleTitleAbout={toggleTitleAbout} />
//         <Routes>
//           <Route path="/" element={<PurchaseOrder />} />
//           <Route path="/" element={<Order />} />

//         </Routes>
//       </Router>

//     </>
//   );
// }

// export default App;


// // App.js
// import React, { useState } from 'react';
// import LoginForm from './components/LoginForm';
// import HomePage from './components/HomePage';

// function App() {
//   const [user, setUser] = useState(null);

//   const handleLogin = (username) => {
//     setUser(username);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.setItem('token', null);
//   };
//   return (
//     <div className="App">
//       {user ? (
//         <HomePage username={user} onLogout={handleLogout} />
//       ) : (
//         <LoginForm onLogin={handleLogin} />
//       )}
//     </div>

//   );
// }

// export default App;


// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import LoginForm from './components/UserLoginForm';
import SignupForm from './components/SignupForm';
import HomePage from './components/UserHomePage';
import OrderPage from './components/OrderPage';
import axios from 'axios';


function App() {

  const [authenticated, setAuthenticated] = useState(false);

  const [user, setUser] = useState(null);


  const handleLogin = (userName) => {
    setUser(userName);
    setAuthenticated(true);
  };
  const handleLogout = () => {
    setUser(null);
    setAuthenticated(false);
    localStorage.setItem('token', null);
  };

  const loginUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const response = await axios.post('http://localhost:5000/v1/auth/login-user', config);
      console.log(response.data.data);
      setUser(response.data.data.user);
      localStorage.setItem('token', response.data.data.token);
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} onLogin={handleLogin} />}></Route>
            <Route path="/home" element={authenticated ? <HomePage userName={user} onLogout={handleLogout} /> : <Navigate to="/login" />}></Route>
            <Route path="/order/:orderId" element={authenticated ? <OrderPage userName={user} onLogout={handleLogout} /> : <Navigate to="/login" />}></Route>
            <Route index element={<Navigate to="/login" />} />
            <Route path="/signup" element={<SignupForm authenticated={authenticated} setAuthenticated={setAuthenticated} onLogin={handleLogin} />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

