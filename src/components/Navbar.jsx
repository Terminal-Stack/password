import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-4 h-14">

        <div className="logo font-bold text-2xl">
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
            </div>
    
    
      <button className='text-white bg-green-700 rounded-full flex justify-between items-center'>
        <img className='w-8 p-1 invert' src="icon/github1.svg" alt="" />
        <span className='font-bold px-2'>GitHub</span>
      </button>
        </div>
    </nav>
  )
}

export default Navbar
