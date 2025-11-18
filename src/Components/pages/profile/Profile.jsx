import React, { useContext } from 'react'
import { MyContext } from '../../data/Context';

export default function Profile() {
  const { logout } = useContext(MyContext);
  return (
    <div>
      user Profile
      <div onClick={logout} className='mt-20'>
        log out 
      </div>
    </div>
  )
}
