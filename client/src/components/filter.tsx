import React from 'react'
import PickUp from './pickup'
import Search from './Search'
import DropOff from './dropoff'

const Filter = () => {
    return (
        <main className='w-full flex items-center flex-col md:flex-row'>
            <div className='flex-1 w-full bg-white'>
                <PickUp />
            </div>
            <div className='z-20'>
                <Search />
            </div>
            <div className='flex-1 w-full bg-white -mt-6 md:m-0'>
                <DropOff />
            </div>
        </main>
    )
}

export default Filter