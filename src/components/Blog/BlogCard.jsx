import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { CiShare2, CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogCard = ({ item }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling content expansion

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => {
      toast(prev ? "Removed from bookmarks" : "Bookmarked!");
      return !prev;
    });
  };

  const stripHtmlTags = (html) => {
    return html ? html.replace(/<[^>]+>/g, "") : "";
  };

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="space-y-3">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${
              item?.user?.profilePicture
            }`}
            className="w-full h-full rounded-full object-cover"
            alt="profile picture"
          />
        </div>
        <div>
          <h1 className="font-bold text-[14px]">{item?.user?.username}</h1>
          <p className="text-xs text-[#929292]">Role</p>
        </div>
      </div>

      {/* Blog Image */}
      <div className="card rounded-lg">
        <div className="image h-64">
          <img
            src={item?.image}
            className="h-full w-full object-fit rounded-lg"
            alt={item?.title}
          />
        </div>
      </div>

      {/* Blog Content */}
      <Link to="/blog-post-details" className="content">
        <div>
          <p>
            <span className="font-bold text-[16px]">{item?.category}</span>:{" "}
            <span className="text-sm text-[#929292]">
              {new Date(item?.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold line-clamp-3">
            {isExpanded
              ? stripHtmlTags(item?.content)
              : `${stripHtmlTags(item?.content).slice(0, 150)}...`}
          </h1>
        </div>
        {/* Show More / Show Less button */}
        <div
          className="text-sm text-blue-600 cursor-pointer"
          onClick={toggleContent}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </div>
      </Link>

      {/* Like, Comment, Share & Bookmark */}
      <div className="share">
        <ul className="flex gap-2">
          <li>
            <AiOutlineLike className="text-2xl text-[#0b2f9f] cursor-pointer" />
          </li>
          <li>
            <FaRegComments className="text-2xl text-[#0b2f9f] cursor-pointer" />
          </li>
          <li>
            <CiShare2 className="text-2xl text-[#0b2f9f] cursor-pointer" />
          </li>
          <li onClick={handleBookmarkClick} className="cursor-pointer">
            {isBookmarked ? (
              <FaBookmark className="text-2xl text-[#0b2f9f]" />
            ) : (
              <CiBookmark className="text-2xl text-[#0b2f9f]" />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogCard;
