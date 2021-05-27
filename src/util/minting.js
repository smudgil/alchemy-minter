import { pinJSONToIPFS, pinFileToIPFS } from "./pinata.js";

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../contract-abi.json");
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const minterContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        success: true,
        status: "Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        success: false,
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      success: false,
      status: (
        <span>
          <p>
          You must install <a target="_blank" href={`https://metamask.io/download.html`}>Metamask</a>, a virtual Ethereum wallet, in your
              browser.
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          success: true,
          address: addressArray[0],
          status: "Write a message in the text-field above.",
        };
      } else {
        return {
          success: false,
          address: "",
          status: "Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        success: false,
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      success: false,
      address: "",
      status: (
        <span>
          <p>
              You must install <a target="_blank" href={`https://metamask.io/download.html`}>Metamask</a>, a virtual Ethereum wallet, in your
              browser.
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (file, name, description, address) => {
  
 if (!window.ethereum || !window.ethereum.selectedAddress) {
    return {
      txnAddress: "",
      success: false,
      status: "Connect your Metamask wallet (see top right button) to mint an NFT.",
    };
  }

  if (file.length === 0 || name.trim() == "" || description.trim() == "") {
    return {
      txnAddress: "",
      success: false,
      status: "Please make sure all fields are completed before minting.",
    };
  }


  const pinataFileResponse = await pinFileToIPFS(file);
  if (!pinataFileResponse.success) {
    return {
      txnAddress: "",
      success: false,
      status: pinataFileResponse.message,
    };
  }
  const imgURL = pinataFileResponse.pinataUrl;

  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = imgURL;
  metadata.description = description;

  const pinataJSONResponse = await pinJSONToIPFS(metadata);
  if (!pinataJSONResponse.success) {
    return {
      txnAddress: "",
      success: false,
      status: pinataJSONResponse.message,
    };
  }
  const tokenURI = pinataJSONResponse.pinataUrl;

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: minterContract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      success: true,
      txnAddress: txHash,
      status:
        "Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      txnAddress: "",
      status: error.message,
    };
  }
};

export const loadNFT = async (id) => {
  const metadata = await minterContract.methods.tokenURI(id).call();
  return metadata;
};
