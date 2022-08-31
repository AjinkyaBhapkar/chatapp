import React, { useEffect, useState } from 'react'
import hero from '../images/4112338.jpg'
import axios from 'axios'

const Login = () => {
    const [toggle, setToggle] = useState('login')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [users, setUsers] = useState([])

    const credentials = {
        u: username,
        password: password
    }

    useEffect(() => {
        setUsername('')
        setPassword('')
        setConfirm('')
    }, [toggle])

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => {
                let takenUsernames=res.data.map(u=>u.userID)
                setUsers(takenUsernames)
            })
            .catch(err => console.log(err))
    }, [])


    const passwordRequirements = "Must contain at least one number, one uppercase, one lowercase, one special character(!@#$&*) and at least 8 or more characters";
    const valid = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/

    const login = () => {

        axios.post('http://localhost:5000/users/login', credentials)
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }

    const signup = async () => {

        axios.post('http://localhost:5000/users/signup', credentials)
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
        // console.log(username+password)
    }


    const submit = (e) => {
        e.preventDefault()
        if (toggle === 'login') {
            login();
        } else if (toggle === 'signup') {
            signup();
        }
    }

    return (<div className=''>
        <h2
            className='text-center  text-5xl text-green-700 font-semibold  italic pt-5 m-0 -mb-5'
        >Tingg!!</h2>
        <div className={`  py-2 flex lg:flex-row  lg:justify-start justify-evenly flex-col items-center `}>

            <div className=' lg:w-1/2 lg:h-auto  lg:m-10 w-full my-5 '>
                <img src={hero} alt="" />
            </div>
            <div className='lg:w-1/3  w-11/12 my-10 lg:my-10 mx-auto  border-2 border-gray-600 p-2 rounded-lg bg-gray-400' >


                <div className='flex'>
                    <button
                        onClick={() => { setToggle('login') }}
                        className={`bg-transparent text-lg ${(toggle === 'login') ? 'font-light' : 'font-semibold'} w-1/2`}>Login</button>
                    <button
                        onClick={() => { setToggle('signup') }}
                        className={`bg-transparent text-lg ${(toggle === 'login') ? 'font-semibold' : 'font-light'} w-1/2`}>Sign-up</button>
                </div>

                <form className='flex flex-col py-4 text-white'>
                    <input className='focus:outline-0 m-1 p-1 bg-gray-600 ' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />

                    {(users.includes(username))&&(toggle === 'signup')?
                    <p className='text-[8px] text-red-800 px-1'>Username already exist</p>:''}

                    <input className='focus:outline-0 m-1 p-1 bg-gray-600 ' type="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password' />

                    {!valid.test(password) && (toggle === 'signup') && (password !== '') ?
                        <p className='text-[8px] text-red-800 px-1'>{passwordRequirements}</p>
                        : ''}

                    <input className={`focus:outline-0 m-1 p-1 bg-gray-600 ${(toggle === 'login') ? 'hidden' : ''} `} type="text" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                        placeholder='Confirm Password' />
                    {
                        (confirm !== '') && (password !== confirm) ?
                            <p className='text-[8px] text-red-800 px-1'>Password dont match</p>
                            : ''
                    }
                    <input type="submit" onClick={e => submit(e)} value="Join" className='bg-gray-600 mx-1 my-3 p-1 border-2 border-gray-900 text-xl' />
                </form>
            </div>


        </div></div>
    )
}

export default Login
