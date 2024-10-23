/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";


const AddCertificationForm = ({ isOpen, onClose, certificationId }) => {
  const [certificationTitle, setCertificationTitle] = useState("");
  const [descriptionPoints, setDescriptionPoints] = useState([""]);
  const [completionMonth, setCompletionMonth] = useState("");
  const [completionYear, setCompletionYear] = useState("");
  const [certificationLink, setCertificationLink] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("");

  const isEditing = Boolean(certificationId);  // Check if editing or adding new certification

  if (!isOpen) return null;

  const handleDescriptionChange = (index, value) => {
    const newDescriptionPoints = [...descriptionPoints];
    newDescriptionPoints[index] = value;
    setDescriptionPoints(newDescriptionPoints);
  };

  const addNewDescriptionPoint = () => {
    setDescriptionPoints([...descriptionPoints, ""]);
  };

  const deleteDescriptionPoint = (index) => {
    if (descriptionPoints.length > 1) {
      const newDescriptionPoints = descriptionPoints.filter(
        (_, i) => i !== index
      );
      setDescriptionPoints(newDescriptionPoints);
    }
  };

  // Function to handle adding or updating the certification
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const certificationDetails = {
      title: certificationTitle,
      descriptionPoints,
      completionMonth,
      completionYear,
      certificationLink,
      skills: skillsUsed.split(",").map((skill) => skill.trim()),
    };

    try {
      if (isEditing) {
        // PUT request for updating an existing certification
        await axios.put(`${import.meta.env.VITE_API_URL}/student/updateCertification/${certificationId}`, certificationDetails,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Certification updated successfully!");
      } else {
        // POST request for adding a new certification
        await axios.post(`${import.meta.env.VITE_API_URL}/student/addCertification`, certificationDetails,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Certification added successfully!");
      }
      onClose(); // Close the form after saving
    } catch (error) {
      console.error("Error saving certification", error);
      toast.error("Error saving certification. Please try again.");
    }
  };

  return (
    <>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background blur */}
        <div
          className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="bg-white p-10 shadow-md rounded-md z-10 relative w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 text-3xl right-3 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>

          <h4 className="text-lg font-bold mb-4">
            {isEditing ? "Edit Certification" : "Add Certification"}
          </h4>

          {/* Wrap everything inside a form */}
          <form onSubmit={handleSave}>
            {/* Certification Title */}
            <div className="mb-5">
              <label className="font-semibold" htmlFor="certificationTitle">
                Title*
              </label>
              <input
                className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                id="certificationTitle"
                placeholder="Enter name of certification"
                value={certificationTitle}
                onChange={(e) => setCertificationTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="font-semibold" htmlFor="description">
                Describe your Certification
              </label>
              {descriptionPoints.map((point, index) => (
                <div key={index} className="relative mb-2">
                  <input
                    className="py-2 px-4 pr-10 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                    type="text"
                    placeholder={
                      index === 0
                        ? "What did you learn from this Certification?"
                        : "Type something..."
                    }
                    value={point}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    required
                  />
                  {/* Delete icon */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => deleteDescriptionPoint(index)}
                      className="absolute right-4 text-2xl top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <FiDelete />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addNewDescriptionPoint}
                className="mt-3 text-gray-700 w-full py-2 rounded-md font-semibold border-2"
              >
                + New point
              </button>
            </div>

            <label className="font-semibold" htmlFor="completionMonth">
              When you completed this certification/course? *
            </label>

            {/* Completion Month */}
            <div className="mb-5 grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="font-semibold" htmlFor="completionYear">
                  Choose Month
                </label>
                <select
                  id="completionMonth"
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                  value={completionMonth}
                  onChange={(e) => setCompletionMonth(e.target.value)}
                  required
                >
                  <option value="">Choose Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              {/* Completion Year */}
              <div>
                <label className="font-semibold" htmlFor="completionYear">
                  Choose Year
                </label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                  type="number"
                  id="completionYear"
                  placeholder="YYYY"
                  value={completionYear}
                  onChange={(e) => setCompletionYear(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Certification Link */}
            <div className="mb-5">
              <label className="font-semibold">Link</label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                placeholder="Certification link"
                value={certificationLink}
                onChange={(e) => setCertificationLink(e.target.value)}
              />
            </div>

            {/* Skills Used */}
            <div className="mb-5">
              <label className="font-semibold">Skills Used (min 2 skills)*</label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                placeholder="Type Skills Learned (comma separated)"
                value={skillsUsed}
                onChange={(e) => setSkillsUsed(e.target.value)}
                required
              />
            </div>

            {/* Save and Cancel Buttons */}
            <div className="pt-5 gap-10 flex justify-end">
              <button type="button" onClick={onClose} className="text-gray-500">
                Cancel
              </button>
              <button
                type="submit"  // Use submit type for form submission
                className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
              >
                {isEditing ? "Update Details" : "Save Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCertificationForm;
