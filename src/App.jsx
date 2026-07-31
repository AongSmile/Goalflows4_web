import React, { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Clients from './components/Clients'
import Community from './components/Community'
import Pixelgrade from './components/Pixelgrade'
import Article from './components/Article'
import Services from './components/Services'
import Footers from './components/Footers'
import HeroSlide from './components/HeroSlide'
import HeroInfiniteSlide from './components/HeroInfiniteSlide'
import Productforsale from './components/Productforsale'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes />
      {/* <Navbar /> */}
      {/* <Header /> */}
      {/* <Productforsale /> */}
      {/* <Community /> */}
      {/* <Pixelgrade /> */}
      {/* <Clients /> */}
      {/* <Article /> */}
      {/* <Services /> */}
      <Footers />
      {/* <HeroSlide /> */}
      {/* <HeroInfiniteSlide/> */}
    </>
  )
}

export default App
