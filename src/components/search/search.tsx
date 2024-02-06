import { SearchProps } from '@/types'
import React from 'react'
import { CiSearch } from 'react-icons/ci'

const Search = ({ title }: SearchProps) => {
    return (
        <div className='flex items-center mx-3 px-2 border gap-2 border-slate-200 rounded-md'>
            <CiSearch className='text-md'/>
            <input type="text" placeholder={title}
                className='placeholder:text-gray-500 text-xs p-1 outline-none' />
        </div>
    )
}

export default Search