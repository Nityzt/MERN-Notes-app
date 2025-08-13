import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="bg-zinc-800 border-b border-base-content/10">
      <div className="mx-auto">
        <div className="flex items-center justify-between p-6  "> 
        <h1 className="text-3xl font-bold text-yellow-400 tracking-wide ">
            <Link to={"/"}>My Notes</Link></h1>
        <div className="flex items-center">
            <Link to={"/create"} className="btn bg-zinc-800 text-amber-300 hover:bg-amber-300 border-amber-300 hover:border-black gap-2 hover:scale-105 transition-all duration-300 hover:text-black" >
            <PlusIcon className="size-5 hover:animate-spin transition-all duration-500"/>New Note</Link>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
