import React, { Suspense } from "react";
import GenerativeMountainScene from "@/components/ui/mountain-scene";
import { doto } from "./font";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-[#0f172a] text-slate-100 font-[family-name:var(--font-geist-mono)] selection:bg-sky-500/30">
        
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
          {/* Background Scene */}
          <Suspense fallback={<div className="w-full h-full bg-[#0f172a]" />}>
            <div className="absolute inset-0 z-0">
                 <GenerativeMountainScene />
            </div>
          </Suspense>

          {/* Overlay Content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <div className="flex flex-col gap-8 items-center justify-center p-8 pointer-events-auto max-w-4xl text-center">
                
                {/* Name & Title */}
                <header className="flex flex-col items-center gap-4">
                    <h1 className={`${doto.className} text-6xl md:text-8xl text-center drop-shadow-lg tracking-tight`}>
                        arunKrishna
                    </h1>
                    <h2 className="text-xl md:text-2xl text-sky-400 font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-sky-500/20">
                        Full Stack Web Developer
                    </h2>
                </header>

                {/* Taglines */}
                 <div className="space-y-6 max-w-2xl bg-black/10 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
                    <p className="text-lg md:text-xl font-semibold text-slate-200">
                      3+ years of experience building scalable product-based applications with the MERN stack.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      Passionate about writing clean, maintainable code and building impactful software. 
                      Proficient in core JavaScript concepts with hands-on experience across DevOps and cloud ecosystems.
                    </p>
                </div>

                {/* Links */}
                 <nav className="flex gap-6 flex-wrap items-center justify-center mt-4">
                    <a
                      className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-105"
                      href="/arunKrishnaV1.pdf"
                      download="ArunKrishna_Resume.pdf"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sky-400 group-hover:text-sky-300">Resume</span>
                    </a>
                    <a
                      className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-105"
                      href="https://github.com/a-humanthing"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <span>Github</span>
                    </a>
                    <a
                      className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-105"
                      href="https://www.linkedin.com/in/arunkrishnakt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <span>LinkedIn</span>
                    </a>
                 </nav>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 pointer-events-none text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
          <div className="space-y-6">
              <h2 className={`${doto.className} text-4xl text-sky-400 border-b border-white/10 pb-4 inline-block`}>Technical Skills</h2>
              <div className="grid md:grid-cols-2 gap-12 text-slate-300 leading-relaxed">
                  <div className="space-y-6">
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 h-full">
                          <h3 className="text-xl font-bold text-slate-100 mb-6">Expertise</h3>
                          <div className="space-y-8">
                            <div>
                                <h4 className="text-sky-400 font-semibold mb-3">Frontend</h4>
                                <ul className="flex flex-wrap gap-2 text-sm">
                                    {["JavaScript", "TypeScript", "React", "Next.js", "Redux", "Jotai", "Framer Motion", "Three.js", "Tailwind CSS", "Material UI"].map(tech => (
                                        <li key={tech} className="bg-sky-500/10 text-sky-300 px-3 py-1 rounded-full border border-sky-500/20">{tech}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sky-400 font-semibold mb-3">Backend</h4>
                                <ul className="flex flex-wrap gap-2 text-sm">
                                    {["Node.js", "Express", "NestJS", "GraphQL", "REST API", "Microservices", "WebSockets", "MQTT"].map(tech => (
                                        <li key={tech} className="bg-sky-500/10 text-sky-300 px-3 py-1 rounded-full border border-sky-500/20">{tech}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sky-400 font-semibold mb-3">Database & DevOps</h4>
                                <ul className="flex flex-wrap gap-2 text-sm">
                                    {["MongoDB", "SQL", "Docker", "AWS", "GCP", "CI/CD", "Redis", "Linux CLI", "Sentry", "Grafana"].map(tech => (
                                        <li key={tech} className="bg-sky-500/10 text-sky-300 px-3 py-1 rounded-full border border-sky-500/20">{tech}</li>
                                    ))}
                                </ul>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="space-y-6">
                       <h3 className="text-xl font-bold text-slate-100">Professional Summary</h3>
                       <p>
                          I am a Full Stack Web Developer with 3 years of experience building and maintaining scalable product-based applications using the MERN stack. 
                          I have a passion for solving complex problems and creating impactful software solutions.
                       </p>
                       <p>
                          Currently, I focus on building high-performance applications, optimizing backend architecture, and leading frontend initiatives. 
                          My background covers the entire SDLC, from requirement gathering to deployment and monitoring.
                       </p>
                       <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 mt-6">
                           <h4 className="font-bold text-slate-100 mb-2">Education</h4>
                           <p className="text-sky-400">Bachelors in Computer Applications</p>
                           <p className="text-sm text-slate-400">University of Calicut (2019 - 2022)</p>
                           <p className="text-xs text-slate-500 mt-1">GPA: 7.4 | Computer Architecture, Algorithms, Internet Fundamentals</p>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-12 px-6 md:px-12 max-w-6xl mx-auto">
          <h2 className={`${doto.className} text-4xl text-sky-400 border-b border-white/10 pb-4 mb-12 inline-block`}>Professional Experience</h2>
          <div className="space-y-12 border-l-2 border-white/10 pl-8 ml-4">
              
              <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-sky-500 rounded-full border-4 border-[#0f172a]" />
                  <h3 className="text-2xl font-bold text-slate-100">Software Engineer</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sky-400 mb-4">
                      <a href="https://guidesly.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Guidesly</a>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-slate-400">Oct 2025 – Present</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4">
                      Frontend-focused Software Engineer contributing to a next-generation outdoor marketplace.
                      Specializing in JavaScript, Gatsby, Next.js, SEO optimization, feature development, and AWS deployments to build fast, scalable, and search-friendly web applications.
                  </p>
              </div>

              <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-slate-700 rounded-full border-4 border-[#0f172a]" />
                  <h3 className="text-2xl font-bold text-slate-100">Full Stack Engineer</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sky-400 mb-4">
                      <a href="https://livello.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Livello Technologies</a>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-slate-400">Jul 2023 – Aug 2025</span>
                  </div>
                  <ul className="list-disc leading-relaxed text-slate-300 space-y-2 ml-4">
                      <li>Refactored a legacy React app to TypeScript, improving readability and performance by 3x using memoization and lazy loading.</li>
                      <li>Integrated Sentry for real-time error tracking, reducing debugging time by 40%.</li>
                      <li>Implemented server-side request caching in NestJS, reducing database queries by ~70%.</li>
                      <li>Set up GitLab CI/CD pipelines to streamline development (build, test, deploy).</li>
                      <li>Optimized GraphQL queries and handled monitoring with GCP Log Explorer & Grafana.</li>
                  </ul>
              </div>

              <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-slate-700 rounded-full border-4 border-[#0f172a]" />
                  <h3 className="text-2xl font-bold text-slate-100">Full Stack Developer</h3>
                   <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sky-400 mb-4">
                      <span>HashIt Solutions</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-slate-400">Feb 2023 – Jun 2023</span>
                  </div>
                  <ul className="list-disc leading-relaxed text-slate-300 space-y-2 ml-4">
                      <li>Led a frontend team to build a dynamic SPA using React, Tailwind, Material UI, and Framer Motion.</li>
                      <li>Implemented parallax animations and interactive UI components.</li>
                      <li>Developed an Employee Management System integrated with a Python-based REST API.</li>
                  </ul>
              </div>

          </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-24 px-6 md:px-12 max-w-6xl mx-auto bg-black/20 rounded-3xl mb-24 backdrop-blur-sm border border-white/5">
          <h2 className={`${doto.className} text-4xl text-sky-400 border-b border-white/10 pb-4 mb-12 inline-block`}>Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
              
              <article className="group bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-sky-500/50 transition-colors flex flex-col h-full">
                  <div className="p-8 space-y-4 flex-grow">
                      <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold group-hover:text-sky-400 transition-colors">Surf SocialApp</h3>
                          {/* URL removed as requested */}
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                          A fully-featured social media platform with user registration, real-time chat (Socket.io), and microservices architecture. 
                          Includes email verification via SendGrid and is containerized with Docker on AWS EC2.
                      </p>
                      <div className="flex gap-2 flex-wrap pt-4">
                          {["NestJS", "React", "MongoDB", "Socket.io", "Docker", "AWS", "Ansible"].map(tag => (
                              <span key={tag} className="text-xs bg-sky-500/10 text-sky-300 px-2 py-1 rounded border border-sky-500/10">{tag}</span>
                          ))}
                      </div>
                  </div>
              </article>

              <article className="group bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-sky-500/50 transition-colors flex flex-col h-full">
                  <div className="p-8 space-y-4 flex-grow">
                      <h3 className="text-2xl font-bold group-hover:text-sky-400 transition-colors">Qcart</h3>
                      <p className="text-slate-400 leading-relaxed">
                          Responsive e-commerce platform supporting cart, wishlist, infinite scroll, and discount coupons. 
                          Integrated with Razorpay for seamless payments.
                      </p>
                      <div className="flex gap-2 flex-wrap pt-4">
                          {["Express", "MongoDB", "EJS", "Razorpay", "AWS"].map(tag => (
                              <span key={tag} className="text-xs bg-sky-500/10 text-sky-300 px-2 py-1 rounded border border-sky-500/10">{tag}</span>
                          ))}
                      </div>
                  </div>
              </article>

          </div>
      </section>

    </main>
  );
}
