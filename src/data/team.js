/**
 * Single source of truth for the site.
 *
 * Every field below is taken directly from the five resumes in ../../Team_resume.
 * Nothing here is invented. Roles and one-line descriptors are condensed from each
 * person's own summary, projects and experience — no fabricated quotes, titles,
 * employers, metrics or credentials. If a resume did not state something
 * (a year, a link, a grade) the field is simply omitted.
 *
 * To update a member, edit their entry. Stats elsewhere in the site are derived
 * from this file at runtime, so they can never drift out of sync.
 */

import chithsukhiPortrait from "../assets/team/chithsukhi.webp";
import preranPortrait from "../assets/team/preran.webp";
import shamanthPortrait from "../assets/team/shamanth.webp";
import shashankPortrait from "../assets/team/shashank.webp";
import shreyaPortrait from "../assets/team/shreya.webp";

/** Editable team identity. */
export const siteConfig = {
  teamName: "TEAM VERIS",
  shortName: "VERIS",
  statement: "WE BUILD. WE VERIFY. WE SHIP.",
  location: "Mysuru, Karnataka",
  intro: "Five engineers. Machine learning, retrieval, backend, product.",
};



export const members = [
  {
    id: "preran",
    index: "01",
    name: "Preran S Gowda",
    firstName: "Preran",
    role: "Machine Learning & Backend",
    accent: "#E9B44C",
    portrait: preranPortrait,
    tagline:
      "Builds ML pipelines and backend systems with verification and audit trails designed in from the start.",
    summary:
      "Final-year B.E. Computer Science (AI/ML) student with hands-on experience in machine learning, backend engineering and rapid prototyping. Five national and international hackathon placements, including runner-up at TiE U 2024.",
    focus: ["Machine Learning", "Backend", "RAG & Agents"],
    education: [
      {
        institution: "Vidyavardhaka College of Engineering",
        qualification: "B.E. Computer Science (AI & ML)",
        detail: "CGPA 8.1",
        year: "Expected 2027",
      },
    ],
    skills: [
      "Python",
      "Java",
      "C",
      "PyTorch",
      "Scikit-learn",
      "XGBoost",
      "statsmodels",
      "NumPy",
      "Pandas",
      "spaCy",
      "Reinforcement Learning",
      "FastAPI",
      "Flask",
      "React",
      "LangGraph",
      "RAG",
      "Ollama",
      "Pydantic",
      "Docker",
      "Docker Compose",
      "Git",
      "Google Cloud Platform",
      "REST APIs",
      "Pytest",
      "Playwright",
      "Neo4j",
      "Qdrant",
      "PostgreSQL",
    ],
    projects: [
      {
        name: "RDTII-AEGIS",
        subtitle: "Autonomous Regulatory Evidence Mapping",
        context: "UN ESCAP RegTech Hackathon 2026",
        description:
          "End-to-end RegTech pipeline that crawls live government law portals with Playwright, extracts clauses from native and scanned PDFs, and maps provisions to the 44-indicator UN RDTII framework across 3 jurisdictions and 25 statutes. Five-layer anti-hallucination framework — verbatim locking via edit distance, dual-path verification, authority gating — with mandatory human sign-off through a React audit UI. Local-only LLM inference over a Neo4j and Qdrant evidence graph.",
        metrics: ["70 modules", "98% return-type coverage", "593 tests", "68 property-based"],
        link: "https://github.com/Pythonpreran/TEAM-RDTII-AEGIS-ESCAP-RegTech",
      },
      {
        name: "ICU Drug Titration Environment",
        subtitle: "Reinforcement Learning Benchmark",
        context: "Scaler Meta Hackathon, Meta OpenEnv",
        description:
          "OpenEnv-compliant reinforcement-learning environment for ICU drug titration. Deterministic physiology engine with cross-drug interaction modelling across 6 drugs, 5 vitals and 4 labs, bit-reproducible across runs, with dense reward shaping and deterministic graders across 3 difficulty tiers. Exposed via a FastAPI REST API with an LLM agent harness.",
        metrics: ["32-test suite", "Top 800 of 53,000+ teams"],
      },
      {
        name: "ChargeSmart",
        subtitle: "EV Charging & Route Planning",
        context: "Infosys Global Hackathon",
        description:
          "Full-stack EV platform in React and TypeScript for station discovery, slot booking and route planning with optimised charging stops. Charging-demand model trained on a real 247-station dataset of 137k rows predicting next-hour occupancy.",
        metrics: ["MAE 0.023", "64% better than daily-naive", "99.6% busy-state accuracy"],
      },
    ],
    achievements: [
      {
        event: "TiE U Global Hackathon",
        result: "Runner-up",
        year: "2024",
        note: "Selected from 1,300+ participants. Invited to the TiE Global Summit 2024.",
        type: "competition",
        headline: true,
      },
      {
        event: "Skillathon, Bengaluru Skill Summit",
        result: "Runner-up",
        year: "2025",
        note: "From 250+ teams. Received the Kaushalya Karnataka Award from the Minister for Entrepreneurship.",
        type: "competition",
      },
      {
        event: "Infosys Global Hackathon",
        result: "Grand Finalist",
        year: "2025",
        note: "Top 33 of 1,900+ teams. Only student team from the Infosys Mysuru Development Center.",
        type: "competition",
      },
      {
        event: "Meta OpenEnv Hackathon",
        result: "Finalist",
        year: "2026",
        note: "Reinforcement learning track. Top 800 of 53,000+ teams.",
        type: "competition",
      },
      {
        event: "UN ESCAP RegTech Hackathon",
        result: "Competed",
        year: "2026",
        note: "International digital-trade regulation challenge, UNCAP Bangkok. Built and open-sourced RDTII-AEGIS under Apache-2.0.",
        type: "programme",
      },
      {
        event: "Best Achiever, CSE (AIML), VVCE",
        result: "Co-curricular Award",
        type: "award",
      },
    ],
    certifications: [
      "Machine Learning Specialization — DeepLearning.AI / Stanford",
      "Certificate of Merit — ISRO START Program",
      "Google Cloud Career Launchpad — Data Analytics & Cloud Engineer tracks",
    ],
    interests: ["Derivatives Trading", "Hackathons", "Reading", "Music"],
    links: {
      github: "https://github.com/Pythonpreran",
      linkedin: "https://www.linkedin.com/in/preran-s-gowda-68b975291",
      email: "preransgowda@gmail.com",
    },
  },

  {
    id: "shamanth",
    index: "02",
    name: "Shamanth M S",
    firstName: "Shamanth",
    role: "AI/ML & Full-Stack",
    accent: "#6BA8E5",
    portrait: shamanthPortrait,
    tagline:
      "Works across model and interface — from hybrid reasoning architectures to production frontends.",
    summary:
      "Final-year Computer Science student working in machine learning, generative AI and intelligent systems with Python, TensorFlow, HuggingFace Transformers and FastAPI, alongside production frontend experience.",
    focus: ["Deep Learning", "Generative AI", "Full-Stack"],
    education: [
      {
        institution: "Vidyavardhaka College of Engineering",
        qualification: "B.E. Computer Science & Engineering (AIML)",
        detail: "GPA 8.31/10",
        year: "Expected August 2027",
      },
    ],
    skills: [
      "Python",
      "JavaScript (ES6+)",
      "C",
      "SQL",
      "TensorFlow",
      "Keras",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Hugging Face Transformers",
      "React.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "REST APIs",
      "FastAPI",
      "PostgreSQL",
      "MySQL",
      "Google Cloud Platform",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Git",
      "GitHub Actions",
      "Postman",
    ],
    experience: [
      {
        role: "AI/ML Intern",
        org: "Infosys Springboard, Virtual Internship 6.0",
        period: "Feb 2026 – Apr 2026",
        points: [
          "Automated preprocessing for thousands of records with custom Python scripts, reducing manual data preparation time by ~40%.",
          "Introduced 4+ financial risk features including debt-to-income ratios, improving model interpretability and baseline accuracy.",
          "Established a Logistic Regression baseline achieving 0.88 ROC-AUC and documented the benchmark for future iterations.",
        ],
      },
      {
        role: "Website Developer",
        org: "Eureka Institute",
        period: "Nov 2025 – Jan 2026",
        points: [
          "Built core frontend modules and UI components for a production platform with responsive, accessible layouts.",
          "Optimised page load performance by ~28% through modular restructuring and reduced render cycles.",
          "Shipped weekly feature updates while maintaining a 95% merge acceptance rate across team reviews.",
        ],
      },
      {
        role: "Freelance Web Developer",
        org: "PROFORMA (German client)",
        period: "Oct 2024",
        points: [
          "Delivered a full-scale frontend with 13,000+ lines of custom CSS aligned to enterprise UI standards.",
          "Completed 100% of deliverables on deadline, approved across 4 review cycles.",
        ],
      },
    ],
    projects: [
      {
        name: "Neuro-Symbolic System-2 Reasoning",
        subtitle: "Hallucination Reduction Architecture",
        description:
          "Hybrid LLM and ACT-R reasoning architecture with a symbolic verification layer of 25+ production rules and structured working-memory buffers validating intermediate reasoning steps. Python evaluation framework built on HuggingFace Transformers to measure reasoning consistency.",
        metrics: ["25% lower hallucination rate", "500+ multi-step tasks"],
      },
      {
        name: "InterviewSim",
        subtitle: "AI Interview Rehearsal Simulator",
        description:
          "AI interview platform built with FastAPI, React.js, PostgreSQL and Node.js featuring 10+ career-preparation tools, a 4-metric AI scoring system and an adaptive interview engine, with voice-based interviewing and cross-session performance tracking.",
        metrics: ["10+ tools", "4-metric scoring"],
      },
      {
        name: "AgriPredict",
        subtitle: "Crop Detection & Yield Forecasting",
        context: "Smart India Hackathon project",
        description:
          "End-to-end machine learning platform using TensorFlow, Keras and Scikit-Learn for crop classification and yield prediction, comparing 6+ models and tuning through hyperparameter optimisation and ensembling.",
        metrics: ["90%+ classification accuracy", "20% performance gain"],
      },
    ],
    achievements: [
      {
        event: "TiE U Global Hackathon",
        result: "Runner-Up",
        year: "2024",
        note: "Received a VIP invitation to the TiE Global Summit 2025.",
        type: "competition",
      },
      {
        event: "Eurekathon",
        result: "1st Place",
        year: "2025",
        note: "Coding Track. Led to a Web Developer role at the Eureka Institute.",
        type: "competition",
      },
      {
        event: "Meta OpenEnv Hackathon",
        result: "Finalist",
        year: "2025",
        note: "Top 800 teams out of 30,000+ registrations.",
        type: "competition",
        headline: true,
      },
      {
        event: "Infosys Global Hackathon",
        result: "Finalist",
        year: "2025",
        note: "Top 2 of 32 teams at Mysuru DC. Attended the Grand Finale in Hyderabad.",
        type: "competition",
      },
      {
        event: "HAXLR8 2.0",
        result: "2nd Place",
        note: "24-hour hackathon organised by Maharaja Institute of Technology, Mysuru.",
        type: "competition",
      },
    ],
    certifications: [
      "Salesforce Certified Platform Developer I (2026)",
      "Machine Learning Specialization — DeepLearning.AI & Stanford (2025)",
      "Software Development Lifecycle Specialization — University of Minnesota (2026)",
      "Alibaba Cloud Computing Specialization — Alibaba Cloud Academy (2026)",
      "Google Cloud Career Launchpad — Cloud Engineer (2025) & Data Analytics (2026)",
    ],
    links: {
      github: "https://github.com/MS-Shamanth",
      linkedin: "https://www.linkedin.com/in/ms-shamanth/",
      email: "shamanthms1@gmail.com",
    },
  },

  {
    id: "shreya",
    index: "03",
    name: "Shreya BJ",
    firstName: "Shreya",
    role: "LLM Applications & RAG",
    accent: "#C88BE0",
    portrait: shreyaPortrait,
    tagline:
      "Builds retrieval systems and developer tooling where every generated answer can be traced back to its source.",
    summary:
      "Final-year Information Science undergraduate developing LLM applications, RAG systems and developer productivity tools with Python, LangChain and FastAPI, with experience across internships, hackathons and independent projects.",
    focus: ["LLM Applications", "RAG Pipelines", "Developer Tooling"],
    education: [
      {
        institution: "VidyaVardhaka College of Engineering, Mysuru",
        qualification: "B.E. Information Science & Engineering",
        detail: "GPA 8.52/10",
        year: "Expected 2027",
      },
    ],
    skills: [
      "Python",
      "Java",
      "C",
      "SQL",
      "LLM Applications",
      "RAG",
      "LangChain",
      "FAISS",
      "Sentence Transformers",
      "Pydantic",
      "Node.js",
      "FastAPI",
      "React",
      "Streamlit",
      "HTML5",
      "CSS3",
      "Git",
      "GitHub Actions",
      "Pre-commit Hooks",
    ],
    experience: [
      {
        role: "Campus Ambassador Intern",
        org: "Google Gemini",
        period: "May 2026 – Present",
        points: [
          "Lead campus initiatives on Gemini and generative AI through workshops, outreach and technical sessions on practical LLM applications.",
          "Organise AI-focused events covering prompt engineering, RAG and emerging AI technologies with students, faculty and programme stakeholders.",
        ],
      },
      {
        role: "AI Project Intern",
        org: "Infosys Springboard Virtual Internship",
        period: "Dec 2025 – Feb 2026",
        points: [
          "Developed and tested AST-based Python modules to identify undocumented functions and classes, packaged as a reusable PyPI library.",
          "Automated documentation quality checks with Git pre-commit hooks and GitHub Actions, running validation before code merges.",
          "Built a Streamlit developer interface for real-time documentation reports.",
        ],
      },
    ],
    projects: [
      {
        name: "COSMOS",
        subtitle: "Mythology–Science Alignment Engine",
        context: "Apr 2026 – Present",
        description:
          "RAG-based system that semantically aligns mythological narratives with scientific theories using LangChain, Sentence Transformers, FAISS and Groq-hosted LLMs. Pydantic output validation keeps responses consistent and reduces unsupported claims, with retrieval-to-generation traceability so every comparison can be verified against its source passage.",
        metrics: ["Source-traceable output", "Validated generation"],
      },
      {
        name: "Chrono Weather",
        subtitle: "NASA Analog Forecasting System",
        context: "Sept 2025 – Nov 2025",
        description:
          "Full-stack climate forecasting platform built with React.js, Node.js and 7+ NASA REST APIs, analysing 40+ years of satellite data. Uses a historical analogue approach to identify similar past weather patterns, with source health monitoring and graceful fallbacks when individual NASA sources are unavailable.",
        metrics: ["7+ NASA APIs", "40+ years of data"],
        link: "https://github.com/shreyabj/ChronoWeather",
      },
      {
        name: "Docstring Generator & Validator",
        subtitle: "Developer Productivity Tool",
        context: "Dec 2025 – Feb 2026",
        description:
          "Full-stack tool in React and FastAPI that generates and validates Python docstrings through AST-based static analysis without executing user code. Automates PEP-257 validation via pre-commit hooks and ships as a pip-installable PyPI library with pinned dependencies and automated tests.",
        metrics: ["PEP-257 validation", "Published to PyPI"],
        link: "https://github.com/shreyabj/Automated-Python-Docstring-Generator-Springboard-",
      },
    ],
    achievements: [
      {
        event: "Eurekathon",
        result: "Winner",
        year: "2025",
        note: "Coding Track, for Chrono Weather — an AI-powered weather intelligence platform.",
        type: "competition",
        headline: true,
      },
      {
        event: "Infosys Pragati: Path to Future, Springboard Summit",
        result: "Felicitated",
        year: "2025",
        note: "Recognised for technical aptitude and leadership potential.",
        type: "programme",
      },
    ],
    links: {
      github: "https://github.com/shreyabj",
      linkedin: "http://www.linkedin.com/in/shreyabj",
      email: "shreyabelavatha@gmail.com",
    },
  },

  {
    id: "shashank",
    index: "04",
    name: "Shashank S",
    firstName: "Shashank",
    role: "AI/ML & Product Development",
    accent: "#56C596",
    portrait: shashankPortrait,
    tagline:
      "Turns models into working products, and leads the AI/ML community at VVCE.",
    summary:
      "Final-year CSE (AI & ML) student with internship experience across machine learning, backend systems and XR product development, and Tech Lead of the VectorFlow Club at VVCE.",
    focus: ["Machine Learning", "Computer Vision", "Product Development"],
    education: [
      {
        institution: "Vidyavardhaka College of Engineering, Mysuru",
        qualification: "B.E. Computer Science & Engineering (AI & ML)",
        detail: "CGPA 7.94",
        year: "2023 – 2027",
      },
    ],
    skills: [
      "Python",
      "Java",
      "C/C++",
      "JavaScript",
      "SQL",
      "HTML/CSS",
      "Machine Learning",
      "Reinforcement Learning",
      "Scikit-learn",
      "OpenCV",
      "PyTorch",
      "NLP (TF-IDF)",
      "Git",
      "GitHub",
      "REST APIs",
      "Twilio API",
      "Backend Development",
    ],
    experience: [
      {
        role: "Tech Lead",
        org: "VectorFlow Club, VVCE",
        period: "Present",
        points: [
          "Lead technical initiatives, workshops and hackathons for the AI/ML community at VVCE.",
          "Organising Vibeathon 2026, an inter-college hackathon with Devnovate and HackwithIndia.",
        ],
      },
      {
        role: "Product Developer Intern",
        org: "BodyClone Innovations Pvt. Ltd.",
        period: "Oct 2025 – Feb 2026",
        points: [
          "Worked on problems at the intersection of AI, backend systems and XR technologies.",
          "Designed and implemented backend modules for scalable product-level solutions.",
        ],
      },
      {
        role: "Machine Learning Intern",
        org: "CodSoft",
        period: "Jul 2024 – Aug 2024",
        points: [
          "Built a Spam SMS Detection system using ensemble methods at 98% accuracy.",
          "Created a Customer Churn Prediction model handling imbalanced data at 85% accuracy.",
          "Built a Movie Genre Classifier using TF-IDF and Logistic Regression.",
        ],
      },
    ],
    projects: [
      {
        name: "ChargeSmart",
        subtitle: "EV Charging Platform",
        context: "Infosys Global Hackathon",
        description:
          "Platform helping EV users navigate stations, book charging slots and plan trips efficiently. Represented Mysuru DC at the National Finals.",
      },
      {
        name: "AI Security Alert System",
        subtitle: "Computer Vision",
        description:
          "Detects emergency hand gestures via computer vision with Python, OpenCV and the Twilio API, sending WhatsApp alerts in real time. Background threading keeps performance smooth and non-blocking.",
      },
      {
        name: "AI Wellness Assistant",
        subtitle: "Adaptive Habit Tracking",
        description:
          "AI companion that tracks daily habits and provides personalised wellness guidance with adaptive learning.",
      },
    ],
    achievements: [
      {
        event: "IEEE Computer Society Ideathon",
        result: "1st Place",
        year: "2025",
        note: "Healthcare Innovation track.",
        type: "competition",
        headline: true,
      },
      {
        event: "Skillathon, Bengaluru Skill Summit",
        result: "Runner-up",
        year: "2025",
        note: "Top 15 from 250+ teams.",
        type: "competition",
      },
      {
        event: "Infosys Global Hackathon",
        result: "Grand Finalist",
        year: "2025",
        note: "Only student team from Mysuru DC at the Finals in Hyderabad.",
        type: "competition",
      },
      {
        event: "Meta OpenEnv Hackathon",
        result: "Grand Finalist",
        note: "Selected from 52,000+ developers.",
        type: "competition",
      },
      {
        event: "Best Achiever Award, CSE-AIML, VVCE",
        result: "Award",
        year: "2023–24",
        note: "Second semester.",
        type: "award",
      },
    ],
    links: {
      github: "https://github.com/Shashank-sys-ux",
      linkedin: "https://www.linkedin.com/in/shashank-s-20927b291/",
      email: "shashanksgowda05@gmail.com",
    },
  },

  {
    id: "chithsukhi",
    index: "05",
    name: "Chithsukhi C V",
    firstName: "Chithsukhi",
    role: "Software & Distributed Systems",
    accent: "#EE8A6A",
    portrait: chithsukhiPortrait,
    tagline:
      "Designs distributed systems and teaches others to build, benchmarking for real performance gains.",
    summary:
      "Final-year Computer Science student with experience in software development, distributed systems and AI/ML, and Programming Lead at She Orbits directing STEM and AI project initiatives.",
    focus: ["Distributed Systems", "AI/ML", "Technical Leadership"],
    education: [
      {
        institution: "GSSS Institute of Engineering and Technology for Women, Mysuru",
        qualification: "B.E. Computer Science & Engineering",
        detail: "CGPA 8.89",
        year: "Graduating 2027",
      },
    ],
    skills: ["C", "C++", "Python", "Java (Basics)", "Docker", "MongoDB", "Git", "Flask"],
    experience: [
      {
        role: "Programming Lead & STEM Projects Director",
        org: "She Orbits",
        period: "Sept 2025 – Present",
        points: [
          "Led a foundational Python course across 9 sessions with 40+ global participants.",
          "Directing STEM and AI project initiatives through workshops and cohort-based learning.",
        ],
      },
    ],
    projects: [
      {
        name: "Distributed Sharding System",
        subtitle: "Database Sharding Simulator",
        context: 'Pure Storage "Empower Me" Mentorship Project',
        description:
          "Distributed database sharding simulator built with Flask, Docker and MongoDB, with centralised request routing and four sharding strategies, benchmarked on large datasets.",
        metrics: ["Up to 89% faster query execution"],
        link: "https://github.com/Chithsukhicv/distributed-sharding-system",
      },
      {
        name: "DolFin",
        subtitle: "AI-Guided Investment Learning",
        context: "Major Project",
        description:
          "AI-assisted investment learning platform combining real-time market simulation, intelligent portfolio analysis, behavioural intervention and personalised financial guidance to improve investment decision-making for beginners.",
      },
      {
        name: "Grid-World RL Environment",
        subtitle: "Reinforcement Learning",
        description:
          "Custom grid-world reinforcement-learning environment in Python with Pygame visualisation, where an agent navigates to a goal through a reward structure that penalises obstacles and rewards progress.",
      },
    ],
    achievements: [
      {
        event: "TiE U Pitch Fest",
        result: "Runners-Up",
        year: "2025",
        note: "Ideation Track.",
        type: "competition",
        headline: true,
      },
      {
        event: "Blockchain Technology Competition",
        result: "First Prize",
        type: "competition",
      },
      {
        event: "Linux Quest",
        result: "First Place",
        year: "2024",
        type: "competition",
      },
      {
        event: "Language Fest",
        result: "First Place",
        year: "2024",
        note: "Directed Skit.",
        type: "competition",
      },
    ],
    certifications: [
      "Introduction to Generative AI — Google",
      "Introduction to C Programming — SoloLearn",
      "100 Days of Code in Python — Udemy",
    ],
    extracurricular: [
      "Executive Member, Cybersecurity Club — GSSSIETW",
      "Vice President, Drama Club Roopaka Ranga — GSSSIETW",
      "Delivered a session on Introduction to GenAI & Vertex AI (GDSC initiative)",
    ],
    links: {
      github: "https://github.com/Chithsukhicv",
      linkedin: "https://www.linkedin.com/in/chithsukhicv/",
      email: "chithsukhicv@gmail.com",
    },
  },
];

