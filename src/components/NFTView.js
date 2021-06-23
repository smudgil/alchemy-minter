import React from "react";
import Navbar from "./Navbar";
import Loading from "./Loading";

import { useEffect, useState } from "react";
import { getNFTTransaction, loadNFT } from "../util/minting.js";

require("dotenv").config();
let interval;

const NFTView = ({ txHash }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [asset, setAsset] = useState("");
  const [owner, setOwner] = useState("");
  const [txState, setTxState] = useState("pending");

  //for loading modal
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSpinner, setLoadingSpinner] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [loadingTitle, setLoadingTitle] = useState("");

  function setLoadingModal(
    loadingShowing,
    spinnerShowing,
    newLoadingTitle,
    newLoadingStatus
  ) {
    setLoadingSpinner(spinnerShowing);
    setLoadingStatus(newLoadingStatus);
    setLoadingTitle(newLoadingTitle);
    setLoading(loadingShowing);
  }

  const getNFT = async () => {
    const { state, title, status, showSpinner, showLoading } = await getNFTTransaction(txHash);
    setLoadingModal(showLoading, showSpinner, title, status);
    setTxState(state);
    if (state == "mined") {
      const { name, description, owner, image } = await loadNFT(txHash);
      setName(name);
      setDescription(description);
      setOwner(owner);
      setAsset(image);
      setLoadingModal(false, false, "", "");
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
    <div className="NFTView">
      <Loading
        status={loadingStatus}
        showModal={isLoading}
        title={loadingTitle}
        loadingSpinner={isLoadingSpinner}
      ></Loading>
      <Navbar></Navbar>
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

export default NFTView;