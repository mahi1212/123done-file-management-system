import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import { FaPlus } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import CreateFolderModal from '../../components/CreateFolderModal';
import { userAtom } from '../../lib/jotai';
import { useAtomValue } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { FaFolderClosed } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate, useParams } from 'react-router-dom';


const Files = () => {
    const user = useAtomValue(userAtom);
    const { id } = useParams()
    const navigate = useNavigate()
    const [createFolder, setCreateFolder] = useState(false)
    const [dotClicked, setDotClicked] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

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
        if (id) {
            const res = await fetch(`http://localhost:5000/content/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${user.jwt}`
                },
            });
            const data = await res.json();
            return data?.data;
        } else {
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

    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['content', id],
        queryFn: () => fetchFiles(),
    });
    console.log(data)
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

                <div className='flex justify-between items-center gap-4'>
                    {/* dropdown for filter */}
                    <select name="" className='border border-gray-300 p-2 rounded-md outline-none'>
                        <option value="all">All</option>
                        <option value="folder">Folders</option>
                        <option value="file">Files</option>
                    </select>
                    <select name="" className='border border-gray-300 p-2 rounded-md outline-none'>
                        <option value="">Today</option>
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
                    <div className='flex items-center justify-around bg-black transition hover:bg-white-700 text-white hover:bg-white hover:text-black hover:outline outline-black font-bold py-[6px] px-4 rounded cursor-pointer'>
                        <FaPlus />
                        <button className='ml-2'>
                            Upload File
                        </button>
                    </div>
                </div>
            </div>
            {/* contents */}
            {
                isPending && <p>Loading...</p>
            }
            {
                !isPending && data?.length == 0 ?
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex flex-col justify-center items-center w-[100%] h-[500px] border border-gray-300 rounded-md '>
                            <p className='text-2xl font-bold mt-4'>
                                No files found
                            </p>
                            <p className='text-lg font-normal mt-2'>
                                Try uploading a file or creating a folder
                            </p>
                        </div>
                    </div> :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                        {
                            data?.filter(e => {
                                return e?.parent_folder == id
                            })?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        navigate(`/files/${item._id}`);
                                    }}
                                    className='relative flex justify-between items-center bg-gray-100 rounded-md p-4 cursor-pointer transition hover:bg-gray-200'
                                >
                                    <div className='flex items-center'>
                                        <FaFolderClosed />
                                        <p className='text-md ms-2 mt-[2px]'>
                                            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
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
                                            <p className='text-sm text-gray-500 p-2 hover:bg-gray-200 rounded'>
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