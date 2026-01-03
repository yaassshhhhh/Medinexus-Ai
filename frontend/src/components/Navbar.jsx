import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import Appointment from './../pages/Appointment';



const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>

      <h1 onClick={() => navigate('/')} className='text-3xl font-bold cursor-pointer text-primary'>MediNexus Ai</h1>

      <ul className='hidden md:flex items-start gap-5 font-medium'>

        <NavLink to='/' className='flex flex-col items-center'>
          {({ isActive }) => (
            <>
              <li className='py-1 font-bold text-gray-700 hover:text-primary transition-colors'>HOME</li>
              <hr
                className={`border-none h-0.5 bg-primary w-3/5 m-auto ${isActive ? 'block' : 'hidden'
                  }`}
              />
            </>
          )}
        </NavLink>

        <NavLink to='/doctors' className='flex flex-col items-center'>
          {({ isActive }) => (
            <>
              <li className='py-1 font-bold text-gray-700 hover:text-primary transition-colors'>ALL DOCTORS</li>
              <hr
                className={`border-none h-0.5 bg-primary w-3/5 m-auto ${isActive ? 'block' : 'hidden'
                  }`}
              />
            </>
          )}
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center'>
          {({ isActive }) => (
            <>
              <li className='py-1 font-bold text-gray-700 hover:text-primary transition-colors'>ABOUT</li>
              <hr
                className={`border-none h-0.5 bg-primary w-3/5 m-auto ${isActive ? 'block' : 'hidden'
                  }`}
              />
            </>
          )}
        </NavLink>

        <NavLink to='/video-consult' className='flex flex-col items-center'>
          {({ isActive }) => (
            <>
              <li className='py-1 text-primary font-bold flex items-center gap-1'>
                VIDEO CONSULT
                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
              </li>
              <hr
                className={`border-none h-0.5 bg-primary w-3/5 m-auto ${isActive ? 'block' : 'hidden'
                  }`}
              />
            </>
          )}
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center'>
          {({ isActive }) => (
            <>
              <li className='py-1 font-bold text-gray-700 hover:text-primary transition-colors'>CONTACT</li>
              <hr
                className={`border-none h-0.5 bg-primary w-3/5 m-auto ${isActive ? 'block' : 'hidden'
                  }`}
              />
            </>
          )}
        </NavLink>

      </ul>
      <div className='flex items-center gap-4'>
        {
          token
            ? <div className='flex item-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
              <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-indigo-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-primary cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointment')} className='hover:text-primary cursor-pointer'>My Appointments</p>
                  <p onClick={() => setToken(false)} className='hover:text-primary cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block
hover:opacity-90 transition'>Create Account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* --------------Mobile Menu------------- */}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <h1 className='text-2xl font-bold text-primary'>MediNexus Ai</h1>
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/video-consult'><p className='px-4 py-2 rounded inline-block text-primary font-bold'>VIDEO CONSULT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
