import { FilterProps } from '@/types'
import React from 'react'

const Filter = ({ type }: FilterProps) => {
    return (
        <div className='flex items-center gap-2'>
            <input type="checkbox" name="" id="" />
            <h5 className='text-xs font-[600]'>{type}</h5>
            <p className='text__medium'>(10)</p>
        </div>
    )
}

export default Filter