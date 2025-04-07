const EducationDetails = ({ education }) => {
    // Access first item if education is an array
    const edu = Array.isArray(education) && education.length > 0 ? education[0] : null;
  
    if (!edu || (!edu.college?.length && !edu.school?.length)) {
      return <div className="text-gray-600 text-sm">No education data available.</div>;
    }
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Education</h2>
  
        {/* Render college education */}
        {edu.college && edu.college.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-primary">College:</h3>
            {edu.college.map((college, idx) => (
              <div key={idx} className="bg-white border border-primary p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-black text-2xl">{college.collegeName}</p>
                {college.fieldOfStudy && <p className="text-sm text-gray-700">{college.fieldOfStudy}</p>}
                {(college.startYear || college.endYear) && (
                  <p className="text-sm text-gray-500">
                    {college.startYear} - {college.endYear}
                  </p>
                )}
                {college.grade && <p className="text-sm text-gray-500">Grade: {college.grade}</p>}
              </div>
            ))}
          </div>
        )}
  
        {/* Render school education */}
        {edu.school && edu.school.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-primary">School:</h3>
            {edu.school.map((school, idx) => (
              <div key={idx} className="bg-white border border-primary p-4 rounded-lg shadow-sm">
                <p className="font-medium text-lg">{school.schoolName}</p>
                {school.fieldOfStudy && <p className="text-sm text-gray-700">{school.fieldOfStudy}</p>}
                {(school.startYear || school.endYear) && (
                  <p className="text-sm text-gray-500">
                    {school.startYear} - {school.endYear}
                  </p>
                )}
                {school.grade && <p className="text-sm text-gray-500">Grade: {school.grade}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default EducationDetails;
  