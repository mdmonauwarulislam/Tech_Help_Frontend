import React from "react";
import { Link } from "react-router-dom";

const CarouselCard = ({ item }) => {
  const stripHtmlTags = (html) => {
    return html ? html.replace(/<[^>]+>/g, "") : "";
  };

  return (
    <Link to="/blog-post-details">
      <div className="flex justify-center items-center gap-8 rounded-lg w-full">
        {/* Image section with fixed size */}
        <div className="card rounded-lg w-1/2">
          <div className="image">
            <img
              src={item?.image}
              alt={item?.title || "Blog Image"}
              className="rounded-lg object-fit w-full h-[200px] md:h-[300px]"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="content space-y-5 w-1/2">
          <div>
            <p>
              <span className="font-bold text-[16px]">{item?.title}</span>:{" "}
              <span className="text-sm text-[#929292]">
                {new Date(item?.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-serif line-clamp-3">
              {stripHtmlTags(item?.content)}
            </h1>
          </div>
          <div>
            <p className="text-[#929292]">{item?.category}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${item?.user?.profilePicture}`}
                alt={item?.user?.userName || "User"}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-[14px]">{item?.user?.username}</h1>
              <p className="text-xs text-[#929292]">Role</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarouselCard;
