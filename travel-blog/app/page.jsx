import Image from 'next/image'
import Navbar from './components/navbar/Navbar'
import LogIn from './login/page'
import MainPage from './main/page'
import SignUp from './signup/page'

export default function Home() {
  return (
    <div
      className='bg-[#F4F4F4]'
    >
      <MainPage />
    </div>
  )
}
