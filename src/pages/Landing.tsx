import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mic } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-orange-500/30 font-sans overflow-x-hidden p-[3px]">
      <div className="min-h-[calc(100vh-6px)] w-full bg-[#0B0F19] rounded-b-[20px] border border-white/5 relative overflow-hidden">
        {/* Navbar */}
        <div className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-4 px-4' : ''}`}>
          <nav className={`mx-auto transition-all duration-300 flex items-center justify-between ${
            isScrolled 
              ? 'max-w-5xl bg-[#0B0F19]/60 backdrop-blur-md border border-white/10 h-16 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
              : 'max-w-7xl bg-transparent h-20 px-6'
          }`}>
            <div className="flex items-center">
              <span className="font-bold text-xl tracking-tight text-orange-500 lowercase">
                vapbot{isScrolled && <span className="text-orange-500">.</span>}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              {/* Links removed as sections are gone */}
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Link to="/dashboard" className="flex items-center gap-3 group">
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors hidden sm:block">
                    Dashboard
                  </span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff8a00] to-[#e52e71] flex items-center justify-center text-white font-medium shadow-[0_0_15px_rgba(255,138,0,0.3)] border border-white/10 group-hover:scale-105 transition-transform">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link to="/signup">
                    <button className={`px-5 py-2 text-sm font-medium transition-all ${
                      isScrolled 
                        ? 'bg-white text-black rounded-full hover:bg-slate-200' 
                        : 'bg-[#1A1D24]/80 hover:bg-[#2A2D34]/80 border border-white/10 text-white rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.2)] backdrop-blur-md'
                    }`}>
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-[calc(100vh-6px)] flex flex-col items-center justify-start pt-[16vh] pb-20 px-6 text-center overflow-hidden">
          {/* Cinematic Background Layers */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Base Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-screen" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            
            {/* Ambient Center Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
            
            {/* Bottom Cinematic Glow (Orange/White) */}
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,120,50,0.35)_0%,rgba(255,255,255,0.05)_30%,transparent_70%)] blur-[80px] mix-blend-screen"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10 mt-10">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-8 backdrop-blur-md">
              Introducing Vasudev AI Builder 2.0
            </div>
            
            {/* Cinematic Heading */}
            <h1 className="text-5xl md:text-[76px] font-medium tracking-tight mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
              Build <span className="font-serif italic text-[#f97316] relative inline-block">
                AI Bots
                <span className="absolute bottom-2 left-0 w-full h-[3px] bg-[#f97316]"></span>
              </span><br/>
              That Actually Talk<br/>
              Like Humans
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Design, test, and deploy intelligent conversational workflows visually — without writing a single line of code.
            </p>

            {/* Hyper-Realistic Glass Input Box */}
            <div className="relative max-w-2xl mx-auto p-[1px] rounded-2xl bg-gradient-to-b from-white/20 to-white/5 shadow-[0_16px_40px_rgba(0,0,0,0.6)] group">
              {/* Glass Backdrop */}
              <div className="absolute inset-0 rounded-2xl bg-[#1A1D24]/80 backdrop-blur-2xl"></div>
              
              {/* Inner Content */}
              <div className="relative flex items-center gap-3 p-3 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] bg-white/[0.02]">
                
                {/* Input */}
                <input 
                  type="text" 
                  placeholder="Create a Whatsapp bot for cold messaging..." 
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 px-4 py-2 text-lg font-light"
                />
                
                {/* Right Actions */}
                <div className="flex items-center gap-3 pr-1">
                  <button className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <Mic className="w-5 h-5" />
                  </button>
                  <Link to={user ? "/dashboard" : "/signup"}>
                    <button className="w-11 h-11 rounded-full bg-gradient-to-b from-[#ff8a00] to-[#e52e71] flex items-center justify-center shadow-[0_0_20px_rgba(255,138,0,0.4)] group-hover:shadow-[0_0_30px_rgba(255,138,0,0.6)] hover:scale-105 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
                      <ArrowRight className="w-5 h-5 text-white relative z-10" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
  );
}
