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
        <div className='min-w-screen min-h-screen overflow-hidden bg-gray-100'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer className='' />
        </div>
      </DateStorage>
    </UserStorage >

  )
}

export default App
