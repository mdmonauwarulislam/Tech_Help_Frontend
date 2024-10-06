import { useState } from "react";
import profile from "../../assets/profile.webp";
import AddNewEducationDetails from "../../components/dashboard/AddNewEducationDetails";
import AddProjectDetails from "../../components/dashboard/AddProjectDetails";
import AddResponsibilityDeatils from "../../components/dashboard/AddResponsibilityDeatils";
import AddExperienceDeatils from "../../components/dashboard/AddExperienceDeatils";
import AddAchievement from "../../components/dashboard/AddAchievement";
import AddCertifications from "../../components/dashboard/AddCertifications";
import EducationList from "../../components/dashboard/EducationList";
import ProjectList from "../../components/dashboard/ProjectList";

function UserDashboard() {
  const [activeLink, setActiveLink] = useState("Education");

  const links = [
    "Education",
    "Projects",
    "Position of Responsibility",
    "Work Experience",
    "Achievements",
    "Certifications",
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="mx-auto  flex p-10 gap-8">
      <div className="w-8/12">
        <div className="border-2 rounded-xl">
          <div className="">
            <div className="flex px-10 pt-10 items-center pb-5 justify-between">
              <div className="flex gap-10 ">
                <div>
                  <img
                    src={profile}
                    className="h-20 w-20 rounded-full border-4 border-white"
                    alt=""
                  />
                </div>
                <div className="">
                  <h1 className="text-2xl font-semibold">Username</h1>
                  <p className="text-[18px]">Role</p>
                  <p className="text-[16px]">
                    university <span>passout year</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-4 font-semibold py-2 bg-primary rounded text-white">
                  Edit
                </button>
                <button className="px-4 font-semibold py-2 bg-primary rounded text-white">
                  Your resume
                </button>
              </div>
            </div>
            <div className="flex justify-between px-10 ">
              {links.map((link) => (
                <p
                  key={link}
                  className={`cursor-pointer ${
                    activeLink === link
                      ? "text-techBlue-500 border-b-2 border-techBlue-500 py-5"
                      : "hover:text-techBlue-500 hover:border-b-2 py-5 hover:border-techBlue-500"
                  }`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </p>
              ))}
            </div>
          </div>
        </div>
        {activeLink === "Education" && (
          <div>
            <div className="py-4">
              <AddNewEducationDetails />
            </div>
            <div className="py-4">
              <EducationList />
            </div>
          </div>
        )}
        {activeLink === "Projects" && (
          <div>
            <div className="py-4">
              <AddProjectDetails/>
            </div>
            <div className="py-4">
              <ProjectList/>
            </div>
          </div>
        )}
        {activeLink === "Position of Responsibility" && (
          <div>
          <div className="py-4">
            <AddResponsibilityDeatils/>
          </div>
        </div>
        )}
        {activeLink === "Work Experience" && (
          <div>
          <div className="py-4">
            <AddExperienceDeatils/>
          </div>
        </div>
        )}
        {activeLink === "Achievements" && (
         <div>
         <div className="py-4">
           <AddAchievement/>
         </div>
       </div>
        )}
        {activeLink === "Certifications" && (
          <div>
          <div className="py-4">
            <AddCertifications/>
          </div>
        </div>
        )}
      </div>

      <div className="w-4/12 ">
        <div className="border-2 rounded-xl h-10"></div>
      </div>
    </div>
  );
}

export default UserDashboard;
