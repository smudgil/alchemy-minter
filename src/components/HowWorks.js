const HowWorks = () => {
  return (
    <div className="HowWorks Card">
      <h1 className="title" style={{ marginBottom: "32px" }}>
        How it works
      </h1>
      <ol>
        <li>
          Connect your <a href="https://metamask.io/">Metamask wallet</a> using the button
          on the top right and set its network to <span style={{fontWeight:"400"}}><em>Ropsten</em></span>.
        </li>
        <li>Get test Ether from a <a href="https://faucet.ropsten.be/">faucet</a></li>
        <li>Enter the NFT’s details and upload its image</li>
        <li>Press the 'Mint NFT' button</li>
        <li>Share your NFT with the world! 🚀</li>
      </ol>
    </div>
  );
};

export default HowWorks;
