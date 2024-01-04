import { useAtomValue } from 'jotai'
import React from 'react'
import { userAtom } from '../../lib/jotai'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const user = useAtomValue(userAtom)
  console.log(user)
  const fetchProfile = async () => {
    const res = await fetch(`http://localhost:5000/user/${user._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.jwt}`
      },
    })
    const data = await res.json()
    return data?.data;
  }
  const { isPending, isError, data, error } = useQuery({
    queryKey: 'profile',
    queryFn: () => fetchProfile(),
  })

  console.log(data)
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        {isPending && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {data && (
          <div className='relative'>
            {/* update button */}
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute -top-4 -right-6'>
              Edit
            </button>
            {
              data.avatar ?
                <img
                  src={data.avatar}
                  alt="avatar"
                  className='w-32 h-32 rounded-full mx-auto mb-4'
                />
                :
                <div className='w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex justify-center items-center'>
                  <p className='text-2xl font-bold text-gray-400 text-center'>No Image </p>
                </div>
            }
            <div className='mb-4 flex justify-center'>
              <p className='font-bold'>Name:</p>
              <p>{data.name}</p>
            </div>
            <div className='mb-4 flex justify-center'>
              <p className='font-bold'>Email:</p>
              <p>{data.email}</p>
            </div>
            <div className='flex justify-between items-center mt-6'>
              <div className='mb-4 text-center'>
                <p className='font-bold text-center'>Role</p>
                <p>{data.role}</p>
              </div>
              <div className='mb-4'>
                <p className='font-bold text-center'>Subscription</p>
                <p className='text-center'>{data.subscription}</p>
              </div>
              <div className='mb-4'>
                <p className='font-bold'>Storage Used</p>
                <p className='text-center'>{data.storage_used} MB</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Profile