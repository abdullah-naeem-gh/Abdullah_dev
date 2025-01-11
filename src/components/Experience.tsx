
export const Experience: React.FC = () => {
    const experience = {
      title: 'MLOps Intern',
      company: 'Mezino Technologies',
      location: 'Lahore',
      period: 'Jun 2024 - Sep 2024',
      achievements: [
        'Developed REST APIs with Node.js and Express, using TypeScript and documented with OpenAPI standards.',
        'Containerized applications using Docker and built CI/CD pipelines with GitHub Actions.',
        'Leveraged vector embeddings and deployed large AI models on GCPs Vertex AI Workbench.',
        'Deployed applications on Google Cloud Run with Cloud SQL and Cloud Storage integration.'
      ]
    };
  
    return (
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-white mb-12">
          <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
              <p className="text-gray-300">{experience.company}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">{experience.period}</p>
              <p className="text-gray-400">{experience.location}</p>
            </div>
          </div>
          
          <ul className="space-y-4">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <span className="text-red-500 mt-1.5">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };