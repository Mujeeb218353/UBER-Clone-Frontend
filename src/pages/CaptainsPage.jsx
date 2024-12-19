import React from 'react'
import { Outlet } from 'react-router-dom'

const CaptainsPage = () => {
  return (
    <div>
      Captains
      <Outlet/>
    </div>
  )
}

export default CaptainsPage