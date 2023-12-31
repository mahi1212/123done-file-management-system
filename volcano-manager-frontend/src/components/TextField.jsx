import React from 'react'

const TextField = ({ label, type, name, placeholder }) => {

    return (
        <div className='flex flex-col w-[358px] mt-[20px]' >
            <label className='mb-[6px]'>{label}<span className='font-extrabold'>*</span></label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className='border-2 border-gray-200 rounded-[8px] px-[14px] py-[10px] outline-none'
            />
        </div>
    )
}

export default TextField