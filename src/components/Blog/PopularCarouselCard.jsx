import React from "react";

const PopularCarouselCard = ({
  blogImage,
  p1,
  date,
  p2,
  p3,
  userImage,
  userName,
  userRole,
}) => {
  return (
    <div className="w-2/3"> {/* 50% width, centered, with padding and shadow */}
      <div className="image rounded-lg h-96 overflow-hidden"> {/* Adjusted height */}
        <img src={blogImage} className="w-full h-full object-cover rounded-lg" alt="blog" />
      </div>
      <div className="content mt-4">
        <div>
          <p>
            <span className="font-bold text-[16px]">{p1}</span>:
            <span className="text-sm text-[#929292]"> {date}</span>
          </p>
        </div>
        <div className="mt-2">
          <h1 className="text-xl font-serif">{p2}</h1>
        </div>
        <div className="mt-1">
          <p className="text-[#929292]">{p3}</p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10">
            <img src={userImage} className="w-full h-full rounded-full object-cover" alt="user" />
          </div>
          <div>
            <h1 className="font-bold text-[14px]">{userName}</h1>
            <p className="text-xs text-[#929292]">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCarouselCard;
