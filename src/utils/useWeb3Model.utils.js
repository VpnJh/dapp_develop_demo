import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/vue";
const projectId = import.meta.env.VITE_APP_PROJECT_ID;
// 3. Create your application's metadata object
const currentOrigin = window.location.origin;
console.log("currentOrigin：", currentOrigin);

const metadata = {
  name: "TestDemo",
  description: "测试的一个demo",
  url: currentOrigin, // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com"
};
const BNMainnet = {
  chainId: 56,
  name: "Binance",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc-pokt.nodies.app"
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  auth: {
    email: false, // default to true
    showWallets: true,
    walletFeatures: true
  },
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: false // true by default
  // rpcUrl: '...', // used for the Coinbase SDK
});

const modalConfigProvider = createWeb3Modal({
  ethersConfig,
  projectId,
  chains: [mainnet, BNMainnet],
  defaultChain: BNMainnet,
  chainImages: {},
  allWallets: "SHOW",
  enableAnalytics: true // Optional - defaults to your Cloud configuration
});

export { modalConfigProvider };
