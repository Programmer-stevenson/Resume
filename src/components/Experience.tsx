import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const experiences = [
  {
    title: 'IT Admin',
    company: 'MAC.BID',
    period: 'Nov 2024 - Nov 2025',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-500',
    borderColor: 'border-teal-500/30',
    hoverBorder: 'hover:border-teal-500',
    responsibilities: [
      'Established and manage MAC.BID\'s IT infrastructure, overseeing more than on site 50 devices (PCs, laptops, mobile phones, and tablets). Utilize Microsoft Intune remote administration for centralized configuration, software deployment, device tracking, and compliance enforcement.',
      'Provide ongoing technical support for a wide range of systems and devices: workstations, printers, scanners, mobile devices, laptops, webcams, and company-specific applications, both on-site and remotely.',
      'Collaborate with distributed team members via Microsoft Teams to coordinate IT projects, address support requests, and ensure seamless operations across all locations.',
      'Develop and deliver training for employees on IT policies, procedures, and high-value product listing standards.',
      'Operates independently with minimal supervision while maintaining strong communication and integrity across a remote, multi-location team',
    ],
  },
  {
    title: 'IT Configurations Technician',
    company: 'CDW',
    period: 'Apr 2024 - Nov 2024',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500',
    responsibilities: [
      'Configure and prepare hundreds of devices with Client Specified I.T Services daily for order fulfillment, ensuring timely delivery including frequent major clients such as Apple, PayPal, Amazon, Meta, TikTok, and Instagram.',
      'Perform various services, including asset tagging, software imaging, hardware upgrades, BitLocker encryption, Chrome white glove service, BIOS settings customization, auto-pilot, and Software installations, and other common configuration services',
      'Install, configure, and test hardware, software, and network devices in alignment with client specifications and operational standards.',
      'Maintain accurate logs of configurations, installations, and troubleshooting activities for tracking and reporting.',
      'Troubleshoot and resolve technical issues efficiently to minimize delays in the fulfillment process.',
      'Conduct quality control checks to verify that all devices are fully operational and meet strict client standards before shipping.',
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 bg-gray-900">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.h2
          className="section-title text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-12 pl-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className={`group relative pl-8 sm:pl-12 pb-12 border-l-4 ${exp.borderColor} ${exp.hoverBorder} transition-all duration-300`}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <motion.div
                className={`absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r ${exp.gradient} rounded-full shadow-lg shadow-${exp.color}-500/50`}
                whileHover={{ scale: 1.25 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border ${exp.borderColor} hover:border-${exp.color}-500/40 hover:shadow-xl hover:shadow-${exp.color}-500/10 transition-all duration-300`}
                whileHover={{ y: -4 }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <h3 className={`text-2xl sm:text-3xl font-bold font-display text-${exp.color}-400`}>
                    {exp.title}
                  </h3>
                  <span className={`text-sm sm:text-base text-gray-400 font-medium px-3 py-1 bg-${exp.color}-500/10 rounded-full w-fit`}>
                    {exp.period}
                  </span>
                </div>

                <p className={`text-lg sm:text-xl text-${exp.color === 'teal' ? 'cyan' : 'blue'}-300 mb-4 font-medium`}>
                  {exp.company}
                </p>

                <ul className="space-y-3 text-gray-300">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <motion.li
                      key={respIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.2 + respIndex * 0.1 }}
                    >
                      <CheckCircle className={`w-5 h-5 text-${exp.color}-400 mt-1 flex-shrink-0`} />
                      <span>{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
