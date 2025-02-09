import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

const ServiceCard = ({ icon, title, description, price, duration }) => {
  return (
    <div className="bg-white border-2 p-4 rounded-xl">
      <div className="flex items-center  justify-between">
        <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-gray-50 text-2xl">{icon}</div>
        <div>
          <h1 className="text-primary font-medium text-lg">{title}</h1>
          <p className="text-gray-700 text-[12px]">{description}</p>
        </div>
        </div>
        <div>
          <BsThreeDotsVertical className="text-gray-500 text-2xl" />
        </div>
      </div>

      <div className="border-b-2 border my-4">
      </div>

      <div className="flex justify-between items-center">
        <span className="text-green-500 font-bold">₹{price}</span>
        <span className="text-gray-500 text-sm">{duration}</span>
      </div>
    </div>
  );
};

export default ServiceCard;
