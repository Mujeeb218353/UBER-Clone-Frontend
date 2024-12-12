import React from 'react'
import { Outlet } from 'react-router-dom'
import ThemeChanger from './components/ThemeChanger.jsx'

const App = () => {
  return (
   <div className='min-h-screen w-full h-screen'>
     <Outlet/>
     <ThemeChanger position='fixed bottom-4 right-4'/>
   </div>
  )
}

export default App