import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

import axios from 'axios'
import Conversation from '../components/Conversation'
import { loginOut } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'


const Chat = () => {
  const dispatch =useDispatch()
  const navigate =useNavigate()
  const [userID, setUserID] = useState(useSelector(s => s.user.username))
  const [user, setUser] = useState(null)
  // const [socket, setSocket] = useState(null)
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [messages, setMessages] = useState([])
  const [newText, setNewText] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef();
  const scrollRef = useRef();

  const fetch = () => {
    const convo = conversations.filter(c => c._id === currentConversation)
    const seder = convo[0].members.filter(c => c !== user._id)
    axios.get('http://localhost:5000/users/' + seder[0])
      .then(res => setCurrentName(res.data[0].userID))
      .catch(err => console.log(err))

  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [arrivalMessage, messages])


  useEffect(() => {
    if (userID !== null && userID !== undefined) {
      axios.get('http://localhost:5000/users')
      .then(res => {
        setUser(res.data.find(us => us.userID === userID))
      })
      .catch(err => console.log(err))
    }
  }, [userID])

  useEffect(() => {
    if (currentConversation !== '' && arrivalMessage !== null) {

      const convo = conversations.filter(c => c._id === currentConversation)
      const seder = convo[0].members.filter(c => c !== user._id)
      if (seder[0] === arrivalMessage.sender) {
        console.log('hii')
        setMessages((prev) => [...prev, arrivalMessage])
      }
    }

  }, [arrivalMessage, currentConversation, user]);

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
    if (user !== null) {
      axios.get('http://localhost:5000/conversations/' + user._id)
      .then(res => {
        setConversations(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [user])


  useEffect(() => {
    if (user !== null) {
      socket.current = io('ws://localhost:5500')
      socket.current.emit("addUser", user._id)
      socket.current.on("getMessage", (data) => {
        console.log(data)
        setArrivalMessage({
          sender: data.text.sender,
          text: data.text.text,
          createdAt: Date.now(),
        });
        // let z=new Date(Date.now())
        // console.log(z.toLocaleTimeString())
      });
    };
  }, [user])



  const sent = 'ml-auto mx-4 my-0.5 px-3 pb-3 bg-gray-700 rounded-xl max-w-[70%]'
  const received = 'mr-auto mx-4 my-0.5 px-3 pb-3 bg-gray-500 rounded-xl max-w-[70%]'

  const selectedRecent=`lg:w-1/3 lg:h-full h-screen border border-gray-800 bg-gray-600 p-2  lg:block ${(currentConversation ==='')? '':'hidden'}`

  const selectedChat=`lg:w-2/3  h-full lg:block ${(currentConversation==='') ?'hidden':''} `

  const sendMessage = () => {
    const text = {
      "conversationId": currentConversation,
      "sender": user._id,
      "text": newText,
      'createdAt': Date.now(),
    }
    const convo = conversations.filter(c => c._id === currentConversation)
    const recv = convo[0].members.filter(c => c !== user._id)

    // console.log(recv+'th')
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: recv,
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

  const logout = () => {
    dispatch(loginOut({ username: '', id: '' }))
    navigate('/login', {  replace: true })
  }
  return (
    <div className='bg-black text-white'>

      <div className='  h-screen lg:py-12 lg:w-4/6 w-screen m-auto lg:flex'>
        <div className={selectedRecent}>
          <p>Recent chats</p>
          <div className=' h-[85%] overflow-y-scroll no-scrollbar lg:py-4'>

            {conversations.map(c => (
              <div key={c._id} onClick={() => setCurrentConversation(c._id)}>
                <Conversation conversation={c} user={user._id} />
              </div>
            ))}
          </div>

          <button className='py-2 ' onClick={logout}> ← Logout </button>
        </div>
        <div className={selectedChat}>

          <div className='h-[10%] bg-gray-600 col my-auto text-2xl flex items-center'>
            <p className='px-4 font-semibold'> <button onClick={()=> setCurrentConversation('') }> ← </button> {currentName}</p>
          </div>
          <div className='h-[80%]  overflow-y-scroll no-scrollbar bg-gray-800 flex flex-col'>
            {
              messages.map(m => {
                // console.log(m)
                const datee = new Date(m.createdAt)
                let hr = null
                let ap = null
                if (datee.getHours() == 0) { hr = 12; ap = 'am' }
                else if (datee.getHours() < 13) { hr = datee.getHours(); ap = 'am' }
                else { hr = datee.getHours() - 12; ap = 'pm' }


                if ((m.sender === user._id)) {
                  return (<p ref={scrollRef} key={m._id} className={sent}>{m.text} <span className='text-[0.5rem] relative top-3 pl-2 text-gray-400'>{hr + ':' + datee.getMinutes() + " " + ap}</span></p>)
                }
                else {
                  return (<p ref={scrollRef} key={m._id} className={received}>{m.text}<span className='text-[0.5rem] relative top-3 pl-2 text-gray-300'>{hr + ":" + datee.getMinutes() + " " + ap}</span></p>)
                }
              }

              )
            }

          </div>
          <div className='h-[10%] w-full p-1.5 flex justify-evenly bg-gray-600'>
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
