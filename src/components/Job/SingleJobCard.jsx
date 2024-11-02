import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { PiRankingLight } from "react-icons/pi";
import { RiUserStarLine } from "react-icons/ri";
import { LuTimer, LuCalendar } from "react-icons/lu";
import { IoMdCopy, IoMdShare } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const SingleJobCard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
    toast(isBookmarked ? "Removed from bookmarks" : "Bookmarked!");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied");
  };

  return (
    <div className="w-10/12 mx-auto py-20">
      <div className="flex justify-between items-center py-4">
        <div className="flex gap-4 items-center">
          <img
            src="https://via.placeholder.com/64"
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div className="">
            <h3 className="text-xl font-semibold">Software Engineer</h3>
            <div className="flex items-center  text-gray-500">
              <span className="text-sm"> at company Name</span> {""}
              <span className="font-semibold text-sm px-2 rounded-sm bg-green-200 text-green-900 ml-3">
                Full-Time
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
          <Link to="/apply">
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">
              Apply Now <FaArrowRightLong className="inline text-center ml-2" />
            </button>
          </Link>
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        {/* description sefction */}
        <div className="w-8/12">
          <h4 className="text-lg font-semibold">Job Description</h4>
          <p className="text-gray-700 mt-2 pr-10">
            Velstar is a Shopify Plus agency, and we partner with brands to help
            them grow, we also do the same with our people!
            <br />
            <br />
            Here at Velstar, we don't just make websites, we create exceptional
            digital experiences that consumers love. Our team of designers,
            developers, strategists, and creators work together to push brands
            to the next level. From Platform Migration, User Experience & User
            Interface Design, to Digital Marketing, we have a proven track
            record in delivering outstanding eCommerce solutions and driving
            sales for our clients.
            <br />
            <br />
            The role will involve translating project specifications into clean,
            test-driven, easily maintainable code. You will work with the
            Project and Development teams as well as with the Technical
            Director, adhering closely to project plans and delivering work that
            meets functional & non-functional requirements. You will have the
            opportunity to create new, innovative, secure and scalable features
            for our clients on the Shopify platform
            <br />
            <br />
            Want to work with us? You're in good company!
            <br />
            <br />
            <span className="font-semibold text-black">Requirements : </span>
            <br />
            <br />
            • Great troubleshooting and analytical skills combined with the
            desire to tackle challenges head-on
            <br />
            • 3+ years of experience in back-end development working either with
            multiple smaller projects simultaneously or large-scale applications
            <br />
            • Experience with HTML, JavaScript, CSS, PHP, Symphony and/or
            Laravel
            <br />
            • Working regularly with APIs and Web Services (REST, GrapthQL,
            SOAP, etc)
            <br />
            • Have experience/awareness in Agile application development,
            commercial off-the-shelf software, middleware, servers and storage,
            and database management.
            <br />
            • Familiarity with version control and project management systems
            (e.g., Github, Jira)
            <br />
            • Great troubleshooting and analytical skills combined with the
            desire to tackle challenges head-on
            <br />
            • Ambitious and hungry to grow your career in a fast-growing agency
            <br />
            <br />
            <span className="font-semibold text-black">Benefits : </span>
            <br />
            <br />
            • Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)
            <br />
            • 28 days holiday (including bank holidays) rising by 1 day per year PLUS an additional day off on your birthday
            <br />
            • Generous annual bonus.
            <br />
            • Healthcare package
            <br />
            • Paid community days to volunteer for a charity of your choice
            <br />
            • £100 contribution for your own personal learning and development
            <br />
            • Free Breakfast on Mondays and free snacks in the office
            <br />
            • Access to Perkbox with numerous discounts plus free points from the company to spend as you wish.
            <br />
            • Cycle 2 Work Scheme
            <br />
            • Brand new MacBook Pro
            <br />
            • Joining an agency on the cusp of exponential growth and being part of this exciting story.
            <br />
          </p>
        </div>

        {/* job overview */}
        <div className="w-4/12 flex flex-col gap-5">
          <h4 className="text-lg font-semibold">Job Overview</h4>
          <div className="flex justify-evenly items-center w-full py-8 border-2 rounded-md ">
            <div className="flex flex-col justify-center items-center">
              <p className="text-primary">Salary(INR)</p>
              <p className="text-xl text-green-600">₹60,000 - ₹80,000</p>
              <p className="text-sm text-gray-500">Yearly Salary</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <HiOutlineLocationMarker
                className="font-bold text-primary"
                size={30}
              />
              <p className="text-primary">Job Location</p>
              <p className="text-sm text-gray-500">New York, NY</p>
            </div>
          </div>
          <div className="w-full border-2 rounded-md px-5">
            <div className="flex justify-between items-center w-full py-8">
              <div className="flex flex-col gap-1 items-start">
                <LuCalendar className="font-bold text-primary" size={30} />
                <p className="text-gray-500">POSTED ON:</p>
                <p className="text-sm">10 Sep, 2024</p>
              </div>
              <div className="flex flex-col gap-1 items-start ">
                <LuTimer className="font-bold text-primary" size={30} />
                <p className="text-gray-500">EXPIRY DATE: </p>
                <p className="text-sm">10 Nov, 2024</p>
              </div>
              <div className="flex flex-col gap-1 items=start">
                <PiRankingLight className="font-bold text-primary" size={30} />
                <p className="text-gray-500">JOB LEVEL:</p>
                <p className="text-sm">Entry Level</p>
              </div>
            </div>
            <div className="flex justify-start gap-12 items-center w-full pb-8 ">
              <div className="flex flex-col gap-1 items-start ">
                <RiUserStarLine className="font-bold text-primary" size={30} />
                <p className="text-gray-500">EXPERIENCE: </p>
                <p className="text-sm">1+ Year</p>
              </div>
              <div className="flex flex-col gap-1 items=start">
                <BsBriefcase className="font-bold text-primary" size={30} />
                <p className="text-gray-500">EDUCATION:</p>
                <p className="text-sm"> Bachelor</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full py-8 border rounded-md px-5">
            <div className="flex -space-x-2 ">
              {/* Dummy images for applicants */}
              <img
                src="https://via.placeholder.com/32"
                alt="Applicant 1"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://via.placeholder.com/32"
                alt="Applicant 2"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://via.placeholder.com/32"
                alt="Applicant 3"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              {/* Add more applicant images as needed */}
            </div>
            <span className="text-gray-600">Number of Applicants: 10</span>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <button
                className="border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-gray-100 flex items-center"
                onClick={handleCopyLink}
              >
                <IoMdCopy className="" />
              </button>
              <button className="border border-primary text-primary font-semibold py-2 px-4 rounded-md hover:bg-gray-100 flex items-center">
                <IoMdShare className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobCard;
