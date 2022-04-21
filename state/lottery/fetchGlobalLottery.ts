import BigNumber from 'bignumber.js'
import LotteryAbi from 'config/abi/Lottery.json'
import multicall from 'utils/multicall'
import { getLotteryAddress } from 'utils/addressHelpers'


export const fetchGlobalData = async () => {

  const [
    currentLotteryId,
    minAmount,
    payToken,
    owner
  ] = await multicall(
    LotteryAbi,
    [
      {
        address: getLotteryAddress(),
        name: 'currentLotteryId',
      },
      {
        address: getLotteryAddress(),
        name: 'minAmount',
      },
      {
        address: getLotteryAddress(),
        name: 'payToken',
      }, {
        address: getLotteryAddress(),
        name: 'owner',
      }
    ],
  )

  const [
    currentLottery,
  ] = await multicall(
    LotteryAbi,
    [
      {
        address: getLotteryAddress(),
        name: 'getLotteryInfo',
        params: [new BigNumber(currentLotteryId).toNumber()]
      }
    ],
  )

  return {
    currentLotteryId: new BigNumber(currentLotteryId).toNumber(),
    minAmount: new BigNumber(minAmount).div(new BigNumber(10).pow(18)).toNumber(),
    payToken: payToken[0],
    lotteries: currentLottery,
    owner: owner[0]
  }
}
