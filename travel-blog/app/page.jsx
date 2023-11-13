import Image from 'next/image'
import LogIn from './login/page'
import SignUp from './signup/page'

export default function Home() {
  return (
    <div>
      <LogIn />
      {/* <SignUp /> */}
    </div>
  )
}
