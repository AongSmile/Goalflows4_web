import React from 'react'
import Client from '../components/Client'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Productforsale from '../components/Productforsale'
import Community from '../components/Community'
import Pixelgrade from '../components/Pixelgrade'
import Clients from '../components/Clients'
import OurCustomer from '../components/OurCustomer'

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <Productforsale />
      <Community />
      <OurCustomer/>
      {/* <Pixelgrade /> */}
      <Clients />
    </>
  )
}

export default Home
