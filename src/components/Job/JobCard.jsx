import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const JobCard = ({ title, type, salaryRange, companyName, location, applicantsCount, logo, profiles }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
    toast(isBookmarked ? "Removed from bookmarks" : "Bookmarked!");
  };

  // Function to determine the color based on job type
  const getJobTypeStyles = (jobType) => {
    switch (jobType.toUpperCase()) {
      case "FULL-TIME":
        return "bg-green-200 text-green-900";
      case "PART-TIME":
        return "bg-purple-200 text-purple-900";
      case "INTERNSHIP":
        return "bg-blue-200 text-blue-900";
      default:
        return "bg-gray-200 text-gray-900"; 
    }
  };

  return (
    <div className=" shadow-md rounded-lg py-4 px-8 relative">
      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 cursor-pointer text-primary" onClick={handleBookmarkClick}>
        {isBookmarked ? <FaBookmark size={30} /> : <CiBookmark size={30} />}
      </div>

      {/* Job Title */}
      <h3 className="text-xl font-semibold">{title}</h3>

      {/* Job Type and Salary Range */}
      <p className={`text-gray-600 mt-2 `}>
        <span className={`font-semibold text-sm py-1 px-2 rounded-sm ${getJobTypeStyles(type)}`}>
          {type}
        </span>{" "}
        Salary: {salaryRange}
      </p>

      {/* Company Info */}
      <div className="flex items-center gap-4 my-7">
        <div>
          <img
            src={logo}
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
        </div>
        <div>
          <span className="font-semibold">{companyName}</span>
          <div className="flex items-center text-gray-500">
            <HiOutlineLocationMarker className="mr-1 font-bold text-xl" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Applicants Count */}
      <div className="flex items-center mb-8 gap-3">
        {/* User Profiles */}
        <div className="flex -space-x-2">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <img
                key={index}
                src={profile}
                alt={`User ${index + 1}`}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))
          ) : (
            <span>No applicants yet</span>
          )}
        </div>
        <span className="text-gray-600">{applicantsCount}</span>
      </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center px-2">
       <Link to = "/single-job">
       <button className="border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
          View Details
        </button>
       </Link> 
        <button className="bg-primary text-white py-2 px-4 rounded-md mr-2 hover:bg-primary-dark">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
