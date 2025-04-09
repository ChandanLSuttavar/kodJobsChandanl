// Job Listings Data
const jobsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "New York, NY",
        salary: "$120,000 - $160,000",
        type: "Full-time",
        description: "Looking for an experienced Frontend Developer with React, TypeScript, and state management expertise."
    },
    {
        id: 2,
        title: "Machine Learning Engineer",
        company: "AI Solutions",
        location: "San Francisco, CA",
        salary: "$150,000 - $200,000",
        type: "Full-time",
        description: "Join our AI team to develop cutting-edge ML models and algorithms."
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "Creative Labs",
        location: "Remote",
        salary: "$90,000 - $120,000",
        type: "Full-time",
        description: "Create beautiful and intuitive user interfaces for our products."
    },
    {
        id: 4,
        title: "DevOps Engineer",
        company: "CloudTech",
        location: "Seattle, WA",
        salary: "$130,000 - $170,000",
        type: "Full-time",
        description: "Manage our cloud infrastructure and CI/CD pipelines."
    },
    {
        id: 5,
        title: "Product Manager",
        company: "InnovateCo",
        location: "Boston, MA",
        salary: "$110,000 - $150,000",
        type: "Full-time",
        description: "Lead product strategy and development for our main product line."
    },
    {
        id: 6,
        title: "Data Scientist",
        company: "DataCorp",
        location: "Remote",
        salary: "$100,000 - $140,000",
        type: "Contract",
        description: "Analyze complex datasets and create predictive models."
    },
    {
        id: 7,
        title: "Backend Developer",
        company: "ServerPro",
        location: "Austin, TX",
        salary: "$95,000 - $135,000",
        type: "Full-time",
        description: "Build scalable backend services using Node.js and PostgreSQL."
    },
    {
        id: 8,
        title: "Mobile App Developer",
        company: "AppWorks",
        location: "Los Angeles, CA",
        salary: "$100,000 - $140,000",
        type: "Full-time",
        description: "Develop mobile applications for iOS and Android platforms."
    },
    {
        id: 9,
        title: "Security Engineer",
        company: "SecureNet",
        location: "Washington, DC",
        salary: "$130,000 - $180,000",
        type: "Full-time",
        description: "Implement and maintain security protocols for our infrastructure."
    },
    {
        id: 10,
        title: "Technical Writer",
        company: "DocuTech",
        location: "Remote",
        salary: "$70,000 - $90,000",
        type: "Part-time",
        description: "Create technical documentation and user guides."
    },
    {
        id: 11,
        title: "QA Engineer",
        company: "QualityFirst",
        location: "Chicago, IL",
        salary: "$80,000 - $110,000",
        type: "Full-time",
        description: "Ensure software quality through automated and manual testing."
    },
    {
        id: 12,
        title: "Blockchain Developer",
        company: "CryptoTech",
        location: "Miami, FL",
        salary: "$140,000 - $190,000",
        type: "Full-time",
        description: "Develop blockchain solutions and smart contracts."
    },
    {
        id: 13,
        title: "Systems Architect",
        company: "ArchSolutions",
        location: "Denver, CO",
        salary: "$160,000 - $200,000",
        type: "Full-time",
        description: "Design and implement enterprise-level system architecture."
    },
    {
        id: 14,
        title: "Data Engineer",
        company: "DataFlow",
        location: "Portland, OR",
        salary: "$115,000 - $155,000",
        type: "Full-time",
        description: "Build and maintain data pipelines and warehouses."
    },
    {
        id: 15,
        title: "Frontend Developer",
        company: "WebPro",
        location: "Remote",
        salary: "$85,000 - $120,000",
        type: "Contract",
        description: "Create responsive web applications using modern frameworks."
    },
    {
        id: 16,
        title: "Cloud Solutions Architect",
        company: "CloudArch",
        location: "Atlanta, GA",
        salary: "$140,000 - $180,000",
        type: "Full-time",
        description: "Design and implement cloud-based solutions."
    },
    {
        id: 17,
        title: "AR/VR Developer",
        company: "VirtualTech",
        location: "San Diego, CA",
        salary: "$110,000 - $150,000",
        type: "Full-time",
        description: "Create immersive AR/VR experiences and applications."
    },
    {
        id: 18,
        title: "Technical Project Manager",
        company: "ProjectPro",
        location: "Philadelphia, PA",
        salary: "$100,000 - $140,000",
        type: "Full-time",
        description: "Lead technical projects and development teams."
    },
    {
        id: 19,
        title: "Database Administrator",
        company: "DataSafe",
        location: "Houston, TX",
        salary: "$95,000 - $135,000",
        type: "Full-time",
        description: "Manage and optimize database systems."
    },
    {
        id: 20,
        title: "Full Stack Developer",
        company: "StackTech",
        location: "Remote",
        salary: "$110,000 - $150,000",
        type: "Full-time",
        description: "Develop full-stack web applications using modern technologies."
    },
    {
        id: 21,
        title: "AI Research Scientist",
        company: "AILabs",
        location: "Cambridge, MA",
        salary: "$160,000 - $220,000",
        type: "Full-time",
        description: "Conduct research in artificial intelligence and machine learning."
    },
    {
        id: 22,
        title: "Network Engineer",
        company: "NetWorks",
        location: "Dallas, TX",
        salary: "$90,000 - $130,000",
        type: "Full-time",
        description: "Design and maintain network infrastructure."
    },
    {
        id: 23,
        title: "Game Developer",
        company: "GameStudios",
        location: "Seattle, WA",
        salary: "$95,000 - $135,000",
        type: "Full-time",
        description: "Create engaging gaming experiences using Unity or Unreal Engine."
    },
    {
        id: 24,
        title: "IT Support Specialist",
        company: "TechSupport",
        location: "Remote",
        salary: "$55,000 - $75,000",
        type: "Full-time",
        description: "Provide technical support and troubleshooting."
    },
    {
        id: 25,
        title: "Software Architect",
        company: "ArchTech",
        location: "San Jose, CA",
        salary: "$170,000 - $220,000",
        type: "Full-time",
        description: "Design and oversee software architecture for enterprise applications."
    },
    {
        id: 26,
        title: "Business Intelligence Analyst",
        company: "DataInsights",
        location: "Chicago, IL",
        salary: "$85,000 - $115,000",
        type: "Full-time",
        description: "Analyze business data and create insightful reports."
    },
    {
        id: 27,
        title: "Embedded Systems Engineer",
        company: "IoTech",
        location: "Phoenix, AZ",
        salary: "$100,000 - $140,000",
        type: "Full-time",
        description: "Develop software for embedded systems and IoT devices."
    },
    {
        id: 28,
        title: "UX Researcher",
        company: "UserFirst",
        location: "Remote",
        salary: "$90,000 - $120,000",
        type: "Contract",
        description: "Conduct user research and usability studies."
    },
    {
        id: 29,
        title: "Site Reliability Engineer",
        company: "ReliableTech",
        location: "New York, NY",
        salary: "$130,000 - $170,000",
        type: "Full-time",
        description: "Ensure system reliability and performance."
    },
    {
        id: 30,
        title: "Automation Engineer",
        company: "AutomatePro",
        location: "Detroit, MI",
        salary: "$95,000 - $135,000",
        type: "Full-time",
        description: "Develop and maintain automation frameworks."
    },
    {
        id: 31,
        title: "Cloud Security Engineer",
        company: "SecureCloud",
        location: "Remote",
        salary: "$140,000 - $180,000",
        type: "Full-time",
        description: "Implement security measures for cloud infrastructure."
    },
    {
        id: 32,
        title: "Mobile Game Developer",
        company: "MobileGames",
        location: "Los Angeles, CA",
        salary: "$100,000 - $140,000",
        type: "Full-time",
        description: "Create mobile games using Unity and native platforms."
    },
    {
        id: 33,
        title: "Data Privacy Officer",
        company: "PrivacyGuard",
        location: "Washington, DC",
        salary: "$120,000 - $160,000",
        type: "Full-time",
        description: "Ensure compliance with data privacy regulations."
    },
    {
        id: 34,
        title: "3D Graphics Developer",
        company: "Graphics3D",
        location: "Austin, TX",
        salary: "$95,000 - $135,000",
        type: "Full-time",
        description: "Develop 3D graphics and visualization solutions."
    },
    {
        id: 35,
        title: "Performance Engineer",
        company: "OptimizePro",
        location: "Seattle, WA",
        salary: "$115,000 - $155,000",
        type: "Full-time",
        description: "Optimize application performance and scalability."
    },
    {
        id: 36,
        title: "Technical Consultant",
        company: "ConsultTech",
        location: "Remote",
        salary: "$100,000 - $150,000",
        type: "Contract",
        description: "Provide technical consulting services to clients."
    },
    {
        id: 37,
        title: "Ruby on Rails Developer",
        company: "RailsPro",
        location: "Portland, OR",
        salary: "$90,000 - $130,000",
        type: "Full-time",
        description: "Develop web applications using Ruby on Rails."
    },
    {
        id: 38,
        title: "Quantum Computing Researcher",
        company: "QuantumTech",
        location: "Boston, MA",
        salary: "$180,000 - $250,000",
        type: "Full-time",
        description: "Research and develop quantum computing applications."
    },
    {
        id: 39,
        title: "DevSecOps Engineer",
        company: "SecureOps",
        location: "San Francisco, CA",
        salary: "$140,000 - $180,000",
        type: "Full-time",
        description: "Implement security practices in DevOps processes."
    },
    {
        id: 40,
        title: "Digital Marketing Developer",
        company: "MarketTech",
        location: "Remote",
        salary: "$80,000 - $110,000",
        type: "Full-time",
        description: "Develop tools and systems for digital marketing campaigns."
    },
    {
        id: 41,
        title: "Robotics Engineer",
        company: "RoboTech",
        location: "Pittsburgh, PA",
        salary: "$130,000 - $170,000",
        type: "Full-time",
        description: "Design and develop robotic systems and controls."
    },
    {
        id: 42,
        title: "Salesforce Developer",
        company: "CloudForce",
        location: "Chicago, IL",
        salary: "$95,000 - $135,000",
        type: "Full-time",
        description: "Develop and maintain Salesforce applications."
    }
];

// Export the data
window.jobsData = jobsData;
