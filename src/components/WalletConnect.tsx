import { useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Bear Stones NFT',
  projectId: 'f5f29f98130b5dc0c0f18c4d715f1898', // Example project ID
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

function WalletButton() {
  const { isConnected } = useAccount();

  useEffect(() => {
    // Notify the parent component about wallet connection status
    window.postMessage({ 
      type: 'wallet-connection-status', 
      connected: isConnected 
    }, '*');
  }, [isConnected]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <button
            className="neon-button rainbow-button"
            onClick={connected ? openAccountModal : openConnectModal}
            type="button"
          >
            {connected ? `Connected: ${account.address.slice(0, 6)}...${account.address.slice(-4)}` : 'Connect Wallet'}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default function WalletConnect() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: '#ff61ef',
        borderRadius: 'large',
      })}>
        <WalletButton />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}