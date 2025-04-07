import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/mentor/getService/${serviceId}`);
        setService(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleBookService = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/booking/create`,
        { serviceId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Booking request sent! Waiting for mentor approval.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Booking failed.");
    }
  };

  if (loading) return <p>Loading service details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
      <p className="text-gray-600">{service.description}</p>
      <p className="text-lg font-bold mt-2">Price: ₹{service.price}</p>
      <button
        onClick={handleBookService}
        className="bg-green-500 text-white px-4 py-2 rounded mt-3"
      >
        Request Booking
      </button>
    </div>
  );
};

export default BookingPage;
