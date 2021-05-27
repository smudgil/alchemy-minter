const LikeThis = () => {
  function openMinterSite() {
    window.open(
      "https://docs.alchemy.com/alchemy/tutorials/nft-minter",
      "_blank"
    );
  }

  return (
    <div className="LikeThis Card">
      <h1 className="title">Like this minter?</h1>
      <p>Learn how to build it yourself here!</p>

      <button className="learnMoreButton" onClick={openMinterSite}>
        Learn more
      </button>
    </div>
  );
};

export default LikeThis;
