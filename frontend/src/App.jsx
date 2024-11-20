import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home.jsx';
import Docters from './pages/docters.jsx';
import Login from './pages/Login.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import MyProfile from './pages/MyProfile.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import Appointment from './pages/Appointment.jsx';
const router = createBrowserRouter([
  {
    path : "/",
    element : <Home />
  },
  {
    path : "/doctors",
    element : <Docters />
  },
  {
    path : "/doctors/:speciality",
    element : <Docters />
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/about",
    element : <About />
  },
  {
    path : "/contact",
    element : <Contact />
  },
  {
    path : "/my-profile" ,
    element : <MyProfile />
  },
  {
    path : "/my-appointments",
    element : <MyAppointments />
  },
  
  {
    path : "/appointment/:docId",
    element : <Appointment />
  }
  ])
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;