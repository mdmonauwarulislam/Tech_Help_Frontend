import HeaderImg from "../assets/header.webp";
import growthVector from "../assets/pattern.png";
import { SiBloglovin, SiCodementor } from "react-icons/si";
import { RiRoadMapFill, RiUserSearchFill } from "react-icons/ri";
import axios from "axios";
import { useEffect, useState } from "react";


function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const blogItemsPerPage = 3;

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/getallblogs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setBlogs(response.data.data); // assuming data is in response.data.data
      } else {
        console.log("Error in fetching blogs");
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(${growthVector})`,
          backgroundSize: "cover",
          backgroundPosition: "end",
        }}
      >
        <header className="h-[90vh] flex justify-between items-center w-10/12 mx-auto ">
          <div className="">
            <h1 className="text-4xl font-bold text-primary">
              Welcome to
              <span className="block text-8xl text-secondary font-semibold font-grotesk">
                TECH HELP
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              Empowering your tech journey with blogs, jobs, mentorship, and
              resources.
            </p>
            <button className="py-2 px-6 rounded-md border-2 border-primary text-primary mt-10 font-semibold">
              Get Started
            </button>
          </div>
          <div>
            <img src={HeaderImg} alt="hero" />
          </div>
        </header>
      </div>
      <div className="w-10/12 mx-auto ">
        <div className="text-center py-20 mt-10">
          <h1 className="text-4xl font-semibold text-primary">
            Unlock the Benefits of Tech Help!
          </h1>
          <p className="text-xl font-medium text-gray-700 mt-2">
            We provide a wide range of services to help you grow
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 px-20 gap-20 mt-10">
            <div className="bg-white flex flex-col w-full justify-center shadow-lg items-center rounded-lg px-4 py-12">
              <SiBloglovin className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">Blogs</h1>
              <p className="text-gray-600 mt-2">
                Read the latest blogs on trending technologies and career
                growth.
              </p>
            </div>
            <div className="bg-white rounded-lg flex flex-col w-full justify-center  items-center px-4 py-12 shadow-lg">
              <RiUserSearchFill className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">Jobs</h1>
              <p className="text-gray-600 mt-2">
                Find the best jobs that match your skills and experience.
              </p>
            </div>
            <div className="bg-white rounded-lg flex flex-col w-full justify-center items-center px-4 py-12 shadow-lg">
              <SiCodementor className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">
                Mentorship
              </h1>
              <p className="text-gray-600 mt-2">
                Get guidance from industry experts to shape your career.
              </p>
            </div>
            <div className="bg-white rounded-lg flex flex-col w-full justify-center items-center px-4 py-12 shadow-lg">
              <RiRoadMapFill className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">Roadmap</h1>
              <p className="text-gray-600 mt-2">
                Plan your career path with our roadmap and resources.
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* Blog section */}
          <div>
           

            {/* Pagination Controls (Aligned to the right) */}
            <div className="flex justify-end gap-4 mt-6">
              
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
