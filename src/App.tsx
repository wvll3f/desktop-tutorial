import { UserStorage } from './context/UserStorage'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/login/Login'
import { DateStorage } from './context/DateStorage'


function App() {

  return (
    <UserStorage>
      <DateStorage>
        <div className='flex items-center w-screen space-y-5 h-screen flex-col bg-gray-100'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer className=' absolute  bottom-0' />
        </div>
      </DateStorage>
    </UserStorage >

  )
}

export default App
