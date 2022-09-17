import React from 'react'
import type { NextPage } from 'next'
import { Sidebar } from 'components/Sidebar'
import { Lottery } from 'views/lottery'
import { useFetchPublicData } from 'state/hooks'

const HomePage: NextPage = () => {
  useFetchPublicData()

  return (
    <>
      <Sidebar />
      <Lottery />
    </>
  )
}
export default HomePage