/**
 * Capability areas. Every technology listed appears in at least one resume, and
 * each area names only the members whose resumes actually support it.
 */
export const expertise = [
  {
    title: "Machine Learning",
    description: "Models built, benchmarked and measured against real baselines.",
    stack: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "OpenCV"],
    members: ["preran", "shamanth", "shashank"],
  },
  {
    title: "LLM & Retrieval",
    description: "RAG pipelines and agents, with answers traceable to their source.",
    stack: ["LangChain", "LangGraph", "FAISS", "Qdrant", "Ollama"],
    members: ["shreya", "preran", "shamanth"],
  },
  {
    title: "Backend & APIs",
    description: "Services, REST APIs and containers, with real test suites.",
    stack: ["FastAPI", "Flask", "Node.js", "Express.js", "Pytest"],
    members: ["preran", "shamanth", "shreya", "shashank", "chithsukhi"],
  },
  {
    title: "Frontend",
    description: "Production interfaces, responsive and measurably fast.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Streamlit"],
    members: ["shamanth", "preran", "shreya"],
  },
  {
    title: "Cloud & DevOps",
    description: "Containers, orchestration and CI gates before merge.",
    stack: ["Google Cloud", "Docker", "Kubernetes", "Jenkins", "GitHub Actions"],
    members: ["shamanth", "preran", "chithsukhi", "shreya"],
  },
  {
    title: "Data & Distributed Systems",
    description: "Relational, document and graph stores. Sharding, benchmarked.",
    stack: ["PostgreSQL", "MongoDB", "Neo4j", "Qdrant", "MySQL"],
    members: ["chithsukhi", "preran", "shamanth"],
  },
];

