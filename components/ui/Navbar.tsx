'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-abyss-blue/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0. 5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold glow-blue">
          SHADOWS
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/about" className="text-silver-white hover:text-jin-woo-blue transition-colors">
            About
          </Link>
          <Link href="/vision" className="text-silver-white hover:text-jin-woo-blue transition-colors">
            Vision
          </Link>
          <Link href="/team" className="text-silver-white hover:text-jin-woo-blue transition-colors">
            Team
          </Link>
          <Link href="/projects" className="text-silver-white hover:text-jin-woo-blue transition-colors">
            Projects
          </Link>
          <Link href="/contact" className="text-silver-white hover:text-jin-woo-blue transition-colors">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <Link href="/dashboard" className="text-icy-blue hover:text-jin-woo-blue">
                {session.user?. name || 'Dashboard'}
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-cursed-purple text-white rounded hover:shadow-lg transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border border-jin-woo-blue text-jin-woo-blue rounded hover:bg-jin-woo-blue hover:text-white transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-jin-woo-blue text-white rounded hover:shadow-lg transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion. nav>
  );
};
