import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/Navbar'
import SignUp from './components/Auth/SignUp'

function App() {
  return (
    <>
      <SignUp />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App
