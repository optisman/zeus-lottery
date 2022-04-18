import React from 'react'
import type { NextPage } from 'next'
import { LotteryAdmin } from 'views/lottery-admin'
import { Header } from 'components/Header'
import { useFetchPublicData } from 'state/hooks'

const LotteryAdminPage: NextPage = () => {
  useFetchPublicData()

  return (
    <div>
      <Header />
      <LotteryAdmin />
    </div>
  )
}

export default LotteryAdminPage
