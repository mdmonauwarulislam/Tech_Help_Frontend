import HeaderImg from "../assets/header.webp";
import growthVector from "../assets/pattern.png";
import { SiBloglovin, SiCodementor } from "react-icons/si";
import { RiRoadMapFill, RiUserSearchFill } from "react-icons/ri";
import BlogCard from "../components/Blog/BlogCard";
import axios from "axios";
import JobCard from "../components/Job/JobCard";
import { useEffect, useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    type: "Full-Time",
    salaryRange: "₹60,000 - ₹80,000",
    companyName: "Tech Company",
    location: "Mumbai, India",
    applicantsCount: "25+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 2,
    title: "Part-Time Graphic Designer",
    type: "Part-Time",
    salaryRange: "₹20,000 - ₹40,000",
    companyName: "Creative Agency",
    location: "Delhi, India",
    applicantsCount: "10+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 3,
    title: "Internship in Marketing",
    type: "Internship",
    salaryRange: "₹15,000 - ₹25,000",
    companyName: "Marketing Solutions",
    location: "Bangalore, India",
    applicantsCount: "5+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 4,
    title: "Remote Customer Support",
    type: "Internship",
    salaryRange: "₹30,000 - ₹50,000",
    companyName: "Support Co.",
    location: "Remote",
    applicantsCount: "15+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 5,
    title: "Hybrid Product Manager",
    type: "Full-Time",
    salaryRange: "₹80,000 - ₹1,00,000",
    companyName: "Product Inc.",
    location: "Pune, India",
    applicantsCount: "8+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
];
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

  const handleNextBlogPage = () => {
    setCurrentBlogPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(blogs.length / blogItemsPerPage))
    );
  };

  const handlePrevBlogPage = () => {
    setCurrentBlogPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedBlogPosts = blogs.slice(
    (currentBlogPage - 1) * blogItemsPerPage,
    currentBlogPage * blogItemsPerPage
  );

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
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-4xl font-semibold text-primary ">
                  Recent Blog
                </h1>
                <p className="text-xl font-medium text-gray-700 ">
                  Read the latest blog on career growth and technology
                </p>
              </div>
              <button className="px-4 py-2 border-2 border-primary rounded-md">
                View All
              </button>
            </div>

            <div className="px-16 py-10 flex flex-row">
              {paginatedBlogPosts.map((blog) => (
                <div className="w-full md:w-1/3 p-4" key={blog._id}>
                  <BlogCard item={blog} />
                </div>
              ))}
            </div>

            {/* Pagination Controls (Aligned to the right) */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handlePrevBlogPage}
                disabled={currentBlogPage === 1}
                className="p-2 text-white text-sm bg-blue-600 rounded disabled:bg-gray-300"
              >
                Back
              </button>
              <span className="text-sm flex justify-center items-center">
                Page {currentBlogPage} of{" "}
                {Math.ceil(blogs.length / blogItemsPerPage)}
              </span>
              <button
                onClick={handleNextBlogPage}
                disabled={
                  currentBlogPage === Math.ceil(blogs.length / blogItemsPerPage)
                }
                className="p-2 text-white text-sm bg-blue-600 rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
          {/* Job Sections */}
          <div className="pb-20">
            <div className="flex justify-between items-center mb-10 mt-20">
              <div>
                <h1 className="text-4xl font-semibold text-primary">
                  Recent Jobs
                </h1>
                <p className="text-xl font-medium text-gray-700">
                  Find the best jobs that match your skills and experience
                </p>
              </div>
              <button className="px-4 py-2 border-2 border-primary rounded-md">
                View All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-16 ">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
