import React from "react";

const CarouselCard = ({
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
    <div className="flex justify-center items-center gap-8 bg-deep-orange-50 rounded-lg">
      <div className="card rounded-lg">
        <div className="image">
          <img src={blogImage} className="rounded-lg" alt="" />
        </div>
      </div>
      <div className="content space-y-5">
        <div className="">
          <p>
            <span className="font-bold text-[16px]">{p1}</span>:{" "}
            <span className="text-sm text-[#929292]">{date}</span>
          </p>
        </div>
        <div>
          <h1 className="text-5xl font-serif">{p2}</h1>
        </div>
        <div>
          <p className="text-[#929292]">{p3}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12">
            <img
              src={userImage}
              className="w-full h-full rounded-full"
              alt=""
            />
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
export default CarouselCard;
