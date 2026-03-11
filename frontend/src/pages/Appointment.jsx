import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    lawyers, 
    bookAppointment, 
    token, 
    getLawyerAvailability,
    isTimeSlotBooked,
    user 
  } = useContext(AppContext);
  
  const [lawyer, setLawyer] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    caseDescription: ''
  });

  // Generate next 14 days for booking
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Only include weekdays (Monday to Friday)
      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  useEffect(() => {
    const foundLawyer = lawyers.find(l => l._id === parseInt(id));
    if (foundLawyer) {
      setLawyer(foundLawyer);
      // Get lawyer's availability
      const avail = getLawyerAvailability(parseInt(id));
      setAvailability(avail);
    } else {
      navigate('/doctors');
    }
  }, [id, lawyers, navigate, getLawyerAvailability]);

  // Update booked slots when date changes
  useEffect(() => {
    if (selectedDate && lawyer) {
      // Check which time slots are already booked
      const booked = [];
      const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
      if (availability?.availability[dayOfWeek]) {
        const preferredSlots = availability.availability[dayOfWeek].preferred;
        preferredSlots.forEach(time => {
          if (isTimeSlotBooked(parseInt(id), selectedDate, time)) {
            booked.push(time);
          }
        });
      }
      setBookedSlots(booked);
    }
  }, [selectedDate, lawyer, id, isTimeSlotBooked, availability]);

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = () => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    } else if (step === 2) {
      // Simulate booking
      const appointment = bookAppointment(
        parseInt(id),
        selectedDate,
        selectedTime,
        userDetails
      );
      setBookingConfirmed(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        navigate('/my-appointments');
      }, 3000);
    }
  };

  const getDayAvailability = (date) => {
    if (!availability) return null;
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return availability.availability[dayOfWeek];
  };

  if (!lawyer) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lawyer details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Lawyer Info */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img 
              src={lawyer.image} 
              alt={lawyer.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{lawyer.name}</h1>
                <p className="text-xl text-primary font-semibold mb-2">{lawyer.speciality}</p>
                <p className="text-gray-600 mb-2">{lawyer.degree}</p>
                <p className="text-gray-600 mb-4">{lawyer.experience} experience</p>
              </div>
              <div className="bg-primary text-white px-4 py-2 rounded-lg">
                <span className="text-2xl font-bold">${lawyer.fees}</span>
                <span className="text-sm">/hour</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">About:</h3>
              <p className="text-gray-600 leading-relaxed">{lawyer.about}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Address:</h3>
              <p className="text-gray-600">{lawyer.address.line1}</p>
              <p className="text-gray-600">{lawyer.address.line2}</p>
            </div>
          </div>
        </div>
      </div>

      {!bookingConfirmed ? (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>1</div>
            <div className={`w-24 h-1 mx-2 ${
              step >= 2 ? 'bg-primary' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>2</div>
          </div>

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-8">Select Date & Time</h2>
              
              {/* Date Selection */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-4">
                  Available Dates
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {getAvailableDates().map((date) => {
                    const dayAvailability = getDayAvailability(date);
                    const isAvailable = dayAvailability !== undefined;
                    
                    return (
                      <button
                        key={date}
                        onClick={() => isAvailable && setSelectedDate(date)}
                        disabled={!isAvailable}
                        className={`p-4 border rounded-lg transition-all ${
                          selectedDate === date
                            ? 'bg-primary text-white border-primary'
                            : isAvailable
                              ? 'hover:border-primary hover:bg-gray-50'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {new Date(date).getDate()}
                        </div>
                        <div className="text-xs">
                          {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        {dayAvailability && (
                          <div className="text-xs mt-2 text-green-600">
                            {dayAvailability.available}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-4">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availability && getDayAvailability(selectedDate)?.preferred.map((time) => {
                      const isBooked = bookedSlots.includes(time);
                      
                      return (
                        <button
                          key={time}
                          onClick={() => !isBooked && setSelectedTime(time)}
                          disabled={isBooked}
                          className={`p-3 border rounded-lg transition-all ${
                            selectedTime === time && !isBooked
                              ? 'bg-primary text-white border-primary'
                              : isBooked
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                                : 'hover:border-primary hover:bg-gray-50'
                          }`}
                        >
                          {time}
                          {isBooked && (
                            <span className="block text-xs text-red-500">Booked</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  selectedDate && selectedTime
                    ? 'bg-primary text-white hover:bg-opacity-90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Details
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-8">Your Information</h2>
              
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Case Description (Optional)
                  </label>
                  <textarea
                    name="caseDescription"
                    value={userDetails.caseDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="Briefly describe your legal issue..."
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lawyer:</span>
                      <span className="font-medium">{lawyer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">1 hour</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold text-primary">${lawyer.fees}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!userDetails.name || !userDetails.email || !userDetails.phone}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      userDetails.name && userDetails.email && userDetails.phone
                        ? 'bg-primary text-white hover:bg-opacity-90'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-12 text-center max-w-2xl mx-auto">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-700 text-lg mb-4">
            Your appointment with <span className="font-semibold">{lawyer.name}</span> has been scheduled for:
          </p>
          <p className="text-xl font-semibold text-primary mb-2">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-xl font-semibold text-primary mb-6">
            at {selectedTime}
          </p>
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to {userDetails.email}
          </p>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Redirecting to your appointments...</p>
        </div>
      )}
    </div>
  );
};

export default Appointment;