/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Header/Navbar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/Header/BottomNav';
import { useState } from 'react';
import Signin from './pages/Signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <Router>
      <div className="flex flex-col h-screen ">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-1 pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signin/>}/>
            </Routes>
          </main>
        </div>
        <BottomNav  setActivePage={setActivePage} />
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;