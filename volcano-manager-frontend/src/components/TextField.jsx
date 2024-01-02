import React, { useState } from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";


const TextField = ({ label, type, name, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='flex flex-col w-[358px] mt-[20px]' >
            <label className='mb-[6px]'>{label}<span className='font-extrabold'>*</span></label>
            {
                <div className='relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        placeholder={placeholder}
                        // showPassword={showPassword}
                        className='border-2 border-gray-200 w-[358px] rounded-[8px] px-[14px] py-[10px] outline-none'
                    />
                    {
                        type === 'password' ?
                            showPassword ?
                                <FiEye className='absolute top-[15px] right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> :
                                <FiEyeOff className='absolute top-[15px] right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> :
                            null
                    }

                </div>
            }
        </div>
    )
}

export default TextField