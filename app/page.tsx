"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
};

// Typing animation hook
function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const typedText = useTypewriter([
    "AI/ML Developer",
    "Data Scientist", 
    "Deep Learning Enthusiast",
    "Problem Solver"
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden scroll-smooth">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50"
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
          >
            Bhavani Shankar
          </motion.h1>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {["About", "Skills", "Projects", "Education", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
              >
                {item}
                <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/70 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <main className="relative mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <motion.section 
          id="about"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className="flex-1">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Available for opportunities
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Bhavani
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-400 font-medium mb-4 h-8"
              >
                <span className="text-emerald-400">{typedText}</span>
                <span className="animate-pulse text-emerald-400">|</span>
              </motion.p>
              
              <motion.p 
                variants={fadeInUp}
                className="text-gray-500 leading-relaxed max-w-xl mb-8"
              >
                Passionate about building intelligent systems and solving complex problems with machine learning and deep learning. Currently pursuing B.Tech in Computer Science at LPU.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  href="https://linkedin.com/in/bhavani-shankar-321631298/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/bhavani779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-medium border border-white/10 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-medium border border-white/10 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </motion.a>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4 lg:gap-6"
            >
              {[
                { number: "100+", label: "Problems Solved" },
                { number: "1+", label: "Projects Built" },
                { number: "5+", label: "Technologies" },
                { number: "2027", label: "Graduating" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold">Skills</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Languages", skills: ["Python", "C++", "SQL", "R"], color: "emerald" },
              { title: "ML/DL Frameworks", skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"], color: "teal" },
              { title: "Data Science", skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn"], color: "cyan" },
              { title: "Tools", skills: ["Git", "Jupyter", "Docker", "Linux"], color: "emerald" },
              { title: "AI/ML Domains", skills: ["NLP", "Computer Vision", "LLMs", "MLOps"], color: "teal" },
              { title: "Soft Skills", skills: ["Research", "Problem Solving", "Collaboration"], color: "cyan" }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-${category.color}-500/5 border border-${category.color}-500/20 rounded-2xl p-6 hover:border-${category.color}-500/40 transition-colors`}
                style={{
                  background: `linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(20, 184, 166, 0.02) 100%)`,
                  borderColor: `rgba(16, 185, 129, 0.2)`
                }}
              >
                <h3 className="font-semibold text-white mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Weather App",
                date: "Jun 2027 – Jul 2027",
                description: "Real-time weather application with OpenWeather API integration",
                features: [
                  "Asynchronous API calls with fetch/async-await",
                  "Dynamic icons and animated backgrounds",
                  "Comprehensive error handling"
                ],
                tech: ["JavaScript", "API", "CSS"]
              },
              // {
              //   title: "To-Do List App",
              //   date: "May 2027 – Jun 2027",
              //   description: "Interactive task management application with persistent storage",
              //   features: [
              //     "localStorage for data persistence",
              //     "Responsive design with animations",
              //     "Input validation and error handling"
              //   ],
              //   tech: ["HTML", "CSS", "JavaScript"]
              // }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-emerald-400/70">{project.date}</p>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      href="https://github.com/bhavani779"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  
                  <ul className="space-y-2 mb-5">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="text-emerald-400 mt-0.5">→</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-1 rounded-md bg-emerald-500/10 text-xs text-emerald-400 border border-emerald-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience & Certifications */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {/* Training */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Training</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">LIVE</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-1">Full Stack Web Development with DSA</h3>
              <p className="text-sm text-gray-500 mb-4">Since June 2027</p>
              <ul className="space-y-2">
                {["HTML, CSS, JavaScript, React", "Node.js, Express.js", "MongoDB / MySQL", "Data Structures & Algorithms"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-emerald-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Certifications</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <div className="space-y-4">
              {[
                { title: "Gen AI Powered Data Analytics Job Simulation", date: "Sep 2027" },
                { title: "Full Stack Web Development: Angular and Next.js", date: "Jan 2027" }
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  whileHover={{ x: 5 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-teal-500/30 transition-all flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-sm">{cert.title}</h3>
                    <p className="text-xs text-gray-500">{cert.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Education */}
        <motion.section 
          id="education"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold">Education</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                abbr: "LPU",
                name: "Lovely Professional University",
                degree: "B.Tech - Computer Science & Engineering",
                location: "Punjab, India",
                period: "Since Aug 2023",
                score: "CGPA: 5.45",
                color: "emerald"
              },
              {
                abbr: "NEI",
                name: "Narayana Educational Institutes",
                degree: "Intermediate – PCM",
                location: "Hyderabad, Telangana",
                period: "Apr 2021 – Mar 2023",
                score: "93%",
                color: "teal"
              }
            ].map((edu, index) => (
              <motion.div
                key={edu.name}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br from-${edu.color}-500/20 to-${edu.color}-500/5 rounded-xl flex items-center justify-center text-${edu.color}-400 font-bold text-lg border border-${edu.color}-500/20`}>
                    {edu.abbr}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{edu.name}</h3>
                    <p className="text-sm text-gray-400">{edu.degree}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.location} · {edu.period}</p>
                    <p className={`mt-3 text-${edu.color}-400 font-semibold`}>{edu.score}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold">Achievements</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏆</span>
                <h3 className="font-bold text-white">Problem Solving</h3>
              </div>
              <p className="text-gray-400">
                Solved <span className="text-emerald-400 font-semibold">100+ Python problems</span> across CodeChef and GeeksforGeeks, strengthening algorithmic thinking skills.
              </p>
              <p className="text-sm text-emerald-400/70 mt-3">LPU · July 2024</p>
            </motion.div>
            
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔐</span>
                <h3 className="font-bold text-white">CyberSec Symposium 2.0</h3>
              </div>
              <p className="text-gray-400">
                Participated in <span className="text-teal-400 font-semibold">North India's largest cybersecurity conference</span>, gaining insights into modern security practices.
              </p>
              <p className="text-sm text-teal-400/70 mt-3">LPU · Apr 2027</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Let's work together!</h3>
                <p className="text-gray-400 mb-8">
                  I'm always excited to connect with fellow developers, potential collaborators, or anyone interested in tech. Feel free to reach out!
                </p>
                
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="https://linkedin.com/in/bhavani-shankar-321631298/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Connect on</p>
                      <p className="text-white group-hover:text-emerald-400 transition-colors">LinkedIn</p>
                    </div>
                  </motion.a>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="w-48 h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                    <div className="w-36 h-36 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full flex items-center justify-center border border-emerald-500/40">
                      <div className="text-center">
                        <p className="text-4xl mb-2">👋</p>
                        <p className="text-sm text-emerald-400 font-medium">Say Hello!</p>
                      </div>
                    </div>
                  </div>
                  {/* Floating elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute -top-2 left-1/2 w-4 h-4 bg-emerald-500/50 rounded-full" />
                    <div className="absolute top-1/2 -right-2 w-3 h-3 bg-teal-500/50 rounded-full" />
                    <div className="absolute -bottom-2 left-1/2 w-5 h-5 bg-cyan-500/50 rounded-full" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                Bhavani Shankar
              </h3>
              <p className="text-sm text-gray-500">Building the future, one line at a time.</p>
            </div>
            
            <div className="flex items-center gap-4">
              {[
                { href: "https://linkedin.com/in/bhavani-shankar-321631298/", icon: "linkedin" },
                { href: "https://github.com/bhavani779", icon: "github" }
              ].map((social) => (
                <motion.a
                  key={social.icon}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                >
                  {social.icon === "linkedin" ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-gray-600">© 2027 Bhavani Shankar. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 z-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.a>
    </div>
  );
}
