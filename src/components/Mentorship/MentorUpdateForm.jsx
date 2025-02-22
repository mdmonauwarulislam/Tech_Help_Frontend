import { useState } from "react";
import axios from "axios";

const MentorUpdateForm = ({ mentor, onClose }) => {
  const [formData, setFormData] = useState(mentor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (index, field, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/mentor/update`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-3/4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Mentor Profile</h2>

        {/* Basic Details */}
        <input type="text" name="username" value={formData.username} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Username" />
        <input type="text" name="experties" value={formData.experties} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Expertise" />
        <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Profile Picture URL" />
        <input type="number" name="yearofexperience" value={formData.yearofexperience} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Years of Experience" />

        {/* About */}
        <textarea name="about" value={formData.about} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="About"></textarea>

        {/* Languages */}
        <input type="text" name="language" value={formData.language.join(", ")} onChange={(e) => setFormData({ ...formData, language: e.target.value.split(", ") })} className="border p-2 w-full mb-2" placeholder="Languages (comma-separated)" />

        {/* Availability */}
        <input type="text" name="availability" value={formData.availability.join(", ")} onChange={(e) => setFormData({ ...formData, availability: e.target.value.split(", ") })} className="border p-2 w-full mb-2" placeholder="Availability (comma-separated)" />

        {/* Education Section */}
        <h3 className="text-lg font-semibold mt-4">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="border p-3 rounded-md mt-2">
            <input type="text" value={edu.institute} onChange={(e) => handleNestedChange(index, "institute", e.target.value, "education")} className="border p-2 w-full mb-2" placeholder="Institute" />
            <input type="text" value={edu.location} onChange={(e) => handleNestedChange(index, "location", e.target.value, "education")} className="border p-2 w-full mb-2" placeholder="Location" />
            <input type="text" value={edu.degree} onChange={(e) => handleNestedChange(index, "degree", e.target.value, "education")} className="border p-2 w-full mb-2" placeholder="Degree" />
            <input type="number" value={edu.startYear} onChange={(e) => handleNestedChange(index, "startYear", e.target.value, "education")} className="border p-2 w-full mb-2" placeholder="Start Year" />
            <input type="number" value={edu.endYear} onChange={(e) => handleNestedChange(index, "endYear", e.target.value, "education")} className="border p-2 w-full mb-2" placeholder="End Year" />
          </div>
        ))}

        {/* Experience Section */}
        <h3 className="text-lg font-semibold mt-4">Work Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="border p-3 rounded-md mt-2">
            <input type="text" value={exp.companyname} onChange={(e) => handleNestedChange(index, "companyname", e.target.value, "experience")} className="border p-2 w-full mb-2" placeholder="Company Name" />
            <input type="text" value={exp.location} onChange={(e) => handleNestedChange(index, "location", e.target.value, "experience")} className="border p-2 w-full mb-2" placeholder="Location" />
            <input type="text" value={exp.position} onChange={(e) => handleNestedChange(index, "position", e.target.value, "experience")} className="border p-2 w-full mb-2" placeholder="Position" />
            <input type="number" value={exp.startYear} onChange={(e) => handleNestedChange(index, "startYear", e.target.value, "experience")} className="border p-2 w-full mb-2" placeholder="Start Year" />
            <input type="number" value={exp.endYear} onChange={(e) => handleNestedChange(index, "endYear", e.target.value, "experience")} className="border p-2 w-full mb-2" placeholder="End Year" />
          </div>
        ))}

        {/* Buttons */}
        <div className="mt-4 flex justify-end">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
          <button onClick={onClose} className="ml-2 px-4 py-2 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MentorUpdateForm;
