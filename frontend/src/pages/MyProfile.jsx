import React, { useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Edit2, Check, User } from "lucide-react";

const MyProfile = () => {
  const [userData, setUserdata] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond ",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-lg flex flex-col gap-2 text-sm mx-auto md:mx-0 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm'
    >
      <div className="relative inline-block w-fit">
        <img className='w-36 rounded-2xl shadow-md' src={userData.image} alt="" />
        {isEdit && <div className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow cursor-pointer text-primary"><Edit2 size={16} /></div>}
      </div>

      {isEdit ? (
        <input className='bg-gray-50 border border-gray-200 rounded px-2 py-1 text-3xl font-medium max-w-60 mt-4 focus:outline-primary'
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserdata((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className='font-bold text-3xl text-gray-800 mt-4'>{userData.name}</p>
      )}
      <hr className='bg-zinc-200 h-[1px] border-none my-2' />
      <div>
        <p className='text-gray-400 font-semibold underline mt-3 flex items-center gap-2'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium text-gray-900'>Email id:</p>
          <p className='text-blue-500 font-medium'>{userData.email}</p>
          <p className='font-medium text-gray-900'>Phone:</p>
          {isEdit ? (
            <input className='bg-gray-50 border border-gray-200 rounded px-2 py-0.5 max-w-52'
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className='text-blue-500'>{userData.phone}</p>
          )}

          <p className='font-medium text-gray-900'>Address:</p>
          {isEdit ? (
            <p>
              <input className='bg-gray-50 border border-gray-200 rounded px-2 py-0.5 w-full mb-1'
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br />
              <input className='bg-gray-50 border border-gray-200 rounded px-2 py-0.5 w-full'
                onChange={(e) =>
                  setUserdata((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </p>
          ) : (
            <p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className='text-gray-400 font-semibold underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium text-gray-900'>Gender:</p>
          {isEdit ? (
            <select className='max-w-20 bg-gray-50 border border-gray-200 rounded px-2 py-0.5'
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-500'>{userData.gender}</p>
          )}
          <p className='font-medium text-gray-900'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-50 border border-gray-200 rounded px-2 py-0.5' type="date" onChange={(e) => setUserdata((prev) => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all font-semibold flex items-center gap-2' onClick={() => setIsEdit(false)} >
              <Check size={18} /> Save information
            </button>
            : <button className='border border-primary px-8 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all font-semibold flex items-center gap-2' onClick={() => setIsEdit(true)} >
              <Edit2 size={16} /> Edit Profile
            </button>
        }
      </div>
    </motion.div>
  );
};

export default MyProfile;
