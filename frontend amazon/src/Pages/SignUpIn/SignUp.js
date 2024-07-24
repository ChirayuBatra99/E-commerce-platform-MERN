import React,{useState} from 'react'
import styles from './signup.module.scss'

function SignUp() {
  const baseURL= 'http://localhost:8005'

  const [udata, setUdata]= useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
  });

  const sendData= async(e)=>{
    e.preventDefault();
    const {fname, mobile, email, password, cpassword} = udata;
    try{
        const res = await fetch(`${baseURL}/register`,{
          method: "POST",
          headers :{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            fname, mobile, email, password, cpassword
          })
        });
        console.log(res.status)
        const data = await res.json();

        console.log(data);
        if(res.status===422 || !data)
        {
          console.log("error! invalid details")
        }
        else{
          setUdata({
            ...udata, fname:"", email:"", mobile: "", password:"", cpassword:""
          })
          console.log("registration done, now fix here with toast");

        }
    }
    catch(error)
    {
        console.log("catch error from signup.js page ");
    }
  }

  const adddata = (e)=>{
    const {name, value} = e.target;
    setUdata((pre)=>{
      return{
        ...pre,
          [name]:value
      }
    })
  };

  return (
    <div className={styles.box}>
      Sign Up
      <input
      className={styles.inputs}
      type="text" 
      id="name" 
      name="fname"
      value={udata.fname}
       placeholder='Enter your name' 
      onChange={adddata}
      />

      <input
      className={styles.inputs}
      type="number" 
      id="phone" 
      name="mobile"
      value={udata.mobile}
       placeholder='Enter your phone' 
      onChange={adddata}
      />

      <input
      className={styles.inputs}
      type="email" 
      id="email" 
      name="email"
      value={udata.email}
       placeholder='Enter your email' 
      onChange={adddata}
      />

      <input
      className={styles.inputs}
      type="password" 
      id="password" 
      name="password"
      value={udata.password}
       placeholder='Enter your password' 
      onChange={adddata}
      />

      <input
      className={styles.inputs}
      type="password" 
      id="cpassword" 
      name="cpassword"
      value={udata.cpassword}
       placeholder='Re-enter password' 
      onChange={adddata}
      />

<button className={styles.buttonStyle} onClick={sendData} type="submit"> Continue</button>
 
    </div>
  )
}

export default SignUp
