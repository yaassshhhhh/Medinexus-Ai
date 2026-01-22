import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import VideoConsult from './pages/VideoConsult'
import DoctorConsultDetails from './pages/DoctorConsultDetails'
import VideoCallRoom from './pages/VideoCallRoom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/video-consult' element={<VideoConsult />} />
        <Route path='/doctor-consult/:docId' element={<DoctorConsultDetails />} />
        <Route path='/video-call/:roomId' element={<VideoCallRoom />} />
      </Routes>
      <Footer />
      <Chatbot />
      <ToastContainer />
    </div>
  )
}

export default App
