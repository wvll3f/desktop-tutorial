import { UserStorage } from './context/UserStorage'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/login/Login'


function App() {

  return (
    <UserStorage>
      <div className='flex w-screen justify-between flex-col h-screen bg-gray-100'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </UserStorage>

  )
}

export default App
