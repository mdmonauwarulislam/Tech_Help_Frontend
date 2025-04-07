import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (job?.applicants?.some((applicant) => applicant.userId === user?.userId)) {
      setIsApplied(true);
    }
  }, [job, user]);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
    toast(isBookmarked ? "Removed from bookmarks" : "Bookmarked!");
  };

  const getJobTypeStyles = (type) => {
    switch (type?.toUpperCase()) {
      case "FULL TIME":
        return "bg-green-200 text-green-900";
      case "PART TIME":
        return "bg-purple-200 text-purple-900";
      case "INTERNSHIP":
        return "bg-blue-200 text-blue-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  if (!job) return null;

  return (
    <div className="shadow-md rounded-lg py-4 px-8 relative bg-white border-2">
      <div className="absolute top-3 right-3 cursor-pointer text-primary" onClick={handleBookmarkClick}>
        {isBookmarked ? <FaBookmark size={30} /> : <CiBookmark size={30} />}
      </div>

      <h3 className="text-xl font-semibold">{job.title}</h3>

      <p className="text-gray-600 mt-2">
        <span className={`font-semibold text-sm py-1 px-2 rounded-sm ${getJobTypeStyles(job.type)}`}>
          {job.type}
        </span>{" "}
        Salary: ₹{job.salary[0]?.minimum} - ₹{job.salary[0]?.maximum}
      </p>

      <div className="flex items-center gap-4 my-7">
        <img
          src={
            job.createdBy?.companyLogo
              ? `${import.meta.env.VITE_API_URL}/uploads/${job.createdBy.companyLogo}`
              : "https://via.placeholder.com/150"
          }
          alt="Company Logo"
          className="w-16 h-16 rounded-full border-2 border-white"
        />
        <div>
          <span className="font-semibold">{job.createdBy?.username || "Unknown"}</span>
          <div className="flex items-center text-gray-500">
            <HiOutlineLocationMarker className="mr-1 text-xl" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-2"><strong>Experience:</strong> {job.experience} year(s)</p>
      <p className="text-gray-600 mb-2"><strong>Work Mode:</strong> {job.workmode}</p>
      <p className="text-gray-600 mb-2"><strong>Education:</strong> {job.education}</p>
      <p className="text-gray-600 mb-4"><strong>Skills:</strong> {job.skills.join(", ")}</p>

      <div className="mt-4 flex justify-between items-center px-2">
        <Link to={`/single-job/${job._id}`}>
          <button className="border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
            View Details
          </button>
        </Link>
        {isApplied ? (
          <button className="bg-gray-300 text-white py-2 px-4 rounded-md cursor-not-allowed">
            Applied
          </button>
        ) : (
          <button
            onClick={() => navigate(`/single-job/${job._id}`)}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
