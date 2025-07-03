interface Experience {
    position: string
    period: string
    description: string
    details?: string[]
    skills: string[]
    side: string
    showMore: boolean
}

const experience: Experience[] = [
    {
        position: 'Freelance Developer (Automation Commission)',
        period: 'February 2023',
        description:
            'Created a lightweight Python script to automate retrieving Spotify API access tokens.',
        details: [
            'Automated the POST flow to fetch short-lived Spotify access tokens',
            'Utilized Python libraries to handle HTTP requests and token parsing',
            'Ensured secure handling of client credentials and tokens',
        ],
        skills: ['Python', 'Requests',],
        side: 'start',
        showMore: true,
    },
    {
        position: 'Freelance Developer (Frontend)',
        period: 'March 2023 - May 2023',
        description:
            'Translated Figma prototypes into reusable, responsive React components, ensuring pixel-perfect accuracy and consistent design implementation across the application.',
        details: [
            'Translated Figma prototypes into responsive, reusable React components',
            'Refactored existing components and developed reusable UI elements',
            'Maintained consistency with the established design system across the application',
            'Adapted components for responsiveness across various screen sizes and devices',
        ],
        skills: ['React', 'Figma', 'Tailwind CSS'],
        side: 'end',
        showMore: true,
    },
    {
        position: 'Freelance Developer (Frontend Consultant)',
        period: 'June 2023 - July 2023',
        description:
            'Worked on improving and maintaining a frontend project using Vite, TailwindCSS. Focused on fixing AI-generated code, enhancing code quality, reusability, and HTTP request handling.',
        details: [
            'Assisted in reviewing and fixing AI-generated frontend code',
            'Refactored existing components and developed reusable UI elements',
            'Debugged and corrected HTTP requests implemented with Axios',
            'Improved overall codebase maintainability and structure',
        ],
        skills: ['Vite', 'TailwindCSS'],
        side: 'start',
        showMore: true,
    },
    {
        position: 'Freelance Developer (Full-stack)',
        period: 'July 2024 - November 2024',
        description:
            'Helped with building a full-stack app using Next.js with Prisma. Integrated Gemini AI to generate flashcards, summaries, and quizzes from user-provided content.',
        details: [
            "Created RESTful API routes in Next.js for handling user data and AI requests",
            "Integrated Gemini AI to generate educational flashcards from text input",
            "Integrated Gemini AI to summarize large blocks of user-submitted content",
            "Used Gemini AI to dynamically generate quiz questions for study purposes",
            "Managed database schema and migrations using Prisma",
            "Built reusable React components for displaying flashcards, summaries, and quizzes",
            "Ensured smooth data flow between frontend and backend using API handlers",
            "Tested and debugged AI integration to ensure accurate content generation"
        ],
        skills: ['Next.js', 'Prisma', 'Gemini',],
        side: 'end',
        showMore: true,
    },
    {
        position: 'Freelance Developer (Automation Commission)',
        period: 'February 2025 - March 2025',
        description:
            'Built a web-based automation tool to scrape and export sales data into XLSX format. Automated data collection and formatting processes for seamless report generation. (WITH CONSENT)',
        details: [
            'Developed a system for automatic scraping of online sales data',
            'Implemented data transformation and export to Excel (XLSX) format',
            'Integrated scheduling to run data scraping at defined intervals',
            'Ensured data accuracy, error handling, and logging for reliability',
            'Optimized scraping logic for performance and scalability',
        ],
        skills: ["Selenium", "BeautifulSoup", "Pandas", "XLSXWriter",],
        side: 'start',
        showMore: true,
    },
];


export default experience