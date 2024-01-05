import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai';
import { userAtom } from '../../lib/jotai';
import { useState } from 'react';
import EditProfileModal from '../../components/EditProfileModal';

const Profile = () => {
  const user = useAtomValue(userAtom);
  const fetchProfile = async () => {
    const res = await fetch(`http://localhost:5000/user/${user._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.jwt}`
      },
    });
    const data = await res.json();
    return data?.data;
  }

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(),
  });
  const [clickedEdit, setClickedEdit] = useState(false);
  const [editedName, setEditedName] = useState(data?.name);
  const [newImage, setNewImage] = useState(data?.image);

  const handleEdit = async () => {
    console.log("Edit button clicked");
    setClickedEdit(true)
  }

  const handleUpdate = async () => {
    if (editedName == '') {
      alert('Name cannot be empty')
      return
    }
    console.log("Update button clicked");
    setClickedEdit(false)
    const formData = new FormData();
    formData.append('name', editedName)
    try {
      const res = await fetch(`http://localhost:5000/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${user.jwt}`
        },
        body: formData,
      });
      console.log(res)
    } catch (error) {
      console.error("Error updating image:", error);
    }
  }




  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        {isPending && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {data && (
          <div className='relative'>
            {/* update button */}
            {clickedEdit == false ? <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute -top-4 -right-6'
              onClick={handleEdit}
            >
              Edit
            </button> :
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute -top-4 -right-6'
                onClick={handleUpdate}
              >
                Update
              </button>
            }

            {/* File input for updating image */}
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className='hidden'
              id='file-input'
            /> */}
            <label htmlFor='file-input'>
              {data.image ? (
                <img
                  src={`http://localhost:5000/uploads/${data.image}`}
                  alt="image"
                  className='w-32 h-32 rounded-full mx-auto mb-4 cursor-pointer'
                />
              ) : (
                <div className='w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex justify-center items-center cursor-pointer'>
                  <p className='text-2xl font-bold text-gray-400 text-center'>No Image</p>
                </div>
              )}
            </label>
            <div className='mb-4 flex justify-center'>
                <p className='font-bold'>Name:</p>
                <p>{data.name}</p>
              </div>
            {clickedEdit && (
              <EditProfileModal
                closeModal={() => setClickedEdit(false)}
                name={user?.name}
                image={user?.image}
                // onUpdate={updateUserInfo}
              />
            )}
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
  );
}

export default Profile;
