import React, { useState } from "react";
import { Carousel } from "@material-tailwind/react"; 
import CarouselCard from "../components/Blog/CarouselCard";
import C1 from "../assets/C1.webp";
import C2 from "../assets/C2.webp";
import C3 from "../assets/C3.webp";
import C4 from "../assets/C4.webp";

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

const Blog = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-10">
        <h1 className="text-center text-5xl text-[#000000] font-bold">Trending</h1>
      </div>
      <div className="carousel px-16">
      <Carousel
          transition={{ duration: 2 }}
          autoplay={true}
          indicators={true}
        >
          {items.map((item, index) => (
            <div key={index} className="flex justify-center">
              <CarouselCard {...item} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Blog;
