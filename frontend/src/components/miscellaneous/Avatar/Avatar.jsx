import React from 'react'
import "./Avatar.css";

function Avatar(props) {
  return (
    <div className={`avatar ${props.size}`}>
      {props.name}
    </div>
  )
}

export default Avatar