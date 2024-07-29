import  {Logincontext}  from '../../Components/context/Contextprovider';

import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './signin.module.scss'
const baseURL = 'http://localhost:8005'

function SignIn() {
  const {account, setAccount}= useContext(Logincontext)

  const navigate = useNavigate();
  const [logData, setData] = useState({
    email: "",
    password: ""
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  };

  const handleCreate = () => {
    navigate("/signup")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logData;
    try {
      const res = await fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        console.log("invalid details")
      }
      else {
        console.log("data valid")
        setAccount(data);

        setData({ ...logData, email: "", password: "" })
        console.log(data);
        navigate("/")
      }
    }
    catch (error) {
      console.log("hi", error)
    }
  }

  return (
    // <div className={styles.box}>
    //   Amazon
    //   <h1>Sign In</h1>
    //   <h3>Email or mobile phone number</h3>
    //   <div className={styles.inputs}>
    //   <input
    //     className={module.inputfield}
    //     type="email"
    //     name="email"
    //     id="email"
    //     value={logData.email}
    //     placeholder='email'
    //     onChange={adddata}
    //   />

    //   <input
    //     className={module.inputfield}
    //     type="password"
    //     name="password"
    //     id="password"
    //     value={logData.password}
    //     placeholder='password'
    //     onChange={adddata}
    //   />
    //   </div>
    //   <button className='submit-button' onClick={handleSubmit} type="submit"> Continue</button>

    //   <h2>New to Amazon?</h2>
    //   <button className='create-account' onClick={handleCreate} type="submit"> Create your Amazon account</button>


    // </div>
    <div className={styles.box}>
    <div className={styles.container}>
      <div className={styles.header}>Amazon</div>
      <h1 className={styles.title}>Sign In</h1>
      <h3 className={styles.subtitle}>Email or mobile phone number</h3>
      <div className={styles.inputs}>
        <input
          className={styles.inputField}
          type="email"
          name="email"
          id="email"
          value={logData.email}
          placeholder="Email"
          onChange={adddata}
        />
        <input
          className={styles.inputField}
          type="password"
          name="password"
          id="password"
          value={logData.password}
          placeholder="Password"
          onChange={adddata}
        />
      </div>
      <button className={styles.submitButton} onClick={handleSubmit} type="button">Continue</button>
      <h2 className={styles.newUser}>New to Amazon?</h2>
      <button className={styles.createAccount} onClick={handleCreate} type="button">Create your Amazon account</button>
    </div>
  </div>
  )
}

export default SignIn
