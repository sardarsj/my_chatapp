import React from 'react'

const ProfileModal = ({user, children}) => {
  return (
    <div>
      { children ? (<span>{children}</span>
      ) :(
        <span>Nothing happens here</span>
      )
      }
    </div>
  )
}

export default ProfileModal
