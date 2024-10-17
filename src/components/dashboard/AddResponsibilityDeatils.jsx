// AddResponsibilityDetails.js
import { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import AddResponsibilityForm from "./AddResponsibilityForm";
import axios from "axios";
import { toast } from "react-toastify";
import { GoPaperclip } from "react-icons/go";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const AddResponsibilityDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsibilities, setResponsibilities] = useState([]);
  const [selectedResponsibility, setSelectedResponsibility] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Fetch responsibilities from the backend
  const fetchResponsibilities = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/getResponsibilty`,
        config
      );
      setResponsibilities(response.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error fetching responsibilities. Please try again.";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResponsibilities();
  }, []);

  // Open modal to add or edit responsibility
  const openModal = (responsibility = null) => {
    setSelectedResponsibility(responsibility);
    setIsModalOpen(true);
  };

  // Close modal and refresh responsibilities
  const closeModal = () => {
    setSelectedResponsibility(null);
    setIsModalOpen(false);
    fetchResponsibilities();
  };

  // Delete a selected responsibility
  const deleteResponsibility = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/student/deleteResponsibilty/${id}`,
        config
      );
      toast.success("Responsibility deleted successfully!");
      fetchResponsibilities();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error deleting responsibility. Please try again.";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      await deleteResponsibility(projectToDelete);
      setProjectToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setProjectToDelete(null);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center">
          <FaFileAlt size={30} className="mr-5" />
          <div>
            <div className="text-lg font-semibold">
              Add Position of Responsibility
            </div>
            <div className="text-sm text-gray-500">
              Add any PORs like college clubs, social service, community head,
              fest organized, etc.
            </div>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          type="button"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
        >
          + Add new
        </button>
      </div>

      <AddResponsibilityForm
        isOpen={isModalOpen}
        onClose={closeModal}
        responsibilityData={selectedResponsibility}
      />

      <div className="mt-5">
        {responsibilities.map((resp) => (
          <div
            key={resp._id}
            className="justify-between items-start px-10 mt-4 py-4 border border-gray-300 rounded-md shadow-md"
          >
            <div>
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">
                  {resp.title }
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(resp)}
                    className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center"
                  >
                    <MdOutlineModeEdit size={20} className="inline" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteConfirmOpen(true);
                      setProjectToDelete(resp._id);
                    }}
                    className="py-1 px-3 border-2 gap-1 items-center flex border-red-500 rounded-md text-red-500 text-center"
                  >
                    <span>Delete</span>
                  </button>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-500">
                {resp.responsibilities && resp.responsibilities.length > 0 ? (
                  resp.responsibilities.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))
                ) : (
                  <li>No responsibilities specified.</li>
                )}
              </ul>
              <p className="mt-4 text-blue-600 text-xl">
                {resp.certificateLink && (
                  <Link src={resp.certificateLink} target="_blank" rel="noopener noreferrer">
                    <GoPaperclip />
                  </Link>
                )}
              </p>
              <div className="mt-3 flex space-x-2 text-gray-500">
                {resp.skills && resp.skills.length > 0 ? (
                  resp.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>No skills specified.</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={cancelDelete}
          ></div>
          <div className="bg-white p-5 rounded-md z-10 relative">
            <h4 className="text-lg font-bold mb-4">Confirm Deletion</h4>
            <p>Are you sure you want to delete this project?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddResponsibilityDetails;
