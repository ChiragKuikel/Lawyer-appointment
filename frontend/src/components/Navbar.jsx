import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, logout } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400 relative'>
            <img 
                onClick={() => navigate('/')} 
                className='w-44 cursor-pointer' 
                src={assets.logo} 
                alt="Logo" 
            />
            
            {/* Desktop Menu */}
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    {({ isActive }) => (
                        <li className='py-1'>
                            HOME
                            {isActive && <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>}
                        </li>
                    )}
                </NavLink>
                <NavLink to='/lawyers'>
                    {({ isActive }) => (
                        <li className='py-1'>
                            ALL LAWYERS
                            {isActive && <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>}
                        </li>
                    )}
                </NavLink>
                <NavLink to='/about'>
                    {({ isActive }) => (
                        <li className='py-1'>
                            ABOUT
                            {isActive && <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>}
                        </li>
                    )}
                </NavLink>
                <NavLink to='/contact'>
                    {({ isActive }) => (
                        <li className='py-1'>
                            CONTACT
                            {isActive && <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>}
                        </li>
                    )}
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {/* Desktop User Menu */}
                <div className='hidden md:block'>
                    {token ? (
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
                            <img className="w-2.5" src={assets.dropdown_icon} alt='' />
                            <div className='absolute right-0 top-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => { navigate('my-profile'); setShowMenu(false); }} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => { navigate('my-appointments'); setShowMenu(false); }} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={() => { logout(); setShowMenu(false); }} className='hover:text-black cursor-pointer'>Logout</p>
                                </div> 
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className='bg-primary text-white px-8 py-3 rounded-full font-light hover:bg-opacity-90 transition-all'
                        >
                            Create Account
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className='md:hidden p-2'
                >
                    <img 
                        src={showMobileMenu ? assets.cross_icon : assets.menu_icon} 
                        alt="Menu" 
                        className='w-6'
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className='absolute top-16 left-0 right-0 bg-white border-t border-b border-gray-200 p-4 md:hidden z-50 shadow-lg'>
                    <ul className='flex flex-col gap-4'>
                        <NavLink to='/' onClick={() => setShowMobileMenu(false)}>
                            <li className='py-2 hover:text-primary'>Home</li>
                        </NavLink>
                        <NavLink to='/doctors' onClick={() => setShowMobileMenu(false)}>
                            <li className='py-2 hover:text-primary'>All Lawyers</li>
                        </NavLink>
                        <NavLink to='/about' onClick={() => setShowMobileMenu(false)}>
                            <li className='py-2 hover:text-primary'>About</li>
                        </NavLink>
                        <NavLink to='/contact' onClick={() => setShowMobileMenu(false)}>
                            <li className='py-2 hover:text-primary'>Contact</li>
                        </NavLink>
                        {token ? (
                            <>
                                <NavLink to='/my-profile' onClick={() => setShowMobileMenu(false)}>
                                    <li className='py-2 hover:text-primary'>My Profile</li>
                                </NavLink>
                                <NavLink to='/my-appointments' onClick={() => setShowMobileMenu(false)}>
                                    <li className='py-2 hover:text-primary'>My Appointments</li>
                                </NavLink>
                                <li 
                                    onClick={() => { 
                                        logout(); 
                                        setShowMobileMenu(false);
                                        navigate('/');
                                    }} 
                                    className='py-2 hover:text-primary cursor-pointer text-red-500'
                                >
                                    Logout
                                </li>
                            </>
                        ) : (
                            <li 
                                onClick={() => { 
                                    navigate('/login'); 
                                    setShowMobileMenu(false);
                                }} 
                                className='py-2 bg-primary text-white text-center rounded-lg cursor-pointer'
                            >
                                Create Account
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;