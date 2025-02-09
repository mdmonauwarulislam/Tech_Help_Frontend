import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LiaSuitcaseSolid } from "react-icons/lia";

const ProfileCard = () => {
  const [sections, setSections] = useState({
    about: false,
    topics: false,
    skills: false,
    fluentIn: false,
    education: false,
    workExperience: false,
  });

  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="bg-white shadow-md border-2 rounded-2xl p-6 mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
          alt="Profile Picture"
          className="rounded-full border-2 border-primary mb-4 h-24 w-24"
        />
        <h1 className="text-xl font-semibold">Yash Patel | <span className="text-gray-700 text-sm font-medium">⭐ 4.8 </span></h1>
        <p className="text-gray-600 text-sm">Strategy Manager @CEO Office</p>
        <p className="text-gray-800 text-[16px] mt-4 font-medium flex items-center gap-2"><LiaSuitcaseSolid className="h-5 w-5 "/>4 years of Experience</p>
        <div className="flex gap-4 mt-4">
          <a href="#" className="p-1 border-2 rounded-2xl">
            <img
          width="40"
          height="40"
          alt="Instagram Icon"
          src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
          loading="lazy"
        />
          </a>
          <a href="#" className="p-1 border-2 rounded-2xl">
          <img
          width="40"
          height="40"
          alt="Linkedin Icon"
          src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000"
          loading="lazy"
        />
          </a>
          <a href="#" className="p-1 border-2 rounded-2xl">
            <img
            width="40"
          height="40"
            alt="X Icon"
            src="https://img.icons8.com/?size=100&id=I1nm8adCioiA&format=png&color=000000"
            loading="lazy"
            />
          </a>
        </div>
        
      </div>

      {/* Collapsible Sections */}
      <div className="mt-6">
        {[
          { key: "about", label: "About" },
          { key: "topics", label: "Topics" },
          { key: "skills", label: "Skills" },
          { key: "fluentIn", label: "Fluent in" },
          { key: "education", label: "Education" },
          { key: "workExperience", label: "Work Experience" },
        ].map((section) => (
          <div key={section.key} className="border-t py-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(section.key)}
            >
              <h2 className="text-[16px] font-medium">{section.label}</h2>
              <span className="text-gray-800">
                {sections[section.key] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
            {sections[section.key] && (
              <div className="mt-2 text-gray-700 text-sm">
                {/* Replace with actual content */}
                This is the {section.label} section content.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
