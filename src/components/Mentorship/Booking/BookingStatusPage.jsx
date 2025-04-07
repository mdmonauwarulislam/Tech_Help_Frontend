import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BookingStatusPage = () => {
  const { id: bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchBooking = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/mentor/getStudentBookings/${bookingId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bookingsArray = res.data?.data || [];
      const found = bookingsArray.find((b) => b._id === bookingId);
      setBooking(found);
    } catch (err) {
      console.error("Fetch booking error:", err.response?.data || err.message);
      toast.error("Failed to fetch booking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();

    // Optional: Auto refresh every 8 seconds
    // const interval = setInterval(fetchBooking, 8000);
    // return () => clearInterval(interval);
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load.");
      setPaymentLoading(false);
      return;
    }

    try {
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/mentor/initiatePayment/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "TechHelp Mentorship",
        description: booking.service.title,
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/mentor/verifyPayment`,
              {
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toast.success("Payment successful!");
            await fetchBooking(); // refresh booking with updated status & zoom link
          } catch (err) {
            toast.error("Payment verification failed.");
            console.error("Verification error:", err.response?.data || err.message);
          }
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Initiate payment error:", err.response?.data || err.message);
      toast.error("Failed to initiate payment.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading booking details...</p>;
  if (!booking) return <p className="text-center mt-10 text-red-500">Booking not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Booking Status</h2>

      <p>
        <strong>Status:</strong>{" "}
        <span className="capitalize text-blue-600">{booking.status}</span>
      </p>
      <p>
        <strong>Service:</strong> {booking.service.title}
      </p>
      <p>
        <strong>Price:</strong> ₹{booking.service.price}
      </p>
      <p>
        <strong>Duration:</strong> {booking.service.duration} minutes
      </p>

      {booking.status === "accepted" && booking.paymentStatus !== "completed" && (
        <>
          <button
            onClick={handlePayment}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={paymentLoading}
          >
            {paymentLoading ? "Processing..." : "Pay Now"}
          </button>
          {paymentLoading && (
            <p className="mt-2 text-sm text-gray-500">Please wait while we process your payment...</p>
          )}
        </>
      )}

      {(booking.status === "paid" || booking.paymentStatus === "completed") && (
        <div className="mt-6 p-4 border border-green-400 bg-green-50 rounded-lg">
          <p className="text-green-700 font-semibold">✅ Payment completed!</p>
          {booking.zoomLink ? (
            <p className="mt-2">
              <strong>Zoom Link:</strong>{" "}
              <a
                href={booking.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {booking.zoomLink}
              </a>
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-2">Zoom link will be shared soon.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingStatusPage;
