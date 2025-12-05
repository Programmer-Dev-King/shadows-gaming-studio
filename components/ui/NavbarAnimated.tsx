'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AnimatedLink } from '@/components/AnimatedLink';

export const NavbarAnimated: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/about', label: 'ABOUT' },
    { href: '/vision', label: 'VISION' },
    { href: '/team', label: 'TEAM' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-abyss-blue/80 backdrop-blur-md border-b border-jin-woo-blue/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <AnimatedLink href="/" className="block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black"
            style={{
              color: '#1F6BFF',
              textShadow: isScrolled ? '0 0 20px #1F6BFF' : '0 0 10px #1F6BFF',
            }}
          >
            SHADOWS
          </motion.div>
        </AnimatedLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <AnimatedLink
                href={link.href}
                className={`font-bold transition-all relative group ${
                  pathname === link.href
                    ? 'text-jin-woo-blue'
                    : 'text-silver-white hover:text-jin-woo-blue'
                }`}
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-jin-woo-blue"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatedLink>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <AnimatedLink href="/dashboard" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-icy-blue hover:text-jin-woo-blue font-bold transition-colors"
                >
                  {session.user?.name || 'DASHBOARD'}
                </motion.button>
              </AnimatedLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => signOut()}
                className="px-4 py-2 bg-cursed-purple text-white rounded font-bold hover:shadow-lg transition-all"
              >
                LOGOUT
              </motion.button>
            </>
          ) : (
            <>
              <AnimatedLink href="/login" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 border-2 border-jin-woo-blue text-jin-woo-blue rounded font-bold hover:bg-jin-woo-blue/10 transition-all"
                >
                  LOGIN
                </motion.button>
              </AnimatedLink>
              <AnimatedLink href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-jin-woo-blue text-white rounded font-bold hover:shadow-lg transition-all"
                >
                  SIGN UP
                </motion.button>
              </AnimatedLink>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-jin-woo-blue text-2xl"
          >
            ☰
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-abyss-blue/90 backdrop-blur-md border-t border-jin-woo-blue/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <AnimatedLink
                  key={link.href}
                  href={link.href}
                  className="block text-silver-white hover:text-jin-woo-blue font-bold py-2 transition-colors"
                >
                  <span onClick={() => setIsMobileMenuOpen(false)}>{link.label}</span>
                </AnimatedLink>
              ))}
              {session && (
                <AnimatedLink href="/dashboard" className="block">
                  <button
                    className="w-full text-left text-icy-blue font-bold py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    DASHBOARD
                  </button>
                </AnimatedLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavbarAnimated;
