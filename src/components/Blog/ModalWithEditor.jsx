import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function ModalWithEditor() {
  const initialBlogDetails = {
    title: "",
    category: "",
    image: "",
    content: "",
  };

  const [blogDetails, setBlogDetails] = useState(initialBlogDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle the input changes and update the blogDetails state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setBlogDetails((prevDetails) => ({
      ...prevDetails,
      content: content,
    }));
  };

  const handleSubmit = async (e) => {
    // Handle submit logic (e.g., saving data or calling an API)
    e.preventDefault();
    if (
      !blogDetails.title ||
      !blogDetails.category ||
      !blogDetails.image ||
      !blogDetails.content
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      // Save the blog details to the database
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog/createblog`,
        {
          title: blogDetails.title,
          category: blogDetails.category,
          image: blogDetails.image,
          content: blogDetails.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );
      if (response.status === 201) {
        toast.success("Blog created successfully");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        toast.error(
          `Error: ${error.response.data.message || "Unauthorized access"}`
        );
      } else {
        console.error("Error message:", error.message);
        toast.error("Something went wrong");
      }
    }
    console.log("Submitted Blog Details:", blogDetails);
    setBlogDetails(initialBlogDetails); // Reset the form after submission
    closeModal(); // Close the modal after submission
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="rounded-md bg-[#e5e5e5] hover:bg-primary hover:text-white py-2 px-4 border border-transparent text-center text-sm text-[#898989] transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
      >
        + New Blog
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center pb-4 text-xl font-medium text-slate-800">
              Fill The Details For Your Blog
              {/* Close button */}
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="border-t border-primary py-8 space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={blogDetails.title}
                  onChange={handleInputChange}
                  className="mt-1 rounded-md border border-gray-300 p-2 outline-none focus:border-primary"
                  placeholder="Enter blog title"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700">
                  Blog Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={blogDetails.category}
                  onChange={handleInputChange}
                  className="mt-1 rounded-md border border-gray-300 p-2 outline-none focus:border-primary"
                  placeholder="Enter blog category"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700">
                  Blog Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={blogDetails.image}
                  onChange={handleInputChange}
                  className="mt-1 rounded-md border border-gray-300 p-2 outline-none focus:border-primary"
                  placeholder="https://letsenhance.io/hi/"
                />
              </div>

              <div className="pt-4">
                <label className="text-sm font-semibold text-gray-700">
                  Blog Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={blogDetails.content}
                  onChange={handleContentChange}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={closeModal}
                className="rounded-md border border-transparent py-2 px-4 text-center text-sm text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ml-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none ml-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
