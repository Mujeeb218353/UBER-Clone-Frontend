import { Outlet } from 'react-router-dom'
import ThemeChanger from '../components/ThemeChanger'

const UsersLayout = () => {
  return (
    <div className='' >
        <Outlet/>
        <ThemeChanger position='fixed bottom-4 right-4'/>
    </div>
  )
}

export default UsersLayout