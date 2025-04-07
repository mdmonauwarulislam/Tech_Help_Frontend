/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateService = ({ isOpen, onClose, serviceId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mentor/getSingleService/${serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          const { title, description, duration, price } = response.data;
          setTitle(title);
          setDescription(description);
          setDuration(duration);
          setPrice(price);
        }
      } catch (error) {
        toast.error("Failed to fetch service details");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchServiceDetails();
    }
  }, [isOpen, serviceId]);

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/mentor/updateService/${serviceId}`,
        {
          title,
          description,
          duration: Number(duration), // Ensure number format
          price: Number(price), // Ensure number format
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Service updated successfully");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 z-10 max-h-screen overflow-hidden">
        {loading ? (
          <p className="text-center text-gray-500">Loading service details...</p>
        ) : (
          <form
            className="max-h-[80vh] overflow-y-auto py-4"
            style={{ scrollbarWidth: "none" }}
            onSubmit={handleUpdateService}
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
                  type="number"
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
        )}
      </div>
    </div>
  );
};

export default UpdateService;
