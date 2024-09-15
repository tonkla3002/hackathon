
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./components/Home"
import Edit from './components/Edit'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/edit' element={<Edit />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
