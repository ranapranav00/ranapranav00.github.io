import { motion } from 'framer-motion'
import { useState } from 'react'

interface ExperienceItem {
  company: string
  role: string
  period: string
  description: string[]
  technologies: string[]
  logo: string
}

const experiences: ExperienceItem[] = [
  {
    company: 'MORSE Corp.',
    role: 'Data Science Co-op',
    period: '01/2025 - 06/2025',
    description: [
      'Re-engineered financial plots for 10+ multi-contract projects, improving clarity with profit-adjusted spending metrics, paginated views, and obligated-vs-at-risk funding breakdowns to inform multi-million-dollar executive budget decisions.',
      'Refactored backend to enhance data integrity and project aggregation logic by implementing Pydantic validation for YAML inputs with 40+ custom errors, and integrating linters, enforcing compliance via CI/CD, to resolve 300+ code quality issues.',
      'Achieved and maintained 100% code coverage for a previously-untested license compliance tool to identify licenses of software dependencies across 7 languages, achieving 99.3% accuracy for 27,000+ dependencies.'
    ],
    technologies: ['Python', 'Pydantic', 'Pytest', 'Git', 'Pandas', 'Matplotlib', 'CI/CD'],
    logo: './images/morse.png',
  },
  {
    company: 'Johnson & Johnson',
    role: 'Software & Data Co-op',
    period: '01/2024 - 07/2024',
    description: [
      'Built a workflow centralizing 70+ cross-departmental requests, tracking their lifecycle, auto-storing associated documents in SharePoint, and visualizing $210MM in financial data to uncover bottlenecks, quantify savings, and benchmark against budget.',
      'Designed an automated workflow for a legal compliance process, monitoring Microsoft Planner tasks, dynamically creating and delegating permissions to sensitive SharePoint folders, and sending targeted emails, generating $90K in operational value.',
      'Scaffolded an automation to streamline Product Owner tasks by drafting user stories/AC via OpenAI API and batch importing them via JIRA API; pitched to CBT sector leadership to demonstrate efficiency gains and greenlit for implementation.',
      'Consolidated 55k+ orders from 3 distributors for key pharmaceuticals, geotagged 1,000+ unique locations with caching to optimize processing, and visualized demand to uncover consumption trends, and guide inventory and distribution decisions.'
    ],
    technologies: ['Python', 'SQL', 'Matplotlib', 'Pandas', 'GeoPandas', 'GeoPy', 'Power Apps', 'Power BI', 'Power Automate'],
    logo: './images/jnj.jpg',
  },
  {
    company: 'TAMID',
    role: 'Lead Developer',
    period: '09/2023 - 12/2024',
    description: [
      'Integrated 8 weather endpoints from the Israel Meteorological Service API into tech startup VComm’s motorcycle safety score, visualizing metrics along 40+ driven routes to demonstrate improved insurer risk assessments and encourage safer riding.',
      'Restructured SQL databases for tech startup Inviseye, mapping applicant qualities to role-specific values across 1,000+ records, and built an interactive dashboard that ranked top candidates and enabled side-by-side comparisons for data-driven hiring.',
    ],
    technologies: ['SQL', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'React', 'Excel Dashboards'],
    logo: './images/tamid.jpg', // Replace with: logo: '/path-to-company-logo.png'
  },
]

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-24 px-6 pb-12" style={{ willChange: 'scroll-position' }}>
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-6xl font-bold mb-16 text-center"
        >
          Professional <span className="text-gradient">Experience</span>
        </motion.h1>

        <div className="relative">
          {/* Vertical Timeline Line - Centered but with clear space */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline Circle - Centered */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-12 z-10">
                  <motion.div
                    className="w-32 h-32 rounded-full bg-primary/20 backdrop-blur-sm border-4 border-primary flex items-center justify-center text-5xl cursor-pointer"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover rounded-full" />
                  </motion.div>
                </div>

                {/* Content Card - Alternating sides with maximum timeline separation */}
                <motion.div
                  className={`glass-effect rounded-2xl p-6 lg:p-8 ${
                    index % 2 === 0 ? 'mr-auto pr-40 lg:pr-48' : 'ml-auto pl-40 lg:pl-48'
                  } w-[calc(72%-10rem)] lg:w-[calc(72%-11rem)] max-w-5xl`}
                  style={{ transform: 'translateZ(0)' }}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                    opacity: hoveredIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gradient mb-2">{exp.company}</h2>
                  <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-muted-foreground mb-4">{exp.period}</p>

                  {/* Show description on hover */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredIndex === index ? 'auto' : 0,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm lg:text-base leading-relaxed">
                          <span className="text-primary mt-1 flex-shrink-0">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
