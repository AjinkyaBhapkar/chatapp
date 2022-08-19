import React from 'react'

const Chat = () => {
  const sent='ml-auto mx-4 my-1 p-2 bg-gray-700 rounded-2xl max-w-[70%]'
  const received='mr-auto mx-4 my-1 p-2 bg-gray-500 rounded-2xl max-w-[70%]'
  return (
    <div className='bg-black text-white'>

      <div className='coantiner  h-screen py-12 w-4/6 m-auto flex'>
        <div className='w-1/3 border border-gray-800 bg-gray-600 p-2'>Recent chats</div>
        <div className=' w-2/3'>

          <div className='h-[8.33%] bg-gray-600 col p-2'>Live Chat</div>
          <div className='h-5/6 overflow-scroll  bg-gray-800 flex flex-col'>
           <p className={received}>Lorem ipsum dolor sit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
           <p className={sent}>Lorem ipsum dolor sit.</p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem </p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem </p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem </p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem ipsum dolor sit.</p>
           <p className={sent}>Lorem </p>
           <p className={received}>Lorem ipsum dolor sit.</p>
           

          </div>
          <div className='h-[8.33%] p-1.5 flex justify-evenly bg-gray-600'>
            <input className='w-3/4 px-4 rounded-full text-gray-800' type="text" placeholder='Message' />
            <button className=' px-4 rounded-full bg-green-400'>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
