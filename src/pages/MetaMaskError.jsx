const MetaMaskError = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div
        className="flex flex-col items-center border-4 border-red-400 p-10
                      w-96 rounded shadow-lg bg-red-300 text-white"
      >
        <h1 className="text-3xl font-extrabold tracking-widest text-red-600">
          MetaMask Error
        </h1>
        <p className="text-xl">Please install MetaMask</p>
        <p className="hover:underline">
          <a href="https://metamask.io/" target="_blank">
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default MetaMaskError;
