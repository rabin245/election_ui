import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../constants/index";
export const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  async function init() {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
      const addresses = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(addresses);
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await new ethers.Contract(contractAddress, abi, signer);
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
    } else {
      console.log("Please install MetaMask");
      setIsMetaMaskInstalled(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <ContractContext.Provider
      value={{
        isMetaMaskInstalled,
        provider,
        signer,
        contract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
