import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Conversation from '../components/Conversation'
const Chat = () => {
  const location = useLocation().state
  const [socket, setSocket] = useState(null)
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState('')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/messages/' + currentConversation)
      .then(res => setMessages(res.data))
      .catch(err => console.log(err))
  }, [currentConversation])

  useEffect(() => {
    axios.get('http://localhost:5000/conversations/' + location._id)
      .then(res => {
        setConversations(res.data)
      })
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    setSocket(io('ws://localhost:5500'))
    // console.log(location)
  }, [])

  const sent = 'ml-auto mx-4 my-1 p-2 bg-gray-700 rounded-2xl max-w-[70%]'
  const received = 'mr-auto mx-4 my-1 p-2 bg-gray-500 rounded-2xl max-w-[70%]'
  return (
    <div className='bg-black text-white'>

      <div className='coantiner  h-screen py-12 w-4/6 m-auto flex'>
        <div className='w-1/3 border border-gray-800 bg-gray-600 p-2'>
          <p>Recent chats</p>

          {conversations.map(c => (
            <div key={c._id} onClick={() => setCurrentConversation(c._id)}>
              <Conversation conversation={c} user={location._id} />
            </div>
          ))}

        </div>
        <div className=' w-2/3 '>

          <div className='h-[8.33%] bg-gray-600 col p-2'>Live Chat</div>
          <div className='h-5/6 overflow-y-scroll no-scrollbar bg-gray-800 flex flex-col'>
            {
              messages.map(m => {
                if ((m.sender === location._id)) {
                  return (<p className={sent}>{m.text}</p>)
                }
                else {
                  return (<p className={received}>{m.text}</p>)
                }
              }

              )
            }

          </div>
          <div className='h-[8.33%] p-1.5 flex justify-evenly bg-gray-600'>
            <input className='w-3/4 px-4 rounded-full text-gray-800 focus:outline-0' type="text" placeholder='Message' />
            <button className=' px-4 rounded-full bg-green-400'>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
