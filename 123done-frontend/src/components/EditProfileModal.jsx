import React, { useRef, useState } from 'react';
import { userAtom } from '../lib/jotai';
import { useAtomValue } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';

const EditProfileModal = ({ closeModal, name, image }) => {
  const user = useAtomValue(userAtom);
  const [editedName, setEditedName] = useState(name);
  const [newImage, setNewImage] = useState(image);
  const fileInput = useRef(null);
  const queryClient = useQueryClient();


  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleFileUpload = async () => {
    const token = user.jwt;
    // const userId = localStorage.getItem('userId');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    console.log(fileInput?.current.files[0])
    // check size and type here
    if (fileInput?.current.files[0].size > 1024 * 1024 * 5) {
      console.log('Size too large!');

      return;
    }
    if (fileInput?.current.files[0].type !== 'image/jpeg' && fileInput?.current.files[0].type !== 'image/png' && fileInput?.current.files[0].type !== 'image/jpg') {
      console.log('This type of file is not allowed!');
      return;
    }

    const formData = new FormData(); // Renamed variable to formData
    formData.append('file', fileInput.current.files[0]);

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };
    console.log(user._id)
    await fetch(`http://localhost:5000/user/${user._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result)
        queryClient.invalidateQueries('profile');
        alert('Image uploaded successfully!');
        setNewImage(result?.image);
      })
      .catch((error) => console.log('error', error));

  };


  const handleUpdate = async () => {
    if (editedName == '') {
      alert('Name cannot be empty')
      return
    }
    const data = {
      data: {
        name: editedName,
      }
    }

    fetch(`http://localhost:5000/user/${user._id}`, {
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
          queryClient.invalidateQueries('profile');
          closeModal()
        } else {
          alert('Something went wrong')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-40"
      onClick={closeModal}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={closeModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Edit User Information </h3>

            <label htmlFor='file-input'>
              {image ? (
                <img
                  src={`http://localhost:5000/uploads/${image}`}
                  alt="image"
                  className='w-32 h-32 rounded-full mx-auto mb-4 cursor-pointer'
                />
              ) : (
                <div className='w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex justify-center items-center cursor-pointer'>
                  <p className='text-xl font-bold text-gray-400 text-center'>Click here update</p>
                </div>
              )}
            </label>

            <input
              type="file"
              ref={fileInput}
              onChange={handleFileUpload}
              className='hidden'
              id='file-input'
            />

            <div className="mb-4">
              <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2 text-start">Name</label>
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
