import { useCallback, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useLotteryContract, useZeusContract } from 'hooks/useContract'
import { fetchLotteryUserDataAsync, fetchLotteryGlobalDataAsync } from 'state/actions'
import { approveToken, createLottery, enterLottery, endLottery } from 'utils/callHelpers'

export const useLottery = () => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const LotteryContract = useLotteryContract()
  const ZeusContract = useZeusContract()

  const handleApprove = useCallback(async () => {
    const txHash = await approveToken(ZeusContract, LotteryContract, account)
    dispatch(fetchLotteryUserDataAsync(account))
    dispatch(fetchLotteryGlobalDataAsync())
    console.info(txHash)
  }, [account, dispatch, LotteryContract])

  const handleCreateLottery = useCallback(async () => {
    const txHash = await createLottery(LotteryContract, account)
    dispatch(fetchLotteryUserDataAsync(account))
    dispatch(fetchLotteryGlobalDataAsync())
    console.info(txHash)
  }, [account, dispatch, LotteryContract])

  const handleEndLottery = useCallback(async (lotteryId) => {
    const txHash = await endLottery(LotteryContract, lotteryId, account)
    dispatch(fetchLotteryUserDataAsync(account))
    dispatch(fetchLotteryGlobalDataAsync())
    console.info(txHash)
  }, [account, dispatch, LotteryContract])

  const handleEnterLottery = useCallback(async (lotteryId, amount) => {
    const txHash = await enterLottery(LotteryContract, lotteryId, amount, account)
    dispatch(fetchLotteryUserDataAsync(account))
    dispatch(fetchLotteryGlobalDataAsync())
    console.info(txHash)
  }, [account, dispatch, LotteryContract])

  return {
    onApprove: handleApprove,
    onCreateLottery: handleCreateLottery,
    onEnterLottery: handleEnterLottery,
    onEndLottery: handleEndLottery
  }
}
