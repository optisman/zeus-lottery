import random from 'lodash/random'

// // avalanche mainnet
// export const nodes = [
//   'https://api.avax.network/ext/bc/C/rpc',
//   'https://api.avax.network/ext/bc/C/rpc',
//   'https://api.avax.network/ext/bc/C/rpc',
// ]

// avalanche testnet
export const nodes = [
  'https://api.avax-test.network/ext/bc/C/rpc',
  'https://api.avax-test.network/ext/bc/C/rpc',
  'https://api.avax-test.network/ext/bc/C/rpc',
]

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
