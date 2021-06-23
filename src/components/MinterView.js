import { useEffect, useState, useCallback } from "react";

import Minter from "./Minter";
import HowWorks from "./HowWorks";
import LikeThis from "./LikeThis";
import GreenLayer from "./GreenLayer";
import Navbar from "./Navbar";
import Error from "./Error";
import Loading from "./Loading";



const MinterView = () => {
  //for loading modal
  const [isLoadingShowing, setLoadingModal] = useState(false);
  const [showLoadingSpinner, setLoadingSpinner] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState("");
  const [loadingTitle, setLoadingTitle] = useState("");

  //for error modal
  const [isErrorModalShowing, setErrorModal] = useState(false);
  const closeErrorModal = useCallback(() => setErrorModal(false), []);
  const [errorStatus, setErrorStatus] = useState("");

  const setLoadingProps = {
    setLoadingStatus,
    setLoadingModal,
    setLoadingTitle,
    setLoadingSpinner,
  };

  return (
    <div>
      <Navbar></Navbar>
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
        <div>
          <HowWorks></HowWorks>
          <LikeThis></LikeThis>
        </div>
      </div>{" "}
    </div>
  );
};

export default MinterView;
