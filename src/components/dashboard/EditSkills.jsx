/* eslint-disable react/prop-types */

const EditSkills = ({ isSkillFormOpen, onSkillFormClose }) => {

  if (!isSkillFormOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 z-10 max-h-screen overflow-hidden">
       
      </div>
    </div>
  );
};

export default EditSkills;
