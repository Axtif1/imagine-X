import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-8 mt-12 mb-4 text-center border-t border-zinc-800/50">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="#" className="hover:text-zinc-300 transition-colors">About</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Creators</a>
        </div>
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Imaginex. Built for inspiration.
        </p>
      </div>
    </footer>
  );
};
