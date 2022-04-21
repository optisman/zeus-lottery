/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchGlobalData } from './fetchGlobalLottery'
import { fetchUserData } from './fetchUserLottery'
import { LotteryState, LotteryInfo } from 'state/types'

const initialState: LotteryState = {
  currentLotteryId: 0,
  currentLottery: {},
  payToken: "",
  owner: "",
  lotteries: [] as LotteryInfo[],
  userData: {}
}

export const LotterySlice = createSlice({
  name: 'Lottery',
  initialState,
  reducers: {
    setLotteryGlobalData: (state, action) => {
      state.currentLotteryId = action.payload.currentLotteryId;
      state.payToken = action.payload.payToken;
      state.owner = action.payload.owner;
      state.currentLottery = action.payload.lotteries[0];
      state.lotteries = action.payload.lotteries;
    },
    setLotteryUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        allowance: action.payload.userTokenAllowance,
        tokenBalance: action.payload.userTokenBalance
      };
    }
  },
})

// Actions
export const { setLotteryGlobalData, setLotteryUserData } = LotterySlice.actions

export const fetchLotteryGlobalDataAsync = () => async (dispatch) => {
  const {
    currentLotteryId,
    payToken,
    lotteries,
    owner
  } = await fetchGlobalData()

  dispatch(
    setLotteryGlobalData({
      currentLotteryId,
      payToken,
      lotteries,
      owner
    }),
  )
}

export const fetchLotteryUserDataAsync = (account) => async (dispatch) => {
  const {
    userTokenAllowance,
    userTokenBalance
  } = await fetchUserData(account)

  dispatch(
    setLotteryUserData({
      userTokenAllowance,
      userTokenBalance
    }),
  )
}

export default LotterySlice.reducer
