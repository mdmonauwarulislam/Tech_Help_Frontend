/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";
import AddEducationForm from "./AddEduactionForm";

const AddNewDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [college, setCollege] = useState([]);
  const [school, setSchool] = useState([]);

  // handle to get Eduction list of a user
  const getEducationList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/getEducationList`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCollege(response.data.data.college);
        setSchool(response.data.data.school);
      }
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      console.error(
        "Error fetching college education:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getEducationList();
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
          <div className="flex items-center">
            <div className="mr-5">
              <FaFileAlt size={30} />
            </div>
            <div>
              <div className="text-lg font-semibold">Add Education Details</div>
              <div className="text-sm text-gray-500">
                Your school / college details
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            type="button"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
          >
            + Add new
          </button>
        </div>

        {/* Render the modal */}
        <AddEducationForm isOpen={isModalOpen} onClose={closeModal} />

        {/* Render the education list */}
        <div className="mt-5">
          {Array.isArray(college) &&
            college.length > 0 &&
            college.map((item) => (
              <div className="px-10 py-4 flex justify-between items-start border border-gray-300 rounded-md shadow-md mb-4" key={item._id}>
                <div>
                  <h1 className="text-2xl font-semibold">{item.collegeName}</h1>
                  <h2 className="text-lg text-gray-700">
                    {item.degree.degree} | <span>{item.fieldOfStudy}</span> |{" "}
                    {/* <span>{grade}</span> */}
                  </h2>
                  <h3 className="text-sm text-gray-500">
                    {item.startYear} - {item.endYear}
                  </h3>
                </div>
                {/* Edit Button */}
                <div className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center">
                  <MdOutlineModeEdit size={20} className="inline" />
                  <button>Edit</button>
                </div>
              </div>
            ))}
            {Array.isArray(school) &&
            school.length > 0 &&
            school.map((item) => (
              <div className="px-10 py-4 flex justify-between items-start border border-gray-300 rounded-md shadow-md mb-4" key={item._id}>
                <div>
                  <h1 className="text-2xl font-semibold">{item.schoolName}</h1>
                  <h2 className="text-lg text-gray-700">
                    {item.classof} | <span>{item.grade}</span>
                  </h2>
                  <h3 className="text-sm text-gray-500">
                    {item.yearOfPassing}
                  </h3>
                </div>
                {/* Edit Button */}
                <div className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center">
                  <MdOutlineModeEdit size={20} className="inline" />
                  <button>Edit</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AddNewDetails;
