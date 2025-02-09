import { useState, useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { PiRankingLight } from "react-icons/pi";
import { RiUserStarLine } from "react-icons/ri";
import { LuTimer, LuCalendar } from "react-icons/lu";
import { IoMdCopy, IoMdShare } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { useSelector } from "react-redux";

const SingleJobCard = () => {
  const { jobId } = useParams();
  const location = useLocation();
  console.log(location.pathname?.split("/")[2]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [applyJob, setapplyJob] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.user);
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
        console.log("data:",data)
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

  // handle job apply
  const handleApplyjob = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jobs/applyjob/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setapplyJob(response);
      toast.success("Successfully Applied");
      setIsApplied(true);
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error("Failed to apply to the job");
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
    toast(isBookmarked ? "Removed from bookmarks" : "Bookmarked!");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied");
  };

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="w-10/12 mx-auto py-20">
      <div className="flex justify-between items-center py-4">
        <div className="flex gap-4 items-center">
          <img
            src={job.logo || "https://via.placeholder.com/64"}
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <div className="flex items-center text-gray-500">
              <span className="text-sm">
                {" "}
                at {job.createdBy?.username || "Unknown Company"}
              </span>{" "}
              <span className="font-semibold text-sm px-2 rounded-sm bg-green-200 text-green-900 ml-3">
                {job.type || "Unknown"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div
            className="cursor-pointer text-primary"
            onClick={handleBookmarkClick}
          >
            {isBookmarked ? <FaBookmark size={30} /> : <CiBookmark size={30} />}
          </div>
          {isApplied ? (
            <button
              className="bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-primary-dark cursor-not-allowed"
              disabled
            >
             Applied 
            </button>
          ) : (
            <button
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
              onClick={handleApplyjob}
            >
              Apply Now <FaArrowRightLong className="inline text-center ml-2" />
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        {/* Job Description */}
        <div className="w-8/12">
          <h4 className="text-lg font-semibold">Job Description</h4>
          {/* Check if description exists and map through it */}
          {job.description && job.description.length > 0 ? (
            job.description.map((item, index) => (
              <div key={index} className="mt-4">
                <div className="mb-2">
                  <h5 className="text-xl text-gray-900 font-semibold">
                    Requirement:
                  </h5>
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.requirement }}
                  ></div>
                </div>
                <div className="mb-2">
                  <h5 className="text-xl text-gray-900 font-semibold">
                    Responsibility:
                  </h5>
                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.responsibility }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No description available.</p>
          )}
          <div className="">
            <h4 className="text-lg font-semibold">Skills Required</h4>
            <div className="flex flex-col gap-4 mt-4">
              {job.skills?.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>{skill}</span>
                </div>
              )) || <li>No skills listed.</li>}
            </div>
          </div>
        </div>

        {/* Job Overview */}
        <div className="w-4/12 flex flex-col gap-5">
          <h4 className="text-lg font-semibold">Job Overview</h4>
          <div className="flex justify-evenly items-center w-full py-8 border-2 rounded-md ">
            <div className="flex flex-col justify-center items-center">
              <p className="text-primary">Salary(INR)</p>
              {job.salary?.map((req, index) => (
                <p key={index} className="text-xl text-green-600">
                  ₹{req?.minimum} - ₹{req?.maximum}
                </p>
              )) || <li>No requirements listed.</li>}

              <p className="text-sm text-gray-500">Yearly Salary</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <HiOutlineLocationMarker
                className="font-bold text-primary"
                size={30}
              />
              <p className="text-primary">Job Location</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          </div>
          <div className="w-full border-2 rounded-md px-5">
            {/* Additional Job Details */}
            <div className="flex flex-wrap gap-8 py-8">
              <div>
                <LuCalendar className="text-primary" size={30} />
                <p className="text-gray-500">POSTED ON:</p>
                <p className="text-sm">
                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <LuTimer className="text-primary" size={30} />
                <p className="text-gray-500">EXPIRY DATE:</p>
                <p className="text-sm">{job.expiryDate}</p>
              </div>
              <div>
                <PiRankingLight className="text-primary" size={30} />
                <p className="text-gray-500">JOB LEVEL:</p>
                <p className="text-sm">{job.level}</p>
              </div>
              <div>
                <RiUserStarLine className="text-primary" size={30} />
                <p className="text-gray-500">EXPERIENCE:</p>
                <p className="text-sm">{job.experience} years</p>
              </div>
              <div>
                <BsBriefcase className="text-primary" size={30} />
                <p className="text-gray-500">EDUCATION:</p>
                <p className="text-sm">{job.education}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full py-8 border rounded-md px-5">
            <span className="text-gray-600">
              Number of Applicants:{" "}
              <span className="text-xl text-green-600">
                {job.applicants?.length || 0}
              </span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <button
                className="border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-gray-100 flex items-center"
                onClick={handleCopyLink}
              >
                <IoMdCopy />
                <span className="ml-2">Copy Link</span>
              </button>
              <button className="border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-gray-100 flex items-center">
                <IoMdShare />
                <span className="ml-2">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobCard;
