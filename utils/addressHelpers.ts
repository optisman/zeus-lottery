import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = '43114'
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || mainNetChainId, 10)

  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getZeusAddress = () => {
  return getAddress(addresses.zeus)
}

export const getUsdcAddress = () => {
  return getAddress(addresses.usdc)
}

export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}

export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}

export const getTokenName = (address: string) => {
  if (address.toLowerCase() === getZeusAddress().toLowerCase()) return 'ZEUS'
  if (address.toLowerCase() === getUsdcAddress().toLowerCase()) return 'USDC'
  return 'Unknown'
}
