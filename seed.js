const User = require('./models/User');
const Profile = require('./models/Profile');

const defaultProfile = {
  _dataVersion: '2025-05-15-v1',
  personalInfo: {
    name: 'Manikandan Arumugam',
    title: 'Frontend Developer',
    bio: 'Passionate Frontend Developer with 3+ years of experience building responsive, user-friendly web applications. Skilled in React.js, Next.js, TypeScript, and modern UI frameworks. Committed to delivering clean code, great user experiences, and scalable solutions.',
    email: 'manikeeranur2105@gmail.com',
    phone: '(+91) 74022 72187',
    location: 'Chennai, Tamil Nadu - India',
    website: 'https://www.manikandan.site',
    github: 'https://github.com/manikeeranur',
    linkedin: 'https://www.linkedin.com/in/manikandanarumugam001',
  },
  profileImage: null,
  skills: [
    { id: 'sk01', name: 'JavaScript',       category: 'Language' },
    { id: 'sk02', name: 'TypeScript',        category: 'Language' },
    { id: 'sk03', name: 'HTML5',             category: 'Language' },
    { id: 'sk04', name: 'CSS3',              category: 'Language' },
    { id: 'sk05', name: 'React Js',          category: 'Frameworks & Libraries' },
    { id: 'sk06', name: 'Next Js',           category: 'Frameworks & Libraries' },
    { id: 'sk07', name: 'Context API',       category: 'State Management' },
    { id: 'sk08', name: 'Redux',             category: 'State Management' },
    { id: 'sk09', name: 'Material UI (MUI)', category: 'UI Libraries & Styling' },
    { id: 'sk10', name: 'Tailwind CSS',      category: 'UI Libraries & Styling' },
    { id: 'sk11', name: 'Bootstrap',         category: 'UI Libraries & Styling' },
    { id: 'sk12', name: 'SCSS',              category: 'UI Libraries & Styling' },
    { id: 'sk13', name: 'ShadCN',            category: 'UI Libraries & Styling' },
    { id: 'sk14', name: 'Git',               category: 'Version Control & CI/CD' },
    { id: 'sk15', name: 'GitHub',            category: 'Version Control & CI/CD' },
    { id: 'sk16', name: 'Bitbucket',         category: 'Version Control & CI/CD' },
    { id: 'sk17', name: 'Jenkins',           category: 'Version Control & CI/CD' },
    { id: 'sk18', name: 'Postman',           category: 'Tools & Platforms' },
    { id: 'sk19', name: 'AWS S3',            category: 'Tools & Platforms' },
    { id: 'sk20', name: 'Jira',              category: 'Tools & Platforms' },
    { id: 'sk21', name: 'VS Code',           category: 'Development Tools' },
    { id: 'sk22', name: 'Chrome DevTools',   category: 'Development Tools' },
  ],
  experience: [
    {
      id: 'exp01',
      position: 'Front-End Developer',
      company: 'Genrichers Innovations Private Limited - Chennai',
      startDate: 'Sep 2023',
      endDate: '',
      current: true,
      technology: 'Next.js, TypeScript, Material-UI (MUI), SCSS',
      project: 'Impacteers',
      description:
        'Led frontend development with Next.js, TypeScript, MUI, and Tailwind CSS, ensuring 99% cross-device responsiveness. Built interactive community features for networking and mentorship, boosting user retention by 25%. Developed a real-time resume builder with customizable templates, increasing user engagement by 30%. Integrated skill-based job recommendations, improving application conversions by 20%. Implemented RESTful API integrations for job listings and company profiles, reducing data fetch time by 40%. Optimized global state management using Redux, decreasing unnecessary re-renders and improving app performance by 25%.',
    },
    {
      id: 'exp02',
      position: 'Front-End Developer',
      company: 'Leadtech Solutions Pvt Ltd - Chennai',
      startDate: 'Aug 2021',
      endDate: 'Sep 2023',
      current: false,
      technology: 'HTML5, CSS3, React Js',
      project: 'iFACT – Integrated Freight forwarding, Agency and Cargo (Logistics)',
      description:
        'Led frontend development for integrated freight forwarding solutions, contributing to a 30% improvement in user workflow efficiency. Developed high-performance web applications using React.js, achieving faster load times up to 40%. Collaborated closely with UI/UX teams to build modern, accessible interfaces ensuring WCAG compliance. Integrated RESTful APIs and ensured mobile responsiveness, reducing support tickets by 25%. Enhanced component reusability and managed frontend tasks in logistics and cargo management projects.',
    },
  ],
  education: [
    {
      id: 'edu01',
      degree: 'Master of Computer Applications',
      field: 'MCA',
      institution: 'MIET Arts & Science College, Trichy',
      startDate: '2019',
      endDate: '2021',
      grade: '80%',
    },
    {
      id: 'edu02',
      degree: 'Bachelor of Computer Applications',
      field: 'BCA',
      institution: "H.H.The Rajah's College (Autonomous), Pudukkottai",
      startDate: '2016',
      endDate: '2019',
      grade: '66.57%',
    },
    {
      id: 'edu03',
      degree: 'Higher Secondary Certificate (HSC)',
      field: 'Computer Science',
      institution: 'Punitha Arockia Annai Higher Secondary School, Keeranur',
      startDate: '',
      endDate: '2016',
      grade: '67.09%',
    },
    {
      id: 'edu04',
      degree: 'Secondary School Leaving Certificate (SSLC)',
      field: '',
      institution: 'Punitha Arockia Annai Higher Secondary School, Keeranur',
      startDate: '',
      endDate: '2014',
      grade: '83.04%',
    },
  ],
  techs: [
    { id: 't01', name: 'HTML',         category: 'Frontend Technologies' },
    { id: 't02', name: 'CSS',          category: 'Frontend Technologies' },
    { id: 't03', name: 'JavaScript',   category: 'Frontend Technologies' },
    { id: 't04', name: 'TypeScript',   category: 'Frontend Technologies' },
    { id: 't05', name: 'React Js',     category: 'Frontend Technologies' },
    { id: 't06', name: 'Next Js',      category: 'Frontend Technologies' },
    { id: 't07', name: 'Bootstrap',    category: 'Frontend Technologies' },
    { id: 't08', name: 'SCSS',         category: 'Frontend Technologies' },
    { id: 't09', name: 'MUI',          category: 'Frontend Technologies' },
    { id: 't10', name: 'Tailwind CSS', category: 'Frontend Technologies' },
    { id: 't11', name: 'Redux',        category: 'Frontend Technologies' },
    { id: 't12', name: 'VS Code',      category: 'Tools & Platforms' },
    { id: 't13', name: 'Git',          category: 'Tools & Platforms' },
    { id: 't14', name: 'GitHub',       category: 'Tools & Platforms' },
    { id: 't15', name: 'Jira',         category: 'Tools & Platforms' },
    { id: 't16', name: 'AWS S3',       category: 'Tools & Platforms' },
    { id: 't17', name: 'Postman',      category: 'Tools & Platforms' },
  ],
  projects: [
    {
      id: 'proj01',
      name: 'Impacteers',
      description:
        'A comprehensive career platform featuring a real-time resume builder, interactive community for networking and mentorship, and skill-based job recommendations.',
      technologies: 'Next.js, TypeScript, MUI, SCSS, Redux, Tailwind CSS',
      liveUrl: '',
      githubUrl: '',
      image: null,
    },
    {
      id: 'proj02',
      name: 'Programming Blog for Beginners',
      description:
        'A programming blog designed to help beginners learn web development and programming concepts through beginner-friendly tutorials and articles.',
      technologies: 'Blog, Web Development',
      liveUrl: 'https://blog.manikandan.site/',
      githubUrl: '',
      image: null,
    },
    {
      id: 'proj03',
      name: 'iFACT – Integrated Freight Forwarding',
      description:
        'An integrated freight forwarding, agency, and cargo management system supporting Ocean & Air imports/exports, job generation, invoicing, and reporting.',
      technologies: 'HTML5, CSS3, React Js',
      liveUrl: '',
      githubUrl: '',
      image: null,
    },
  ],
};

module.exports = async function seedDatabase() {
  // Seed admin user if none exists
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create({ username: 'Admin', password: 'Admin@123' });
    console.log('✅ Default admin user created  →  Admin / Admin@123');
  }

  // Seed profile if none exists
  const profileCount = await Profile.countDocuments();
  if (profileCount === 0) {
    await Profile.create(defaultProfile);
    console.log('✅ Profile seeded with default portfolio data');
  }
};
