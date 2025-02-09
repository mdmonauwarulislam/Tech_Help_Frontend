import { useEffect, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { FaBuilding, FaIndustry, FaUsers, FaGlobe } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const CompanyDashboard = () => {
  const [open, setOpen] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyData, setCompanyData] = useState({
    username: "",
    email: "",
    companyLogo: "",
    aboutCompany: "",
    companyType: "",
    industryType: "",
    companyAddress: "",
    companySize: "",
    companyWebsite: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCompanyLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      payload.append("username", companyData.username);
      payload.append("email", companyData.email);
      payload.append("companyLogo", companyLogo);
      payload.append("aboutCompany", companyData.aboutCompany);
      payload.append("companyType", companyData.companyType);
      payload.append("industryType", companyData.industryType);
      payload.append("companyAddress", companyData.companyAddress);
      payload.append("companySize", companyData.companySize);
      payload.append("companyWebsite", companyData.companyWebsite);
      // Update company data
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/company/updatecompanydetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCompanyData(response.data.data);
      handleOpen();
    } catch (error) {
      console.error("Error updating company data:", error);
      toast.error("Failed to update company data");
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/company/getcompanydetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCompanyData(response.data?.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Failed to fetch company data");
    }
  };
  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className="py-20 w-10/12 mx-auto">
      <div className="w-8/12">
        <div className="border-2 rounded-xl">
          <div className="">
            <div className="flex px-10 pt-10 items-center pb-5 justify-between">
              <div className="flex gap-10 ">
                <div>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${
                      companyData?.companyLogo
                    }`}
                    className="h-20 w-20 rounded-full border-4 border-blue-300"
                    alt=""
                  />
                </div>
                <div className="">
                  <h1 className="text-2xl font-semibold">
                    {companyData?.username}
                  </h1>

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
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              Company Logo
            </label>
            <input
              name="companyLogo"
              type="file"
              accept="image/*"
              placeholder="Upload company logo"
              onChange={handleFileChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="w-full mt-4">
            <label className="block text-xl mb-1 text-primary">
              Company Name
            </label>
            <input
              name="username"
              placeholder="Enter company name"
              value={companyData?.username}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              About company :
            </label>
            <textarea
              name="aboutCompany"
              placeholder="Enter company description"
              value={companyData?.aboutCompany}
              onChange={handleChange}
              rows={4}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">Location</label>
            <input
              name="companyAddress"
              placeholder="Enter location"
              value={companyData?.companyAddress}
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
              name="email"
              type="email"
              placeholder="Enter contact email"
              value={companyData.email}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              Company Type
            </label>
            <input
              name="companyType"
              placeholder="Enter company type"
              value={companyData.companyType}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              Industry Type
            </label>
            <input
              name="industryType"
              placeholder="Enter industry type"
              value={companyData?.industryType}
              onChange={handleChange}
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              Company Size
            </label>
            <input
              name="companySize"
              placeholder="Enter company size"
              value={companyData.companySize}
              onChange={handleChange}
              type="number"
              required
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">Website</label>
            <input
              name="companyWebsite"
              placeholder="Enter website URL"
              value={companyData?.companyWebsite}
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
            {companyData.aboutCompany.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-2">
                {paragraph}
              </p>
            ))}
        </div>

        {/* company overview */}

        <div className="w-4/12 ">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            Company Overview
          </h4>
          <div className="flex items-center text-gray-600 mb-3">
            <FaUsers className="mr-2 text-primary" size={20} />
            <span className="font-semibold">Company’s Size:</span>
            <span className="ml-2">{companyData.companySize}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <FaIndustry className="mr-2 text-primary" size={20} />
            <span className="font-semibold">Industry Type:</span>
            <span className="ml-2">{companyData.industryType}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <FaBuilding className="mr-2 text-primary" size={20} />
            <span className="font-semibold">Company Type:</span>
            <span className="ml-2">{companyData.companyType}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <FaGlobe className="mr-2 text-primary" size={20} />
            <span className="font-semibold">Website:</span>
            <a
              href={`${companyData.companyWebsite}`}
              className="ml-2 text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {companyData.companyWebsite}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
