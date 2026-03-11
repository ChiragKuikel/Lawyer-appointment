# Lawyer Booking Platform

A modern web application for booking appointments with lawyers. Built using **React.js** and **Tailwind CSS**, this platform allows clients to easily browse lawyer profiles, search based on specialization or experience, and book consultations based on real-time availability.

The application simulates a real-world booking platform using **localStorage for data persistence**, providing a smooth and responsive user experience across devices.

---

# Overview

The Lawyer Booking Platform connects clients with lawyers from various legal specialties. Users can browse lawyer profiles, apply filters, and schedule appointments using a simple and intuitive interface.

Clients can also manage their bookings, view upcoming consultations, and update their personal profiles.

---

# Key Features

## Client Features

### Browse Lawyers
View a complete list of lawyers with detailed profiles including specialty, years of experience, and consultation fees.

### Advanced Search and Filters
Search and filter lawyers based on:

- Name  
- Legal specialty  
- Years of experience  
- Consultation fees  

### Multiple View Modes
Switch between **grid view** and **list view** for better browsing experience.

### Appointment Booking
Book appointments by selecting a **date and time slot** based on lawyer availability.

### Booking Management
Clients can:

- View upcoming appointments  
- Cancel bookings  
- Reschedule appointments  

### User Profile
Manage personal details and preferences from a dedicated profile page.

### Real-Time Availability
Check available consultation slots based on each lawyer's schedule.

---

## Platform Features

### Responsive Design
Fully optimized for **mobile, tablet, and desktop devices**.

### Mock Backend System
Simulated backend functionality with persistent data stored in **browser localStorage**.

### Interactive User Interface
Smooth navigation with transitions and interactive components.

### Authentication Simulation
Login and signup functionality implemented using **local storage-based authentication**.

---

# Tech Stack

## Frontend
React.js 18

## Routing
React Router v6

## Styling
Tailwind CSS

## State Management
React Context API

## Icons
Custom SVG icons

## Storage
Browser localStorage

## Build Tool
Vite

---

# Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/yourusername/lawyer-booking-platform.git
cd lawyer-booking-platform
npm install
```

Start the development server.

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

# Usage

## Browse Lawyers
Navigate to the **Lawyers** page to explore available lawyers.

## Filter and Search
Use the search bar and filters to find lawyers based on specific criteria.

## View Lawyer Profile
Click on a lawyer card to open their detailed profile page.

## Book an Appointment
Select a date and time slot, then enter your booking details.

## Manage Appointments
View and manage all appointments in the **My Appointments** section.

## Update Profile
Edit your personal details from the **My Profile** page.

---

# Pages Overview

## Home Page

- Hero section with call-to-action  
- Specialty quick filter menu  
- Featured lawyers showcase  
- Promotional banner  

---

## Lawyers Page

- Complete list of lawyers  
- Search functionality  
- Filter by specialty and experience  
- Sort by name, experience, or fees  
- Grid and list view toggle  
- Pagination support  

---

## Lawyer Details and Booking

- Detailed lawyer profile  
- Availability calendar  
- Time slot selection  
- Booking confirmation form  
- Booking summary  

---

## My Appointments

- View all booked appointments  
- Upcoming appointments section  
- Past or cancelled appointments  
- Cancel or reschedule options  

---

## User Profile

- Personal information  
- Professional details for lawyers  
- Profile editing functionality  
- Account management  

---

## Authentication

- Login page  
- Signup page  
- Form validation  
- Simulated authentication using local storage  

---

# Booking Flow

The appointment booking process follows these steps:

1. **Select Lawyer**  
   Browse or search for a lawyer.

2. **Choose Date**  
   Select an available date within the next **14 days**.

3. **Pick Time Slot**  
   Choose from the available consultation time slots.

4. **Enter Details**  
   Provide contact information and a short case description.

5. **Confirm Booking**  
   Review the booking summary and confirm the appointment.

6. **View Appointment**  
   Access the confirmed booking from **My Appointments**.

---

# Future Improvements

- Backend API integration  
- Real authentication system (JWT / OAuth)  
- Lawyer dashboard  
- Payment gateway integration  
- Email or SMS appointment notifications  
- Admin panel for platform management
