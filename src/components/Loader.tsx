const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex w-20 h-11 justify-center items-center bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="w-2 h-2 mx-1 rounded-full bg-black shadow-dot animate-fadeDots"></div>
          <div
            className="w-2 h-2 mx-1 rounded-full bg-black shadow-dot animate-fadeDots"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 mx-1 rounded-full bg-black shadow-dot animate-fadeDots"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
