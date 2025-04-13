import React, { useState } from "react";
import {
  Code2,
  Smartphone,
  Database,
  Brain,
  Shield,
  Cloud,
  Link,
  Gamepad,
  Settings,
  PenTool,
  Cpu,
  Atom,
  Glasses,
  Cog,
  X,
} from "lucide-react";

const roadmapData = {
  "Web Development": {
    icon: <Code2 className="w-6 h-6" />,
    color: "bg-blue-500",
    steps: [
      {
        title: "Frontend Fundamentals",
        items: ["HTML", "CSS", "JavaScript", "Git"],
        description: "Master the core technologies of web development",
      },
      {
        title: "Frontend Frameworks",
        items: ["React", "Vue.js", "Angular"],
        description: "Learn modern JavaScript frameworks",
      },
      {
        title: "Backend Development",
        items: ["Node.js", "Python", "Databases"],
        description: "Build server-side applications",
      },
      {
        title: "DevOps & Deployment",
        items: ["Docker", "CI/CD", "Cloud Services"],
        description: "Deploy and maintain web applications",
      },
    ],
  },
  "App Development": {
    icon: <Smartphone className="w-6 h-6" />,
    color: "bg-green-500",
    steps: [
      {
        title: "Mobile Basics",
        items: ["Java/Kotlin", "Swift", "Mobile UI/UX"],
        description: "Learn platform-specific development",
      },
      {
        title: "Cross-Platform",
        items: ["React Native", "Flutter", "Ionic"],
        description: "Build apps for multiple platforms",
      },
      {
        title: "App Architecture",
        items: ["State Management", "APIs", "Local Storage"],
        description: "Structure your mobile applications",
      },
      {
        title: "Publishing",
        items: ["App Store", "Play Store", "Testing"],
        description: "Launch your apps to the world",
      },
    ],
  },
  "Data Science": {
    icon: <Database className="w-6 h-6" />,
    color: "bg-purple-500",
    steps: [
      {
        title: "Mathematics",
        items: ["Statistics", "Linear Algebra", "Calculus"],
        description: "Build your mathematical foundation",
      },
      {
        title: "Programming",
        items: ["Python", "R", "SQL"],
        description: "Learn essential programming tools",
      },
      {
        title: "Machine Learning",
        items: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Deep Learning",
        ],
        description: "Master ML algorithms and techniques",
      },
      {
        title: "Big Data",
        items: ["Hadoop", "Spark", "Data Visualization"],
        description: "Work with large-scale data",
      },
    ],
  },
  "AI/ML": {
    icon: <Brain className="w-6 h-6" />,
    color: "bg-red-500",
    steps: [
      {
        title: "Foundations",
        items: ["Python", "Mathematics", "Neural Networks"],
        description: "Learn the basics of AI and ML",
      },
      {
        title: "Deep Learning",
        items: ["TensorFlow", "PyTorch", "Computer Vision"],
        description: "Master deep learning frameworks",
      },
      {
        title: "Natural Language",
        items: ["NLP", "Transformers", "BERT"],
        description: "Work with text and language",
      },
      {
        title: "Advanced Topics",
        items: ["Reinforcement Learning", "GANs", "MLOps"],
        description: "Explore cutting-edge AI concepts",
      },
    ],
  },
  Cybersecurity: {
    icon: <Shield className="w-6 h-6" />,
    color: "bg-yellow-500",
    steps: [
      {
        title: "Fundamentals",
        items: ["Networking", "Operating Systems", "Cryptography"],
        description: "Understand the basics of cybersecurity",
      },
      {
        title: "Threat Analysis",
        items: [
          "Penetration Testing",
          "Vulnerability Scanning",
          "Malware Analysis",
        ],
        description: "Learn to identify and analyze threats",
      },
      {
        title: "Defense Strategies",
        items: ["Firewalls", "Intrusion Detection", "Security Policies"],
        description: "Implement security measures to protect systems",
      },
      {
        title: "Advanced Topics",
        items: ["Ethical Hacking", "Forensics", "Zero Trust Architecture"],
        description: "Explore advanced cybersecurity concepts",
      },
    ],
  },
  "Cloud Computing": {
    icon: <Cloud className="w-6 h-6" />,
    color: "bg-indigo-500",
    steps: [
      {
        title: "Cloud Basics",
        items: ["AWS", "Azure", "Google Cloud"],
        description: "Learn the fundamentals of cloud platforms",
      },
      {
        title: "Infrastructure as Code",
        items: ["Terraform", "CloudFormation", "Ansible"],
        description: "Automate cloud infrastructure deployment",
      },
      {
        title: "Cloud Security",
        items: ["IAM", "Encryption", "Compliance"],
        description: "Secure cloud environments",
      },
      {
        title: "Serverless & Microservices",
        items: ["Lambda", "Kubernetes", "Docker"],
        description: "Build scalable cloud applications",
      },
    ],
  },
  Blockchain: {
    icon: <Link className="w-6 h-6" />,
    color: "bg-teal-500",
    steps: [
      {
        title: "Blockchain Basics",
        items: ["Cryptography", "Distributed Ledger", "Consensus Algorithms"],
        description: "Understand the fundamentals of blockchain",
      },
      {
        title: "Smart Contracts",
        items: ["Solidity", "Ethereum", "DApps"],
        description: "Learn to build decentralized applications",
      },
      {
        title: "Blockchain Platforms",
        items: ["Hyperledger", "Binance Smart Chain", "Polkadot"],
        description: "Explore different blockchain ecosystems",
      },
      {
        title: "Advanced Concepts",
        items: ["Tokenomics", "DeFi", "NFTs"],
        description: "Dive into advanced blockchain topics",
      },
    ],
  },
  "Game Development": {
    icon: <Gamepad className="w-6 h-6" />,
    color: "bg-pink-500",
    steps: [
      {
        title: "Game Design",
        items: ["Game Mechanics", "Level Design", "Storytelling"],
        description: "Learn the basics of game design",
      },
      {
        title: "Game Engines",
        items: ["Unity", "Unreal Engine", "Godot"],
        description: "Master popular game development tools",
      },
      {
        title: "Graphics & Animation",
        items: ["3D Modeling", "Shaders", "Rigging"],
        description: "Create stunning visuals for games",
      },
      {
        title: "Publishing",
        items: ["Game Testing", "Monetization", "Marketing"],
        description: "Launch your game to the world",
      },
    ],
  },
  DevOps: {
    icon: <Settings className="w-6 h-6" />,
    color: "bg-orange-500",
    steps: [
      {
        title: "CI/CD Pipelines",
        items: ["Jenkins", "GitLab CI", "GitHub Actions"],
        description: "Automate software delivery",
      },
      {
        title: "Infrastructure Management",
        items: ["Terraform", "Ansible", "Puppet"],
        description: "Manage infrastructure as code",
      },
      {
        title: "Monitoring & Logging",
        items: ["Prometheus", "Grafana", "ELK Stack"],
        description: "Monitor and troubleshoot systems",
      },
      {
        title: "Cloud-Native DevOps",
        items: ["Kubernetes", "Docker", "Serverless"],
        description: "Adopt cloud-native practices",
      },
    ],
  },
  "UI/UX Design": {
    icon: <PenTool className="w-6 h-6" />,
    color: "bg-cyan-500",
    steps: [
      {
        title: "Design Principles",
        items: ["Typography", "Color Theory", "Grid Systems"],
        description: "Master the fundamentals of design",
      },
      {
        title: "Wireframing & Prototyping",
        items: ["Figma", "Sketch", "Adobe XD"],
        description: "Create user interfaces and prototypes",
      },
      {
        title: "User Research",
        items: ["Personas", "Usability Testing", "Surveys"],
        description: "Understand user needs and behaviors",
      },
      {
        title: "Advanced Design",
        items: ["Motion Design", "Design Systems", "Accessibility"],
        description: "Elevate your design skills",
      },
    ],
  },
  "Internet of Things (IoT)": {
    icon: <Cpu className="w-6 h-6" />,
    color: "bg-lime-500",
    steps: [
      {
        title: "IoT Basics",
        items: ["Sensors", "Microcontrollers", "Networking"],
        description: "Learn the fundamentals of IoT",
      },
      {
        title: "IoT Platforms",
        items: ["Arduino", "Raspberry Pi", "ESP32"],
        description: "Work with popular IoT hardware",
      },
      {
        title: "Data Management",
        items: ["MQTT", "Cloud Integration", "Edge Computing"],
        description: "Handle IoT data efficiently",
      },
      {
        title: "Advanced IoT",
        items: ["AI in IoT", "Security", "Industrial IoT"],
        description: "Explore advanced IoT applications",
      },
    ],
  },
  "Quantum Computing": {
    icon: <Atom className="w-6 h-6" />,
    color: "bg-gray-500",
    steps: [
      {
        title: "Quantum Basics",
        items: ["Qubits", "Superposition", "Entanglement"],
        description: "Understand the principles of quantum computing",
      },
      {
        title: "Quantum Algorithms",
        items: ["Shor's Algorithm", "Grover's Algorithm", "Quantum Gates"],
        description: "Learn quantum computing algorithms",
      },
      {
        title: "Quantum Programming",
        items: ["Qiskit", "Cirq", "Quantum SDKs"],
        description: "Write programs for quantum computers",
      },
      {
        title: "Advanced Topics",
        items: [
          "Quantum Error Correction",
          "Quantum Cryptography",
          "Quantum Simulation",
        ],
        description: "Dive into advanced quantum concepts",
      },
    ],
  },
  "Augmented Reality (AR)": {
    icon: <Glasses className="w-6 h-6" />,
    color: "bg-amber-500",
    steps: [
      {
        title: "AR Basics",
        items: ["3D Modeling", "Tracking", "Rendering"],
        description: "Learn the fundamentals of AR",
      },
      {
        title: "AR Development",
        items: ["ARKit", "ARCore", "Unity AR"],
        description: "Build AR applications",
      },
      {
        title: "User Interaction",
        items: ["Gesture Recognition", "Spatial Audio", "Haptic Feedback"],
        description: "Enhance user experience in AR",
      },
      {
        title: "Advanced AR",
        items: ["Mixed Reality", "AR Cloud", "AI in AR"],
        description: "Explore cutting-edge AR technologies",
      },
    ],
  },
  Robotics: {
    icon: <Cog className="w-6 h-6" />,
    color: "bg-red-500",
    steps: [
      {
        title: "Robotics Basics",
        items: ["Mechanics", "Electronics", "Control Systems"],
        description: "Understand the fundamentals of robotics",
      },
      {
        title: "Programming Robots",
        items: ["ROS", "Python", "C++"],
        description: "Write code to control robots",
      },
      {
        title: "Sensors & Actuators",
        items: ["LIDAR", "Cameras", "Servo Motors"],
        description: "Work with robotics hardware",
      },
      {
        title: "Advanced Robotics",
        items: ["Autonomous Navigation", "AI in Robotics", "Swarm Robotics"],
        description: "Explore advanced robotics concepts",
      },
    ],
  },
};

