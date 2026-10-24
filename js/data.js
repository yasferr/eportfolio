/* =====================================================================
   EDIT THIS FILE to update your portfolio.

   HOW TO ADD A FILE (up to 15 per module works great)
   1. Put the file in the module's folder, e.g.  files/module-1/
   2. Add ONE line to that module's `files` list. The shortest form is just the path:

        "files/module-1/my-report.pdf",

      or, if you want a nicer title / description / group, use the long form:

        { path: "files/module-1/my-report.pdf", name: "Report: Sorting algorithms",
          desc: "Short description shown on the card", category: "Assignments" },

      - name      optional. If missing, it is made from the file name.
      - desc      optional. One short sentence (2 lines max are shown).
      - category  optional. If you use it on at least one file, the files are
                  grouped under headings (e.g. "Assignments", "Code", "Reflections").

   WHAT VISITORS CAN DO
   - View (opens a viewer on the page): PDF, images (png, jpg, gif, webp, svg),
     Word / PowerPoint / Excel (doc, docx, ppt, pptx, xls, xlsx; needs the site to be
     online), text and code (txt, md, py, r, sql, csv, json), notebooks (ipynb), mp4 video.
   - Download: every file, always. ZIP / RAR / 7z archives are download-only.
   - A link to a file stored elsewhere (e.g. Google Drive) also works:
       { path: "https://drive.google.com/...", name: "Dataset", desc: "..." }

   HOW TO WRITE AIMS AND LEARNING OUTCOMES
   - One short line each. Write "Key words — a few words of detail" and the part
     before the dash is shown in bold, e.g.
        "Software design — principles, processes and methods.",
   - `keywords` are the little tags shown at the top of the module page.
   - Every line needs quotes around it and a comma at the end.
   ===================================================================== */

const PROFILE = {
  name: "Yasmin Almeida Ferrera",
  course: "MSc Artificial Intelligence",
  university: "University of Essex",
  about:
    "I am a postgraduate student on the MSc in Artificial Intelligence at the University of Essex. " +
    "This e-portfolio brings together my coursework, reflections and project files, module by module. " +
    "Every document listed here can be opened or downloaded by any visitor.",
  skills: ["Python", "R", "SQL", "Weka", "Machine Learning", "Deep Learning", "LLM", "Data Visualization"],
  email: "" // optional: add your university email, e.g. "name@essex.ac.uk"
};

