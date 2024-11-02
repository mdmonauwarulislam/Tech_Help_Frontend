import React, { useState } from "react";
import ModalWithEditor from "../components/Blog/ModalWithEditor";
import noData from "../assets/noDataSvg.svg"

function MyBlog() {
  
  const [activeButton, setActiveButton] = useState("Publish");
  return (
    <>
      <div className="px-4 pt-3 py-5">
        <h1 className="m-auto text-blue-700 font-bold">My Blogs</h1>
        <div className="flex justify-between border border-b-2 border-t-0 border-r-0 border-l-0 pb-3 pt-3">
          <div className="flex gap-4">
            <button
              className={`rounded-md py-2 px-4 text-center text-sm transition-all shadow-md hover:shadow-lg ${
                activeButton === "Publish"
                  ? "bg-primary text-white"
                  : "bg-[#e5e5e5] text-[#898989]"
              }`}
              onClick={() => setActiveButton("Publish")}
            >
              Publish
            </button>
            <button
              className={`rounded-md py-2 px-4 text-center text-sm transition-all shadow-md hover:shadow-lg ${
                activeButton === "Draft"
                  ? "bg-primary text-white"
                  : "bg-[#e5e5e5] text-[#898989]"
              }`}
              onClick={() => setActiveButton("Draft")}
            >
              Draft
            </button>
          </div>
          <div className="">
            <ModalWithEditor />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center pt-5">
          <img src={noData} alt="" />
          <p className="text-center">
            No data is Available on this section
          </p>
        </div>
      </div>
    </>
  );
}

export default MyBlog;
