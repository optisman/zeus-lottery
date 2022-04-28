// Set of helper functions to facilitate wallet setup

import { mainnetNodes, testnetNodes } from './getRpcUrl'

/**
 * Prompt the user to add Avalanche as a network on Metamask, or switch to Avalanche if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = (window as any).ethereum
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '43113', 10)

    if (chainId === 43113) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0xA869`,
              chainName: 'Avalanche Testnet',
              nativeCurrency: {
                name: 'Avalanche testnet',
                symbol: 'AVAX',
                decimals: 18,
              },
              rpcUrls: testnetNodes,
              blockExplorerUrls: ['https://testnet.snowtrace.io'],
            },
          ],
        })
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }

    if (chainId === 43114) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0xA86A`,
              chainName: 'Avalanche Mainnet',
              nativeCurrency: {
                name: 'Avalanche mainnet',
                symbol: 'AVAX',
                decimals: 18,
              },
              rpcUrls: mainnetNodes,
              blockExplorerUrls: ['https://snowtrace.io'],
            },
          ],
        })
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }


  } else {
    console.error("Can't setup the Avalanche network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as any).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}
