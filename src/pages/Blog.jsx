import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import CarouselCard from "../components/Blog/CarouselCard";
import BlogCard from "../components/Blog/BlogCard";
import CategoryBlogPost from "../components/Blog/CategoryBlogPost";
import SubscribeCard from "../components/Blog/SubscribeCard";
import axios from "axios";

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const blogItemsPerPage = 3;
  const limitedBlogs = blogs.slice(0, 5);


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
        setBlogs(response.data.data);
      } else {
        console.log("Error in fetching blogs");
      }
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleNextSlide = () => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % limitedBlogs.length);
      setIsExiting(false);
    }, 500);
  };

  const handlePrevSlide = () => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + blogs.length) % limitedBlogs.length
      );
      setIsExiting(false);
    }, 500);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(blogs.length / itemsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // Autoplay to automatically change slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [blogs.length]);


  return (
    <div className="relative carousel px-16">
      <div className="flex justify-end items-center p-10">
        <div className="relative">
          <input
            type="Search"
            className="border border-black rounded-full outline-none py-2 px-10 pl-10"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer" />
        </div>
      </div>
      <div className="flex justify-center items-center py-10">
        <h1 className="text-center text-5xl text-[#000000] font-bold">
          Trending
        </h1>
      </div>
      {/* Show only the active slide */}
      {limitedBlogs.length > 0 && (
        <div
          className={`px-16 py-10 gap-10 transition duration-500 ease-linear flex justify-center ${
            isExiting ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-full p-4">
            <CarouselCard item={limitedBlogs[currentIndex]} />
          </div>
        </div>
      )}

      {/* Slide Indicators */}
      <div className="flex justify-center mt-4">
        {limitedBlogs.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
              currentIndex === index ? "bg-orange-500" : "bg-gray-300"
            }`}
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsExiting(false);
              }, 500);
            }}
          ></span>
        ))}
      </div>

      {/* blog card  */}
      <div className="px-16 py-10 flex flex-wrap">
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
          Page {currentBlogPage} of {Math.ceil(blogs.length / blogItemsPerPage)}
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

      {/* most popular post  */}
      <div className="flex justify-center items-center py-10">
        <h1 className="text-center text-5xl text-[#000000] font-bold">
          Most Popular Posts
        </h1>
      </div>

      {/* Blog Post Category Wise  */}
      <div className="px-16 py-10 flex gap-10">
        <div className="left w-1/2">
          <h1 className="text-2xl font-bold font-serif">Sports</h1>
          {paginatedBlogs.map((blog) => {
            return (
              <div className="py-5" key={blog._id}>
                <CategoryBlogPost item={blog} />
              </div>
            );
          })}
        </div>
        <div className="right w-1/2">
          <h1 className="text-2xl font-bold font-serif">Business</h1>
          {paginatedBlogs.map((blog) => {
            return (
              <div className="py-5" key={blog._id}>
                <CategoryBlogPost item={blog} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls (Aligned to the right) */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 text-white text-sm bg-blue-600 rounded disabled:bg-gray-300"
        >
          Back
        </button>
        <span className="text-sm flex justify-center items-center">
          Page {currentPage} of {Math.ceil(blogs.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(blogs.length / itemsPerPage)}
          className="p-2 text-white text-sm bg-blue-600 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* subcribe section  */}
      <div className="px-16 py-10">
        <SubscribeCard />
      </div>
    </div>
  );
};

export default Blog;
