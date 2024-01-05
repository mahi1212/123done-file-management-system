import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { darkMoodAtom, searchTermAtom, userAtom } from '../../lib/jotai'
import SearchBar from '../../components/SearchBar'
import Avatar from '../../assets/avatar.png'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from '../../components/DeleteModal'
import EditModal from '../../components/EditModal'
import DeleteModal from '../../components/DeleteModal'

const User = () => {
    const user = useAtomValue(userAtom)
    const darkMode = useAtomValue(darkMoodAtom)
    const searchTerm = useAtomValue(searchTermAtom)
    const queryClient = useQueryClient()
    const [selectedNumber, setSelectedNumber] = useState(10)
    // console.log(searchTerm)
    const getUsers = async () => {
        const response = await fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                'Authorization': `${user?.jwt}`,
                'Content-Type': 'application/json',
            }
        })
        return response.json()
    }
    const { isPending, isError, data: users, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })
    // console.log(users?.data)
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const updateUserInfo = (newName, newRole, newSubscription) => {
        newRole.toLowerCase();
        newSubscription.toLowerCase();
        const data = {
            data: {
                name: newName,
                role: newRole,
                subscription: newSubscription
            }
        }
        // console.log(data)
        fetch(`http://localhost:5000/user/${selectedUser._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${user?.jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status == 200) {
                    queryClient.invalidateQueries('users')
                } else {
                    alert('Something went wrong')
                }
            })
            .catch(err => {
                console.log(err)
            })

    };

    const toggleEditModal = (user) => {
        // Set the selected user when the "Edit" button is clicked
        setSelectedUser(user);
        setEditModalVisible(!isEditModalVisible);
    };

    const toggleModal = (user) => {
        // set selected user data to delete
        setSelectedUser(user);
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div className=''>
            {/* serch bar */}
            <SearchBar />
            <table className="table-auto w-full mt-6 ">
                <thead className='bg-gray-100'>
                    <tr >
                        <th className="px-4 py-2 text-start">NAME</th>
                        <th className="px-4 py-2 text-start">ROLE</th>
                        <th className="px-4 py-2 text-start">SUBSCRIPTION</th>
                        <th className="px-4 py-2 text-start">STORAGE USED</th>
                        <th className="px-4 py-2 text-start">EDIT</th>
                        <th className="px-4 py-2 text-start">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {isPending ? (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td colSpan="3">Error: {error.message}</td>
                        </tr>
                    ) : (
                        searchTerm.length > 1 ? users?.data?.filter((user) => {
                            if (searchTerm == "") {
                                return user
                            } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return user
                            }
                        }).map((user) => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2 ">
                                    <div className='flex flex-row items-center '>
                                        <img src={user.avatar ? user.avatar : Avatar} alt="avatar" className='w-10 h-10 rounded-full' />
                                        <div className='flex flex-col items-start ml-4 py-1'>
                                            <span className='font-bold'>{user.name}</span>
                                            <span className='text-gray-400'>{user.email}</span>
                                        </div>
                                    </div>
                                </td>
                                {/* <td className="border px-4 py-2"></td> */}
                                <td className="border px-4 py-2">{user.role == 'admin' ? 'Admin' : 'User'}</td>
                                <td className="border px-4 py-2">{user.subscription.toUpperCase()}</td>
                                <td className="border px-4 py-2">{user.storage_used} MB</td>

                                {/* edit and delete button */}
                                <td className="border px-4 py-2">
                                    <FaUserEdit
                                        className='hover: cursor-pointer w-[30px]'
                                        onClick={() => toggleEditModal(user)} // Pass the user data to the function
                                    />
                                    {isEditModalVisible && selectedUser && (
                                        <EditModal
                                            closeModal={toggleEditModal}
                                            userName={selectedUser.name}
                                            userRole={selectedUser.role}
                                            userSubscription={selectedUser.subscription}
                                            onUpdate={updateUserInfo}
                                        />
                                    )}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <MdDelete className='hover: cursor-pointer w-[25px] h-[25px]' onClick={() => toggleModal(user)} />
                                    {isModalVisible && (
                                        <DeleteModal
                                            closeModal={toggleModal}
                                            onUpdate={updateUserInfo}
                                            user={selectedUser}
                                        />
                                    )}
                                </td>

                            </tr>
                        ))
                            :
                            users?.data?.slice(0, selectedNumber)?.map((user) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2 ">
                                        <div className='flex flex-row items-center '>
                                            <img src={user.image ? `http://localhost:5000/uploads/${user.image}` : Avatar} alt="avatar" className='w-10 h-10 rounded-full' />
                                            <div className='flex flex-col items-start ml-4 py-1'>
                                                <span className='font-bold'>{user.name}</span>
                                                <span className='text-gray-400'>{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    {/* <td className="border px-4 py-2"></td> */}
                                    <td className="border px-4 py-2">{user.role == 'admin' ? 'Admin' : 'User'}</td>
                                    <td className="border px-4 py-2">{user.subscription.toUpperCase()}</td>
                                    <td className="border px-4 py-2">{user.storage_used} MB</td>

                                    {/* edit and delete button */}
                                    <td className="border px-4 py-2">
                                        <FaUserEdit
                                            className='hover: cursor-pointer w-[30px]'
                                            onClick={() => toggleEditModal(user)} // Pass the user data to the function
                                        />
                                        {isEditModalVisible && selectedUser && (
                                            <EditModal
                                                closeModal={toggleEditModal}
                                                userName={selectedUser.name}
                                                userRole={selectedUser.role}
                                                userSubscription={selectedUser.subscription}
                                                onUpdate={updateUserInfo}
                                            />
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <MdDelete className='hover: cursor-pointer w-[25px] h-[25px]' onClick={() => toggleModal(user)} />
                                        {isModalVisible && (
                                            <DeleteModal
                                                closeModal={toggleModal}
                                                onUpdate={updateUserInfo}
                                                user={selectedUser}
                                            />
                                        )}
                                    </td>

                                </tr>
                            ))
                    )}
                </tbody>
            </table>
            {/* select number of users to show */}
            <div className='flex flex-row justify-between items-center mt-4'>
                <p className='font-bold'>
                    Total number of users : {users?.data?.length}
                </p>
                <div className='flex items-center'>
                    <p className='mr-2 font-bold'>Rows per page</p>
                    <select
                        value={selectedNumber}
                        onChange={(e) => setSelectedNumber(e.target.value)}
                        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-200'>
                        {[5, 10, 20, 30, 40, 50].map((number) => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}

                    </select>
                </div>
            </div>
        </div>
    )
}

export default User