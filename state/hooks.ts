import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLotteryGlobalDataAsync } from './actions'
import { State, LotteryState } from 'state/types'


export const useFetchPublicData = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // lottery
    dispatch(fetchLotteryGlobalDataAsync())

  }, [dispatch])
}

export const useLotteryState = (): LotteryState => {
  const lotteryState = useSelector((state: State) => state.lottery)
  return lotteryState
}

