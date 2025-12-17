"use client";

import React, { useState, useEffect } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { doto } from "@/app/font";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    try {
      const visitorId = localStorage.getItem("visitor_id");
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, visitorId }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
      }, 2000);
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
         onClick={() => setIsOpen(true)}
         className="fixed bottom-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full text-white shadow-lg transition-all transform hover:scale-105"
         aria-label="Contact Me"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-md bg-slate-900/90 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className={`${doto.className} text-3xl text-white mb-2`}>Get in Touch</h2>
            <p className="text-slate-400 text-sm mb-6">
              Drop a message and I'll get back to you effectively.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-green-400">
                <Send className="w-12 h-12 mb-4" />
                <p className="text-lg font-semibold">Message Sent!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {status === "error" && (
                    <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                  {!isLoading && <Send className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
