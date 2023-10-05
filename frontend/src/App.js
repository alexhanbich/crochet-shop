import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <div className='max-w-screen-lg mx-auto font-body'>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <ToastContainer />
        <Footer />
      </div>     
    </>

  )
}

export default App
