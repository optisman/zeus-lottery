import random from 'lodash/random'

// avalanche mainnet
export const mainnetNodes = [
  'https://api.avax.network/ext/bc/C/rpc',
  'https://api.avax.network/ext/bc/C/rpc',
  'https://api.avax.network/ext/bc/C/rpc',
]

// avalanche testnet
export const testnetNodes = [
  'https://api.avax-test.network/ext/bc/C/rpc',
  'https://api.avax-test.network/ext/bc/C/rpc',
  'https://api.avax-test.network/ext/bc/C/rpc',
]

const getNodeUrl = () => {
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '43114', 10)
  const nodes = chainId === 43114 ? mainnetNodes : testnetNodes;
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
