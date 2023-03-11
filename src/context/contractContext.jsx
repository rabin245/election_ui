import { createContext, useState } from "react";

export const ContractContext = createContext();

const ContractContextProvider = ({ children }) => {
  return (
    <ContractContext.Provider value={{}}>{children}</ContractContext.Provider>
  );
};

export default ContractContextProvider;
