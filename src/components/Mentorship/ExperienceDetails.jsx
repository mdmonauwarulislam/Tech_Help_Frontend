const ExperienceDetails = ({ experience }) => {
    if (!experience || experience.length === 0) {
      return <div className="text-gray-600 text-sm">No experience data available.</div>;
    }
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
  
        {experience.map((item) => (
          <div
            key={item._id}
            className="p-4 rounded-lg shadow-sm bg-white border border-primary"
          >
            <a
              href={`https://${item.companyLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-black hover:underline"
            >
              {item.companyName}
            </a>
  
            {item.internshipTitle && (
              <p className="text-sm text-gray-700">{item.internshipTitle}</p>
            )}
  
            {(item.startDate || item.endDate) && (
              <p className="text-sm text-gray-500">
                {item.startDate} - {item.currentlyWorking ? "Present" : item.endDate}
              </p>
            )}
  
            {item.location && (
              <p className="text-sm text-gray-500">Location: {item.location}</p>
            )}
  
            {item.internshipType && (
              <p className="text-sm text-gray-500">Type: {item.internshipType}</p>
            )}
  
            {item.skillsUsed && item.skillsUsed.length > 0 && (
              <p className="text-sm text-gray-500">
                Skills: {item.skillsUsed.join(", ")}
              </p>
            )}
  
            {item.projectDetails && item.projectDetails.length > 0 && (
              <div className="text-sm text-gray-500 mt-2">
                <p className="font-semibold text-gray-700">Responsibility:</p>
                <ul className="list-disc list-inside">
                  {item.projectDetails.map((project, index) => (
                    <li key={index}>{project}</li>
                  ))}
                </ul>
              </div>
            )}
  
            {item.certificateLink && (
              <a
                href={item.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline mt-2 block"
              >
                View Certificate
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ExperienceDetails;
  