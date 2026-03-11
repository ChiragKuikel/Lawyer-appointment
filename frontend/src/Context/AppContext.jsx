import React, { createContext, useState, useEffect } from 'react';
import { lawyers, availableTimes } from '../assets/assets';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [lawyersList, setLawyersList] = useState([]);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [token, setToken] = useState(false);

  // Load lawyers data
  useEffect(() => {
    setLawyersList(lawyers);
    
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }

    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(true);
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  // Login function
  const login = (email, password) => {
    // Simulate login
    const userData = {
      name: email.split('@')[0],
      email: email,
      phone: '+1 234 567 8900'
    };
    setUser(userData);
    setToken(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummy-token-123');
    return true;
  };

  // Signup function
  const signup = (name, email, password) => {
    // Simulate signup
    const userData = {
      name: name,
      email: email,
      phone: ''
    };
    setUser(userData);
    setToken(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummy-token-123');
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Get lawyer's available times
  const getLawyerAvailability = (lawyerId) => {
    const availability = availableTimes.find(a => a.id === lawyerId);
    return availability || availableTimes[0]; // Return default if not found
  };

  // Check if time slot is already booked
  const isTimeSlotBooked = (lawyerId, date, timeSlot) => {
    return appointments.some(
      apt => apt.lawyerId === lawyerId && 
             apt.date === date && 
             apt.timeSlot === timeSlot &&
             apt.status !== 'cancelled'
    );
  };

  // Book appointment function
  const bookAppointment = (lawyerId, date, timeSlot, userDetails) => {
    const lawyer = lawyersList.find(l => l._id === lawyerId);
    
    const newAppointment = {
      id: Date.now(),
      lawyerId,
      lawyer: lawyer,
      date,
      timeSlot,
      userDetails,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      bookingReference: `APT-${Date.now()}`
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  };

  // Cancel appointment
  const cancelAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' } 
          : apt
      )
    );
  };

  // Update user profile
  const updateUserProfile = (profileData) => {
    setUser(profileData);
    localStorage.setItem('user', JSON.stringify(profileData));
  };

  const value = {
    lawyers: lawyersList,
    user,
    setUser,
    token,
    setToken,
    appointments,
    bookAppointment,
    cancelAppointment,
    login,
    signup,
    logout,
    getLawyerAvailability,
    isTimeSlotBooked,
    updateUserProfile
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;