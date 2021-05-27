import WalletButton from "./WalletButton";

const GreenLayer = ({setErrorStatus, setErrorModal}) => {
  return (
    <div className="GreenLayer">
      <div className="GreenLayerContent"> 
        <div
          style={{
            float: "left",
            textAlign: "left",
          }}
        >
          <h1 className="largeH1"
            
          >
            NFT Minter
          </h1>
          <p>Mint an NFT for free in seconds.</p>
        </div>
        <WalletButton setErrorStatus={setErrorStatus}
            setErrorModal={setErrorModal} ></WalletButton>
      </div>
    </div>
  );
};

export default GreenLayer;
