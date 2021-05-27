import React from "react";
import ReactModal from "react-modal";
import { useState } from "react";
import twitter from "../assets/twitter.svg";
import alchemylogo from "../assets/Logo.svg";

const Modal = ({
  showModal,
  closeModal,
  name,
  description,
  asset,
  txnAddress,
}) => {
  
  function sendTweet() {
    window.open("http://twitter.com/home?status=This%20an%20example%20of%20a%20pre-written%20tweet%20-%20don%27t%20forget%20it%20needs%20to%20be%20less%20than%20280%20characters….%20Find%20out%20how%20you%20build%20them%20yourself%20here!%20http%3A%2F%2Fbit.ly%2F2SEQId8");
    // window.open(
    //   "https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-view-your-nft-in-your-wallet",
    //   "_blank"
    // );
  }
  
  function openTutorial() {
    window.open(
      "https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-view-your-nft-in-your-wallet",
      "_blank"
    );
  }

  const image = asset ? ( URL.createObjectURL(asset)) : (alchemylogo);
  const etherscanLink = "https://ropsten.etherscan.io/tx/" + txnAddress;
  const viewLink = "http://localhost:3000?=" + txnAddress;


  return (
    <div>
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
      >
        <div className="modalContentTop">
          <div className="twitterContainer">
            <img className="twitterLogo" src={twitter}></img>
            <p className="nftFieldDescription">Share on twitter</p>
          </div>

          <button
            style={{
              backgroundColor: "rgb(234, 236, 240)",
              float: "right",
              textAlign: "right",
              padding: "8px 16px",
            }}
            onClick={closeModal}
          >
            X
          </button>
          <div class="tweetPreview">
          <center><img className="tweetImage" src={image}></img></center>

            <p className="tweetText">
              I just made an #NFT using @AlchemyPlatform's Minter! Check it out: <a href={viewLink} style={{wordBreak: "break-all"}}>{viewLink}</a>
            </p>

          </div>
          <button
            className="mintButton"
          >
            Tweet
          </button>

          <p style={{ paddingTop: "24px", fontWeight: "500" }}>
            View on Etherscan:{" "}
            <a style={{ color: "rgba(76, 132, 255, 1)", lineHeight:"24px", overflowWrap:"break-word" }} href={etherscanLink}>
              {txnAddress}
            </a>
          </p>
        </div>
        <div className="divider"></div>

        <div className="modalContentBottom">
          <p className="learnMoreText">Learn more:</p>
          <p className="metamaskTutorial">
            How to View Your NFT in Your Wallet
          </p>

          <button className="viewTutorialButton" onClick={openTutorial}>
            View tutorial
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
