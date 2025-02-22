import { BiLoader } from "react-icons/bi";
import NextSteps from "../../components/Mentorship/NextSteps";
import ServicesList from "../../components/Mentorship/ServicesList";
import { useEffect, useState } from "react";
import axios from "axios";

const WelcomeBanner = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const handleFetchMentorDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setUsername(response.data.data.username);
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    }
  };
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        await handleFetchMentorDetails();
        setLoading(false);
      };
      fetchData();
    }, []);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <BiLoader className="animate-spin h-10 w-10 mx-auto" />
        </div>
      );
    }
  return (
    <div className="mt-6 mb-20 flex items-center gap-3">
      <div>
        <h1 className="text-5xl">👋</h1>
      </div>
      <div>
        <h1 className="text-lg font-medium text-gray-800">Hi, {username}</h1>
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="bg-blue-gray-50 h-screen flex">
      <main className="flex-1 max-h-screen overflow-y-scroll sticky top-0" style={{
        scrollbarWidth: 'none'
      }}>
        <WelcomeBanner/>
        <NextSteps />
        <ServicesList />
        
      </main>
    </div>
  );
};

export default DashboardPage;
