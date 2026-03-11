import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import MyProfile from './pages/MyProfile.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import Appointment from './pages/Appointment.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/footer.jsx';
import AppContextProvider from './Context/AppContext.jsx';
import Lawyers from './pages/lawyer.jsx';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/lawyers",
        element: <Lawyers />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/my-profile",
        element: <MyProfile />
      },
      {
        path: "/my-appointments",
        element: <MyAppointments />
      },
      {
        path: "/appointment/:id",
        element: <Appointment />
      },
    ],
  },
]);

const App = () => {
  return (
    <AppContextProvider>
      <div className='mx-4 sm:mx-[10%]'>
        <RouterProvider router={router} />
      </div>
    </AppContextProvider>
  );
};

export default App;