import React from 'react'
import { useNavigate } from 'react-router-dom';

function Empty() {
    const navigate= useNavigate();

  return (
    <div>
        <div>
            <h1>Your Amazon basket is empty</h1>
            <p>See recommendations</p>
        </div>
        <p onClick={()=>navigate("/")}>Add your items</p>

    </div>
  )
}

export default Empty
