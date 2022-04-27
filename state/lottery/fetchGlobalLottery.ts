import BigNumber from 'bignumber.js'
import LotteryAbi from 'config/abi/Lottery.json'
import multicall from 'utils/multicall'
import { getLotteryAddress } from 'utils/addressHelpers'
import { getBalanceInEther } from 'utils/formatBalance'


export const fetchGlobalData = async () => {

  const [
    currentLotteryId,
    payToken,
    owner,
    maxTicketQuantityPerJoin,
    numberOfWinners
  ] = await multicall(
    LotteryAbi,
    [
      {
        address: getLotteryAddress(),
        name: 'currentLotteryId',
      },
      {
        address: getLotteryAddress(),
        name: 'payToken',
      },
      {
        address: getLotteryAddress(),
        name: 'owner',
      },
      {
        address: getLotteryAddress(),
        name: 'maxTicketQuantityPerJoin',
      },
      {
        address: getLotteryAddress(),
        name: 'numberOfWinners',
      },
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

  const _currentLottery = currentLottery.map((lottery) => {
    const players = lottery.players.map((player) => {
      return {
        ticketId: (player.ticketId).toNumber(),
        account: player.account,
        joinedTimestamp: player.joinedTimestamp.toNumber(),
      }
    })

    const winners = lottery.winners.map((winner) => {
      return winner.toNumber()
    })

    return {
      ...lottery,
      players,
      winners: winners,
      ticketPrice: getBalanceInEther(new BigNumber(lottery.ticketPrice._hex))
    }
  })


  return {
    currentLotteryId: new BigNumber(currentLotteryId).toNumber(),
    payToken: payToken[0],
    maxTicketQuantityPerJoin: maxTicketQuantityPerJoin[0].toNumber(),
    numberOfWinners: numberOfWinners[0].toNumber(),
    lotteries: _currentLottery,
    owner: owner[0]
  }
}
