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
    try {
      const electionTime = new Date().getTime();
      const transaction = await contract.startElection(electionTime);
      transaction.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const endElection = async () => {
    try {
      const transaction = await contract.endElection();
      transaction.wait();
    } catch (error) {
      console.log(erro);
    }
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

  const addCandidate = async (id, name, partyName, imageUrl) => {
    try {
      const transaction = await contract.addCandidate(
        id,
        name,
        partyName,
        imageUrl.length > 0 ? imageUrl : "https://picsum.photos/800/525"
      );
      transaction.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const removeCandidate = async (id) => {
    try {
      const transaction = await contract.removeCandidate(id);
      transaction.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const emptyCandidates = async () => {
    try {
      const transaction = await contract.emptyCandidates();
      transaction.wait();
    } catch (error) {
      console.log(error);
    }
  };

  // view functions
  const getHasVoted = async () => {
    try {
      const hasVoted = await contract.getHasVoted();
      setHasVoted(hasVoted);
    } catch (error) {
      console.log(error);
    }
  };

  const getIsElectionStarted = async () => {
    try {
      const isElectionStarted = await contract.getHasStarted();
      setIsElectionStarted(isElectionStarted);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentVoterToCandidateId = async () => {
    try {
      const currentVoterToCandidateId =
        await contract.getCurrentVoterToCandidateId();
      setCurrentVoterToCandidateId(currentVoterToCandidateId.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const getCandidates = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentResults = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const getElectionsTimeList = async () => {
    try {
      const electionsTimeList = await contract.getElectionsTimeList();
      setElectionsTimeList(() =>
        electionsTimeList.map((time) => {
          return parseInt(time.toString());
        })
      );
    } catch (error) {
      console.log(error);
    }
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
      let needRefresh =
        JSON.parse(sessionStorage.getItem("needRefresh")) ?? true;
      console.log(needRefresh);

      if (typeof window.ethereum !== "undefined") {
        setIsMetaMaskInstalled(true);
        const addresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(addresses[0]);
        if (needRefresh) {
          sessionStorage.setItem("needRefresh", false);
          window.location.reload();
        }
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
      console.log("Vote casted to candidate", updatedCandidate.id.toString());
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
