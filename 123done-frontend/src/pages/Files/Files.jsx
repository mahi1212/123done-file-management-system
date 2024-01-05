import React from 'react'
import SearchBar from '../../components/SearchBar'
import { FaPlus } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";

const Files = () => {
    return (
        <div>
            <SearchBar type='file' />
            <div className='flex justify-between'>
                <p className='text-2xl py-[28px]'>
                    Recent files
                </p>

                <div className='flex justify-between items-center gap-4'>
                    {/* dropdown for filter */}
                    <select name="" className='border border-gray-300 p-2 rounded-md outline-none'>
                        <option value="">All</option>
                        <option value="">Images</option>
                        <option value="">Videos</option>
                        <option value="">Documents</option>
                    </select>
                    <select name="" className='border border-gray-300 p-2 rounded-md outline-none'>
                        <option value="">Today</option>
                        <option value="">Last Week</option>
                        <option value="">This Month</option>
                    </select>
                    {/* upload button */}
                    <p className='flex items-center justify-around bg-black transition hover:bg-white-700 text-white hover:bg-white hover:text-black hover:outline outline-black font-bold py-[6px] px-4 rounded cursor-pointer'>
                        <MdCreateNewFolder />
                        <button className='ml-2'>
                            Create Folder
                        </button>
                    </p>
                    <p className='flex items-center justify-around bg-black transition hover:bg-white-700 text-white hover:bg-white hover:text-black hover:outline outline-black font-bold py-[6px] px-4 rounded cursor-pointer'>
                        <FaPlus />
                        <button className='ml-2'>
                            Upload File
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Files