'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  color: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'HOME', color: '#1F6BFF' },
  { href: '/about', label: 'ABOUT', color: '#1F6BFF' },
  { href: '/vision', label: 'VISION', color: '#8EFFC1' },
  { href: '/team', label: 'TEAM', color: '#6F2BFF' },
  { href: '/projects', label: 'PROJECTS', color: '#37F8FF' },
  { href: '/contact', label: 'CONTACT', color: '#FF6B18' },
];

export const NavbarAnimated: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-shadow-black/80 backdrop-blur-md border-b border-jin-woo-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-jin-woo-blue to-cursed-purple"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="font-heading text-2xl font-bold text-jin-woo-blue"
              style={{ textShadow: '0 0 20px #1F6BFF' }}
              whileHover={{ textShadow: '0 0 30px #1F6BFF, 0 0 50px #1F6BFF' }}
            >
              SHADOWS
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredLink === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-4 py-2"
                >
                  <motion.span
                    className="relative z-10 font-semibold text-sm tracking-wider"
                    style={{
                      color: isActive ? link.color : '#E5E7EB',
                      textShadow: isActive ? `0 0 20px ${link.color}` : 'none',
                    }}
                    animate={{
                      color: isHovered ? link.color : isActive ? link.color : '#E5E7EB',
                      textShadow:
                        isHovered || isActive ? `0 0 20px ${link.color}` : '0 0 0px transparent',
                    }}
                  >
                    {link.label}
                  </motion.span>

                  {/* Active/Hover Indicator */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: link.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}

            {/* Login Button */}
            <Link href="/login">
              <motion.button
                className="ml-4 px-6 py-2 bg-jin-woo-blue text-white font-bold rounded-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #1F6BFF' }}
                whileTap={{ scale: 0.95 }}
              >
                LOGIN
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-silver-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-jin-woo-blue rounded"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 9 : 0,
                }}
              />
              <motion.span
                className="w-full h-0.5 bg-jin-woo-blue rounded"
                animate={{ opacity: isOpen ? 0 : 1 }}
              />
              <motion.span
                className="w-full h-0.5 bg-jin-woo-blue rounded"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -9 : 0,
                }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-shadow-black/95 backdrop-blur-lg border-t border-jin-woo-blue/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 rounded-lg"
                      style={{
                        backgroundColor: isActive ? `${link.color}20` : 'transparent',
                        borderLeft: isActive ? `3px solid ${link.color}` : '3px solid transparent',
                      }}
                    >
                      <span
                        className="font-semibold"
                        style={{
                          color: isActive ? link.color : '#E5E7EB',
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 bg-jin-woo-blue text-white font-bold rounded-lg">
                    LOGIN
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarAnimated;
