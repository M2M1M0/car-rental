import Filter from '@/components/filter'
import Cars from '@/components/search/cars'
import Search from '@/components/search/search'
import SearchMenu from '@/components/search/search-menu'
import SearchSideBar from '@/components/search/search-sidebar'
import React from 'react'

const Page = () => {
  return (
    <section className='w-full h-full relative'>
      <div className='flex flex-col md:flex-row gap-2 mt-4'>
        {/* ===== Mobile View (search sidebar) ====== */}
        <div className='flex justify-between items-center md:hidden w-full bg-white md:px-4 px-2 flex-1 md:ml-[260px]'>
          <Search title={"Search by Brand or Title"} />
          <SearchMenu />
        </div>

        {/* ===== Desktop View (search sidebar) ====== */}
        <aside className='w-[250px] hidden md:inline-block bg-white h-full'>
          <SearchSideBar />
        </aside>

        <main className='flex-1'>
          <div className='md:px-4 px-2'>
            {/*  */}
            <Filter />

            {/*  */}
            <div className='h-[78vh] overflow-y-auto mb-4' style={{ scrollBehavior: "smooth" }}>
              <Cars />
            </div>
          </div>

        </main>
      </div>
    </section>
  )
}

export default Page