import React, { useState } from 'react'
import TextField from '../../components/TextField'
import googleIcon from '../../assets/google.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAtom, useSetAtom } from 'jotai/react'
import { userAtom } from '../../lib/jotai'
import logo from '../../assets/logo.png'

const Signin = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (fieldName) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // validate email
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Invalid email');
      return;
    }
    // send data to backend
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.status == 200) {
          setUser(data)
          navigate('/files')
        } else if (data.status == 401) {
          alert(data.message)
        } else {
          alert('Something went wrong');
        }
      })
      .finally(() => setLoading(false))

  };

  return (
    <div className='flex justify-center items-center flex-col h-dvh'>
      <div className='relative'>
        <p className='text-gray-900 text-[30px] font-bold '>Sign in to your account</p>
        <img src={logo} alt="logo" className='w-[75px] -rotate-45 absolute top-0 -left-10' />
      </div>
      <p className='mt-[16px] text-slate-500 text-lg text-[18px]'>Start your demo version</p>
      {/*  */}
      <form>
        <TextField label='Email' type='email' name='email' placeholder="Enter email" onChange={handleInputChange('email')} />
        <TextField label='Password' type='password' name='password' placeholder="Enter password" onChange={handleInputChange('password')} />
        <div className='flex justify-between items-center w-[358px] mt-4 text-[12px]'>
          {/* remeber me checkbox */}
          <div className='flex items-center'>
            <input type="checkbox" name="remember-me" />
            <label htmlFor="remember-me" className='ml-[6px] text-slate-500'>Remember me</label>
          </div>
          {/* forgot password */}
          <NavLink to='/reset-password' className='text-slate-500 text-[#4C22C5] text-bolder cursor-pointer font-bold'>Forgot your password?</NavLink>
        </div>
      </form>
      {/* buttons */}
      <div className='flex flex-col w-[358px] mt-[20px] text-[16px]'>
        <button className='bg-[#1C2434] text-white rounded-[8px] py-[12px] px-[18px]' onClick={handleSubmit}>{loading ? 'Loading...' : 'Sign in'}</button>
        <button className='mt-[16px] rounded-[8px] py-[12px] px-[18px] text-gray-500 border border-gray-100 flex justify-center gap-2 ' style={{ boxShadow: '0px 1px 2px 0px rgba(105, 81, 255, 0.05)' }}>
          <img src={googleIcon} alt="google-icone" className='w-[24px] h-[24px]' />
          Sign in with Google
        </button>
      </div>
      <p className='mt-[24px] text-[12px] text-slate-500 font-500'>Don't have an account? <NavLink to={'/signup'} style={{ color: '#4C22C5', fontWeight: 'bold' }}>Sign up</NavLink></p>
    </div>
  )
}

export default Signin