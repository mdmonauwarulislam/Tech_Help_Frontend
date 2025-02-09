import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import { toast } from "react-toastify";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/`,
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );
      setJobs(response.data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Add spinner or loading animation */}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center">
        <p>No jobs available at the moment.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={fetchJobs}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          jobId={job._id}
          title={job.title}
          type={job.type}
          salaryRange={`${job.salary[0]?.minimum} - ${job.salary[0]?.maximum}`}
          companyName={job.companyName || "Unknown Company"}
          location={job.location}
          applicantsCount={job.applicants.length}
          logo={job.logo || "https://via.placeholder.com/150"}
          createdBy = {job.createdBy?.username|| "Unknown"}
          profiles={job.applicants.map((applicant) => applicant.profileImage || "")}
        />
      ))}
    </div>
  );
};

export default JobList;
