import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Home from './views/Home';
import Login from './views/Login';
import Report from './views/Report';

import './App.css';
import { useEffect, useState } from 'react';



function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/report" element={<Report/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
