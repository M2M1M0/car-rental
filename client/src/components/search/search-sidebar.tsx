import React from 'react'
import Search from './search'
import Filter from './filer'

const SearchSideBar = () => {
  return (
    <aside className='flex flex-col gap-5 p-3 py-6'>
      <p className='text-gray-500 text-sm font-extrabold'>
        Search functionality <br /> Coming Soon!
      </p>
      {/* Search */}
      <div className='flex flex-col gap-3'>
        <h3 className='text-[9px] uppercase text-gray-500'>Search</h3>
        <Search title={"Search by brand or title"} />
      </div>

      {/* Type */}
      <div className='flex flex-col gap-2'>
        <p className='text__medium my-2'>Type</p>
        <Filter type={"Sport"} />
        <Filter type={"SUV"} />
        <Filter type={"MPV"} />
        <Filter type={"Sedan"} />
        <Filter type={"Couple"} />
        <Filter type={"Hatchback"} />
      </div>

      {/* Capacity */}
      <div className='flex flex-col gap-2'>
        <p className='text__medium my-2'>Capacity</p>
        <Filter type={"2 Person"} />
        <Filter type={"4 Person"} />
        <Filter type={"6 Person"} />
        <Filter type={"8 or More"} />
      </div>

      {/* Price */}
      <div className='flex flex-col gap-2'>
        <p className='text__medium my-2'>Price</p>
          {/* TODO: progress bar  */}
          
          <h6 className='text-xs font-semibold'>Max $100.00</h6>
      </div>
    </aside >
  )
}

export default SearchSideBar