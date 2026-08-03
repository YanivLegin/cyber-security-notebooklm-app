import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'CyberStudio AI - NotebookLM Cybersecurity Presentation & Video Creator',
  description: 'Build AI-generated cybersecurity awareness slide decks, video scripts, and audio overviews via NotebookLM with strict security guidelines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-cyber-dark text-gray-100 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
          {children}
        </main>
        <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-500 font-mono">
          CyberStudio NotebookLM Platform &copy; 2026. Connected to GitHub, Vercel & Supabase.
        </footer>
      </body>
    </html>
  );
}
