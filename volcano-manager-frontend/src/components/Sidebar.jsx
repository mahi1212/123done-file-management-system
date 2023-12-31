import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[255px] bg-[#1C2434] h-screen text-white'>
            Sidebar
            <br />
            <br />
            <NavLink to='/home' activeClassName='text-[#F9A826]'>
                Home
            </NavLink>
            <br />
            <NavLink to='/profile' activeClassName='text-[#F9A826]'>
                profile
            </NavLink>

        </div>
    )
}

export default Sidebar