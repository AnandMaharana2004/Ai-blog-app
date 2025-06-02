"use client";

import { useState } from "react";
import Link from "next/link"; // Using Next.js Link, replace with <a> if not using Next.js
import {
  PenTool,
  Sparkles,
  Menu as MenuIcon,
  X as XIcon,
  UserCircle,
  LayoutDashboard,
  Compass,
  Home, // Optional: for a Home link if the logo itself isn't the only home link
} from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/explore", label: "Explore", icon: <Compass className="w-5 h-5 mr-2" /> },
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5 mr-2" /> },
    // Add more links as needed
  ];

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group" aria-label="Homepage">
              <div className="relative">
                <PenTool className="w-7 h-7 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <Sparkles className="w-3 h-3 text-purple-500 absolute -top-1 -right-1 animate-pulse group-hover:text-purple-600 transition-colors" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                BlogAI
              </h1>
            </Link>
          </div>

          {/* Desktop Nav links & User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <button
              className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              aria-label="User Profile"
            >
              <UserCircle className="h-7 w-7" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-md shadow-xl z-40 border-t border-gray-200" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <UserCircle className="h-10 w-10 text-gray-600" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Your Name</div> {/* Placeholder */}
                <div className="text-sm font-medium text-gray-500">your.email@example.com</div> {/* Placeholder */}
              </div>
              {/* You might want to add a sign-out button or profile link here */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}