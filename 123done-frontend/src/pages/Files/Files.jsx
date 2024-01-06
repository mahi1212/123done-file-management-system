import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { FaPlus } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import CreateFolderModal from '../../components/CreateFolderModal';
import { userAtom } from '../../lib/jotai';
import { useAtomValue } from 'jotai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaFolderClosed } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegFilePdf } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

const Files = () => {
    const user = useAtomValue(userAtom);
    const { id } = useParams()
    const navigate = useNavigate()
    const [createFolder, setCreateFolder] = useState(false)
    const [dotClicked, setDotClicked] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const queryClient = useQueryClient();
    const [showPreview, setShowPreview] = useState(false)
    const [fileName, setFileName] = useState('')
    const [showUploadDiv, setShowUploadDiv] = useState(false)





    const handleCreateFolder = () => {
        setCreateFolder(true)
    }
    const handleDotClick = (id) => {
        setSelectedId(id)
        setDotClicked(!dotClicked)

    }

    const closeModal = () => {
        setCreateFolder(false)
    }

    const fetchFiles = async () => {
        // if (id) {
        //     const res = await fetch(`http://localhost:5000/content/${id}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `${user.jwt}`
        //         },
        //     });
        //     const data = await res.json();
        //     return data?.data;
        // } else {
        //     const res = await fetch(`http://localhost:5000/contents/${user._id}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `${user.jwt}`
        //         },
        //     });
        //     const data = await res.json();
        //     return data?.data;
        // }
        const res = await fetch(`http://localhost:5000/contents/${user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.jwt}`
            },
        });
        const data = await res.json();
        return data?.data;
    }
    const handleDeleteContent = async (id) => {
        const res = await fetch(`http://localhost:5000/content/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.jwt}`
            },
        });
        const data = await res.json();
        // console.log(data)
        if (data?.status == 200) {
            queryClient.invalidateQueries('content')
            alert('Deleted Successfully')
        } else {
            alert('Something went wrong')
        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['content', id],
        queryFn: () => fetchFiles(),
    });
    // console.log(data)
    const filteredData = data?.filter(e => {
        return e?.parent_folder === id || (e?.parent_folder === null && id === undefined);
    });


    const [file, setFile] = useState(null);
    console.log(file)
    // console.log(id)
    const [formData, setFormData] = useState({
        data: {
            isFolder: false,
            name: '', // Initialize with an empty string
            size: '',
            type: '',
            parent_folder: id ? id : null,
            subFolder: [],
            files: [],
            owner: user._id,
            shared: [],
            isFavourite: false,
        },
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        setFile(selectedFile);

        // Update the formData with file information
        setFormData((prevFormData) => ({
            ...prevFormData,
            data: {
                ...prevFormData.data,
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type,
                parent_folder: id ? id : null,
            },
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('file', file);
        formDataToSend.append('data', JSON.stringify(formData.data));

        try {
            const response = await fetch('http://localhost:5000/content', {
                method: 'POST',
                headers: {
                    'Authorization': `${user.jwt}`,
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.status === 200) {
                queryClient.invalidateQueries('content')
                alert('Uploaded Successfully')
            } else {
                alert('Something went wrong')
            }

            if (response.ok) {
                console.log('Successfully uploaded:', data);
            } else {
                console.error('Error uploading:', data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    return (
        <div
            className=' h-full'
            onClick={() => {
                if (dotClicked) {
                    setDotClicked(false)
                }
            }}>
            <SearchBar type='file' />
            {/* filtering and creating part */}
            <div className='flex justify-between'>
                <p className='text-2xl py-[28px]'>
                    Recent files
                </p>

                <div className='flex justify-between items-center gap-4 relative'>
                    {/* dropdown for filter */}
                    <select name="" className='border border-gray-300 p-2 rounded-md outline-none'>
                        <option value="all">All</option>
                        <option value="folder">Folders</option>
                        <option value="file">Files</option>
                    </select>
                    <select name="" className='border border-gray-300 p-2 rounded-md outline-none'>
                        <option value="">All Time</option>
                        <option value="">Last Week</option>
                        <option value="">This Month</option>
                    </select>
                    {/* upload button */}
                    <div
                        onClick={handleCreateFolder}
                        className='flex items-center justify-around bg-black transition hover:bg-white-700 text-white hover:bg-white hover:text-black hover:outline outline-black font-bold py-[6px] px-4 rounded cursor-pointer'>
                        <MdCreateNewFolder />
                        <button className='ml-2'>
                            Create Folder
                        </button>
                    </div>
                    {
                        createFolder && <CreateFolderModal closeModal={closeModal} parent_id={id} />
                    }
                    <div
                        onClick={() => {
                            setShowUploadDiv(!showUploadDiv)
                        }}
                        className='flex items-center justify-around bg-black transition hover:bg-white-700 text-white hover:bg-white hover:text-black hover:outline outline-black font-bold py-[6px] px-4 rounded cursor-pointer'>
                        <FaPlus />
                        <button className='ml-2'>
                            Upload File
                        </button>
                    </div>
                    {
                        showUploadDiv && <div className='absolute right-0 top-20 bg-gray-400 w-[400px] p-4 z-40 border rounded-md'>
                            <input type="file" onChange={handleFileChange} />
                            <button onClick={handleFormSubmit}>Submit</button>
                        </div>
                    }
                </div>
            </div>
            {/* contents */}
            {
                isPending && <p>Loading...</p>
            }
            {
                !isPending && filteredData?.length === 0 ?
                    <div className='flex flex-col justify-center items-center w-[100%] h-[500px] border border-gray-300 rounded-md '>
                        <p className='text-2xl font-bold mt-4'>
                            No files found
                        </p>
                        <p className='text-lg font-normal mt-2'>
                            Try uploading a file or creating a folder
                        </p>
                    </div> :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 z-1'>
                        {
                            showPreview && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                                <div className='bg-white p-4 rounded-md'>
                                    <p className='text-2xl font-bold'>
                                        Preview
                                    </p>
                                    <div className='flex justify-center items-center mt-4'>
                                        <div className='w-[500px] h-[500px] border border-gray-300 rounded-md'>
                                            <iframe src={`http://localhost:5000/uploads/${fileName}`} width="100%" height="500px" />
                                        </div>
                                    </div>
                                    <div className='flex justify-end mt-4'>
                                        <button
                                            onClick={() => setShowPreview(false)}
                                            className='bg-black text-white px-4 py-2 rounded-md'
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            filteredData?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (item?.isFolder) {
                                            navigate(`/files/${item?._id}`)
                                        } else {
                                            // show preview
                                            setShowPreview(true)
                                            setFileName(item?.name)
                                        }
                                    }}
                                    className='relative flex justify-between items-center bg-gray-100 rounded-md p-4 cursor-pointer transition hover:bg-gray-200'
                                >
                                    <div className='flex items-center'>
                                        {
                                            item?.isFolder ?
                                                <FaFolderClosed className='text-2xl text-slate-600' /> :
                                                <>
                                                    {
                                                        item?.type === 'application/pdf' ?
                                                            <FaRegFilePdf className='text-2xl text-slate-600' /> :
                                                            <FaFile className='text-2xl text-slate-600' />
                                                    }
                                                </>
                                        }
                                        <p className='text-md ms-2 mt-[2px]'>
                                            {item?.name?.charAt(0).toUpperCase() + item?.name?.slice(1)}
                                        </p>
                                    </div>
                                    <p
                                        className='text-sm text-gray-500 p-2'
                                        onClick={(e) => {
                                            // Stop the click event from propagating
                                            e.stopPropagation();
                                            handleDotClick(item._id);
                                        }}
                                    >
                                        <HiOutlineDotsVertical />
                                    </p>
                                    {(dotClicked && selectedId === item._id) && (
                                        <div className='absolute top-12 right-[10px] bg-white rounded-md shadow-md p-2'>
                                            <p className='text-sm text-gray-500 p-2 hover:bg-gray-200 rounded'>
                                                Rename
                                            </p>
                                            <p className='text-sm text-gray-500 p-2 hover:bg-gray-200 rounded' onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteContent(item._id)
                                            }}>
                                                Delete
                                            </p>
                                            {/* <p className='text-sm text-gray-500 p-2 hover:bg-gray-200 rounded'>
                                Download
                            </p> */}
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Files