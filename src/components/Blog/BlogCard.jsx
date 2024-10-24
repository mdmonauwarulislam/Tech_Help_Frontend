import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

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
  return (
    <div className="space-y-3">
      {/* User Info  */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <img src={userImage} className="w-full h-full rounded-full" alt="" />
        </div>
        <div>
          <h1 className="font-bold text-[14px]">{userName}</h1>
          <p className="text-xs text-[#929292]">{userRole}</p>
        </div>
      </div>

      {/* Blog Image  */}
      <div className="card rounded-lg">
        <div className="image h-64">
          <img
            src={blogImage}
            className="h-full w-full object-cover rounded-lg"
            alt=""
          />
        </div>
      </div>

      {/* Blog Content  */}
      <div className="content">
        <div className="">
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
      </div>

      {/* Like,Comment,Share & Bookmark  */}
      <div className="share">
        <ul className="flex gap-4 justify-end">
          <li>
            <AiOutlineLike className="text-xl text-[#0b2f9f] cursor-pointer" />
          </li>
          <li>
            <FaRegComments className="text-xl text-[#0b2f9f] cursor-pointer" />
          </li>
          <li>
            <CiShare2 className="text-xl text-[#0b2f9f] cursor-pointer" />
          </li>
          <li>
            <CiBookmark className="text-xl text-[#0b2f9f] cursor-pointer" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogCard;
