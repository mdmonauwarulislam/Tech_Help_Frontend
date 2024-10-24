import React from "react";

const CategoryBlogPost = ({
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
    <div>
      <div className="flex gap-4">
        <div className="image w-80 h-32 rounded-lg">
          <img
            src={blogImage}
            className="w-full h-full object-fit rounded-lg"
            alt=""
          />
        </div>
        <div className="content">
          <div className="">
            <p>
              <span className="font-bold text-[14px]">{p1}</span>:{" "}
              <span className="text-sm text-[#929292]">{date}</span>
            </p>
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold">{p2}</h1>
          </div>
          {/* <div>
            <p className="text-[#929292]">{p3}</p>
          </div> */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <img
                src={userImage}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <div>
              <h1 className="font-bold text-[12px]">{userName}</h1>
              <p className="text-[10px] text-[#929292]">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBlogPost;
