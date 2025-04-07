import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiCodementor } from "react-icons/si";
import { toast } from "react-toastify";
import axios from "axios";
import UpdateService from "./UpdateService";

const ServiceCard = ({ service }) => {
  const { _id, title, description, price, duration } = service;
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Open Update Modal with Selected Service
  const openUpdateModal = () => {
    setSelectedService(service);
    setIsUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
    setSelectedService(null);
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Delete Service API Call
  const deleteService = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/mentor/deleteService/${_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        toast.success("Service deleted successfully.");
        closeDeleteModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white border-2 p-4 rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-gray-50 text-2xl">
            <SiCodementor className="text-primary" />
          </div>
          <div>
            <h1 className="text-primary font-medium text-lg">{title}</h1>
            <p className="text-gray-700 text-sm">{description}</p>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="flex items-end gap-1 p-2 border rounded-full hover:bg-gray-200"
          >
            <BsThreeDotsVertical className={`transition-transform ${isMenuOpen ? "text-gray-900" : ""}`} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <ul className="p-1">
                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={openUpdateModal}>
                  Edit
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={openDeleteModal}>
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-b-2 my-4"></div>

      <div className="flex justify-between items-center">
        <span className="text-green-500 font-bold">₹{price}</span>
        <span className="text-gray-500 text-sm">{duration} mins</span>
      </div>

      {/* Update Service Modal */}
      <UpdateService isOpen={isUpdateOpen} onClose={closeUpdateModal} service={selectedService} />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeDeleteModal}></div>

          <div className="bg-white p-8 rounded-md shadow-md z-10">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Delete Service</h2>
            <p>Are you sure you want to delete <b>{title}</b>?</p>
            <div className="flex justify-end mt-6">
              <button onClick={closeDeleteModal} className="bg-gray-300 text-black px-4 py-2 rounded-md mr-3">
                Cancel
              </button>
              <button onClick={deleteService} className="bg-red-500 text-white px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
