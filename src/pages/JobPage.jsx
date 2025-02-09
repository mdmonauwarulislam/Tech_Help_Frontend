import { IoSearch } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import JobFilter from "../components/Job/JobFilter";
import JobCard from "../components/Job/JobCard";
import { toast } from "react-toastify";

function JobPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/getjobs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.jobs);
      setJobs(response.data.jobs); 
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchJobs();
  }, []);

  return (
    <div className="w-10/12 mx-auto py-20">
      <h1 className="text-5xl font-semibold">Job Search</h1>
      <p className="text-2xl font-medium text-gray-700 mt-2">
        Search for your desired job matching your skills
      </p>

      <div className="relative mt-6">
        {/* Search Bar */}
        <div
          className={`absolute left-5 top-1/2 transform -translate-y-1/2 flex items-center space-x-4 text-gray-400 text-xl ${
            isFocused ? "hidden" : "block"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <IoSearch />
          <span>Enter Job title</span>
          <FaMapMarkerAlt />
          <span>Enter location</span>
          <MdWork />
          <span>Years of experience</span>
        </div>
        <input
          className="w-full text-2xl border-2 py-5 pl-5 pr-24 rounded-md text-gray-800 placeholder-transparent outline-none"
          placeholder="Enter Job title, Enter location, Years of experience"
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-primary rounded-md py-4 px-8 text-white cursor-pointer">
          Search
        </button>
      </div>

      <div className="mt-20 flex gap-8">
        <div className="w-4/12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold ">Filters</h2>
            <p className="cursor-pointer">Clear All</p>
          </div>
          <JobFilter />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold ">Results</h2>
            <p>Showing {jobs.length} results</p>
          </div>

          {/* Job Cards */}
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-2 gap-16 ">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  jobId={job._id}
                  title={job.title}
                  type={job.type}
                  salaryRange={`${job.salary[0]?.minimum} - ${job.salary[0]?.maximum}`}
                  companyName={job.companyName || "Unknown Company"}
                  location={job.location}
                  applicantsCount={`${job.applicants.length} Applicants`}
                  logo={job.logo || "https://via.placeholder.com/150"}
                  profiles={job.applicants.map((applicant) => applicant.profileImage || "")}
                />
              ))}
            </div>
          ) : (
            <p>No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
