import { useAtom, useSetAtom } from 'jotai'
import React from 'react'
import { searchTermAtom } from '../lib/jotai'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    const setSearchTerm = useSetAtom(searchTermAtom)
    return (
        <div className='relative'>
            <input
                type="text"
                placeholder="Search by name"
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-[90%] h-10 pl-14 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline focus:outline-none'
            />
            <CiSearch className='w-[25px] h-[25px] absolute top-2 left-4' />
            {/* dark mood switch*/}
            

            
        </div>
    )
}

export default SearchBar