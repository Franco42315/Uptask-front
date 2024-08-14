import { Outlet } from 'react-router-dom'
import Tabs from '../components/profile/Tabs'

export const ProfileLayout = () => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  )
}
