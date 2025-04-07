import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailableServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mentor/getAllServices`
        );
        setServices(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBook = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Services</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-lg font-bold mt-2">₹{service.price}</p>
              <button
                onClick={() => handleBook(service._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-3 w-full hover:bg-blue-600 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableServices;
