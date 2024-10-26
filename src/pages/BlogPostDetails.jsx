import React from "react";
import C1 from "../assets/C1.webp";
import C2 from "../assets/C2.webp";
import C3 from "../assets/C3.webp";
import C4 from "../assets/C4.webp";
import C5 from "../assets/c5.webp";
import C6 from "../assets/c6.webp";
import C7 from "../assets/C7.webp";

import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import SubscribeCard from "../components/Blog/SubscribeCard";
import Footer from "../components/Blog/Footer";
import RelatedProducts from "../components/Blog/RelatedProducts";

const BlogPostDetails = () => {
  const images = [C1, C2, C3, C4, C5, C6];
  const cardItems = [
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
  return (
    <div className="">
      <div className="space-y-5 w-[1000px] md:mx-auto mx-5">
        {/* User Info  */}
        <div className="flex flex-col justify-center items-center space-y-1 py-10">
          <div className="userImage w-16 h-16">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
              alt="user"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-[20px]">Ashad Jamal</h1>
            <p className="text-sm text-[#929292] text-center">CEO, Founder</p>
          </div>
        </div>
        {/* Details of the blog post  */}
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-5xl font-bold text-black font-serief text-center">
            Your most unhappy customers are your greatest source of learning.
          </h1>
          <p className="text-xl text-[#929292] text-center">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>
        {/* Blog Image  */}
        <div className="image h-[30rem]">
          <img
            src={C7}
            alt="blog"
            className="h-full w-full object-fit rounded-lg"
          />
        </div>
        <div className="space-y-5">
          <p className="text-xl text-[#929292]">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean.
          </p>
          <p className="text-xl text-[#929292]">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth.
          </p>
          <div className="flex gap-8">
            <div className="flex items-center">
              <div className="w-0.5 h-full bg-[#000000]"></div>
            </div>
            <div>
              <p className="text-xl text-[#929292] italic">
                The Big Oxmox advised her not to do so, because there were
                thousands of bad Commas, wild Question Marks and devious
                Semikoli, but the Little Blind Text didn’t listen. She packed
                her seven versalia, put her initial into the belt and made
                herself on the way.
              </p>
            </div>
          </div>
          <p className="text-xl text-[#929292]">
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic life One day however a small line of
            blind text by the name of Lorem Ipsum decided to leave for the far
            World of Grammar.
          </p>
          <p className="text-xl text-[#929292]">
            When she reached the first hills of the Italic Mountains, she had a
            last view back on the skyline of her hometown Bookmarksgrove, the
            headline of Alphabet Village and the subline of her own road, the
            Line Lane. Pityful a rethoric question ran over her cheek, then she
            continued her way.
          </p>
        </div>
        {/* Blog Image Gallery  */}
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="">
              <img
                src={image}
                alt="gallery"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <p className="text-xl text-[#929292]">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean.
          </p>
          <p className="text-xl text-[#929292]">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth.
          </p>
          <div className="flex items-center py-5">
            <div className="w-full h-0.5 bg-[#000000]"></div>
          </div>
        </div>
        <div className="share py-10">
          <div>
            <h1 className="text-sm text-[#929292] font-bold">Share</h1>
          </div>
          <div className="flex gap-2">
            <Link className="rounded-full w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
              <FaFacebookF className="w-full h-full p-2" />
            </Link>
            <Link className="rounded-full w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
              <FaXTwitter className="w-full h-full p-2" />
            </Link>
            <Link className="rounded-full w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
              <FaLinkedinIn className="w-full h-full p-2" />
            </Link>
            <Link className="rounded-full w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
              <FaYoutube className="w-full h-full p-2" />
            </Link>
          </div>
        </div>
        <div>
          <div className="left w-full">
            <h1 className="text-2xl font-bold font-serif">Related Products</h1>
            {cardItems.map((item, index) => {
              return (
                <div className="py-5" key={index}>
                  <RelatedProducts {...item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-10 py-20">
        <SubscribeCard />
      </div>
      <div className="py-20">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPostDetails;
