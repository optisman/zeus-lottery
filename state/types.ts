import BigNumber from 'bignumber.js'

export interface Address {
  43113?: string
  43114: string
}

export type TranslatableText =
  | string
  | {
    id: number
    fallback: string
    data?: {
      [key: string]: string | number
    }
  }

export interface LotteryInfo {
  players?: string[]
  creator?: string
  winners?: string[]
  status?: number
}

export interface LotteryUserInfo {
  allowance?: BigNumber
  tokenBalance?: BigNumber
}

export interface LotteryState {
  currentLotteryId?: number
  currentLottery?: LotteryInfo
  minAmount?: number
  payToken?: string
  owner?: string
  lotteries?: LotteryInfo[]
  userData?: LotteryUserInfo
}

export interface State {
  lottery: LotteryState
}