import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPass = () => {
  const { backendUrl } = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeydown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset', { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      if (data.success) setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOtp = (e) => {
    e.preventDefault()
    const enteredOtp = inputRefs.current.map((input) => input.value).join('')
    setOtp(enteredOtp)
    if (enteredOtp.length === 6) {
      setIsOtpSubmitted(true)
      toast.success("OTP Verified!")
    } else {
      toast.error("Invalid OTP")
    }
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message)
      if (data.success) navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-white to-blue-200 relative'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      {/* Step 1: Enter Email */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className='bg-white p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-center text-2xl font-semibold mb-4 text-indigo-500'>Reset Password</h1>
          <p className='text-center mb-6 text-indigo-500'>Enter your registered email address</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" className='w-3 h-3' />
            <input
              type="email"
              placeholder='Email id'
              className='bg-transparent outline-none text-white'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2.5  bg-green-500 text-white rounded-full mt-3'>Submit</button>
        </form>
      )}

      {/* Step 2: OTP Input */}
      {isEmailSent && !isOtpSubmitted && (
        <form onSubmit={onSubmitOtp} className='bg-white p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-center text-2xl font-semibold mb-4  text-indigo-500'>Reset Password OTP</h1>
          <p className='text-center mb-6 text-indigo-500'>Enter the 6 digit code sent to your email</p>
          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                type="text"
                maxLength='1'
                key={index}
                required
                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                ref={el => inputRefs.current[index] = el}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeydown(e, index)}
              />
            ))}
          </div>
          <button className='w-full py-2.5  bg-green-500 text-white  rounded-full'>Submit</button>
        </form>
      )}

      {/* Step 3: New Password */}
      {isOtpSubmitted && (
        <form onSubmit={onSubmitNewPassword} className='bg-white p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-center text-2xl font-semibold mb-4  text-indigo-500'>New Password</h1>
          <p className='text-center mb-6 text-indigo-500'>Enter your new password below</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" className='w-3 h-3' />
            <input
              type="password"
              placeholder='Password'
              className='bg-transparent outline-none text-white'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2.5  bg-green-500 text-white rounded-full mt-3'>Submit</button>
        </form>
      )}
    </div>
  )
}

export default ResetPass
