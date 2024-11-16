import { Link } from "react-router-dom";
import FacebookIcon from "../assets/facebook-app-symbol.png";
import InstagramIcon from "../assets/instagram.png";
import TwitterIcon from "../assets/twitter.png";
import React from 'react';

function Footer() {
  const footerData = [
    {
      title: 'About Mealo',
      links: [
        { name: 'Contact Us', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Report Fraud', url: '#' },
      ],
    },
    {
      title: 'Learn More',
      links: [
        { name: 'Blog', url: '#' },
        { name: 'Privacy', url: '#' },
        { name: 'Security', url: '#' },
        { name: 'Terms & Conditions', url: '#' },
      ],
    },
    {
      title: 'For Restaurants',
      links: [
        { name: 'Partner With Us', url: '/PartnerWithUs' },
      ],
    },
    {
      title: 'Social Links',
      links: [
        { name: 'Facebook', icon: FacebookIcon, url: '#' },
        { name: 'Twitter', icon: TwitterIcon, url: '#' },
        { name: 'Instagram', icon: InstagramIcon, url: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="font-extrabold text-4xl text-gray-800">Mealo</h1>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  link.icon ? (
                    <li key={linkIndex} className="inline-block m-2">
                      <Link to={link.url}>
                        <img className="w-6 h-6 inline-block" src={link.icon} alt={link.name} />
                      </Link>
                    </li>
                  ) : (
                    <li key={linkIndex}>
                      <Link to={link.url} className="text-gray-600 hover:text-gray-900">
                        {link.name}
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Text */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-600">
          <p>
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. All trademarks are properties
            of their respective owners. 2024 © Mealo™ Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
