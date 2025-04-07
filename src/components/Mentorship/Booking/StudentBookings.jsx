import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/getMenteeBookings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch bookings.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (!bookings.length) return <p className="text-center text-gray-500">No bookings yet.</p>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-primary">Your Booked Services</h2>
      {bookings.map((booking) => {
        const { _id, service, status, paymentStatus } = booking;
        return (
          <div
            key={_id}
            className="border border-gray-200 p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex justify-between items-center w-full">
              <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">{service?.title}</h3>
              <p className="text-sm text-gray-700">{service?.description}</p>
              <div className="text-sm text-gray-600">
                <span>₹{service?.price}</span> • <span>{service?.duration} mins</span>
              </div>
              </div>
              <div className="flex gap-4 mt-1 text-sm">
                <div className="flex flex-col items-center gap-2">
                <p>Booking Status :</p>
                <span className={`px-2 py-1 rounded-full  ${
                  status === "pending" ? "bg-yellow-500 text-black" :
                  status === "accepted" ? "bg-blue-500 text-white" :
                  status === "completed" ? "bg-green-600 text-white" :
                  status === "declined" ? "bg-red-500 text-white" :
                  "bg-gray-400"
                }`}>
                  {status}
                </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                <p>Payment Status :</p>
                <span className={`px-2 py-1 rounded-full ${
                    paymentStatus === "pending" ? "bg-yellow-500 text-black" :
                    paymentStatus === "completed" ? "bg-green-600 text-white" :
                    paymentStatus === "failed" ? "bg-red-500 text-white " :
                    "bg-gray-400"
                    }`}>
                    {paymentStatus}
                </span>
                </div>

                
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              {status === "accepted" && paymentStatus === "pending" && (
                <button
                  onClick={() => navigate(`/payment/${_id}`)}
                  className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  Pay Now
                </button>
              )}

              {(status === "completed" || status === "declined") && (
                <button
                  onClick={() => navigate("/services")}
                  className="border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  Rebook
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentBookings;
