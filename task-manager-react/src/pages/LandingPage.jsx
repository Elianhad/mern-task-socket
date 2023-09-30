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
          <div className='bg-lines bg-cover bg-no-repeat opacity-60 p-4'>
            <h2 className='font-black text-2xl text-orange-900 bg-orange-300 p-2 rounded-md inline-block'>
              Que todo se concrete!!
            </h2>
            <Features />
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default LandingPage
