import "./App.css";

import Navbar from "./components/Navbar";
import Error from "./components/Error";
import NFTView from "./components/NFTView";
import MinterView from "./components/MinterView";

import { useEffect, useState, useCallback } from "react";


function App() {
  //parse query parameters
  //if query paramaters contain transaction show preview

  const [txHash, setTxHash] = useState("");
  const [previewNFT, setPreviewNFT] = useState(false);

  //for error modal
  const [isErrorModalShowing, setErrorModal] = useState(false);
  const closeErrorModal = useCallback(() => setErrorModal(false), []);
  const [errorStatus, setErrorStatus] = useState("");


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


  //each page have it's own loading and error; don't want connect wallet but to have state
  //stateless, component gets the same props, returns the same thing (stateful, is opposite bc multiple thigns could be going on, could give the same props, get dif outcomes) 
  useEffect(async () => {
    getQueryParams();
  }, [previewNFT]);

  return (
    <div className="App">
     
      <Error
        status={errorStatus}
        showModal={isErrorModalShowing}
        closeModal={closeErrorModal}
      ></Error>

      {previewNFT && txHash ? (
        <NFTView
         txHash={txHash}
        ></NFTView>
      ) : (
        <MinterView></MinterView>
      )}
          <p style={{fontSize:"12px"}}>Made with 💖 by HSS</p>

     
    </div>
  );
}

export default App;
