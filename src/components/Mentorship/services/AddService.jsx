/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddService = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/mentor/createService`,
        { title, description, duration, price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Service added successfully");
        onClose();
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 z-10 max-h-screen overflow-hidden">
        <form
          className="max-h-[80vh] overflow-y-auto py-4"
          style={{ scrollbarWidth: "none" }}
          onSubmit={handleAddService}
        >
          <button
            onClick={onClose}
            className="absolute text-3xl top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-lg font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md"
                required
              />

              <label htmlFor="description" className="text-lg font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md"
                required
              />

              <label htmlFor="duration" className="text-lg font-medium">
                Duration (in mins)
              </label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md"
                required
              />

              <label htmlFor="price" className="text-lg font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-primary text-white rounded-md"
              type="submit"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
