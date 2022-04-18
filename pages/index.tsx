import React from 'react'
import type { NextPage } from 'next'
import { Lottery } from 'views/lottery'
import { Header } from 'components/Header'
import { useFetchPublicData } from 'state/hooks'

const HomePage: NextPage = () => {
  useFetchPublicData()

  return (
    <>
      <Header />
      <Lottery />
    </>
  )
}

export default HomePage
