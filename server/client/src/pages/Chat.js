import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Conversation from '../components/Conversation'



const Chat = () => {
  const location = useLocation().state
  // const [socket, setSocket] = useState(null)
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [messages, setMessages] = useState([])
  const [newText, setNewText] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef();

  const fetch = () => {
    const convo = conversations.filter(c => c._id === currentConversation)
    const seder = convo[0].members.filter(c => c !== location._id)
    axios.get('http://localhost:5000/users/' + seder[0])
      .then(res => setCurrentName(res.data[0].userID))
      .catch(err => console.log(err))

  }

  useEffect(() => {
    if(currentConversation !=='' && arrivalMessage !== null){

      const convo = conversations.filter(c => c._id === currentConversation)
      const seder = convo[0].members.filter(c => c !== location._id)
      if (seder[0] === arrivalMessage.sender) {
        console.log('hii')
        setMessages((prev) => [...prev, arrivalMessage])
      }
    }
    
  }, [arrivalMessage, currentConversation]);

  useEffect(() => {
    setNewText('')
    
    if (currentConversation !== '') {
    axios.get('http://localhost:5000/messages/' + currentConversation)
      .then(res => setMessages(res.data))
      .catch(err => console.log(err))
    

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
    socket.current = io('ws://localhost:5500')
    socket.current.emit("addUser", location._id);
    socket.current.on("getMessage", (data) => {
      console.log(data)
      setArrivalMessage({
        sender: data.text.sender,
        text: data.text.text,
        createdAt: Date.now(),
      });
    });
  }, [])



  const sent = 'ml-auto mx-4 my-0.5 px-3 pb-3 bg-gray-700 rounded-xl max-w-[70%]'
  const received = 'mr-auto mx-4 my-0.5 px-3 pb-3 bg-gray-500 rounded-xl max-w-[70%]'

  const sendMessage = () => {
    const text = {
      "conversationId": currentConversation,
      "sender": location._id,
      "text": newText
    }
    const convo = conversations.filter(c => c._id === currentConversation)
    const recv = convo[0].members.filter(c => c !== location._id)

    // console.log(recv)
    socket.current.emit("sendMessage", {
      senderId: location._id,
      receiverId: recv[0],
      text
    });

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
                console.log(m)
                if ((m.sender === location._id)) {
                  return (<p key={m._id} className={sent}>{m.text} <span className='text-[0.5rem] relative top-3 pl-2 text-gray-400'>{String(m.createdAt).slice(11,16)}</span></p>)
                }
                else {
                  return (<p key={m._id} className={received}>{m.text}<span className='text-[0.5rem] relative top-3 pl-2 text-gray-300'>{String(m.createdAt).slice(11,16)}</span></p>)
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
