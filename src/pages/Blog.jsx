import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Carousel } from "@material-tailwind/react";
import CarouselCard from "../components/Blog/CarouselCard";
import C1 from "../assets/C1.webp";
import C2 from "../assets/C2.webp";
import C3 from "../assets/C3.webp";
import C4 from "../assets/C4.webp";
import C5 from "../assets/c5.webp";
import C6 from "../assets/c6.webp";
import BlogCard from "../components/Blog/BlogCard";
import CategoryBlogPost from "../components/Blog/CategoryBlogPost";
import SubscribeCard from "../components/Blog/SubscribeCard";
import Footer from "../components/Blog/Footer";
import PopularCarouselCard from "../components/Blog/PopularCarouselCard";
import axios from "axios";

const items = [
  {
    blogImage: C1,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C2,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C3,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C4,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
];
const cardItems = [
  {
    blogImage: C5,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C6,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C1,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C2,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C3,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C4,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
];
const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const totalItems = items.length;

  // const [blogs, setBlogs] = useState([]);
  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/blog/getallblogs`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         setBlogs(response.data.data);
  //       } else {
  //         console.log("Error in fetching blogs");
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         console.log(error.response.data.message);
  //       } else {
  //         console.log("Something went wrong");
  //       }
  //     }
  //   };

  //   fetchBlogs();
  // }, []); // Empty dependency array ensures it runs only once when the component mounts

  // console.log("blogs---is", blogs);


  const handleNextSlide = () => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
      setIsExiting(false);
    }, 500);
  };

  const handlePrevSlide = () => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
      setIsExiting(false);
    }, 500);
  };

  // Handle autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
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
      <div className="relative carousel px-16">
        <div
          className={`transition duration-500 ease-linear flex justify-center ${
            isExiting ? "opacity-0" : "opacity-100"
          }`}
        >
          <CarouselCard {...items[currentIndex]} />
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-4">
          {items.map((_, index) => (
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
        <div className="px-16 py-10 flex flex-wrap justify-between">
          {cardItems.map((item, index) => {
            return (
              <div className="w-full md:w-1/3 p-4 py-10" key={index}>
                <BlogCard {...item} />
              </div>
            );
          })}
        </div>

        {/* most popular post  */}
        <div className="flex justify-center items-center py-10">
          <h1 className="text-center text-5xl text-[#000000] font-bold">
            Most Popular Posts
          </h1>
        </div>

        {/* blog carousel 2 */}
        <div className="carousel px-16 py-10 bg-deep-orange-50 rounded-lg">
          <Carousel
            transition={{ duration: 2 }}
            autoplay={false}
            indicators={true}
          >
            {items.map((item, index) => (
              <div key={index} className="flex justify-center">
                <PopularCarouselCard {...item} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Blog Post Category Wise  */}
        <div className="px-16 py-10 flex gap-10">
          <div className="left w-1/2">
            <h1 className="text-2xl font-bold font-serif">Sports</h1>
            {cardItems.map((item, index) => {
              return (
                <div className="py-5" key={index}>
                  <CategoryBlogPost {...item} />
                </div>
              );
            })}
          </div>
          <div className="right w-1/2">
            <h1 className="text-2xl font-bold font-serif">Business</h1>
            {cardItems.map((item, index) => {
              return (
                <div className="py-5" key={index}>
                  <CategoryBlogPost {...item} />
                </div>
              );
            })}
          </div>
        </div>

        {/* subcribe section  */}
        <div className="px-16 py-10">
          <SubscribeCard />
        </div>

        {/* Footer section  */}
        <div className="px-16 py-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Blog;
