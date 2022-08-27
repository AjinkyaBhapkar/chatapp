import React, { useState } from 'react'
import hero from '../images/4112338.jpg'


const Login = () => {
    const [toggle,setToggle]=useState('login')
  return (
    <div className={`h-screen w-screen py-2 flex lg:flex-row  lg:justify-between justify-evenly flex-col items-center `}>
        <div className=' lg:w-1/2 lg:h-auto  lg:m-10 w-full my-5 '>
            <img  src={hero} alt="" />
        </div>
        <div className='lg:w-1/3  w-11/12 my-10 lg:m-10 mx-auto  border-2 border-gray-600 p-2 rounded-lg bg-gray-400' >
            <h3 className='text-center text-4xl text-white py-5 font-bold'>Join Chat</h3>
            
            <form className='flex flex-col py-4 text-white'>
                <input className='focus:outline-0 m-1 p-1 bg-gray-600 ' type="text" name="" id="" placeholder='Username' />
                <input className='focus:outline-0 m-1 p-1 bg-gray-600 ' type="text" name="" id="" 
                placeholder='Invite ID' />
                <input type="submit" value="Join" className='bg-gray-600 mx-1 my-3 p-1 border-2 border-gray-900 text-xl'/>
            </form>
        </div>

      
    </div>
  )
}

export default Login
