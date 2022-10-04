import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Conversation = ({ conversation, user }) => {

  const [name, setName] = useState('')
  const ID = conversation.members.filter(a => a !== user)

  useEffect(() => {

    axios.get('https://tinggg.herokuapp.com/users/' + ID[0])
      .then(res => { setName(res.data[0].userID) })
      .catch(err => console.log(err))
  }, [])


  return (
    <p className=' px-2 overflow-hidden my-1 border-b border-gray-800'>{name}</p>
  )
}

export default Conversation
