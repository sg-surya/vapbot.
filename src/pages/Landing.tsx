import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Plus, MessageSquare, Zap, Layout, Settings, Globe, Shield, Bot, User, Send, Play, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-orange-500/30 font-sans overflow-x-hidden">
      {/* Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-4 px-4' : ''}`}>
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
            <a href="#products" className="hover:text-white transition-colors flex items-center gap-1">
              Products <ChevronDown className="w-3 h-3 opacity-70" />
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            <a href="#resources" className="hover:text-white transition-colors flex items-center gap-1">
              Resources <ChevronDown className="w-3 h-3 opacity-70" />
            </a>
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
        <section className="relative min-h-[100vh] flex flex-col items-center justify-start pt-[16vh] pb-20 px-6 text-center overflow-hidden">
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

        {/* Trust Bar */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
            <div className="text-xl font-bold tracking-tighter">vesparum.</div>
            <div className="text-xl font-bold flex items-center gap-1"><div className="w-4 h-4 bg-white"></div> MODE</div>
            <div className="text-xl font-bold flex items-center gap-1"><div className="w-4 h-4 rounded-full border-2 border-white"></div> INTERCOM</div>
            <div className="text-xl font-bold flex items-center gap-1"><div className="w-4 h-4 rotate-45 border-2 border-white"></div> Mosaic</div>
            <div className="text-xl font-bold">Canopy</div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From idea to deployment in minutes</h2>
              <p className="text-slate-400">A seamless workflow designed for speed and clarity.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Create your bot', desc: 'Give your bot a name, personality, and core instructions in seconds.', icon: <Bot className="w-6 h-6" /> },
                { step: '02', title: 'Design visually', desc: 'Drag and drop nodes to build complex conversation flows effortlessly.', icon: <Layout className="w-6 h-6" /> },
                { step: '03', title: 'Deploy instantly', desc: 'Publish your bot to your website or messaging channels with one click.', icon: <Zap className="w-6 h-6" /> }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-8xl font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors pointer-events-none">{item.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flow Builder Showcase */}
        <section className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Visual Flow Builder</h2>
              <p className="text-slate-400">Complex logic made simple with our intuitive node-based editor.</p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-[#0F1420] shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
              {/* Mockup of UI */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              {/* Nodes Mockup */}
              <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
                <div className="w-64 bg-[#1A2133] border border-white/10 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-blue-400"><MessageSquare className="w-3 h-3" /></div>
                    <span className="text-sm font-medium">Welcome Message</span>
                  </div>
                  <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">Hi! How can I help you today?</div>
                </div>

                <div className="hidden md:block w-16 h-[2px] bg-orange-500/50 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-orange-500/50 rotate-45"></div>
                </div>

                <div className="w-64 bg-[#1A2133] border border-orange-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center text-orange-400"><Bot className="w-3 h-3" /></div>
                    <span className="text-sm font-medium">AI Processing</span>
                  </div>
                  <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">Analyze intent and generate response...</div>
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Test your bot in real-time</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Every change you make in the visual builder is instantly reflected in the live preview. Iterate faster and perfect your conversational flows before deploying to production.
                </p>
                <ul className="space-y-4">
                  {['Instant feedback loop', 'Variable state tracking', 'Path highlighting', 'Error detection'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Chat Preview Mockup */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-purple-500/10 blur-3xl rounded-full"></div>
                <div className="relative bg-[#1A2133] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
                  <div className="h-14 border-b border-white/5 flex items-center px-4 bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Support Bot</div>
                        <div className="text-xs text-green-400">Online</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-4 overflow-hidden flex flex-col justify-end">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-slate-200">Hi there! How can I help you today?</div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center shrink-0"><User className="w-4 h-4" /></div>
                      <div className="bg-orange-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm">I need help with my account.</div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-slate-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                    <div className="bg-white/5 border border-white/10 rounded-full flex items-center px-4 py-2">
                      <input type="text" placeholder="Type a message..." className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder:text-slate-500" disabled />
                      <Send className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build powerful bots</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Visual Flow Builder', desc: 'Drag, drop, and connect nodes to create complex logic without coding.', icon: <Layout className="w-5 h-5" /> },
                { title: 'Real-time Testing', desc: 'Test your bot instantly as you build it with the integrated chat preview.', icon: <Play className="w-5 h-5" /> },
                { title: 'Smart Input Collection', desc: 'Easily collect and store user data into variables for personalized experiences.', icon: <MessageSquare className="w-5 h-5" /> },
                { title: 'Custom Logic', desc: 'Add conditions, branching, and API calls to make your bot truly intelligent.', icon: <Settings className="w-5 h-5" /> },
                { title: 'Fast Deployment', desc: 'Deploy your bot to your website or messaging channels with a single click.', icon: <Globe className="w-5 h-5" /> },
                { title: 'Scalable Architecture', desc: 'Built on modern infrastructure to handle thousands of concurrent conversations.', icon: <Shield className="w-5 h-5" /> }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/10 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to build your first AI bot?</h2>
            <p className="text-xl text-slate-400 mb-10">Join thousands of creators building the next generation of conversational experiences.</p>
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-8 py-6 text-lg font-medium">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-8 py-6 text-lg font-medium">
                  Get Started for Free
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-lg tracking-tight">Vasudev AI</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 Vasudev AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
