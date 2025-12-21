import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'

const Navbar = () => {

    const { aToken } = useContext(AdminContext)

    return (
        <div className="flex justify-between items-center px-4 py-2 shadow">
            <div className="flex items-center gap-3">
                <img src={assets.admin_logo} alt="logo" className="h-10" />
                <p>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button className="bg-primary text-white px-4 py-1 rounded">
                Logout
            </button>
        </div>
    )
}

export default Navbar
