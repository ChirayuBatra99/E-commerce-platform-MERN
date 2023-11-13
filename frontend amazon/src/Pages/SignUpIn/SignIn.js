import React, { useState } from 'react'

function SignIn() {

  const [email, setEmail]=useState("");
  const [password, setPassword]= useState("");

  const handleSubmit=()=>{
      // FIX ME
  }

  const handleCreate=()=>{
    //FIX ME
  }

  return (
    <div>
      hemlo logo
      <h1>Sign In</h1>
      <h3>Email or mobile phone number</h3>
      <input
      className='email-input'
      type="email" 
      id="email" 
      value={email}
       placeholder='email' 
      onChange={(e)=> setEmail(e.target.value)}
      />
       <input
      className='password-input'
      type="password" 
      id="password" 
      value={password}
       placeholder='password' 
      onChange={(e)=> setPassword(e.target.value)}
      />
      <button className='submit-button' onClick={handleSubmit} type="submit"> Continue</button>

      <h2>New to Amazon?</h2>
      <button className='create-account' onClick={handleCreate} type="submit"> Create your Amazon account</button>


    </div>
  )
}

export default SignIn
