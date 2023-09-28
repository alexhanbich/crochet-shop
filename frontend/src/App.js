import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <div className='max-w-screen-lg mx-auto font-body'>
        <Navbar className='p'/>
        <main>
          <Outlet className='' />
        </main>
        <ToastContainer />
      </div>     
    </>

  )
}

export default App
