import { useAtom, useSetAtom } from 'jotai'
import React from 'react'
import { searchTermAtom, darkMoodAtom } from '../lib/jotai'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    const setSearchTerm = useSetAtom(searchTermAtom)
    const setDarkMode = useSetAtom(darkMoodAtom)
    return (
        <div className='relative'>
            <input
                type="text"
                placeholder="Search by name.."
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-[90%] h-10 pl-14 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline focus:outline-none'
            />
            <CiSearch className='w-[25px] h-[25px] absolute top-2 left-4' />
            {/* checkbox for enable darkmood */}
            <input
                type="checkbox"
                name="darkmood"
                id=""
                className='w-10 h-6 absolute right-0 top-2'
                onChange={(e) => {
                    if (e.target.checked) {
                        setDarkMode(true)
                    } else {
                        setDarkMode(false)
                    }
                }}
            />
            <p className='absolute right-10 top-2'>
                Dark Mode
            </p>
        </div>
    )
}

export default SearchBar