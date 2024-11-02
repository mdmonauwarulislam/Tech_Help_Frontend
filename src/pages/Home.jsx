import HeaderImg from "../assets/header.webp";
import growthVector from "../assets/pattern.png";
import { SiBloglovin, SiCodementor } from "react-icons/si";
import { RiRoadMapFill, RiUserSearchFill } from "react-icons/ri";
import BlogCard from "../components/Blog/BlogCard";

import C1 from "../assets/C1.webp";
import C2 from "../assets/C2.webp";
import C3 from "../assets/C3.webp";
import C4 from "../assets/C4.webp";
import C5 from "../assets/c5.webp";
import C6 from "../assets/c6.webp";
import JobCard from "../components/Job/JobCard";

const cardItems = [
  {
    blogImage: C5,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C6,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C1,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C2,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C3,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
  {
    blogImage: C4,
    p1: "Business, Travel",
    date: "July 2, 2020",
    p2: "Your most unhappy customers are your greatest source of learning.",
    p3: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    userImage:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    userName: "Sergy Campbell",
    userRole: "CEO, Founder",
  },
];

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
function Home() {
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(${growthVector})`,
          backgroundSize: "cover",
          backgroundPosition: "end",
        }}
      >
        <header className="h-[90vh] flex justify-between items-center w-10/12 mx-auto ">
          <div className="">
            <h1 className="text-4xl font-bold text-primary">
              Welcome to
              <span className="block text-8xl text-secondary font-semibold font-grotesk">
                TECH HELP
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              Empowering your tech journey with blogs, jobs, mentorship, and
              resources.
            </p>
            <button className="py-2 px-6 rounded-md border-2 border-primary text-primary mt-10 font-semibold">
              Get Started
            </button>
          </div>
          <div>
            <img src={HeaderImg} alt="hero" />
          </div>
        </header>
      </div>
      <div className="w-10/12 mx-auto ">
        <div className="text-center py-20 mt-10">
          <h1 className="text-4xl font-semibold text-primary">
            Unlock the Benefits of Tech Help!
          </h1>
          <p className="text-xl font-medium text-gray-700 mt-2">
            We provide a wide range of services to help you grow
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 px-20 gap-20 mt-10">
            <div className="bg-white flex flex-col w-full justify-center shadow-lg items-center rounded-lg px-4 py-12">
              <SiBloglovin className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">Blogs</h1>
              <p className="text-gray-600 mt-2">
                Read the latest blogs on trending technologies and career
                growth.
              </p>
            </div>
            <div className="bg-white rounded-lg flex flex-col w-full justify-center  items-center px-4 py-12 shadow-lg">
              <RiUserSearchFill className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">Jobs</h1>
              <p className="text-gray-600 mt-2">
                Find the best jobs that match your skills and experience.
              </p>
            </div>
            <div className="bg-white rounded-lg flex flex-col w-full justify-center items-center px-4 py-12 shadow-lg">
              <SiCodementor className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">
                Mentorship
              </h1>
              <p className="text-gray-600 mt-2">
                Get guidance from industry experts to shape your career.
              </p>
            </div>
            <div className="bg-white rounded-lg flex flex-col w-full justify-center items-center px-4 py-12 shadow-lg">
              <RiRoadMapFill className="text-5xl mb-4 text-secondary" />
              <h1 className="text-2xl font-semibold text-primary">Roadmap</h1>
              <p className="text-gray-600 mt-2">
                Plan your career path with our roadmap and resources.
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* Blog section */}
          <div>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-4xl font-semibold text-primary ">
                  Recent Blog
                </h1>
                <p className="text-xl font-medium text-gray-700 ">
                  Read the latest blog on career growth and technology
                </p>
              </div>
              <button className="px-4 py-2 border-2 border-primary rounded-md">
                View All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-10">
              {cardItems.map((item, index) => {
                return (
                  <div className="" key={index}>
                    <BlogCard {...item} />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Job Sections */}
          <div className="pb-20">
            <div className="flex justify-between items-center mb-10 mt-20">
              <div>
                <h1 className="text-4xl font-semibold text-primary">
                  Recent Jobs
                </h1>
                <p className="text-xl font-medium text-gray-700">
                  Find the best jobs that match your skills and experience
                </p>
              </div>
              <button className="px-4 py-2 border-2 border-primary rounded-md">
                View All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-16 ">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Home;
