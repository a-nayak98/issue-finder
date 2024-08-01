"use client"
import Link from 'next/link'
import React from 'react'
import { FaBugSlash } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
    const routName = usePathname()
    // console.log(routName)
    const links = [{label:"Dashboard", href:"/"},{label:"Issues", href:"/issues"}]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><FaBugSlash /></Link>
        <ul className='flex space-x-6'>
            {links.map((elm) =>{
                return <><li key={elm.href}>
                    <Link  className={classNames({
                        "text-zinc-900" : elm.href === routName,
                        "text-zinc-500" : elm.href !== routName,
                        "hover:text-zinc-800 transition-colors":true
                    })} href={elm.href}>{elm.label}</Link>
                    </li></>
            })}
        </ul>
    </nav>
  )
}

export default NavBar