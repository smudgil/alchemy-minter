import React from "react";
import ReactModal from "react-modal";
import PulseLoader from "react-spinners/PulseLoader";

const Loading = ({ showModal, status, title, loadingSpinner }) => {

  return (
    <div >
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={showModal}
      >
        <div className="roundModalContent">
          <h1 style={{ textAlign: "center", color: "black", fontSize: "24px" }}>
            {title}
          </h1>
          <p style={{ textAlign: "center" }}>{ status}</p>
          <center>
         
            <PulseLoader
              color="rgba(76, 132, 255, 1)"
              speedMultiplier={0.35}
              loading={loadingSpinner}
              size={8}
            ></PulseLoader>
          </center>
        </div>
      </ReactModal>
    </div>
  );
};

export default Loading;
