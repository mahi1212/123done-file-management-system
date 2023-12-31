import React from 'react'
import TextField from '../../components/TextField'
import googleIcon from '../../assets/google.svg'
import { NavLink } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex justify-center items-center flex-col h-dvh'>
      <p className='text-gray-900 text-[30px] font-bold '>Create a account</p>
      <p className='mt-[16px] text-slate-500 text-lg text-[18px]'>Start your journey with our product</p>
      {/*  */}
      <form>
        <TextField label='Name' type='text' name='name' placeholder="Enter name" />
        <TextField label='Email' type='email' name='email' placeholder="Enter email" />
        <TextField label='Password' type='password' name='password' placeholder="Enter password" />
        <div className='flex justify-between items-center w-[358px] mt-4 text-[12px]'>
          {/* remeber me checkbox */}
          <div className='flex items-center'>
            <input type="checkbox" name="remember-me" />
            <label htmlFor="remember-me" className='ml-[6px] text-slate-500'>Remember me</label>
          </div>
          {/* forgot password */}
          <p className='text-slate-500 text-[#4C22C5] text-bolder'>Forgot your password?</p>
        </div>
      </form>
      {/* buttons */}
      <div className='flex flex-col w-[358px] mt-[20px] text-[16px]'>
        <button className='bg-[#1C2434] text-white rounded-[8px] py-[12px] px-[18px]'>Sign up</button>
        <button className='mt-[16px] rounded-[8px] py-[12px] px-[18px] text-gray-500 border border-gray-100 flex justify-center gap-2 ' style={{ boxShadow: '0px 1px 2px 0px rgba(105, 81, 255, 0.05)' }}>
          <img src={googleIcon} alt="google-icone" className='w-[24px] h-[24px]' />
          Sign in with Google
        </button>
      </div>
      <p className='mt-[24px] text-[12px] text-slate-500 font-500'>Already have an account? <NavLink to='/signin' style={{ color: '#4C22C5', fontWeight: 'bold' }}>Sign In</NavLink></p>
    </div>
  )
}

export default Signup