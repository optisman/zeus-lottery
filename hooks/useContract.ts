import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import { getZeusAddress, getUsdcAddress, getLotteryAddress } from 'utils/addressHelpers'
import erc20Abi from 'config/abi/Erc20.json'
import lotteryAbi from 'config/abi/Lottery.json'
import zeusAbi from 'config/abi/Zeus.json'
import usdcAbi from 'config/abi/Usdc.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

// erc20 token contract
export const useERC20Contract = (address: string) => {
  return useContract(erc20Abi as unknown as AbiItem, address)
}

// erc20 token contract
export const useZeusContract = () => {
  return useContract(zeusAbi as unknown as AbiItem, getZeusAddress())
}

// erc20 token contract
export const useUsdcContract = () => {
  return useContract(usdcAbi as unknown as AbiItem, getUsdcAddress())
}

// vault contract (lottery)
export const useLotteryContract = () => {
  return useContract(lotteryAbi as unknown as AbiItem, getLotteryAddress())
}

export default useContract
