import { FcOnlineSupport } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";
const ResourceCard = ({ title, price, tag, tagicon}) => {
  return (
    <div className="bg-blue-gray-50 shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between w-fit gap-2 items-center border rounded-2xl bg-white px-2 py-2">
            <span>{tagicon}</span>
            <h1>{tag}</h1>
        </div>
      <h2 className="text-xl font-semibold text-gray-800 mt-3">{title}</h2>
      <div className="flex justify-between items-center mt-2">
        
        <button className="bg-white text-gray-800 px-4 py-3 font-semibold hover:bg-primary hover:text-white  w-full rounded-full my-3 flex items-center justify-center ">
          
          <h1>Claim Now</h1>
          <span className="font-bold ml-3 text-xl">₹{price}</span>
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const resources = [
    { title: "Winner's PPT - Flipkart - 2023", price: 49, tag : "Resource", tagicon :<FcIdea/>  },
    { title: "Amazon PPI Winner's PPT - 2023", price: 45, tag : "1:1 call", tagicon : <FcOnlineSupport/> },
    { title: "Reckitt Benckiser Global Challenge", price: "Free", tag : "Resource", tagicon : <FcIdea/>  },
  ];

  return (
    <div className="p-6 w-full mx-auto">
      <div>
        <h1 className="font-semibold text-xl"> Available Services</h1>
        <p className="text-base">Discover our mentorship offerings designed for your success</p>
      </div>
      <div className="flex gap-4 my-6 border-2 border-primary rounded-full w-fit px-2 py-2">
        <button className="bg-primary text-white px-4 py-2 rounded-full">
          All
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          1:1 Call
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
          Resources
        </button>
      </div>
      <div className="grid grid-cols-2 gap-8 ">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            tagicon={resource.tagicon}
            tag = {resource.tag}
            title={resource.title}
            price={resource.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
