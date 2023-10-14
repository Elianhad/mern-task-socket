import React from 'react'
import HeaderLanding from '../components/HeaderLanding'
import HeroCTA from '../components/HeroCTA'
import Features from '../components/Features'
import Footer from '../components/Footer'
const LandingPage = () => {
  return (
    <>
      <HeaderLanding />
      <main>
        <HeroCTA />
        <section className='relative'>
          <div className='p-8 max-w-[60rem] mx-auto'>
            <Features />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
