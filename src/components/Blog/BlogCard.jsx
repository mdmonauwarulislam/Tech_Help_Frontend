import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { CiShare2, CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogCard = ({
  userImage,
  userName,
  userRole,
  blogImage,
  p1,
  date,
  p2,
  p3,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => {
      toast(prev ? "Removed from bookmarks" : "Bookmarked!");
      return !prev;
    });
  };

  return (
    <div className="space-y-3">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <img src={userImage} className="w-full h-full rounded-full" alt="" />
        </div>
        <div>
          <h1 className="font-bold text-[14px]">{userName}</h1>
          <p className="text-xs text-[#929292]">{userRole}</p>
        </div>
      </div>

      {/* Blog Image */}
      <div className="card rounded-lg">
        <div className="image h-64">
          <img
            src={blogImage}
            className="h-full w-full object-cover rounded-lg"
            alt=""
          />
        </div>
      </div>

      {/* Blog Content */}
      <Link to="/blog-post-details" className="content">
        <div>
          <p>
            <span className="font-bold text-[16px]">{p1}</span>:{" "}
            <span className="text-sm text-[#929292]">{date}</span>
          </p>
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold">{p2}</h1>
        </div>
        <div>
          <p className="text-[#929292]">{p3}</p>
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
