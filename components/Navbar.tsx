'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Video, BookOpen, LayoutDashboard, Activity, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'לוח בקרה', href: '/', icon: LayoutDashboard },
    { name: 'מחולל AI אוטומטי', href: '/create', icon: Video },
    { name: 'מעקב סטטוס', href: '/tracker', icon: Activity },
    { name: 'הנחיות אבטחה', href: '/guidelines', icon: ShieldAlert },
    { name: 'API Studio', href: '/notebooklm', icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#050811]/90 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-3" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 transition-colors">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-wider text-white font-tactical uppercase">
                CyberStudio<span className="text-cyan-400">.AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-tactical font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                v2.6 TRACKER ACTIVE
              </span>
            </div>
            <span className="text-[10px] block text-gray-400 font-tactical uppercase tracking-wider">NotebookLM Threat Defense Engine</span>
          </div>
        </Link>

        {/* Tactical Navigation */}
        <div className="flex items-center gap-1 bg-[#0d1322] p-1 rounded-xl border border-cyan-500/20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-tactical tracking-tight transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* System HUD Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-tactical text-cyan-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>סטטוס מעקב: <strong className="text-cyan-400">פעיל (Live)</strong></span>
          </div>
        </div>
      </div>
    </nav>
  );
}
