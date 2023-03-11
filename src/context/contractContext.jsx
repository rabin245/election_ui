import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../constants/index";

export const ContractContext = createContext();

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

export const ContractContextProvider = ({ children }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [address, setAddress] = useState(null);
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [currentVoterToCandidateId, setCurrentVoterToCandidateId] =
    useState(null);

  // state changing functions
  const startElection = async () => {
    const transaction = await contract.startElection();
    transaction.wait();
  };
  const endElection = async () => {
    const transaction = await contract.endElection();
    transaction.wait();
  };

  const voteToCandidate = async (id) => {
    const transaction = await contract.voteToCandidate(id);
    transaction.wait();
  };

  const addCandidate = async (id, name, partyName) => {
    const transaction = await contract.addCandidate(id, name, partyName);
    transaction.wait();
  };

  const removeCandidate = async (id) => {
    const transaction = await contract.removeCandidate(id);
    transaction.wait();
  };

  // view functions
  const getHasVoted = async () => {
    const hasVoted = await contract.getHasVoted();
    setHasVoted(hasVoted);
  };

  const getIsElectionStarted = async () => {
    const isElectionStarted = await contract.getHasStarted();
    setIsElectionStarted(isElectionStarted);
  };

  const getCurrentVoterToCandidateId = async () => {
    const currentVoterToCandidateId =
      await contract.getCurrentVoterToCandidateId();
    setCurrentVoterToCandidateId(currentVoterToCandidateId);
  };

  const getCandidates = async () => {
    const candidates = await contract.getCandidates();
    setCandidates(candidates);
  };

  useEffect(() => {
    async function init() {
      if (typeof window.ethereum !== "undefined") {
        setIsMetaMaskInstalled(true);
        const addresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(addresses);
        setAddress(addresses[0]);
      } else {
        console.log("Please install MetaMask");
        setIsMetaMaskInstalled(false);
      }
    }

    init();
    getIsElectionStarted();
  }, []);

  useEffect(() => {
    console.log("now listening to events");
    // event listeners

    setTimeout(() => {
      contract.on("ElectionStarted", () => {
        console.log("Election has started");
        setIsElectionStarted(true);
        getCandidates();
      });

      contract.on("ElectionEnded", () => {
        console.log("Election has ended");
        setIsElectionStarted(false);
      });

      contract.on("VoteCasted", (updatedCandidate) => {
        console.log("Vote casted to candidate", updatedCandidate);
        setCandidates((prev) => {
          return prev.map((candidate) => {
            if (candidate.id === updatedCandidate.id.toString()) {
              return { ...candidate, votes: updatedCandidate.votes.toString() };
            }
            return candidate;
          });
        });
      });

      contract.on("CandidateAdded", (candidate) => {
        console.log("Candidate added", candidate);
        setCandidates((prev) => {
          return [
            ...prev,
            {
              id: candidate.id.toString(),
              name: candidate.name,
              partyName: candidate.partyName,
              votes: candidate.votes.toString(),
              imageUrl: candidate.imageUrl,
            },
          ];
        });
      });

      contract.on("CandidateRemoved", (id) => {
        console.log("Candidate removed", id);
        setCandidates((prev) => {
          return prev.filter((candidate) => candidate.id !== id.toString());
        });
      });
    }, 4000);
  }, []);

  useEffect(() => {
    // if (isElectionStarted) {
    //   getHasVoted();
    //   getCurrentVoterToCandidateId();
    // }
    getCandidates();
    getHasVoted();
    getCurrentVoterToCandidateId();
  }, [isElectionStarted]);

  return (
    <ContractContext.Provider
      value={{
        isMetaMaskInstalled,
        startElection,
        endElection,
        voteToCandidate,
        addCandidate,
        removeCandidate,
        getCandidates,
        getHasVoted,
        getIsElectionStarted,
        getCurrentVoterToCandidateId,
        isElectionStarted,
        hasVoted,
        candidates,
        currentVoterToCandidateId,
        address,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
