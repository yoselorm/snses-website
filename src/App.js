import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Footer from './components/Footer'
import Community from './pages/Community'
import ContactUs from './pages/ContactUs'
import News from './pages/News'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/our-story' element={<OurStory />} />
        <Route path='/community' element={<Community />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/news' element={<News />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App