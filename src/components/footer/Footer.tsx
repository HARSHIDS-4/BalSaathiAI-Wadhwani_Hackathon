import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/design-system';
import { useLanguage } from '../../contexts/AppContext';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from 'lucide-react';

const Footer: React.FC = () => {
  const { isHindi } = useLanguage();

  const quickLinks = [
    { label: isHindi ? 'होम' : 'Home', href: '#' },
    { label: isHindi ? 'प्लेटफॉर्म' : 'Platform', href: '#' },
    { label: isHindi ? 'प्रशिक्षण' : 'Training', href: '#' },
    { label: isHindi ? 'प्रभाव' : 'Impact', href: '#' },
  ];

  const resources = [
    { label: isHindi ? 'मदद' : 'Help', href: '#' },
    { label: isHindi ? 'गोपनीयता' : 'Privacy', href: '#' },
    { label: isHindi ? 'शर्तें' : 'Terms', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, #FDFBF7 0%, #E8F5E9 100%)` }}>
      {/* Top wave */}
      <div className="h-16 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.41-40.77,37.16-18.62,75.49-36.32,118.22-40.67,61.32-6.29,120.08,15.63,178.75,32.59C662.42,58.46,713.69,69,767.69,71.46c57.38,2.61,113.61-8.5,168-25,38.79-11.74,77.15-26.57,117.35-34.61C1107.34,2.16,1157.16,7.61,1200,26.89V0Z" opacity=".5"></path>
          <path d="M0,0V13.16c45.5,13.24,89.08,33.54,125.65,66.59C179.32,127,226.3,186.38,304.8,203.52c61.49,13.44,124.14-5.08,178.35-34.59,52.15-28.35,95.48-69.19,152.49-88.57,69.94-23.76,145.69-16.57,215.58,6.15,72.67,23.68,137.48,69.75,213.27,78.78,33.62,4,67.82-.14,98.68-13.78,25.87-11.46,48.45-29.69,67.34-50.83V0Z"></path>
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: COLORS.primary }} />
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full blur-3xl opacity-15" style={{ background: COLORS.accent }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)` }}
                >
                  <Heart size={20} color="white" />
                </div>
                <span className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                  BalSaathiAI
                </span>
              </div>

              <p className="text-gray-600 mb-6 max-w-md">
                {isHindi
                  ? 'भारत के हर बच्चे के लिए AI-संचालित प्रारंभिक विकासात्मक स्क्रीनिंग।'
                  : 'AI-powered early developmental screening for every child in Bharat.'}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:contact@balsaathai.ai"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail size={16} style={{ color: COLORS.primary }} />
                  contact@balsaathai.ai
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} style={{ color: COLORS.accent }} />
                  +91 1800-XXX-XXXX
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin size={16} style={{ color: COLORS.success }} className="flex-shrink-0 mt-0.5" />
                  <span>
                    {isHindi
                      ? 'नई दिल्ली, भारत'
                      : 'New Delhi, India'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-4" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'त्वरित लिंक' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-lg mb-4" style={{ color: COLORS.textPrimary }}>
                {isHindi ? 'संसाधन' : 'Resources'}
              </h3>
              <ul className="space-y-3">
                {resources.map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              {isHindi
                ? '© 2026 BalSaathiAI. सभी अधिकार सुरक्षित।'
                : '© 2026 BalSaathiAI. All rights reserved.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0, 0, 0, 0.05)' }}
                  whileHover={{
                    scale: 1.1,
                    background: COLORS.primary,
                    color: 'white',
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Made with love */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-gray-400 inline-flex items-center gap-1">
              {isHindi ? 'भारत में बनाया गया' : 'Made in India'}{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} style={{ color: COLORS.danger }} fill={COLORS.danger} />
              </motion.span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
