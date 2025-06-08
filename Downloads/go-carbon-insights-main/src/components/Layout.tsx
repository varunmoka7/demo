
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Target, FileText, Home, Users, Settings, Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from '@/components/ui/Logo';
import GlobalSearch from './GlobalSearch';
import Breadcrumb from './Breadcrumb';
import LogoutButton from './LogoutButton';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simplified main navigation (5 core items + search + profile)
  const mainNavigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart },
    { 
      name: 'Tracking', 
      href: '/tracking', 
      icon: Target,
      dropdown: [
        { name: 'Tracking Overview', href: '/tracking' },
        { name: 'Scope 1 Emissions', href: '/scope1' },
        { name: 'Scope 2 Emissions', href: '/scope2' },
        { name: 'Scope 3 Emissions', href: '/scope3' },
      ]
    },
    { name: 'Decarbonization', href: '/decarbonization', icon: Target },
  ];

  // Footer organization with 5 logical columns
  const footerSections = {
    platform: {
      title: 'Platform',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Contact', href: '/contact' },
        { name: 'Methodology', href: '/methodology' },
      ]
    },
    tracking: {
      title: 'Emissions Tracking',
      links: [
        { name: 'Scope 1 Emissions', href: '/scope1' },
        { name: 'Scope 2 Emissions', href: '/scope2' },
        { name: 'Scope 3 Emissions', href: '/scope3' },
        { name: 'Tracking Overview', href: '/tracking' },
      ]
    },
    analytics: {
      title: 'Analytics & Planning',
      links: [
        { name: 'Reports', href: '/reports' },
        { name: 'Decarbonization', href: '/decarbonization' },
        { name: 'Benchmarking', href: '/dashboard' },
        { name: 'Analysis', href: '/analysis' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Reference', href: '/reference' },
        { name: 'Documentation', href: '/methodology' },
        { name: 'Support', href: '/contact' },
        { name: 'Funding', href: '/funding' },
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Profile', href: '/profile' },
        { name: 'Privacy Policy', href: '/about' },
      ]
    }
  };

  const isActive = (href: string) => location.pathname === href;
  const isTrackingActive = () => ['/tracking', '/scope1', '/scope2', '/scope3'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex items-center gap-2">
                <Logo size="medium" className="rounded-lg" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  GoCarbonTracker
                </span>
              </Link>
              
              {/* Desktop Navigation - Simplified to 5 core items */}
              <nav className="hidden lg:flex items-center space-x-1">
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.dropdown) {
                    return (
                      <DropdownMenu key={item.name}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                              isTrackingActive()
                                ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.name}
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                          {item.dropdown.map((subItem) => (
                            <DropdownMenuItem key={subItem.name} asChild>
                              <Link 
                                to={subItem.href}
                                className={`w-full ${
                                  isActive(subItem.href) 
                                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' 
                                    : ''
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 inline mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <GlobalSearch />
              
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>

              {user && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </span>
                  <LogoutButton />
                </div>
              )}

              <Button 
                variant="outline" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4">
              <div className="space-y-2">
                {mainNavigation.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.dropdown) {
                    return (
                      <div key={item.name} className="space-y-1">
                        <div className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                          <Icon className="h-4 w-4 inline mr-2" />
                          {item.name}
                        </div>
                        <div className="pl-6 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-3 py-2 rounded-md text-sm ${
                                isActive(subItem.href)
                                  ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.href)
                          ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 inline mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        <div role="main" aria-label="Main content">
          {children}
        </div>
      </main>

      {/* Footer - Reorganized with 5 logical columns */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block text-sm text-gray-600 dark:text-gray-300 hover:text-teal-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © 2024 GoCarbonTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
