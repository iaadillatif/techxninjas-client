🌐 TechXNinjas – The Student-Centric Tech Community Platform
Welcome to the official repository of TechXNinjas, a student-first community
platform built to empower learners across India (and beyond) with tech
resources, events, articles, courses, and collaboration opportunities — all
under one roof.

<details>
<summary><strong>📑 Table of Contents</strong></summary>

🚀 What is TechXNinjas?

🧩 Key Features

✅ Public Features

🔐 Logged-in User Features

⚙️ Tech Stack

📋 GSSoC 2025 Contributor Task Board

🔑 Environment Variables

🧪 How to Run Locally

🤝 Contribution Guide

💬 Join Our Community Discussions!

👨‍💻 Maintainers

🏆 Our Contributors

📄 License

</details>

🚀 What is TechXNinjas?
TechXNinjas is a full-fledged, production-ready community platform that:

Showcases student-centric events, hackathons, giveaways, and more.

Publishes valuable articles, technical blogs, and career tips.

Offers community-built and mentor-led courses for learning.

Features creator dashboards and user profiles.

Encourages collaboration and real-world open-source exposure.

This platform is already deployed and being used live by thousands of students
across colleges and universities.

🧩 Key Features
✅ Public Features:
🎯 Homepage with live announcements and CTAs

📰 Articles & Blogs page with filters and individual article pages

🎓 Courses page with detailed overviews

📅 Events page showcasing upcoming & past events with detail view

📤 Contact Us form for queries

👨‍💼 Public User Profiles for members, contributors, and mentors

📃 Static Pages: About Us, Privacy Policy, Terms, etc.

🔐 Logged-in User Features:
🧑 User Dashboard with saved content, uploads, and details

📈 Creator Dashboard for article/course submission

✍️ Article/Course submission editor (in development)

<pre lang="md"><code>

📁 Project Structure
techxninjas-client/
├── .github/                    # GitHub-specific configurations
│   └── ISSUE_TEMPLATE/         # Issue templates
│       ├── bug_report.md
│       ├── feature_request.md
│       └── other---general-issue.md
│
├── components/                 # Reusable UI components and modal/page elements
│   ├── auth/                   # Authentication components
│   │   ├── AuthModal.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   │
│   ├── layout/                 # Shared layout components
│   │   ├── Footer.tsx
│   │   ├── FormattedText.tsx
│   │   ├── Header.tsx
│   │   ├── SearchHeader.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── pages/                  # Route-level pages
│   │   ├── ArticleDetailPage.tsx
│   │   ├── ArticlePage.tsx
│   │   ├── ContactUsPage.tsx
│   │   ├── CourseDetailPage.tsx
│   │   ├── CoursePage.tsx
│   │   ├── CreaterDashboardPage.tsx
│   │   ├── EventDetailPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── PublicProfilePage.tsx
│   │   ├── TermsOfServicePage.tsx
│   │   └── UserProfilePage.tsx
│   │
│   ├── AddSectionModal.tsx
│   ├── AnimatedCounter.tsx
│   ├── CodingBackground.tsx
│   ├── CreatorApplicationModal.tsx
│   ├── EditProfileModal.tsx
│   ├── ErrorBoundary.tsx
│   ├── EventCard.tsx
│   ├── EventDetailHeader.tsx
│   ├── icons.tsx
│   ├── LazyImage.tsx
│   ├── MentorsSlider.tsx
│   ├── OptimizedArticleCard.tsx
│   ├── OptimizedEventCard.tsx
│   ├── RevealOnScroll.tsx
│   ├── ReviewSection.tsx
│   ├── ScrollToTop.tsx
│   ├── ScrollToTopButton.tsx
│   ├── TechFactGenerator.tsx
│   ├── TestimonialsSlider.tsx
│   ├── ThemeToggle.tsx
│   ├── usePageTitle.tsx
│   ├── VirtualizedList.tsx
│   └── WhatsAppButton.tsx
│
├── context/                   # React context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── hooks/                     # Custom React hooks
│   ├── useDebounce.ts
│   └── useInfiniteScroll.ts
│
├── lib/                       # External libraries and setups
│   └── supabaseClient.ts
│
├── public/                    # Static assets and SEO files
│   ├── .well-known/
│   ├── icons/
│   ├── seo/
│   ├── browserconfig.xml
│   ├── humans.txt
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
│
├── services/                  # API interaction layer
│   ├── articleInteractionService.ts
│   ├── articleService.ts
│   ├── contactService.ts
│   ├── courseService.ts
│   ├── eventService.ts
│   ├── geminiService.ts
│   ├── homeService.ts
│   ├── profileSectionService.ts
│   ├── profileService.ts
│   ├── reviewService.ts
│   └── viewTrackingService.ts
│
├── utils/                     # Utility/helper functions
│   ├── imageOptimization.ts
│   └── performance.ts
│
├── .env.local                 # Local environment variables
├── .gitignore
├── App.tsx                    # Root app component
├── CODE_OF_CONDUCT.md
├── constants.ts
├── CONTRIBUTING.md
├── index.css                  # Global styles (Tailwind base)
├── index.html                 # App HTML shell
├── index.tsx                  # App entry point
├── https://www.google.com/search?q=LICENSE
├── metadata.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── SECURITY.md
├── tailwind.config.js
├── techxninjas_logo.png
├── tsconfig.json
├── types.ts                   # Shared TypeScript interfaces
└── vercel.json                # Vercel deployment settings

</code></pre>

⚙️ Tech Stack
Category

Technology

Frontend

React.js (TypeScript)

Routing

React Router DOM

Styling

Tailwind CSS

Backend/API

Supabase (PostgreSQL)

Hosting

Vercel

Auth

Supabase Auth

SEO & Analytics

Meta tags, Open Graph, Google Analytics

📋 GSSoC 2025 Contributor Task Board
Track all open tasks, progress, and completed contributions on our live board:

👉 

We regularly update this board with new issues, assignments, and progress – check here before picking an issue!

🔑 Environment Variables
To run the project locally, create a .env.local file and include:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

🧪 How to Run Locally
Clone the Repository

git clone [https://github.com/techxninjas/techxninjas-client.git](https://github.com/techxninjas/techxninjas-client.git)
cd techxninjas

Install Dependencies

npm install

Add Environment Variables

Create a .env.local file and paste your Supabase/EmailJS keys as described
above.

Run the Project

npm run dev

Open http://localhost:5173 to view it in your browser.

🤝 Contribution Guide
We are open to meaningful contributions from developers, designers, and content
creators!

You can contribute to:
Bug fixes

New feature implementation

UI/UX improvements

Responsive & accessibility enhancements

Content (articles, tech blogs, etc.)

Steps:
Fork the repo

Create a new branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Add feature"

Push to your fork: git push origin feature-name

Create a pull request from your fork’s branch

💬 Join Our Community Discussions!
We’re using GitHub Discussions to build a strong community for GSSoC 2025 and beyond!

👉 Click here to ask questions, introduce yourself, or share ideas!

👨‍💻 Maintainers
Aadil Latif – LinkedIn

Feel free to reach out for discussions, suggestions, or contributions!

🏆 Our Contributors
A huge thank you to all the amazing people who have contributed to the TechXNinjas client! We appreciate your efforts in making this community platform better for everyone.

<a href="https://www.google.com/search?q=https://github.com/techxninjas/techxninjas-client/graphs/contributors">
<img src="https://www.google.com/search?q=https://contrib.rocks/image%3Frepo%3Dtechxninjas/techxninjas-client" />
</a>

Made with contrib.rocks.

📄 License
This project is licensed under the GPL-3.0 license

Made with ❤️ for students, by students.