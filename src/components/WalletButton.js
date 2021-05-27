import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../util/minting.js";

const WalletButton = ({setErrorStatus, setErrorModal}) => {
  const [walletAddress, setWallet] = useState("");

  const connectWalletPressed = async () => {
    const {status, address, success} = await connectWallet();
    if (!success) {
      setErrorStatus(status)
      setErrorModal(true);
    }
    setWallet(address);
  };

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    } else {
     /* setErrorStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noopener" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      ); 
            setErrorModal(true);
*/
    }
  }

  return (
    <button className="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
          "Connected: " +
          walletAddress.substring(0, 6) +
          "..." +
          walletAddress.substring(38)
        ) : (
          <span>Connect wallet</span>
        )}
    </button>
  );
};

export default WalletButton;
