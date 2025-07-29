import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from './pages/(auth)/signin'
import Signup from './pages/(auth)/signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
