import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="space-y-5">
      <div className="flex gap-2 justify-center items-center">
        <div className="bg-gray-200 rounded-2xl w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
          <Link to={"https://facebook.com"}>
            <FaFacebookF className="w-full h-full object-fit px-2 py-2" />
          </Link>
        </div>
        <div className="bg-gray-200 rounded-2xl w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
          <Link to={"https://facebook.com"}>
            <FaXTwitter className="w-full h-full object-fit px-2 py-2" />
          </Link>
        </div>
        <div className="bg-gray-200 rounded-2xl w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
          <Link to={"https://linkedin.com"}>
            <FaLinkedinIn className="w-full h-full object-fit px-2 py-2" />
          </Link>
        </div>
        <div className="bg-gray-200 rounded-2xl w-10 h-10 hover:bg-primary hover:text-white transition-colors duration-300">
          <Link to={"https://www.youtube.com/"}>
            <FaYoutube className="w-full h-full object-fit px-2 py-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>Copyright ©2024 All rights reserved</p>
        <p className="">
          <span className="text-xs border border-b-4 border-t-0 border-r-0 border-l-0 border-blue-50 hover:border-primary cursor-pointer transition-colors duration-300">
            Terms & Conditions
          </span>{" "}
          <span className="text-xl">/</span>{" "}
          <span className="text-xs border border-b-4 border-t-0 border-r-0 border-l-0 border-blue-50 hover:border-primary cursor-pointer transition-colors duration-300">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
