import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/booking/pay/${bookingId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { amount, id, currency } = response.data.order;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount,
          currency,
          order_id: id,
          handler: async function (response) {
            await axios.post(`${import.meta.env.VITE_API_URL}/booking/verify-payment`, {
              bookingId,
              ...response,
            });

            alert("Payment successful! Booking confirmed.");
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error initiating payment:", error);
      }
    };

    initiatePayment();
  }, [bookingId]);

  return <p>Redirecting to payment...</p>;
};

export default PaymentPage;
