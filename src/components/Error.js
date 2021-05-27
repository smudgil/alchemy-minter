import React from "react";
import ReactModal from "react-modal";
import { useState } from "react";
import twitter from "../assets/twitter.svg";
import alchemylogo from "../assets/Logo.svg";

const Error = ({ showModal, closeModal, status }) => {
  function openTutorial() {
    window.open(
      "https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-view-your-nft-in-your-wallet",
      "_blank"
    );
  }
  return (
    <div>
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={showModal}
      >
        
        <div className="roundModalContent">
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
          <h1 style={{color:"black", fontSize:"24px"}}>😢 Something went wrong...</h1>
          <p>{status}</p>
        </div>
      </ReactModal>
    </div>
  );
};

export default Error;
