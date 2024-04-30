import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="flex h-screen bg-black/25 items-center justify-center ">
      <img
        src="https://samherbert.net/svg-loaders/svg-loaders/grid.svg"
        className="loader"
        alt=""
      />
    </div>
  );
};

export default Loader;
