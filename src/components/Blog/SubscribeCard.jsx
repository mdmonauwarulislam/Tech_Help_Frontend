import React from "react";

const SubscribeCard = () => {
  return (
    <div className="bg-[#f8f9fa] py-20 px-20">
      <div className="content">
        <h1 className="text-xl font-serif font-bold py-2">
          Subscribe to newsletter
        </h1>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="py-2 px-4 border border-black rounded-md w-full md:w-2/3"
          />
          <button className="py-2 px-6 w-full md:w-1/3 bg-primary hover:bg-gray-200 text-white hover:text-black rounded-full font-bold text-xs transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
