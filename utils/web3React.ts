import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ConnectorNames } from 'widgets/WalletModal'
import Web3 from 'web3'
import getNodeUrl from './getRpcUrl'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '43113', 10)

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL,
})

const AVALANCHE_MAINNET_PARAMS = {
  chainId: 43114,
  chainName: 'Avalanche mainnet',
  nativeCurrency: {
    name: 'Avalanche mainnet',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/'],
}

const AVALANCHE_TESTNET_PARAMS = {
  chainId: 43113,
  chainName: 'Avalanche test',
  nativeCurrency: {
    name: 'Avalanche test',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://speedy-nodes-nyc.moralis.io/1c8d8856c017266c637672dd/bsc/mainnet'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
}

const walletlink = new WalletLinkConnector({
  url: AVALANCHE_TESTNET_PARAMS.rpcUrls[0],
  appName: 'Lottery dApp',
  appLogoUrl: '/images/hpie-logo.png',
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.Coinbase]: walletlink,
}

export const getLibrary = (provider): Web3 => {
  return provider
}