/* ------------------------------------------------------------------ *
 * Derived values. Computed from the data above so the numbers on the
 * site are always literally counted from the resumes.
 * ------------------------------------------------------------------ */

/** The five member accents in order, for gradients and section colour. */
export const palette = members.map((m) => m.accent);

/** Unique technologies named across all five resumes. */
export const allTechnologies = [...new Set(members.flatMap((m) => m.skills))].sort((a, b) =>
  a.localeCompare(b),
);

/** Every project entry listed across the team. */
export const allProjects = members.flatMap((m) =>
  m.projects.map((p) => ({ ...p, memberId: m.id, memberName: m.name })),
);

/** Every achievement entry, flattened, tagged with who earned it. */
export const allAchievements = members.flatMap((m) =>
  m.achievements.map((a) => ({
    ...a,
    memberId: m.id,
    memberName: m.name,
    memberFirstName: m.firstName,
    accent: m.accent,
    index: m.index,
  })),
);

/**
 * One standout result per person, in member order — five rows, five people,
 * five different events. Exactly one achievement per member carries
 * `headline: true`, which scripts/verify-data.mjs asserts.
 */
export const headlineAchievements = members.map((m) => {
  const pick = m.achievements.find((a) => a.headline) ?? m.achievements[0];

  // Whoever else lists this same event was on it too — name them on the row so
  // the event is never repeated further down the page.
  const alsoOn = allAchievements
    .filter((a) => a.event === pick.event && a.memberId !== m.id)
    .map((a) => ({ id: a.memberId, firstName: a.memberFirstName, accent: a.accent }));

  return {
    ...pick,
    memberId: m.id,
    memberName: m.name,
    memberFirstName: m.firstName,
    memberRole: m.role,
    accent: m.accent,
    index: m.index,
    members: [{ id: m.id, firstName: m.firstName, accent: m.accent }, ...alsoOn],
  };
});

