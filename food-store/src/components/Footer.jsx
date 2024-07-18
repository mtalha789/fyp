import { Link } from "react-router-dom";
import FacebookIcon from "../assets/facebook-app-symbol.png" 
import InstagramIcon from "../assets/instagram.png" 
import TwitterIcon from "../assets/twitter.png" 



import React from 'react';

function Footer (props) {
    // src/data/footerData.js
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
        <div className='bg-gray-100 h-78 mt-16'>
        <div className='grid content-center justify-center items-center grid-flow-row'>
          <div className='flex h-16 w-96 mt-8'>
            <Link to='/'>
            <h1 className='font-extrabold text-4xl'>Mealo</h1>
            </Link>
          </div>
          <div className='flex mb-6 justify-between'>
            {footerData.map((item, index) => (
              <div key={index}>
                <p className='text-lg font-medium'>{item.title}</p>
                {item.links.map((link, linkIndex) => (
                  link.icon ? (
                    <div className='flex m-2' key={linkIndex}>
                       <Link to={link.url}>
                      <img className='w-6 h-6' src={link.icon} alt={link.name} />
                    </Link>
                    </div>
                  ) : (
                    <p key={linkIndex}>
                       <Link to={link.url}> {link.name}</Link>
                        </p>
                  )
                ))}
              </div>
            ))}
          </div>
          <div className='border-t-2 mb-8'>
            <p>
              By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties <br />
              of their respective owners. 2024 © Mealo™ Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

export default  Footer;