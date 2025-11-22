import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const EmailVerify = () => {

  axios.defaults.withCredentials=true;
  const {backendUrl,isLoggedin ,userData,getUserData}= useContext(AppContent)

  const navigate = useNavigate();
  const inputRefs = React.useRef([])

  const handleInput =(e,index)=>{
    if(e.target.value.length >0 && index < inputRefs.current.length -1){
      inputRefs.current[index +1 ].focus();
    }
  }

  const handleKeydown = (e,index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index >0){
        inputRefs.current[index - 1 ].focus();
    }
  }

  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value=char;
      }
    })
  }
const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const otp = inputRefs.current.map(input => input.value).join('');

    const { data } = await axios.post(
      backendUrl + '/api/auth/verify-account',
      { otp } // send cookies
    );

    if (data.success) {
      toast.success(data.message);
      getUserData();           // update user data
      navigate('/');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};


useEffect(()=>{
  isLoggedin && userData && userData.isAccountVerified && navigate('/')
},[isLoggedin,userData])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-white to-blue-200 relative'>

      <img onClick={()=>Navigate('/')}src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5
      w-28 sm:w-32 cursor-pointer'/>

      <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-center  text-2xl font-semibold mb-4  text-indigo-500'>Email Verify Otp</h1>
        <p className='text-center mb-6 text-indigo-500'>
          Enter the 6 digit code sent to your email id
        </p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index)=>(
            <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md' 
            ref={e=>inputRefs.current[index]=e}
            onInput={(e)=>handleInput(e,index)}
            onKeyDown={(e)=>handleKeydown(e,index)}
            />
          ))}

        </div>

        <button className='w-full py-3  bg-green-500 text-white rounded-full'> Verify email</button>
      </form>
    </div>
  )
}

export default EmailVerify