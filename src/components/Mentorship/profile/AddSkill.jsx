import { useState } from "react";
import axios from "axios";

const AddSkill = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = async () => {
    if (!newSkill) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/mentor/skills`,
        { skill: newSkill },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setSkills([...skills, newSkill]);
      setNewSkill("");
    } catch (error) {
      console.error("Error adding skill", error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Skills</h3>
      <ul>
        {skills.map((skill, idx) => (
          <li key={idx} className="text-gray-600">{skill}</li>
        ))}
      </ul>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="border p-2 rounded flex-grow"
          placeholder="Add a skill"
        />
        <button onClick={addSkill} className="bg-green-500 text-white px-4 py-2 rounded">+</button>
      </div>
    </div>
  );
};

export default AddSkill;
