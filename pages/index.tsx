import React from 'react'
import type { NextPage } from 'next'
import { Header } from 'components/Header'
import { Lottery } from 'views/lottery'
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
