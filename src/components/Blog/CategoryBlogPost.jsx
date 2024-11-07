import React, { useState } from "react";
import { Link } from "react-router-dom";

const CategoryBlogPost = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle content

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]+>/g, "");
  };

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex gap-4 mb-6">
      {/* Image container with fixed height and width */}
      <div className="w-80 h-48 rounded-lg overflow-hidden">
        <img
          src={item?.image}
          className="w-full h-full object-cover rounded-lg"
          alt={item?.title}
        />
      </div>

      <Link to="/blog-post-details" className="flex flex-col flex-grow">
        <div className="mb-2">
          <p>
            <span className="font-bold text-[14px]">{item?.title}</span>:{" "}
            <span className="text-sm text-[#929292]">
              {new Date(item?.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        <div className="mb-2">
          <h1 className="text-xl font-serif font-bold">{item?.category}</h1>
        </div>

        {/* Content with conditional truncation */}
        <div className="mb-2">
          <p className="text-[#929292]">
            {isExpanded
              ? stripHtmlTags(item?.content)
              : `${stripHtmlTags(item?.content).slice(0, 150)}...`}
          </p>
        </div>

        <div
          className="text-sm text-blue-600 cursor-pointer"
          onClick={toggleContent}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="w-8 h-8">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${
                item?.user?.profilePicture
              }`}
              className="w-full h-full rounded-full object-cover"
              alt="user"
            />
          </div>
          <div>
            <h1 className="font-bold text-[12px]">{item?.user?.username}</h1>
            <p className="text-[10px] text-[#929292]">{item?.user?.role}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryBlogPost;
