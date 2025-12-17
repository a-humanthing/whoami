import React, { Suspense } from "react";
import GenerativeMountainScene from "@/components/ui/mountain-scene";
import { doto } from "./font";

export default function Page() {
  return (
    <main className="relative w-full h-screen bg-[#0f172a] overflow-hidden text-slate-100 font-[family-name:var(--font-geist-mono)]">
        {/* Background Scene */}
      <Suspense fallback={<div className="w-full h-full bg-[#0f172a]" />}>
        <div className="absolute inset-0 z-0">
             <GenerativeMountainScene />
        </div>
      </Suspense>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col gap-8 items-center justify-center p-8 pointer-events-auto">
            
            {/* Name */}
            <h1 className={`${doto.className} text-6xl text-center drop-shadow-lg`}>
                arunKrishna
            </h1>

            {/* Taglines */}
             <ul className="list-inside text-sm text-center font-[family-name:var(--font-geist-mono)] max-w-2xl space-y-4">
              <li>
                <code className="bg-black/20 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg font-semibold inline-block">
                  I make ideas into reliable products with scalable code.
                </code>
              </li>
              <li className="text-slate-300 px-4 leading-relaxed bg-black/10 backdrop-blur-sm rounded-lg py-2">
                Presently focused on development with javascript based
                solutions, experienced in Standard Product Based Development
                Lifecyle.
              </li>
            </ul>

            {/* Links */}
             <footer className="flex gap-6 flex-wrap items-center justify-center mt-4">
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-sky-300 transition-colors"
                  href="/arunKrishnaV1.pdf"
                  download="ArunKrishna.pdf"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-sky-300 transition-colors"
                  href="https://github.com/a-humanthing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-sky-300 transition-colors"
                  href="https://www.linkedin.com/in/arunkrishnakt/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-sky-300 transition-colors"
                  href="https://www.instagram.com/a.humanthing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </footer>
        </div>
      </div>
    </main>
  );
}
