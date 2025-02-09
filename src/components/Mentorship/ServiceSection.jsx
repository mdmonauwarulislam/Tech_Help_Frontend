import ServiceCard from "./ServiceCard";
import { IoVideocam } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaClockRotateLeft } from "react-icons/fa6";

import {
  MdOutlineReviews,
  MdOutlineStar,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { BiVideo } from "react-icons/bi";

const ServiceSection = () => {
  const serviceData = [
    {
      icon : <BiVideo className="text-3xl" />,
      type: "1:1 call",
      title: "Quick Call",
      description:
        "30 mins quick call to achieve your goals faster with personalised road map.",
      duration: "30 Min Duration",
      price: 500,
    },
    {
      icon : <BiVideo className="text-3xl "/>,
      type: "1:1 call",
      title: "60 min Mentor Meet",
      description:
        "1:1 mentorship session for personalised, hands-on and practical guidance.",
      duration: "60 Min Duration",
      price: 1000,
    },
    {
      icon : <FaClockRotateLeft />,
      type: "Query",
      title: "Ask a Query",
      description: "Query Query",
      duration: "3 Days Revert",
      price: 100,
    },
  ];

  return (
    <div className="bg-white min-h-screen rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-medium">Services</h1>
        <button className="border-2 rounded-full hover:bg-primary hover:text-white text-primary px-6 py-3 bg-blue-50 text-sm">
          + Add New Service
        </button>
      </div>
      <div className="border-t border-gray-300 mb-4"></div>
      <h2 className="text-xl font-medium mb-4 px-6">Your Services</h2>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 m-6 rounded-2xl p-1 border border-gray-300">
        <div className="bg-white py-3 px-5 items-center gap-4 border-r border-gray-300">
          <p className="text-lg text-gray-800 mb-2 font-medium">Total Sessions</p>

          <div className="flex items-center gap-4 text-3xl">
            <div className="text-purple-500 p-3 rounded-full bg-purple-50">
              <MdOutlineCalendarMonth />
            </div>
            <h3 className="font-semibold text-2xl">0</h3>
          </div>
         
        </div>
        <div className="bg-white p-4  items-center gap-4 border-r border-gray-300">
          <p className="text-lg text-gray-800 mb-2 font-medium">Total Duration</p>

          <div className="flex items-center gap-4 text-3xl">
            <div className="text-blue-500 p-3 rounded-full bg-blue-50">
              <AiOutlineClockCircle />
            </div>
            <h3 className="font-semibold text-2xl">0 <span className="text-lg font-normal">mins</span></h3>
          </div>
        </div>
        
        <div className="bg-white p-4  items-center gap-4 border-r border-gray-300">
          <p className="text-lg text-gray-800 mb-2 font-medium">Total Reviews</p>

          <div className="flex items-center gap-4 text-3xl">
            <div className="text-pink-500 p-3 rounded-full bg-pink-50">
              <MdOutlineReviews />
            </div>
            <h3 className="font-semibold text-2xl">0</h3>
          </div>
        </div>

        <div className="bg-white p-4  items-center gap-4">
          <p className="text-lg text-gray-800 mb-2 font-medium">Avg Ratings</p>

          <div className="flex items-center gap-4 text-3xl">
            <div className="text-yellow-700 p-3 rounded-full bg-yellow-50">
              <MdOutlineStar />
            </div>
            <h3 className="font-semibold text-2xl">0</h3>
          </div>
        </div>
        
      </div>

      {/* Service Cards */}
      <div className="grid gap-5 p-6">
        
        {serviceData.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
