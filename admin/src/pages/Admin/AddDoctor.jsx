import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { aToken, backendUrl } = useContext(AdminContext)

    // Placeholder submit logic for UI demo
    const onSubmitHandler = (event) => {
        event.preventDefault()
        toast.info("Backend integration for 'Add Doctor' is coming next!")
    }

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmitHandler}
            className='m-5 w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-4xl'
        >
            <p className='mb-8 text-2xl font-bold text-gray-800 border-b pb-4'>Add New Doctor</p>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-dashed border-primary/30'>
                    <label htmlFor="doc-img">
                        <img className='w-24 h-24 bg-white rounded-full cursor-pointer object-cover shadow-sm' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
                    <p className='text-sm font-medium'>Upload Photo</p>
                </div>

                <div className='flex-1 flex flex-col gap-6 w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold ml-1'>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold ml-1'>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors bg-white' name="" id="">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold ml-1'>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold ml-1'>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors' type="text" placeholder='Education' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold ml-1'>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors' type="number" placeholder='Fees' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold ml-1'>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors bg-white' name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-sm font-bold ml-1'>About Doctor</p>
                        <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors min-h-32' placeholder='Write details about the doctor...' rows={5} required />
                    </div>

                    <button type='submit' className='bg-primary w-full md:w-fit px-12 py-3.5 mt-4 text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-indigo-600 transition-all font-bold'>Add Doctor</button>
                </div>
            </div>
        </motion.form>
    )
}

export default AddDoctor
