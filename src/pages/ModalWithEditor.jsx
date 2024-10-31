import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ModalWithEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-primary">
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
      >
        New Blog
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center pb-4 text-xl font-medium text-slate-800">
              Editor Modal
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="mt-1 rounded-md border border-gray-300 p-2 outline-none focus:border-primary"
                  placeholder="https://letsenhance.io/hi/"
                />
              </div>

              <div className="pt-4">
                <label className="text-sm font-semibold text-gray-700">
                  Blog Content
                </label>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
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
                onClick={closeModal}
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
