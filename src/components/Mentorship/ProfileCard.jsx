import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LiaSuitcaseSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";

const ProfileCard = ({ setSelectedSection }) => {
  const { mentorId } = useParams(); // Get mentor ID from URL
  const [mentor, setMentor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState({
    about: false,
    category: false,
    skills: false,
    fluentIn: false,
    education: false,
    experience: false,
    services: false,
    reviews: false,
  });

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const mentorResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/mentor/me/${mentorId}`
        );
        const mentorData = await mentorResponse.json();

        if (mentorData.success) {
          const data = mentorData.data;

          // Parse stringified skills & languages if necessary
          const parsedSkills =
            Array.isArray(data.skills) && data.skills.length > 0
              ? JSON.parse(data.skills[0])
              : [];

          const parsedLanguages =
            Array.isArray(data.languages) && data.languages.length > 0
              ? JSON.parse(data.languages[0])
              : [];

          setMentor({
            ...data,
            skills: parsedSkills,
            language: parsedLanguages,
          });
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [mentorId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!mentor) return <div className="text-center py-10">Mentor not found</div>;

  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
   
      <div className="bg-white shadow-md border-2 rounded-2xl p-6 mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <img
            src={
              mentor.profilePicture
                ? `${import.meta.env.VITE_API_URL}/uploads/${
                    mentor.profilePicture
                  }`
                : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
            }
            className="h-28 w-28 rounded-full border-4 border-white"
            alt="Profile"
          />

          {/* Name & Rating */}
          <h1 className="text-xl font-semibold">
            {mentor.username}
            <br />
            <span className="text-gray-700 text-sm font-medium">
              ⭐ {mentor.rating || "N/A"}
            </span>
          </h1>
          <p className="text-gray-600 text-sm">{mentor.expertise}</p>

          {/* Experience */}
          <p className="text-gray-800 text-[16px] mt-4 font-medium flex items-center gap-2">
            <LiaSuitcaseSolid className="h-5 w-5" /> {mentor.yearofexperience}{" "}
            years of Experience
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            {mentor.socials?.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="p-1 border-2 rounded-2xl"
              >
                <img
                  width="40"
                  height="40"
                  alt={social.name}
                  src={social.icon}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="mt-6">
          {[
            { key: "about", label: "About", content: mentor.about?.join("\n") },
            { key: "category", label: "Category", content: mentor.category },
            {
              key: "skills",
              label: "Skills",
              content: (
                <div className="flex flex-wrap gap-2">
                  {mentor.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ),
            },
            {
              key: "fluentIn",
              label: "Languages",
              content: (
                <div className="flex flex-wrap gap-2">
                  {mentor.language?.map((lang, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ),
            },
          ].map((section) => (
            <div key={section.key} className="border-t py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(section.key)}
              >
                <h2 className="text-[16px] font-medium">{section.label}</h2>
                <span className="text-gray-800">
                  {sections[section.key] ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </div>
              {sections[section.key] && section.content && (
                <div className="mt-2 text-gray-700 text-sm">
                  {section.content}
                </div>
              )}
            </div>
          ))}

          {/* Navigation Links (Only trigger setSelectedSection) */}
          <div className="">
            <div className="flex flex-col gap-4 ">

            {[
              { key: "services", label: "Services" },
              { key: "education", label: "Education" },
              { key: "experience", label: "Experience" },
              
              { key: "reviews", label: "Reviews" },
            ].map((link) => (
              <button
                key={link.key}
                onClick={() => setSelectedSection(link.key)}
                className="w-full text-left text-[16px] font-medium border-t pt-4" 
              >
                {link.label}
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default ProfileCard;
