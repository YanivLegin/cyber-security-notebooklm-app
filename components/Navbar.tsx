'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Video, BookOpen, Cpu, Github, ExternalLink, Database } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Cpu },
    { name: 'Create Presentation/Video', href: '/create', icon: Video },
    { name: 'Security Guidelines', href: '/guidelines', icon: ShieldAlert },
    { name: 'NotebookLM Studio', href: '/notebooklm', icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 cyber-glass border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-accent to-cyber-purple flex items-center justify-center text-black font-bold shadow-lg group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-6 h-6 text-black" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              CyberStudio
            </span>
            <span className="text-xs block text-cyan-400/80 font-mono">NotebookLM AI Engine</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 bg-gray-900/80 p-1.5 rounded-xl border border-gray-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Connection Status Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono">
            <Database className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-gray-300">Supabase: <span className="text-emerald-400">Connected</span></span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-xs text-gray-300 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-gray-500" />
          </a>
        </div>
      </div>
    </nav>
  );
}
