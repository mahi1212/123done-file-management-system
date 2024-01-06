import React, { useState } from 'react'
import { userAtom } from '../lib/jotai'
import { useAtomValue } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'

const CreateFolderModal = ({ closeModal, parent_id }) => {
    const user = useAtomValue(userAtom)
    const queryClient = useQueryClient()
    const [folderName, setFolderName] = useState('')
    const [loading, setLoading] = useState(false)
    console.log(parent_id)

    const handleCreateFolder = () => {
        if (folderName == '') {
            alert('Folder name cannot be empty')
            return
        }
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", user.jwt);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "data": {
                "owner": user._id,
                "isFolder": true,
                "name": folderName,
                "parent_folder": parent_id ? parent_id : null,
                "size": "0",
                "type": "",
                "subFolder": [],
                "files": [],
                "shared": [],
                "isFavourite": false
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/content", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
            .finally(() => {
                queryClient.invalidateQueries('content')
                setLoading(false)
                closeModal()
            }
            );

    }

    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  max-h-full bg-black bg-opacity-40"
            onClick={closeModal}
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" onClick={(e) => e.stopPropagation()}>

                    <div className="p-4 md:p-5 text-center">

                        <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400 mt-4">
                            Enter the name of the folder
                        </h3>
                        <div className='flex flex-col justify-start mb-4'>
                            <input
                                onChange={(e) => setFolderName(e.target.value)}
                                type="text"
                                placeholder='Name here..'
                                className='p-2 rounded-md outline-none border-none text-md' />
                        </div>

                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={closeModal}
                        >
                            No, cancel
                        </button>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ms-2"
                            onClick={handleCreateFolder}
                        >
                            {
                                loading ? <div className='flex justify-center items-center'>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                </div> : 'Proceed'
                            }
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFolderModal