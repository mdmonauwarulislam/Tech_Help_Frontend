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
  const [currentEducation, setCurrentEducation] = useState(null); // For editing
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState(null);
  const [educationType, setEducationType] = useState(""); // To track type of education

  // Handle to get Education list of a user
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

  const openModal = (type = "") => {
    setIsModalOpen(true);
    setCurrentEducation(null);
    setEducationType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEducation(null);
    setEducationType(""); 
  };

  const handleEdit = (item, type) => {
    setCurrentEducation(item);
    setEducationType(type);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = (id) => {
    setEducationToDelete(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/student/deleteEducation/${educationToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCollege(college.filter(item => item._id !== educationToDelete));
      setSchool(school.filter(item => item._id !== educationToDelete));
      setIsDeleteConfirmationOpen(false);
      console.log("Deleted successfully");
    } catch (error) {
      console.error("Error deleting education:", error);
    }
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
              <div className="text-sm text-gray-500">Your school / college details</div>
            </div>
          </div>
          <button
            onClick={() => openModal("college")}
            type="button"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
          >
            + Add new
          </button>
        </div>

        {/* Render the modal */}
        <AddEducationForm isOpen={isModalOpen} onClose={closeModal} currentEducation={currentEducation} educationType={educationType} />

        {/* Render the education list */}
        <div className="mt-5">
          {Array.isArray(college) && college.length > 0 && college.map((item) => (
            <div className="px-10 py-4 flex justify-between items-start border border-gray-300 rounded-md shadow-md mb-4" key={item._id}>
              <div>
                <h1 className="text-2xl font-semibold">{item.collegeName}</h1>
                <h2 className="text-lg text-gray-700">{item?.degree?.degree} | <span>{item.fieldOfStudy}</span></h2>
                <h3 className="text-sm text-gray-500">{item.startYear} - {item.endYear}</h3>
              </div>
              <div className="flex space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(item, "college")}
                  className="py-1 px-3 border-2 items-center flex border-primary rounded-md text-primary text-center"
                >
                  <MdOutlineModeEdit size={20} className="inline" />
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteConfirmation(item._id)}
                  className="py-1 px-3 border-2 items-center flex border-red-500 rounded-md text-red-500 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {Array.isArray(school) && school.length > 0 && school.map((item) => (
            <div className="px-10 py-4 flex justify-between items-start border border-gray-300 rounded-md shadow-md mb-4" key={item._id}>
              <div>
                <h1 className="text-2xl font-semibold">{item.schoolName}</h1>
                <h2 className="text-lg text-gray-700">{item.classof} | <span>{item.grade}</span></h2>
                <h3 className="text-sm text-gray-500">{item.yearOfPassing}</h3>
              </div>
              <div className="flex space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(item, "school")}
                  className="py-1 px-3 border-2 items-center flex border-primary rounded-md text-primary text-center"
                >
                  <MdOutlineModeEdit size={20} className="inline" />
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteConfirmation(item._id)}
                  className="py-1 px-3 border-2 items-center flex border-red-500 rounded-md text-red-500 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteConfirmationOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsDeleteConfirmationOpen(false)}
            ></div>

            {/* Delete Confirmation Dialog */}
            <div className="bg-white p-8 rounded-md shadow-md z-10">
              <h2 className="text-xl font-semibold mb-4">Delete Education Entry</h2>
              <p>Are you sure you want to delete this education entry?</p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsDeleteConfirmationOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-3"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddNewDetails;
