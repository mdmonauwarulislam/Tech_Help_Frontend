import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { FaBuilding, FaIndustry, FaUsers, FaGlobe } from "react-icons/fa";

const CompanyDashboard = () => {
  const [open, setOpen] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "TechHelp",
    tagline: "Tech Career Guidance Platform",
    companyDomain: "Software as a Service",
    description:
      "Helping tech enthusiasts find the right guidance, jobs, and resources to grow in their careers.",
    location: "Hyderabad, India",
    contactEmail: "contact@techhelp.com",
    website: "https://techhelp.com",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Updated Company Data:", companyData);
    handleOpen();
  };

  return (
    <div className="py-20 w-10/12 mx-auto">
      <div className="w-8/12">
        <div className="border-2 rounded-xl">
          <div className="">
            <div className="flex px-10 pt-10 items-center pb-5 justify-between">
              <div className="flex gap-10 ">
                <div>
                  <img
                    // src={`${
                    //   import.meta.env.VITE_API_URL
                    // }/uploads/${profilePicture}`}
                    src="https://randomuser.me/api/portraits"
                    className="h-20 w-20 rounded-full border-4 border-blue-300"
                    alt=""
                  />
                </div>
                <div className="">
                  <h1 className="text-2xl font-semibold">{companyData.name}</h1>

                  <p className="text-[18px]">{companyData.tagline}</p>

                  <p className="text-[16px] pr-6">
                    {companyData.companyDomain} <span>{"•"}</span>
                    <span className="ml-2">{companyData.location}</span>
                  </p>
                </div>
              </div>
              <div className="">
                <button
                  onClick={handleOpen}
                  className="px-4 font-semibold py-1 bg-primary rounded text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* edit profile daillog modal */}
      <Dialog size="lg" open={open} handler={handleOpen} className="px-8 pt-5">
        <div className="w-full flex justify-end">
          <RxCross2
            className="h-6 w-6 text-primary cursor-pointer"
            onClick={handleOpen}
          />
        </div>
        <div className="py-4">
          <h1 className="text-primary text-3xl font-semibold">
            Edit Company Profile
          </h1>
          <p className="text-xl font-medium text-gray-700 pb-2 border-b-2 border-primary">
            Update your company details below
          </p>
        </div>
        <div
          className="overflow-y-scroll max-h-[75vh] pb-10"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="w-full mt-4">
            <label className="block text-xl mb-1 text-primary">
              Company Name
            </label>
            <input
              name="name"
              placeholder="Enter company name"
              value={companyData.name}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter company description"
              value={companyData.description}
              onChange={handleChange}
              rows={4}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">Location</label>
            <input
              name="location"
              placeholder="Enter location"
              value={companyData.location}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              Contact Email
            </label>
            <input
              name="contactEmail"
              type="email"
              placeholder="Enter contact email"
              value={companyData.contactEmail}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">Website</label>
            <input
              name="website"
              placeholder="Enter website URL"
              value={companyData.website}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-primary py-2 px-4 rounded-md text-white"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Dialog>

      <div className="flex gap-8 mt-8">
        {/* About company */}
        <div className="w-8/12">
          <h4 className="text-lg font-semibold">About Company</h4>
          <p className="text-gray-700 mt-2 pr-10">
            Velstar is a dynamic Shopify Plus agency dedicated to helping brands
            scale and succeed in the ever-evolving digital landscape. With a
            focus on innovation, Velstar supports clients by delivering premium
            eCommerce solutions that drive growth and exceed expectations.
            <br />
            <br />
            At Velstar, our mission is to create immersive digital experiences
            that resonate with consumers. Our team of talented designers,
            developers, strategists, and marketing experts work collaboratively
            to push brands to their highest potential. From UX/UI design to
            performance marketing, our services are tailored to meet the unique
            needs of each client.
            <br />
            <br />
            We are proud to have built a supportive and engaging work culture
            where employees are encouraged to grow alongside the business.
            Velstar fosters a learning environment where team members can share
            ideas, innovate freely, and develop their careers within a
            fast-growing agency.
            <br />
            <br />
            Joining Velstar means being part of a collaborative and
            forward-thinking team. With offices in vibrant cities, we blend hard
            work with a little bit of fun, creating a positive atmosphere where
            every team member feels valued and excited to come to work each day.
            <br />
            <br />
            Think you’d be a great fit for our team? Velstar could be the
            perfect place to take your career to the next level!
          </p>
        </div>

        {/* company overview */}

        <div className="w-4/12 ">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            Company Overview
          </h4>
          <div className="flex items-center text-gray-600 mb-3">
            <FaUsers className="mr-2 text-primary" size={20}/>
            <span className="font-semibold">Company’s Size:</span>
            <span className="ml-2">11-50 employees</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <FaIndustry className="mr-2 text-primary" size={20} />
            <span className="font-semibold">Industry Type:</span>
            <span className="ml-2">Software as a Service (SaaS)</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <FaBuilding className="mr-2 text-primary" size={20}/>
            <span className="font-semibold">Company Type:</span>
            <span className="ml-2">Private Company</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <FaGlobe className="mr-2 text-primary" size={20}/>
            <span className="font-semibold">Website:</span>
            <a
              href="https://velstar.co.uk"
              className="ml-2 text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.velstar.co.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
