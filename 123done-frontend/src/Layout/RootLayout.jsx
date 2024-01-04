import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div className='flex h-screen conatiner overflow-hidden'>
            <Sidebar />
            <main className='p-4 w-[100%]'>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout