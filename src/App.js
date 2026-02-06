import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Footer from './components/Footer'
import Community from './pages/Community'
import ContactUs from './pages/ContactUs'
import News from './pages/News'
import ScrollToTop from './components/ScrollToTop'
import Shop from './pages/Shop'
import CheckoutPage from './pages/CheckOut'
import ProductDetail from './pages/ProductDetail'
import BlogDetail from './pages/BlogDetails'
import FAQs from './pages/Faqs'
import DeliveryReturns from './pages/DeliveryReturns'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrder'
import OrderTracking from './pages/OrderTracking'
import ProtectedRoute from './utils/ProtectedRoute'
import usePageTracking from './hooks/usePageTracking'

const App = () => {
  usePageTracking();


  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/our-story' element={<OurStory />} />
        <Route path='/community' element={<Community />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/news' element={<News />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/product/:productToken' element={<ProductDetail />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/delivery-returns" element={<DeliveryReturns />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>

        <Route path="/orders/:order_id" element={<OrderTracking />} />


      </Routes>

      <Footer />
    </>
  )
}

export default App