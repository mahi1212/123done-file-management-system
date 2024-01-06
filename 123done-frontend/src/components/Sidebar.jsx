import { useAtomValue } from 'jotai'
import { NavLink, useNavigate } from 'react-router-dom'
import { userAtom } from '../lib/jotai'
import logo from '../assets/logo.png'
import fileIcon from '../assets/files.svg'
import profileIcon from '../assets/profile.svg'
import { FiUsers } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
    const user = useAtomValue(userAtom)
    const navigate = useNavigate()
    // console.log(user)
    const handleLogout = () => {
        fetch(`http://localhost:5000/logout?jwt=${user.jwt}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status !== 400) {
                    navigate('/signin')
                }else{
                    alert('Something went wrong')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='w-[255px] min-w-[255px] bg-[#1C2434] h-screen text-white relative '>
            {/* <img src={logo} alt="logo" className='w-full h-[55px]' /> */}
            <p className='text-3xl ps-4 pb-2 mt-2 font-mono cursor-pointer border border-t-0 border-x-0' onClick={()=>{
                navigate('/')
            }}>
                123DONE
            </p>
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
            <NavLink to='/user' className='flex items-center pl-4 hover:bg-gray-900 w-[100%] py-2 transition duration-300 ease-in-out cursor-pointer' >
                <FiUsers className='w-[20px] h-[20px]' />
                <p className='ml-[10px] mt-1'>Users</p>
            </NavLink>
            <NavLink to='/files' className='flex pl-4 hover:bg-gray-900 w-[100%] py-2 transition duration-300 ease-in-out cursor-pointer' >
                <img src={fileIcon} alt="icon" />
                <p className='ml-[10px]'>Files</p>
            </NavLink>
            <NavLink to='/profile' className='flex pl-4 hover:bg-gray-900 w-[100%] py-2 transition duration-300 ease-in-out cursor-pointer' >
                <img src={profileIcon} alt="icon" />
                <p className='ml-[10px]'>Profile</p>
            </NavLink>
            <p
                className='flex items-center pl-4 hover:bg-gray-900 w-[100%] py-2 transition duration-300 ease-in-out cursor-pointer'
                onClick={handleLogout}
            >
                <CiLogout />
                <p className='ml-[10px]'>Logout</p>
            </p>
            <div className='absolute bottom-10 flex items-center px-4'>
                <img src={user.image ? `http://localhost:5000/uploads/${user.image}` : profileIcon} alt="profile-image" className='w-[45px] h-[45px] rounded-full' />
                <div>
                    <p className='ml-[10px]'>{user?.name}</p>
                    <p className='ml-[10px]'>{user?.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar