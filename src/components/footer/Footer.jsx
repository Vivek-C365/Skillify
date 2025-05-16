import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Categories', path: '/Categories' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const categories = [
    { name: 'Web Development', path: '/category/web-development' },
    { name: 'Data Science', path: '/category/data-science' },
    { name: 'UI/UX Design', path: '/category/ui-ux-design' },
    { name: 'Mobile Development', path: '/category/mobile-development' },
  ];



  const contact = [
    { icon: <Mail size={16} />, text: 'info@skillify.com', type: 'email' },
    { icon: <Phone size={16} />, text: '+1 234 567 890', type: 'tel' },
    { icon: <MapPin size={16} />, text: '123 Education Street, Learning City, LC 12345', type: 'address' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, url: '#', name: 'Facebook' },
    { icon: <Twitter size={20} />, url: '#', name: 'Twitter' },
    { icon: <Instagram size={20} />, url: '#', name: 'Instagram' },
    { icon: <Linkedin size={20} />, url: '#', name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Skillify</h3>
            <p className="text-gray-400 mb-4">
              Empowering learners worldwide with quality education and practical skills for the future.
            </p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="hover:text-[var(--color-dark-lavender)] transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[var(--color-dark-lavender)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Courses</h4>
            <ul className="space-y-2" role="list">
              {categories.map((course, index) => (
                <li key={index}>
                  <Link
                    to={course.path}
                    className="text-gray-400 hover:text-[var(--color-dark-lavender)] transition-colors"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3" role="list">
              {contact.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-400">
                  {item.icon}
                  <a 
                    href={item.type === 'email' ? `mailto:${item.text}` : 
                          item.type === 'tel' ? `tel:${item.text}` : '#'}
                    className="hover:text-[var(--color-dark-lavender)] transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Skillify. All rights reserved.
            </p>
            <nav className="flex space-x-6 mt-4 md:mt-0" aria-label="Footer links">
              <Link to="/privacy" className="text-gray-400 hover:text-[var(--color-dark-lavender)] text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[var(--color-dark-lavender)] text-sm">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 