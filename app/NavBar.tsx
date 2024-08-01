import Link from 'next/link'
import React from 'react'
import { FaBugSlash } from "react-icons/fa6";

const NavBar = () => {
    const links = [{label:"Dashboard", href:"/"},{label:"Issues", href:"/issues"}]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><FaBugSlash /></Link>
        <ul className='flex space-x-6'>
            {links.map((elm) =>{
                return <><li key={elm.href}>
                    <Link  className='text-zinc-500 hover:text-zinc-800 transition-colors' href={elm.href}>{elm.label}</Link>
                    </li></>
            })}
        </ul>
    </nav>
  )
}

export default NavBar