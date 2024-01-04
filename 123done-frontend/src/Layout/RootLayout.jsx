import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <main className='w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout