import ServiceCard from "./ServiceCard";
import AddService from "./AddService";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  // AiOutlineClockCircle,
  MdOutlineReviews,
  MdOutlineStar,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { SiCodementor } from "react-icons/si";

const ServiceSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  // Open Add Service Modal
  const openAddServiceModal = () => setIsOpen(true);
  const closeAddServiceModal = () => setIsOpen(false);

  // Open Delete Confirmation Modal
  const openDeleteModal = (id) => setDeleteServiceId(id);
  const closeDeleteModal = () => setDeleteServiceId(null);

  // Fetch Services from API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/getAllServices`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("API Response:", response.data); // Debugging

      if (response.data?.data && Array.isArray(response.data.data)) {
        setServices(response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Service
  const deleteService = async () => {
    if (!deleteServiceId) return;
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/mentor/deleteService/${deleteServiceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Service deleted successfully.");
        fetchServices(); // Refresh services
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="bg-white min-h-screen rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-medium">Services</h1>
        <button
          onClick={openAddServiceModal}
          className="border-2 rounded-full hover:bg-primary hover:text-white text-primary px-6 py-3 bg-blue-50 text-sm"
        >
          + Add New Service
        </button>
      </div>
      <div className="border-t border-gray-300 mb-4"></div>
      <h2 className="text-xl font-medium mb-4 px-6">Your Services</h2>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 m-6 rounded-2xl p-1 border border-gray-300">
        <div className="bg-white py-3 px-5 items-center gap-4 border-r border-gray-300">
          <p className="text-lg text-gray-800 mb-2 font-medium">
            Total Sessions
          </p>
          <div className="flex items-center gap-4 text-3xl">
            <div className="text-purple-500 p-3 rounded-full bg-purple-50">
              <MdOutlineCalendarMonth />
            </div>
            <h3 className="font-semibold text-2xl">0</h3>
          </div>
        </div>
        <div className="bg-white p-4 items-center gap-4 border-r border-gray-300">
          <p className="text-lg text-gray-800 mb-2 font-medium">
            Total Duration
          </p>
          <div className="flex items-center gap-4 text-3xl">
            <div className="text-blue-500 p-3 rounded-full bg-blue-50">
              {/* <AiOutlineClockCircle /> */}
            </div>
            <h3 className="font-semibold text-2xl">
              0 <span className="text-lg font-normal">mins</span>
            </h3>
          </div>
        </div>
        <div className="bg-white p-4 items-center gap-4 border-r border-gray-300">
          <p className="text-lg text-gray-800 mb-2 font-medium">
            Total Reviews
          </p>
          <div className="flex items-center gap-4 text-3xl">
            <div className="text-pink-500 p-3 rounded-full bg-pink-50">
              <MdOutlineReviews />
            </div>
            <h3 className="font-semibold text-2xl">0</h3>
          </div>
        </div>
        <div className="bg-white p-4 items-center gap-4">
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
        {services?.data &&
        Array.isArray(services.data) &&
        services.data.length > 0 ? (
          services.data.map((service, index) => {
            console.log("Service received by ServiceCard:", service); // Debugging
            return service ? (
              <ServiceCard key={service._id || index} service={service} />
            ) : null;
          })
        ) : (
          <p className="text-center text-gray-500">No services found.</p>
        )}
      </div>

      {/* Add Service Modal */}
      <AddService
        isOpen={isOpen}
        onClose={closeAddServiceModal}
        onServiceAdded={fetchServices}
      />

      {/* Delete Confirmation Modal */}
      {deleteServiceId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p className="text-gray-600 my-2">
              Are you sure you want to delete this service?
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={deleteService}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSection;
