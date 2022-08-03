import { useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useLotteryContract, useUsdcContract } from 'hooks/useContract'
import { fetchLotteryUserDataAsync, fetchLotteryGlobalDataAsync } from 'state/actions'
import { approveToken, createLottery, enterLottery, endLottery, claimReward } from 'utils/callHelpers'

export const useLottery = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const LotteryContract = useLotteryContract()
  const UsdcContract = useUsdcContract()

  const handleApprove = useCallback(async () => {
    const txHash = await approveToken(UsdcContract, LotteryContract, account)
    dispatch(fetchLotteryUserDataAsync(account))
    dispatch(fetchLotteryGlobalDataAsync())
    console.info(txHash)
  }, [account, dispatch, LotteryContract])

  const handleCreateLottery = useCallback(
    async (ticketPrice, maxTicketCnt) => {
      const txHash = await createLottery(LotteryContract, account, ticketPrice, maxTicketCnt)
      dispatch(fetchLotteryUserDataAsync(account))
      dispatch(fetchLotteryGlobalDataAsync())
      console.info(txHash)
    },
    [account, dispatch, LotteryContract],
  )

  const handleEnterLottery = useCallback(
    async (lotteryId, ticketQuantity) => {
      const txHash = await enterLottery(LotteryContract, lotteryId, ticketQuantity, account)
      dispatch(fetchLotteryUserDataAsync(account))
      dispatch(fetchLotteryGlobalDataAsync())
      console.info(txHash)
    },
    [account, dispatch, LotteryContract],
  )

  const handleEndLottery = useCallback(
    async (lotteryId) => {
      const txHash = await endLottery(LotteryContract, lotteryId, account)
      dispatch(fetchLotteryUserDataAsync(account))
      dispatch(fetchLotteryGlobalDataAsync())
      console.info(txHash)
    },
    [account, dispatch, LotteryContract],
  )

  const handleClaimLotteryReward = useCallback(
    async (lotteryId) => {
      const txHash = await claimReward(LotteryContract, lotteryId, account)
      dispatch(fetchLotteryUserDataAsync(account))
      dispatch(fetchLotteryGlobalDataAsync())
      console.info(txHash)
    },
    [account, dispatch, LotteryContract],
  )

  return {
    onApprove: handleApprove,
    onCreateLottery: handleCreateLottery,
    onEnterLottery: handleEnterLottery,
    onEndLottery: handleEndLottery,
    onClaimLotteryReward: handleClaimLotteryReward,
  }
}
