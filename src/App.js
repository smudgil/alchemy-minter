import "./App.css";

import Minter from "./components/Minter";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import HowWorks from "./components/HowWorks";
import LikeThis from "./components/LikeThis";
import GreenLayer from "./components/GreenLayer";
import NFTPreview from "./components/NFTPreview";
import { useEffect, useState, useCallback } from "react";

import Loading from "./components/Loading";

function App() {
  //parse query parameters
  //if query paramaters contain transaction show preview

  const [txHash, setTxHash] = useState("");
  const [previewNFT, setPreviewNFT] = useState(false);

  //for error modal
  const [isErrorModalShowing, setErrorModal] = useState(false);
  const closeErrorModal = useCallback(() => setErrorModal(false), []);
  const [errorStatus, setErrorStatus] = useState("");

  //for loading modal
  const [isLoadingShowing, setLoadingModal] = useState(false);
  const [showLoadingSpinner, setLoadingSpinner] = useState(false);


  const [loadingStatus, setLoadingStatus] = useState("");
  const [loadingTitle, setLoadingTitle] = useState("");

  function getQueryParams() {
    //TODO: ask dphil about input error in nft preview
    const param = window.location.search.split("?=");
    if (param.length > 1 && param[1].length == 66) {
      setTxHash(param[1]);
      setPreviewNFT(true);
    } else {
      setPreviewNFT(false);
    }
  }

  useEffect(async () => {
    getQueryParams();
  }, [previewNFT]);

  const setLoadingProps = {
    setLoadingStatus,
    setLoadingModal,
    setLoadingTitle,
    setLoadingSpinner,
  }

  return (
    <div className="App">
      <Loading
        status={loadingStatus}
        showModal={isLoadingShowing}
        title={loadingTitle}
        loadingSpinner={showLoadingSpinner}
      ></Loading>
      <Error
        status={errorStatus}
        showModal={isErrorModalShowing}
        closeModal={closeErrorModal}
      ></Error>
      <Navbar></Navbar>

      {previewNFT && txHash ? (
        <NFTPreview
          txHash={txHash}
          {...setLoadingProps}
        ></NFTPreview>
      ) : (
        <div>
          <GreenLayer
            setErrorStatus={setErrorStatus}
            setErrorModal={setErrorModal}
          ></GreenLayer>
          <div className="contentContainer">
            <Minter
              setErrorStatus={setErrorStatus}
              setErrorModal={setErrorModal}
              {...setLoadingProps}
            ></Minter>
            <div >
              <HowWorks></HowWorks>
              <LikeThis></LikeThis>
            </div>
          </div>{" "}
        </div>
      )}
          <p style={{fontSize:"12px"}}>Made with 💖 by HSS</p>

     
    </div>
  );
}

export default App;
