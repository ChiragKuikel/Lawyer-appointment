import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">123 Legal Street, Suite 100<br />New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (212) 456-7890</p>
                  <p className="text-gray-600">+1 (212) 456-7891</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">info@lawyerbooking.com</p>
                  <p className="text-gray-600">support@lawyerbooking.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">🕒</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <img 
                src={assets.contact_image} 
                alt="Contact" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;