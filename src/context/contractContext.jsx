import { createContext, useCallback, useEffect, useState } from "react";
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
  const [recentResults, setRecentResults] = useState([]);
  const [electionsTimeList, setElectionsTimeList] = useState([]);
  const [pastElections, setPastElections] = useState({});

  // to know which network the user is connected to
  // as admin address should vary according to the network
  // useful when deploying to testnet later
  // signer.getChainId().then((chainId) => console.log(chainId));
  // signer.getAddress().then((address) => console.log(address));

  // state changing functions
  const startElection = async () => {
    const electionTime = new Date().getTime();
    const transaction = await contract.startElection(electionTime);
    transaction.wait();
  };

  const endElection = async () => {
    const transaction = await contract.endElection();
    transaction.wait();
  };

  const voteToCandidate = async (id) => {
    try {
      const transaction = await contract.voteToCandidate(id);
      transaction.wait();
      setHasVoted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const addCandidate = async (id, name, partyName) => {
    const transaction = await contract.addCandidate(id, name, partyName);
    transaction.wait();
  };

  const removeCandidate = async (id) => {
    const transaction = await contract.removeCandidate(id);
    transaction.wait();
  };

  const emptyCandidates = async () => {
    const transaction = await contract.emptyCandidates();
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
    setCurrentVoterToCandidateId(currentVoterToCandidateId.toString());
  };

  const getCandidates = async () => {
    const candidates = await contract.getCandidates();
    setCandidates(
      candidates.map((candidate) => {
        return {
          id: candidate.id.toString(),
          name: candidate.name,
          partyName: candidate.partyName,
          votes: candidate.votes.toString(),
          imageUrl: candidate.imageUrl,
        };
      })
    );
  };

  const getRecentResults = async () => {
    const recentResults = await contract.getRecentResults();
    setRecentResults(
      recentResults.map((result) => {
        return {
          id: result.id.toString(),
          name: result.name,
          partyName: result.partyName,
          votes: result.votes.toString(),
          imageUrl: result.imageUrl,
        };
      })
    );
  };

  const getElectionsTimeList = async () => {
    const electionsTimeList = await contract.getElectionsTimeList();
    setElectionsTimeList(() =>
      electionsTimeList.map((time) => {
        return parseInt(time.toString());
      })
    );
  };

  const getPastElectionRecords = async () => {
    try {
      electionsTimeList.forEach(async (time) => {
        const pastElections = await contract.getElectionTimeToResult(time);
        let record = pastElections.map((result) => {
          return {
            id: result.id.toString(),
            name: result.name,
            partyName: result.partyName,
            votes: result.votes.toString(),
          };
        });

        setPastElections((prev) => ({ ...prev, [time]: record }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useeffects
  useEffect(() => {
    async function init() {
      if (typeof window.ethereum !== "undefined") {
        setIsMetaMaskInstalled(true);
        const addresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
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
    // event listeners

    contract.on("ElectionStarted", () => {
      console.log("Election has started");
      setIsElectionStarted(true);
    });

    contract.on("ElectionEnded", () => {
      console.log("Election has ended");
      setIsElectionStarted(false);
      setRecentResults(candidates);
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
      console.log("Candidate removed id:", id.toString());
      setCandidates((prev) => {
        return prev.filter((candidate) => candidate.id !== id.toString());
      });
    });

    contract.on("CandidateListEmptied", () => {
      console.log("Candidates list emptied");
      setCandidates([]);
    });

    return () => {
      contract.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    // if (isElectionStarted) {
    //   getHasVoted();
    //   getCurrentVoterToCandidateId();
    // }
    getCandidates();
    getHasVoted();
    getCurrentVoterToCandidateId();
    getRecentResults();
    getElectionsTimeList();
  }, [isElectionStarted]);

  useEffect(() => {
    getPastElectionRecords();
  }, [electionsTimeList, isElectionStarted]);

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
        recentResults,
        electionsTimeList,
        pastElections,
        emptyCandidates,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
