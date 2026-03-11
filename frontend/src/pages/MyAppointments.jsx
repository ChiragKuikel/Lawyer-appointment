import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const MyAppointments = () => {
  const { appointments, cancelAppointment, token } = useContext(AppContext);
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Please Login to View Appointments</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to see your appointments.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4 text-gray-400">📅</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Appointments Yet</h2>
          <p className="text-gray-500 mb-6">Book your first appointment with a trusted lawyer</p>
          <button
            onClick={() => navigate('/doctors')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Browse Lawyers
          </button>
        </div>
      </div>
    );
  }

  // Separate active and cancelled appointments
  const activeAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled');

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>
      
      {/* Active Appointments */}
      {activeAppointments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {activeAppointments.map((apt) => (
              <AppointmentCard 
                key={apt.id} 
                appointment={apt} 
                cancelAppointment={cancelAppointment}
                isActive={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Past/Cancelled Appointments */}
      {cancelledAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Past & Cancelled Appointments</h2>
          <div className="space-y-4 opacity-75">
            {cancelledAppointments.map((apt) => (
              <AppointmentCard 
                key={apt.id} 
                appointment={apt} 
                cancelAppointment={cancelAppointment}
                isActive={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AppointmentCard = ({ appointment, cancelAppointment, isActive }) => {
  const navigate = useNavigate();
  const { lawyer, date, timeSlot, userDetails, bookingReference } = appointment;

  if (!lawyer) return null;

  const appointmentDate = new Date(date);
  const isPastAppointment = appointmentDate < new Date();

  const handleReschedule = () => {
    navigate(`/appointment/${lawyer._id}`);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden border-l-4 ${
      appointment.status === 'cancelled' ? 'border-red-500' : 'border-green-500'
    }`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-48 h-48">
          <img
            src={lawyer.image}
            alt={lawyer.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{lawyer.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {appointment.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                </span>
              </div>
              <p className="text-primary font-medium mb-1">{lawyer.speciality}</p>
              <p className="text-gray-600 text-sm mb-3">Ref: {bookingReference}</p>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${lawyer.fees}</p>
              <p className="text-sm text-gray-500">per hour</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-start gap-2">
              <span className="text-gray-400">📅</span>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {appointmentDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-gray-400">⏰</span>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{timeSlot}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-gray-400">📞</span>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{userDetails?.phone}</p>
              </div>
            </div>
          </div>

          {userDetails?.caseDescription && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Case Description:</p>
              <p className="text-gray-700 text-sm">{userDetails.caseDescription}</p>
            </div>
          )}

          {isActive && !isPastAppointment && appointment.status === 'confirmed' && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => cancelAppointment(appointment.id)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                Cancel Appointment
              </button>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                Reschedule
              </button>
            </div>
          )}

          {(appointment.status === 'cancelled' || isPastAppointment) && (
            <div className="mt-4">
              <button
                onClick={handleReschedule}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
              >
                Book New Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;