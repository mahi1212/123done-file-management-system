import { useAtomValue } from 'jotai'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { userAtom } from '../lib/jotai'
import logo from '../assets/logo.png'
import fileIcon from '../assets/files.svg'
import profileIcon from '../assets/profile.svg'
import { FiUsers } from "react-icons/fi";

const Sidebar = () => {
    const user = useAtomValue(userAtom)
    // console.log(user)
    return (
        <div className='w-[255px] min-w-[255px] bg-[#1C2434] h-screen text-white relative '>
            <img src={logo} alt="logo" className='w-full h-[55px]' />
            <br />
            <br />

            {/* {
                user?.role === 'admin' ?
                    <NavLink to='/user' className='flex items-center pl-4 mb-4' >
                        <FiUsers className='w-[20px] h-[20px]' />
                        <p className='ml-[10px] mt-1'>Users</p>
                    </NavLink> :
                    <NavLink to='/files' className='flex pl-4 mb-4' >
                        <img src={fileIcon} alt="icon" />
                        <p className='ml-[10px]'>Files</p>
                    </NavLink>
            } */}
            <NavLink to='/user' className='flex items-center pl-4 mb-4' >
                <FiUsers className='w-[20px] h-[20px]' />
                <p className='ml-[10px] mt-1'>Users</p>
            </NavLink>
            <NavLink to='/files' className='flex pl-4 mb-4' >
                <img src={fileIcon} alt="icon" />
                <p className='ml-[10px]'>Files</p>
            </NavLink>
            <NavLink to='/profile' className='flex pl-4 mb-4' >
                <img src={profileIcon} alt="icon" />
                <p className='ml-[10px]'>Profile</p>
            </NavLink>
            <div className='absolute bottom-10 flex items-center px-4'>
                <img src={profileIcon} alt="profile-image" className='w-[45px] h-[45px] border rounded-full p-1' />
                <div>
                    <p className='ml-[10px]'>{user?.name}</p>
                    <p className='ml-[10px]'>{user?.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar