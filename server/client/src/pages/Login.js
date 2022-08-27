import React, { useState } from 'react'
import hero from '../images/4112338.jpg'


const Login = () => {
    const [toggle,setToggle]=useState('login')

    

  return (<><h2 className='text-center font-mono text-5xl text-green-700 font-extrabold italic  pt-5 -mb-5'>Tingg!!</h2>
    <div className={`h-screen w-screen py-2 flex lg:flex-row  lg:justify-between justify-evenly flex-col items-center `}>
        
        <div className=' lg:w-1/2 lg:h-auto  lg:m-10 w-full my-5 '>
            <img  src={hero} alt="" />
        </div>
        <div className='lg:w-1/3  w-11/12 my-10 lg:m-10 mx-auto  border-2 border-gray-600 p-2 rounded-lg bg-gray-400' >
            
                
            <div className='flex'>
                <button 
                onClick={()=>{setToggle('login')}}
                className={`bg-transparent text-lg ${(toggle==='login')? 'font-light':'font-semibold'} w-1/2`}>Login</button>
                <button 
                onClick={()=>{setToggle('signup')}}
                className={`bg-transparent text-lg ${(toggle==='login')? 'font-semibold':'font-light'} w-1/2`}>Sign-up</button>
            </div>
            
            <form className='flex flex-col py-4 text-white'>
                <input className='focus:outline-0 m-1 p-1 bg-gray-600 ' type="text" name="" id="" placeholder='Username' />
                <input className='focus:outline-0 m-1 p-1 bg-gray-600 ' type="Password" name="" id="" 
                placeholder='Password' />
                <input className={`focus:outline-0 m-1 p-1 bg-gray-600 ${(toggle==='login')?'hidden':''} `} type="text" name="" id="" 
                placeholder='Confirm Password' />
                <input type="submit" value="Join" className='bg-gray-600 mx-1 my-3 p-1 border-2 border-gray-900 text-xl'/>
            </form>
        </div>

      
    </div></>
  )
}

export default Login
