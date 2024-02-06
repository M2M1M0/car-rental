import React from 'react'
import Logo from './logo'
import Link from 'next/link'
import { FaFacebook, FaTelegram } from 'react-icons/fa6'
import { BsGithub } from 'react-icons/bs'
import { LiaLinkedin } from 'react-icons/lia'

const Footer = () => {
  return (
    <div className='bg-white h-48 w-full p-5 flex flex-col justify-between'>
      <Logo />
      <div>
        <p className='text-center text__medium'>&copy; All right 2024.</p>
        <div className='flex justify-end w-full border-t border-gray-300 py-2'>
          <ul className='flex gap-3 px-5'>
            <Link href={"/"}><FaFacebook size="30" className='footer__link' /></Link>
            <Link href={"/"}><LiaLinkedin size="30" className='footer__link' /></Link>
            <Link href={"/"}><BsGithub size="30" className='footer__link' /></Link>
            <Link href={"/"}><FaTelegram size="30" className='footer__link' /></Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer