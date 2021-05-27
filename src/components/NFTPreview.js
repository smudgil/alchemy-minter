import React from "react";
import { useCallback, useEffect, useState } from "react";
import { loadNFT } from "../util/minting.js";

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
let interval;

const NFTPreview = ({
  txHash,
  setLoadingStatus,
  setLoadingTitle,
  setLoadingModal,
  setLoadingSpinner,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [asset, setAsset] = useState("");
  const [owner, setOwner] = useState("");

  const [txState, setTxState] = useState("pending");

  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(alchemyKey);

  const getNFT = async () => {
    if (txState !== "mined") {
      try {
        const transaction = await web3.eth.getTransaction(txHash);
        if (!transaction) { //dropped
          setTxState("dropped");
          setLoadingTitle("🥺 This transaction does not exist.");
          setLoadingStatus(
            <p style={{lineHeight:"24px"}}>
              It may have been dropped or is invalid. Try minting your own NFT using the{" "}
              <a style={{ fontWeight: "400", color: "black", fontSize:"16px" }} href="http://localhost:3000">
                Alchemy NFT Minter
              </a>
              .
            </p>
          );
          setLoadingSpinner(false);
          setLoadingModal(true);
        } else if (!transaction.blockNumber) { //pending
          setLoadingTitle("⏳ Your transaction is being mined...");
          const link = "https://ropsten.etherscan.io/tx/" + txHash;
          setLoadingStatus(
            <p>Check <a style={{ fontWeight: "400", color: "black", fontSize:"16px" }} href={link}>Etherscan</a> for the status of your transaction.</p>
          );
          setLoadingSpinner(true);
          setLoadingModal(true);
        } else { // mined
          setLoadingModal(false);
          const recipet = await web3.eth.getTransactionReceipt(txHash);
          console.log(recipet);
          const tkID = parseInt(recipet.logs[0].topics[3], 16);
          setOwner(recipet.from);
          const owner = recipet.from;
          const link = await loadNFT(tkID);
          console.log(link);
          let response = await fetch(link);
          console.log(response);
          let { name, image, description } = await response.json();
          console.log("NAME" + name);
          setAsset(image);
          setName(name);
          setDescription(description);

          console.log("mined");
          setTxState("mined");
        }
      } catch (err) {
        // setTxState("dropped");
        setLoadingStatus("Something went wrong...");
        setLoadingTitle(err.message);
        setLoadingModal(true);
        console.log(txHash);
        console.log("massive ERROR");
        console.log("error");
        console.error("ze error message", err.message);
      } finally {
        console.log("yass");
      }
    }
  };

  //run this once
  useEffect(() => {
    getNFT();
    if (txState === "pending") {
      interval = setInterval(getNFT, 5000);
    }
  }, []);

  //keep checking on the transaction state
  useEffect(() => {
    if (txState !== "pending") {
      clearInterval(interval);
    }
  }, [txState]);

  return (
    <div className="NFTPreview">
      <div style={{ backgroundColor: "#ebf4ec" }}>
        <center>
          <img
            style={
              asset !== ""
                ? {
                    padding: "20px",
                    objectFit: "contain",
                    width: "58vh",
                    height: "58vh",
                    display: "block",
                    float: "center",
                  }
                : {
                    display: "none",
                  }
            }
            src={asset}
          ></img>
        </center>
      </div>

      <div
        style={{ margin: "0 auto", paddingBottom: "40px", maxWidth: "1200px" }}
      >
        <h1 className="largeH1">{name}</h1>
        <p className="nftDescript">{description}</p>
        <p className="ownerSmallText">{"By " + owner}</p>
      </div>
    </div>
  );
};

export default NFTPreview;
