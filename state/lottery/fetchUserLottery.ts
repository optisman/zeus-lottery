import BigNumber from 'bignumber.js'
import Erc20Abi from 'config/abi/Erc20.json'
import multicall from 'utils/multicall'
import { getZeusAddress, getLotteryAddress } from 'utils/addressHelpers'


export const fetchUserData = async (account) => {

  const [userTokenAllowance, userTokenBalance] = await multicall(
    Erc20Abi,
    [
      {
        address: getZeusAddress(),
        name: 'allowance',
        params: [account, getLotteryAddress()]
      },
      {
        address: getZeusAddress(),
        name: 'balanceOf',
        params: [account],
      },
    ],
  )

  return {
    userTokenAllowance: new BigNumber(userTokenAllowance).div(new BigNumber(10).pow(18)).toNumber(),
    userTokenBalance: new BigNumber(userTokenBalance).div(new BigNumber(10).pow(18)).toNumber()
  }
}
