import React from 'react'
import { Link } from 'react-router-dom'
import HomeNavbar from '../../layouts/HomeNavbar'
import Hero from '../../components/homeCom/Hero'
import SubscriptionPlans from '../../components/homeCom/SubscriptionPlans'
import Footer from './Footer'

const Home = () => {
  return (
   <>
    <HomeNavbar/>
    <Hero/>
   
   <div className='container mx-auto'>
   <SubscriptionPlans/>
   </div>
   <Footer/>
   </>
  )
}

export default Home