const MODULES = [
  {
    id: 1,
    title: "Launch into Computing",
    tutor: "Dr Zeeshan Siddiqui",
    status: "Completed",
    blurb: "Software engineering, AI, data science and cyber security: the foundations of computing.",
    keywords: ["Software Engineering", "Artificial Intelligence", "Data Science", "Cyber Security", "Equality, Diversity & Inclusion", "Reflection"],
    aims: [
      "Computing concepts — software engineering, AI, data science and cyber security.",
      "Software design — principles, processes and implementation methods.",
      "Security by design — mapping functional and non-functional requirements to cyber security procedures.",
      "AI foundations — the technologies behind AI, plus current challenges and opportunities.",
      "Communication — presenting critical arguments to diverse audiences.",
      "Inclusion and reflection — using computing to overcome barriers, and evaluating personal development."
    ],
    outcomes: [
      "Analyse challenges — computing processes in business systems and the enterprise landscape.",
      "Research and synthesise — gather information from multiple sources to design and analyse solutions.",
      "Evaluate methods — critically assess methodologies, tools and techniques and their business impact.",
      "Professional awareness — legal, social, ethical and professional issues in computing."
    ],
    files: [
      {
        path: "files/module-1/unit-12-quantum-computing-presentation.pptx",
        name: "Unit 12: Quantum Computing Presentation",
        desc: "Quantum innovation and the next big wave: ethical and security challenges for enterprises (10 slides)."
      },
      {
        path: "files/module-1/unit-12-presentation-transcript.docx",
        name: "Unit 12: Presentation Transcript",
        desc: "Transcript of my spoken presentation on quantum computing and its impact on enterprise."
      },
      {
        path: "files/module-1/a1-java-vs-python-duplicate-name-handling.docx",
        name: "A1: Java vs Python, Duplicate Name Handling",
        desc: "Comparing Java and Python through a small programme that removes duplicate names."
      },
      {
        path: "files/module-1/clean-names-python.py",
        name: "Python Code: Clean Names",
        desc: "Python script that removes duplicate names and fixes capitalisation."
      },
      {
        path: "files/module-1/python-output-duplicate-names.txt",
        name: "Python Output: Duplicate Names",
        desc: "Console output showing the original and processed lists."
      },
      {
        path: "files/module-1/java-output-duplicate-names.txt",
        name: "Java Output: Duplicate Names",
        desc: "Terminal output showing the original and processed lists."
      },
      {
        path: "files/module-1/a2-language-comparison-python-vs-java.docx",
        name: "A2: Language Comparison, Python vs Java",
        desc: "Programming model, readability, error handling and suitability for modern computing."
      },
      {
        path: "files/module-1/a3-butterfly-effect-ethical-responsibility.docx",
        name: "A3: The Butterfly Effect and Ethical Responsibility",
        desc: "How small code changes scale, and why readable, accountable programming matters."
      }
    ]
  },
  {
    id: 2,
    title: "Understanding Artificial Intelligence",
    tutor: "Dr Ali Zalzala",
    status: "Completed",
    blurb: "The history, ethics and fundamentals of AI, from the Turing Test to machine learning.",
    keywords: ["History of AI", "Turing Test", "Knowledge Representation", "Machine Learning", "Data Preparation", "Ethics", "Industry 4.0", "FinTech"],
    aims: [
      "History and future of AI — definition, professional and ethical issues, key applications (Industry 4.0, FinTech).",
      "AI fundamentals — the Turing Test, knowledge representation and learning systems.",
      "Machine learning — programming paradigms and algorithms.",
      "Data preparation — getting data ready for AI solutions.",
      "Programming — implementing learning algorithms."
    ],
    outcomes: [
      "Legal and ethical issues — the impact of AI on society.",
      "Core AI concepts — critically analyse principles, methods, techniques and problems.",
      "Data and paradigms — data requirements and programming approaches for AI.",
      "AI projects — apply and evaluate methods and tools to plan and deliver solutions to a business problem."
    ],
    files: [
      {
        path: "files/module-2/individual-essay-ai-and-its-applications.pdf",
        name: "Individual Essay: AI and its Applications",
        desc: "Adopting AI in a FinTech start-up: fraud detection, AI agents and trading analysis, with risks and ethics."
      },
      {
        path: "files/module-2/ai-solution-implementation.pdf",
        name: "AI Solution Implementation",
        desc: "Credit card fraud detection in Weka: a comparative study of classification models on imbalanced data."
      }
    ]
  },
  {
    id: 3,
    title: "Numerical Analysis",
    tutor: "Ali Edisen",
    status: "Completed",
    blurb: "The mathematics and statistics behind data science and AI, and how to interpret results.",
    keywords: ["Mathematics", "Statistics", "Data Science", "AI Tools", "Decision-making", "Reflection"],
    aims: [
      "Mathematical foundations — principles and methods behind computing logic.",
      "Data-driven techniques — the theory and practice of programming and data analysis.",
      "Interpreting results — making sense of the output of data science and AI tools.",
      "Real-world applications — computational tools and contemporary issues.",
      "Independent learning — a reflective, self-directed approach."
    ],
    outcomes: [
      "Key concepts — the mathematical and statistical techniques underpinning data science and AI.",
      "Decision-making — apply mathematical and statistical methods to support decisions.",
      "Critical evaluation — assess statistical analysis and the numeric interpretation of results.",
      "Communication — present the results of a statistical analysis to diverse audiences."
    ],
    files: [
      {
        path: "files/module-3/assessment-2-individual-reflection.pdf",
        name: "Assessment 2: Individual Reflection",
        desc: "Reflection on developing data analysis skills, statistical knowledge and confidence in R."
      },
      {
        path: "files/module-3/assessment-3-statistical-analysis-presentation.pptx",
        name: "Assessment 3: Statistical Analysis Presentation",
        desc: "Statistical analysis of the Pima Indians Diabetes dataset using R (21 slides)."
      },
      {
        path: "files/module-3/assessment-3-presentation-transcript.pdf",
        name: "Assessment 3: Presentation Transcript",
        desc: "Transcript of my spoken presentation on the diabetes dataset analysis."
      }
    ]
  },
  {
    id: 4,
    title: "Intelligent Agents",
    tutor: "Dr Angesh Anupam",
    status: "Completed",
    blurb: "Agent-based systems: models, architectures and intelligent agents for real-world problems.",
    keywords: ["Agent-based Systems", "Agent Models", "Intelligent Systems", "Research Issues", "Teamwork", "Ethics"],
    aims: [
      "Agent-based computing — the motivations for it and its appropriate use.",
      "Agent models — the main models in use today and their roots in AI research.",
      "Practical skills — develop, deploy and evaluate intelligent systems for real-world problems.",
      "Research frontiers — contemporary issues in intelligent agent systems."
    ],
    outcomes: [
      "Analyse agent systems — tell apart architectures and approaches.",
      "Apply techniques — evaluate intelligent agents on real problems involving risk and uncertainty.",
      "Build responsibly — use suitable tools to design agent-based systems, mindful of legal, social, ethical and professional issues.",
      "Teamwork — work effectively in a virtual professional development team."
    ],
    files: [
      {
        path: "files/module-4/collaborative-discussion-1-agent-based-systems.pdf",
        name: "Collaborative Discussion 1: Agent Based Systems",
        desc: "Why agent-based systems have risen and the benefits they offer organisations (Units 1–3)."
      },
      {
        path: "files/module-4/collaborative-discussion-2-agent-communication-languages.pdf",
        name: "Collaborative Discussion 2: Agent Communication Languages",
        desc: "Advantages and disadvantages of agent communication languages such as KQML (Units 5–7)."
      },
      {
        path: "files/module-4/collaborative-discussion-3-deep-learning.pdf",
        name: "Collaborative Discussion 3: Deep Learning",
        desc: "Deep learning and the generation of new content, such as image-generation models (Units 9–11)."
      },
      {
        path: "files/module-4/creating-agent-dialogues.pdf",
        name: "Creating Agent Dialogues",
        desc: "Activity: an agent dialogue between Alice and Bob using KQML, KIF and an ontology."
      },
      {
        path: "files/module-4/creating-parse-trees.pdf",
        name: "Creating Parse Trees",
        desc: "Activity: constituency-based parse trees showing how a sentence breaks into nested phrases."
      },
      {
        path: "files/module-4/scholarplan-design-proposal-report.docx",
        name: "ScholarPlan: Design Proposal Report",
        desc: "An LLM-powered planning agent for academic research and information gathering (Group A, September 2026)."
      },
      {
        path: "files/module-4/scholarplan-presentation-transcript.pdf",
        name: "ScholarPlan: Presentation Transcript",
        desc: "Transcript of my Module 4 presentation on the ScholarPlan project."
      },
      {
        path: "files/module-4/deep-learning-in-action.pages",
        name: "Deep Learning in Action",
        desc: "Activity on Deep Learning for financial market and prediction-market forecasting (Apple Pages file)."
      },
      {
        path: "files/module-4/scholarplan-eportfolio-supporting-content.pdf",
        name: "ScholarPlan: E-Portfolio Supporting Content",
        desc: "Critical evaluation of ScholarPlan, a skill matrix and three case studies with evidence.",
        includes: ["Critical evaluation", "Skill matrix", "Case study: Bias", "Case study: AI safety", "Case study: Explainability", "References"]
      },
      {
        path: "files/module-4/scholarplan-individual-project-presentation.pdf",
        name: "ScholarPlan: Individual Project Presentation",
        desc: "Slides on my implementation of ScholarPlan, an LLM-powered research planning agent (10 slides)."
      },
      { 
         path: "https://github.com/yasferr/eportfolio/releases/download/module-4-files/ScholarPlan_Submission.zip",
         name: "ScholarPlan Implementation (ZIP)",
         desc: "Full source code and files of the project.",
         includes: ["Source code", "Data", "README"], 
         sha256: "c853fe22798064bc2ac062465b54b62115af5df1a3727f647aec80d4a5d9630c"
      }
    ]
  },
  {
    id: 5,
    title: "Machine Learning",
    tutor: "Elizabeth Oladapo",
    status: "In progress",
    blurb: "Learning algorithms, model evaluation and practical experimentation.",
    keywords: [], aims: [], outcomes: [], files: []
  },
  {
    id: 6,
    title: "Knowledge Representation and Reasoning",
    tutor: "",
    status: "Upcoming",
    blurb: "Representing knowledge formally and reasoning over it.",
    keywords: [], aims: [], outcomes: [], files: []
  },
  {
    id: 7,
    title: "Research Methods and Professional Practice",
    tutor: "",
    status: "Upcoming",
    blurb: "Research design, ethics and professional conduct.",
    keywords: [], aims: [], outcomes: [], files: []
  },
  {
    id: 8,
    title: "MSc Computing Project",
    tutor: "",
    status: "Upcoming",
    blurb: "An independent, supervised capstone project.",
    keywords: [], aims: [], outcomes: [], files: []
  }
];
