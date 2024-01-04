import React from 'react'
import TextField from '../../components/TextField'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('')
    const [code, setCode] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [codeSent, setCodeSent] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    return (
        <div className='flex justify-center items-center flex-col w-full h-screen gap-4 container px-2'>
            <h1 className='text-2xl uppercase text-center'> We are here to reset your password</h1>
            {
                codeSent == false ? <>
                    <input
                        type='email'
                        placeholder={'Enter your email'}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 border-gray-200 w-[358px] rounded-[8px] px-[14px] py-[10px] outline-none mt-3'
                    />

                    <button
                        disabled={loading}
                        className='bg-black text-white px-4 py-3 rounded-md mt-4'
                        onClick={() => {
                            if (email === '') {
                                alert('Please enter your email')
                                return
                            }
                            
                            setLoading(true)
                            fetch('http://localhost:5000/getVerificationCode', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: email
                                })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.status == 200) {
                                        alert('Password reset link sent to your email')
                                        setCodeSent(true)
                                    }else{
                                        alert('Something went wrong, try again')
                                    }
                                })
                                .finally(() => setLoading(false))

                        }}
                    >
                        {
                            loading ? 'Generating OTP...' : 'Send verification code'
                        }
                    </button>
                </> : <>
                    <input
                        type='number'
                        placeholder={'Enter verification code'}
                        onChange={(e) => setCode(e.target.value)}
                        className='border-2 border-gray-200 w-[358px] rounded-[8px] px-[14px] py-[10px] outline-none mt-3'
                    />

                    <input
                        type='password'
                        placeholder={'Enter new password'}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='border-2 border-gray-200 w-[358px] rounded-[8px] px-[14px] py-[10px] outline-none mt-3'
                    />

                    <button
                        disabled={loading}
                        className='bg-slate-300 p-2 rounded-md mt-4'
                        onClick={() => {
                            if (code === '') {
                                alert('Please enter verification code')
                                return
                            }
                            if (newPassword === '') {
                                alert('Please enter new password')
                                return
                            }
                            // password minimum length 6 characters
                            if (newPassword.length < 6) {
                                alert('Password must be at least 6 characters long')
                                return
                            }
                            setLoading(true)
                            fetch('http://localhost:5000/verifyOTP', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: email,
                                    userOTP: code,
                                })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                    if (data.status == 200) {
                                        fetch('http://localhost:5000/reset-password', {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                email: email,
                                                password: newPassword,
                                            })
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                console.log(data)
                                                if (data.status == 200) {
                                                    alert('Password reset successful')
                                                    navigate('/signin')
                                                } else {
                                                    alert('Something went wrong')
                                                }
                                            })
                                    } else {
                                        alert('Invalid verification code')
                                    }
                                })
                                .finally(() => setLoading(false))

                        }}
                    >
                        Continue
                    </button>
                </>
            }
        </div>
    )
}

export default ResetPassword