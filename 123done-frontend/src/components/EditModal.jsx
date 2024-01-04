import React, { useState } from 'react';

const EditModal = ({ closeModal, userName, userRole, userSubscription, onUpdate }) => {
    const [editedName, setEditedName] = useState(userName);
    const [editedRole, setEditedRole] = useState(userRole);
    const [editedSubscription, setEditedSubscription] = useState(userSubscription);

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleRoleChange = (event) => {
        setEditedRole(event.target.value);
        console.log(event.target.value)
    };

    const handleSubscriptionChange = (event) => {
        setEditedSubscription(event.target.value);
        console.log(event.target.value)
    };

    const handleUpdate = () => {
        onUpdate(editedName, editedRole, editedSubscription);
        closeModal();
    };

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
                        <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Edit User Information  </h3>
                        <div className="mb-4">
                            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2 text-start">Name</label>
                            <input
                                type="text"
                                value={editedName}
                                onChange={handleNameChange}
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2 text-start">Role</label>
                            <select
                                value={editedRole}
                                onChange={handleRoleChange}
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-200"
                            >
                                {/* show the default role as selected */}
                                {
                                    userRole == 'admin' ? <>
                                        <option value="Admin" defaultValue={userRole}>Admin</option>
                                        <option value="User">User</option>
                                    </> : <>
                                        <option value="User" defaultValue={userRole}>User</option>
                                        <option value="Admin">Admin</option>
                                    </>

                                }
                               
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2 text-start">Subscription</label>
                            <select
                                value={editedSubscription}
                                onChange={handleSubscriptionChange}
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-200"
                            >
                                {/* show the default subscription as selected */}
                                {
                                    userSubscription == 'free' ? <>
                                        <option value="Free" defaultValue={userSubscription}>Free</option>
                                        <option value="Pro">Pro</option>
                                    </> : <>
                                        <option value="Pro" defaultValue={userSubscription}>Pro</option>
                                        <option value="Free">Free</option>
                                    </>
                                }

                            </select>
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

export default EditModal;
