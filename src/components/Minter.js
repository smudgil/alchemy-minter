import { useCallback, useEffect, useState } from "react";
import { connectWallet, mintNFT } from "../util/minting.js";
import FileUpload from "./FileUpload";
import Modal from "./Modal";
import Error from "./Error";

const Minter = ({
  setErrorStatus,
  setErrorModal,
  setLoadingModal,
  setLoadingStatus,
  setLoadingTitle,
  setLoadingSpinner,
}) => {

  const MAX_ASSET_SIZE = 20000000 //20MB
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // State to store uploaded file
  const [file, setFile] = useState("");

  //for success modal
  const [isSuccessModalShowing, setSuccessModal] = useState(false);
  const closeSuccessModal = useCallback(() => setSuccessModal(false), []);

  const [transactionHash, setTransactionAddress] = useState("");

  //used callback for functoin memoizatoin (not ABSOLUTELY neccessary...in this case marginal optmization, but good practice)
  const onMintPressed = useCallback(async () => {
    setLoadingTitle("Minting your NFT...")
    setLoadingStatus("Sign the Ethereum transaction when prompted by Metamask.");
    setLoadingSpinner(true);
    setLoadingModal(true);
    const { success, status, txnAddress } = await mintNFT(
      file,
      name,
      description
    );
    setLoadingModal(false);
    if (success) {
      setTransactionAddress(txnAddress);
      setSuccessModal(true);
    } else {
      setErrorStatus(status);
      setErrorModal(true);
    }
  }, [name, description, file]); //update the memoization whenever name, descrip,and file change

  const buttonEnabled =
    name !== "" && description !== "" && file !== "" && file !== null;

  // Handles file upload event and updates state; could use useCAllback
  function handleUpload(event) {
    if (file && !event.target.files[0]) {
      //handling
      return;
    }

    if (event.target.files[0].size <= MAX_ASSET_SIZE) {
      setErrorModal(false);
      setFile(event.target.files[0]);
    } else {
      setErrorStatus("Your file size must be less than 20MB.");
      setErrorModal(true);
    }

  }

  //do it this way to memoize the function
  const onNameChange = useCallback((e) => setName(e.target.value), []); //useCallback takes a function as input; makes sure that we use the same function instance of setName
  const onDescriptionChange = useCallback(
    (e) => setDescription(e.target.value),
    []
  );

  return (
    <div className="Minter Card ">
      <Modal
        txnAddress={transactionHash}
        showModal={isSuccessModalShowing}
        name={name}
        description={description}
        asset={file}
        closeModal={closeSuccessModal}
      ></Modal>
      <form>
        <p className="nftFieldDescription">Name</p>
        <input
          className="input-background"
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={onNameChange}
        />
        <p className="nftFieldDescription">Description</p>
        <input
          className="input-background"
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={onDescriptionChange}
        />

        <p className="nftFieldDescription">Image</p>
        <div className="input-background">
          <FileUpload file={file} handleUpload={handleUpload}></FileUpload>
        </div>
      </form>
      <button
        className="mintButton"
        disabled={!buttonEnabled}
        onClick={onMintPressed}
      >
        Mint NFT
      </button>
    </div>
  );
};

export default Minter;
