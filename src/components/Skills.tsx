import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: 'IT Administration',
    gradient: 'from-teal-500 to-cyan-500',
    bgGradient: 'from-teal-500/10 to-cyan-500/10',
    borderColor: 'border-teal-500/20',
    lineColor: 'from-teal-500 to-cyan-500',
    skills: ['Microsoft Intune', 'Microsoft 365 Admin', 'Active Directory', 'Windows Server', 'Group Policy', 'Endpoint Manager'],
  },
  {
    title: 'Cloud & Networking',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
    lineColor: 'from-cyan-500 to-blue-500',
    skills: ['Azure Fundamentals', 'AWS Basics', 'TCP/IP', 'DNS/DHCP', 'VPN Configuration', 'Network Security'],
  },
  {
    title: 'Development',
    gradient: 'from-blue-500 to-purple-500',
    bgGradient: 'from-blue-500/10 to-purple-500/10',
    borderColor: 'border-blue-500/20',
    lineColor: 'from-blue-500 to-purple-500',
    skills: ['JavaScript/TypeScript', 'React.js', 'Node.js', 'HTML/CSS', 'MongoDB', 'REST APIs'],
  },
  {
    title: 'Tools & Platforms',
    gradient: 'from-gray-500 to-gray-600',
    bgGradient: 'from-gray-700/30',
    borderColor: 'border-gray-600/20',
    lineColor: 'from-gray-500 to-gray-600',
    skills: ['ServiceNow', 'Salesforce', 'Git/GitHub', 'VS Code', 'Postman', 'Confluence'],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-gray-900">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.h2
          className="section-title text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-12 pl-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={`p-6 rounded-2xl bg-gradient-to-br ${category.bgGradient} border ${category.borderColor} backdrop-blur-sm`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className={`w-1 h-6 bg-gradient-to-b ${category.lineColor} rounded-full`} />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className={`px-3 py-1 text-xs ${
                      category.title === 'Tools & Platforms'
                        ? 'bg-gray-700/30 text-gray-300 border-gray-600/20'
                        : `bg-gradient-to-r ${category.gradient} bg-opacity-10 text-white border-white/10`
                    } rounded-md border hover:bg-opacity-20 transition-colors cursor-default`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
