import React from 'react'
import type { NextPage } from 'next'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { Lottery } from 'views/lottery'
import { useFetchPublicData } from 'state/hooks'

const HomePage: NextPage = () => {
  useFetchPublicData()

  return (
    <>
      <Header />
      <Lottery />
      <Footer />
    </>
  )
}
export default HomePage
