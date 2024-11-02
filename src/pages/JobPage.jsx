import { IoSearch } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useState } from "react";
import JobFilter from "../components/Job/JobFilter";
import JobCard from "../components/Job/JobCard";

// Dummy Job Data
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    type: "Full-Time",
    salaryRange: "₹60,000 - ₹80,000",
    companyName: "Tech Company",
    location: "Mumbai, India",
    applicantsCount: "25+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 2,
    title: "Part-Time Graphic Designer",
    type: "Part-Time",
    salaryRange: "₹20,000 - ₹40,000",
    companyName: "Creative Agency",
    location: "Delhi, India",
    applicantsCount: "10+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 3,
    title: "Internship in Marketing",
    type: "Internship",
    salaryRange: "₹15,000 - ₹25,000",
    companyName: "Marketing Solutions",
    location: "Bangalore, India",
    applicantsCount: "5+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 4,
    title: "Remote Customer Support",
    type: "Internship",
    salaryRange: "₹30,000 - ₹50,000",
    companyName: "Support Co.",
    location: "Remote",
    applicantsCount: "15+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
  {
    id: 5,
    title: "Hybrid Product Manager",
    type: "Full-Time",
    salaryRange: "₹80,000 - ₹1,00,000",
    companyName: "Product Inc.",
    location: "Pune, India",
    applicantsCount: "8+ Applicants",
    logo: "https://via.placeholder.com/40",
    profiles: [
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
      "https://via.placeholder.com/40",
    ],
  },
];

function JobPage() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-10/12 mx-auto py-20">
      <h1 className="text-5xl font-semibold">Job Search</h1>
      <p className="text-2xl font-medium text-gray-700 mt-2">
        Search for your desired job matching your skills
      </p>

      <div className="relative mt-6">
        {/* Icons and placeholder text styled within a single input */}
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

        {/* Transparent input for actual typing */}
        <input
          className="w-full text-2xl border-2 py-5 pl-5 pr-24 rounded-md text-gray-800 placeholder-transparent outline-none"
          placeholder="Enter Job title, Enter location, Years of experience"
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Search Button */}
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
          <div className="grid grid-cols-2 gap-16 ">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
