import React from 'react';
import logo from '../../assets/images/logo.png'
import whatsapp from '../../assets/images/whatsapp.png'
import insta from '../../assets/images/insta.png'
import fb from '../../assets/images/fb.png'
import { Link } from 'react-scroll';


const Footer = () => {
  return (
    <footer className="bg-white py-10 border-t border-gray-200">
      <div className="container mx-auto flex justify-between items-start">
        <div className="w-1/4">
          <img src={logo} alt="DressLend Logo" className="mb-4" />
          <p className="text-gray-600">Rent Nepali Ethnic and Western Wear, All in One Place, at Affordable Prices.</p>
        </div>
        <div className="w-1/5">
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-600">Terms and Condition</a></li>
            <li><a href="#" className="text-gray-600">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="w-1/5">
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-600">Help/FAQ</a></li>
            <li className="mb-2"><a href="#" className="text-gray-600">Press</a></li>
            <li><a href="#" className="text-gray-600">Affiliates</a></li>
          </ul>
        </div>
        <div className="w-1/5">
          <h4 className="text-lg font-semibold mb-4">Service</h4>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-600">Home</a></li>
            <li className="mb-2"><a href="#" className="text-gray-600">Traditional Wear</a></li>
            <li className="mb-2"><a href="#" className="text-gray-600">Western Wear</a></li>
            <li><a href="#" className="text-gray-600">Accessories</a></li>
          </ul>
        </div>
        <div className="w-1/5">
          <h4 className="text-lg font-semibold mb-4">Get in touch with</h4>
          <div className="flex items-center justify-between">
            <a href="#" className="text-gray-600">
              <img src={fb} alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600">
              <img src={insta} alt="Instagram" className="h-9 w-12" />
            </a>
            <a href="#" className="text-gray-600">
              <img src={whatsapp} alt="WhatsApp" className="h-8 w-10" />
            </a>
            <div className="flex items-center justify-center mt-2">
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full animate-bounce"
              >
                <svg className="w-6 h-6 text-white transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </Link>
            </div>
          </div>

        </div>


      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600">All rights reserved @DressLend.co</p>
      </div>
    </footer>
  );
}

export default Footer;
