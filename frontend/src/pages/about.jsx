import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={assets.about_image} 
            alt="About Us" 
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Lawyer Booking Platform</h2>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              We are dedicated to connecting clients with experienced and trusted lawyers across various legal specialities. 
              Our platform simplifies the process of finding and booking legal consultations, making justice more accessible 
              to everyone.
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Whether you need assistance with criminal defense, corporate matters, family issues, or any other legal concern, 
              our network of qualified attorneys is here to help. We carefully vet each lawyer to ensure they meet our high 
              standards of professionalism and expertise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-2">👥</div>
                <h3 className="font-semibold text-gray-800">15+ Lawyers</h3>
                <p className="text-sm text-gray-600">Experienced professionals</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚖️</div>
                <h3 className="font-semibold text-gray-800">6+ Specialities</h3>
                <p className="text-sm text-gray-600">Legal areas covered</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="font-semibold text-gray-800">100+ Appointments</h3>
                <p className="text-sm text-gray-600">Successfully booked</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To make legal services more accessible, transparent, and convenient through technology. 
                We believe that everyone deserves quality legal representation, and we're here to make that happen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;