const Modal = ({ isOpen, onClose, path, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="relative inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <div className={`${data.color} p-2 rounded-lg`}>{data.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900">{path}</h3>
            </div>
          </div>

          <div className="grid gap-8">
            {data.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div
                    className={`${data.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {index < data.steps.length - 1 && (
                  <div className="absolute left-5 top-16 bottom-0 w-[1px] bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Roadmap = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  const handlePathSelect = (path) => {
    setSelectedPath(path);
  };

  const handleCloseModal = () => {
    setSelectedPath(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Technology Roadmaps
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Choose your learning path and follow our detailed roadmap to success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.keys(roadmapData).map((path) => (
            <button
              key={path}
              onClick={() => handlePathSelect(path)}
              className="p-6 rounded-lg transition-all bg-white hover:shadow-lg hover:scale-105 group"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`${roadmapData[path].color} p-2 rounded-lg text-white`}
                >
                  {roadmapData[path].icon}
                </div>
                <span className="font-semibold text-gray-900 group-hover:text-gray-600">
                  {path}
                </span>
              </div>
            </button>
          ))}
        </div>

        <Modal
          isOpen={selectedPath !== null}
          onClose={handleCloseModal}
          path={selectedPath}
          data={selectedPath ? roadmapData[selectedPath] : null}
        />
      </div>
    </div>
  );
};

export default Roadmap;
