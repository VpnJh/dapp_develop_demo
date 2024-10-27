// 3. Create your application's metadata object
const currentOrigin = window.location.origin;
const projectId = import.meta.env.VITE_APP_PROJECT_ID;

import { createAppKit } from "@reown/appkit";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

import {
  mainnet,
  arbitrum,
  sepolia,
  solana,
  solanaTestnet,
  solanaDevnet
} from "@reown/appkit/networks";

import {
  SolflareWalletAdapter,
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

// 0. Create the Ethers adapter
export const ethersAdapter = new EthersAdapter();

// 1. Create Solana adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
});
// 3. Set up the metadata - Optional
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: currentOrigin, // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"]
};

// 4. Create the AppKit instance
const modalConfigProvider = createAppKit({
  adapters: [ethersAdapter, solanaWeb3JsAdapter],
  networks: [mainnet, arbitrum, sepolia, solana, solanaTestnet, solanaDevnet],
  metadata,
  projectId,
  allWallets: "SHOW",
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
    "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4",
    "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66",
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    "c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a",
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369"
  ],
  features: {
    email: false, // default to true
    socials: [],
    analytics: false,
    emailShowWallets: false // default to true
  },
  allowUnsupportedChain: true
});

export { modalConfigProvider };
