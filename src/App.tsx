import { UserStorage } from './context/UserStorage'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './components/home/Home'
import Login from './components/login/Login'
import { DateStorage } from './context/DateStorage'


function App() {

  return (
    <UserStorage>
      <DateStorage>
        <div className=''>
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
