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
import Login from './pages/Login';
import UserDashboard from './pages/DashBoard/UserDashboard';
import EditProfileFrom from './components/dashboard/EditProfileForm';
import JobSeekingForm from './components/JobSeekingForm';
import RecuiterRegisterForm from './components/RecuiterRegisterForm';
import Blog from './pages/Blog';



function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-grow">
          {/* <Sidebar /> */}
          <main className="flex-1 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signin/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/userdashboard" element={<UserDashboard/>}/>
              <Route path="/userdashboard/edit-profile" element={<EditProfileFrom/>}/>
              <Route path="/signup/user-register" element={<JobSeekingForm/>}/>
              <Route path="/signup/employee-register" element={<RecuiterRegisterForm/>}/>
              <Route path="/blog" element={<Blog />} />
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