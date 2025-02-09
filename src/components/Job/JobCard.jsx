import { useState, useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobCard = ({ jobId }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();
  // Fetch job details
  const fetchJob = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobs/getjob/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response?.status == 200) {
        setJob(response.data.job);
        const data = response?.data?.job?.applicants;
        console.log("data:", data);
        data?.map((item) => {
          if (item?.userId === user?.userId) {
            setIsApplied(true);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Failed to fetch the job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchJob();
  }, [jobId]);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
    toast(isBookmarked ? "Removed from bookmarks" : "Bookmarked!");
    // Optional: Sync with backend here if necessary
  };
  

  const getJobTypeStyles = (jobType) => {
    switch (jobType?.toUpperCase()) {
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

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="shadow-md rounded-lg py-4 px-8 relative bg-white border-2">
      {/* Bookmark Icon */}
      <div
        className="absolute top-3 right-3 cursor-pointer text-primary"
        onClick={handleBookmarkClick}
      >
        {isBookmarked ? <FaBookmark size={30} /> : <CiBookmark size={30} />}
      </div>

      {/* Job Title */}
      <h3 className="text-xl font-semibold">{job.title}</h3>

      {/* Job Type and Salary Range */}
      <p className="text-gray-600 mt-2">
        <span
          className={`font-semibold text-sm py-1 px-2 rounded-sm ${getJobTypeStyles(
            job.type
          )}`}
        >
          {job.type}
        </span>{" "}
        Salary: ₹{job.salary[0]?.minimum} - ₹{job.salary[0]?.maximum}
      </p>

      {/* Company Info */}
      <div className="flex items-center gap-4 my-7">
        <img
          src={job.companyLogo || "https://via.placeholder.com/150"}
          alt="Company Logo"
          className="w-16 h-16 rounded-full border-2 border-white"
        />
        <div>
          <span className="font-semibold">
            {job.createdBy?.username || "unknown"}
          </span>
          <div className="flex items-center text-gray-500">
            <HiOutlineLocationMarker className="mr-1 text-xl" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      {/* Additional Job Details */}
      <p className="text-gray-600 mb-4">
        <strong>Experience:</strong> {job.experience} year(s)
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Work Mode:</strong> {job.workmode}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Education Required:</strong> {job.education}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Skills:</strong> {job.skills.join(", ")}
      </p>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between items-center px-2">
        <button className="border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-gray-100">
          <Link to={`/single-job/${jobId}`}>View Details</Link>
        </button>
        {isApplied ? (
          <button className="bg-blue-gray-300 text-white py-2 px-4 rounded-md hover:bg-primary-dark cursor-not-allowed">
            Applied
          </button>
        ) : (
          <button
            onClick={() => navigate(`/single-job/${jobId}`)}
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
