import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MentorCard from "../components/Mentorship/MentorCard";

const categories = ["All", "Business", "Technology", "Health", "Arts"];

const MentorshipPage = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/mentor/me`);
        setMentors(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors =
    selectedCategory === "All"
      ? mentors
      : mentors.filter((mentor) => mentor.category === selectedCategory);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-semibold text-center mt-3">Top Mentors</h1>

      {/* Category Filter */}
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Mentor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMentors.map((mentor) => (
          <MentorCard
            key={mentor._id}
            mentor={mentor}
            onClick={() => navigate(`/mentor/${mentor._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MentorshipPage;
