/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Header/Navbar";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/Header/BottomNav";
import { useEffect, useState } from "react";
import Signin from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import UserDashboard from "./pages/DashBoard/UserDashboard";
import EditProfileFrom from "./components/dashboard/EditProfileForm";
import JobSeekingForm from "./components/JobSeekingForm";
import RecuiterRegisterForm from "./components/RecuiterRegisterForm";
import Blog from "./pages/Blog";
import BlogPostDetails from "./pages/BlogPostDetails";
import MyBlog from "./pages/MyBlog";

import JobPage from "./pages/JobPage";
import PostJob from "./components/Job/JobPost";
import SingleJobCard from "./components/Job/SingleJobCard";
import Footer from "./components/Footer/Footer";
import CompanyProfile from "./pages/DashBoard/companyProfile";
import CompanyDashboard from "./pages/DashBoard/CompanyDashboard";
import ApplicantList from "./components/Job/Applicants";
import MentorshipPage from "./pages/MentorshipPage";
import Profile from "./components/Mentorship/Profile";
import MentorDashboard from "./pages/DashBoard/MentorDashboard";
import { useDispatch } from "react-redux";
import { loadUser, login } from "./redux/slice/userSlice";
import ServiceSection from "./components/Mentorship/ServiceSection";
import DashboardPage from "./components/Mentorship/DashboardPage";
import ProfilePage from "./components/Mentorship/ProfilePage";
import Booking from "./components/Mentorship/Booking/Booking";
import AvailabilityPage from "./components/Mentorship/Availaibility/AvailabilityPage";
import Roadmap from "./pages/Roadmap";

function App() {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("home");
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      dispatch(
        login({
          isAuthenticated: true,
          user: JSON.parse(localStorage.getItem("user")),
          token: localStorage.getItem("token"),
          isLoggedIn: true,
        })
      );
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-grow">
          {/* <Sidebar /> */}
          <main className="flex-1 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/companyprofile" element={<CompanyProfile />} />
              <Route path="/companydashboard" element={<CompanyDashboard />} />
              <Route path="/viewapplicants" element={<ApplicantList />} />
              <Route
                path="/userdashboard/edit-profile"
                element={<EditProfileFrom />}
              />
              <Route
                path="/signup/user-register"
                element={<JobSeekingForm />}
              />
              <Route
                path="/signup/employee-register"
                element={<RecuiterRegisterForm />}
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-post-details" element={<BlogPostDetails />} />
              <Route path="/myblog" element={<MyBlog />} />
              <Route path="/job-page" element={<JobPage />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/single-job/:jobId" element={<SingleJobCard />} />

              {/* <Route path="/mentor-dashboard" element={<MentorDashboard />} /> */}
              <Route path="/mentor-dashboard" element={<MentorDashboard />}>
                <Route path="" element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="services" element={<ServiceSection />} />
                <Route path="bookings" element={<Booking />} />
                <Route path="availability" element={<AvailabilityPage/>} />
                {/* <Route path="bookings" element={<BookingsPage />} /> */}
              </Route>
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/mentor-profile" element={<Profile />} />


              {/* Roadmap */}
              <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
          </main>
        </div>
        <BottomNav setActivePage={setActivePage} />
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
