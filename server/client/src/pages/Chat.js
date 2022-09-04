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
  const [currentName, setCurrentName] = useState('')
  const [messages, setMessages] = useState([])
  const [newText, setNewText] = useState('')


  const fetch = () => {
    const convo = conversations.filter(c => c._id === currentConversation)
    const seder = convo[0].members.filter(c => c !== location._id)
    axios.get('http://localhost:5000/users/' + seder[0])
      .then(res => setCurrentName(res.data[0].userID))
      .catch(err => console.log(err))

  }

  useEffect(() => {
    setNewText('')
    axios.get('http://localhost:5000/messages/' + currentConversation)
      .then(res => setMessages(res.data))
      .catch(err => console.log(err))
    if (currentConversation !== '') {

      fetch()
    }
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

  const sendMessage = () => {
    const text = {
      "conversationId": currentConversation,
      "sender": location._id,
      "text": newText
    }
    axios.post('http://localhost:5000/messages/new', text)
      .then(res => {
        if (res.status === 200) {
          setMessages([...messages, text])
        }
      })
      .then(setNewText(''))
      .catch(err => console.log(err))
  }
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

          <div className='h-[10%] bg-gray-600 col my-auto text-2xl flex items-center'>
            <p className='px-4 font-semibold'>{currentName}</p>
          </div>
          <div className='h-[80%] overflow-y-scroll no-scrollbar bg-gray-800 flex flex-col'>
            {
              messages.map(m => {
                if ((m.sender === location._id)) {
                  return (<p key={m._id} className={sent}>{m.text}</p>)
                }
                else {
                  return (<p key={m._id} className={received}>{m.text}</p>)
                }
              }

              )
            }

          </div>
          <div className='h-[10%] p-1.5 flex justify-evenly bg-gray-600'>
            <input className='w-3/4 px-4 my-1 rounded-full text-gray-800 focus:outline-0' type="text" placeholder='Message'
              value={newText}
              onChange={(e) => setNewText(e.target.value)} />
            <button className=' px-4 my-1 rounded-full bg-green-400' onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