/** Events already shown as somebody's headline result. */
const headlineEvents = new Set(headlineAchievements.map((a) => a.event));

/**
 * Everything that is not a headline result, and not part of an event already
 * shown as one. Without the second condition a shared hackathon would appear
 * twice on the page: once as one member's headline, once as another's row.
 */
export const remainingAchievements = allAchievements.filter(
  (a) => !a.headline && !headlineEvents.has(a.event),
);

/**
 * The remaining results merged by event. Several of these hackathons were
 * entered as one team, so rather than repeating an event once per person we
 * show it a single time and name everyone who was on it. Where members worded
 * their own result differently (Grand Finalist vs Finalist) every wording is
 * kept, so nobody's entry is upgraded or downgraded by the merge.
 */
export const mergedAchievements = (() => {
  const byEvent = new Map();

  for (const item of remainingAchievements) {
    const member = {
      id: item.memberId,
      firstName: item.memberFirstName,
      accent: item.accent,
    };

    const existing = byEvent.get(item.event);

    if (!existing) {
      byEvent.set(item.event, {
        event: item.event,
        type: item.type,
        note: item.note ?? null,
        results: [item.result],
        years: item.year ? [item.year] : [],
        members: [member],
      });
      continue;
    }

    existing.members.push(member);
    if (!existing.results.includes(item.result)) existing.results.push(item.result);
    if (item.year && !existing.years.includes(item.year)) existing.years.push(item.year);
    if (!existing.note && item.note) existing.note = item.note;
  }

  return [...byEvent.values()]
    .map((entry) => ({ ...entry, years: [...entry.years].sort() }))
    .sort((a, b) => b.members.length - a.members.length);
})();

/** Up to three standout results per member, headline first, for the team cards. */
export const keyResultsFor = (member) =>
  [...member.achievements]
    .sort((a, b) => Number(Boolean(b.headline)) - Number(Boolean(a.headline)))
    .slice(0, 3);

/** A member's strongest named technologies, for the team cards. */
export const keySkillsFor = (member, count = 3) => member.skills.slice(0, count);

/**
 * Distinct competitions and programmes. Shared events — several members entered
 * the same hackathons together — are counted once, not once per person.
 */
export const distinctEvents = [
  ...new Set(
    allAchievements.filter((a) => a.type !== "award").map((a) => a.event),
  ),
];

export const teamStats = [
  { value: members.length, label: "Team members", suffix: "" },
  { value: distinctEvents.length, label: "Competitions & programmes", suffix: "" },
  { value: allProjects.length, label: "Projects listed", suffix: "" },
  { value: allTechnologies.length, label: "Technologies named", suffix: "" },
];

export const getMember = (id) => members.find((m) => m.id === id);
