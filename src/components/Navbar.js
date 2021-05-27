import alchemylogo from "../assets/Logo.svg";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div
        style={{ padding: "20px 40px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <a href="https://alchemy.com">
          <img style={{ float: "left" }} src={alchemylogo} />
        </a>
        <div className="rightLinks">
          <a style={{ fontWeight: "800" }} href="http://localhost:3000">
            MINTER
          </a>
          <a href="https://www.alchemy.com/nfts">NFTs 101</a>
          <a href="https://auth.alchemyapi.io/signup?redirectUrl=https%3A%2F%2Fdashboard.alchemyapi.io%2F">
            Sign up for Alchemy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
