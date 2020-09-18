import React, { useRef, useEffect } from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import Footer from '../components/layout/Footer'

const LayoutDefault = () => {
  return (
    <>
      <Header navPosition="right" className="reveal-from-bottom" />
      <main className="site-content">
        <Hero className="illustration-section-01" />
      </main>
      <Footer />
    </>
  )
}

export default LayoutDefault
