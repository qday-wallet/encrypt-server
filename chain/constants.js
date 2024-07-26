const { INFURA_ID } = process.env;

const NETWORKS = {
  localhost: {
    name: 'localhost',
    chainId: 1337,
    rpcUrl: 'http://127.0.0.1:8545',
    blockExplorer: '',
  },
  mainnet: {
    name: 'mainnet',
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: 'https://etherscan.io/',
  },
  kovan: {
    name: 'kovan',
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: 'https://kovan.etherscan.io/',
    faucet: 'https://gitter.im/kovan-testnet/faucet', // https://faucet.kovan.network/
  },
  matic: {
    name: 'matic',
    chainId: 137,
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
    wsUrl: 'wss://ws-matic-mainnet.chainstacklabs.com',
    blockExplorer: 'https://polygonscan.com/',
  },
  mumbai: {
    name: 'mumbai',
    chainId: 80001,
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
    wsUrl: 'wss://ws-matic-mumbai.chainstacklabs.com',
    faucet: 'https://faucet.polygon.technology/',
    blockExplorer: 'https://mumbai.polygonscan.com/',
  },
};

exports.INFURA_ID = INFURA_ID;

exports.NETWORKS = NETWORKS;

exports.NETWORK = (chainId) => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};
