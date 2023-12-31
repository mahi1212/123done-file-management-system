import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <main >
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout