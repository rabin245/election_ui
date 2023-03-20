import CandidateCard from "../components/CandidateCard";
import { useEffect, useState, useContext } from "react";
import { ContractContext } from "../context/contractContext";
import { AuthContext } from "../context/authContext";

export default function CandidatesList({ currentCandidate, onClick }) {
  const {
    candidates: cands,
    removeCandidate,
    isElectionStarted,
  } = useContext(ContractContext);
  const { isAdmin } = useContext(AuthContext);

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setCandidates(cands);
  }, [cands]);

  return (
    <>
      {candidates.length === 0 && (
        <div className=" bg-teal-400 rounded-lg mx-4 mt-2 px-2 py-1 shadow-xl">
          <h1 className="text-white text-lg font-bold tracking-wide">
            No candidates yet
          </h1>
        </div>
      )}
      <div className="cardsGrid p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {candidates.map((cand) => (
          <CandidateCard
            key={cand.id.toString()}
            id={cand.id.toString()}
            name={cand.name}
            party={cand.partyName}
            img={cand.imageUrl}
            onClick={() => {
              onClick(cand.id.toString());
            }}
            active={currentCandidate === cand.id.toString()}
            isAdmin={isAdmin}
            isElectionStarted={isElectionStarted}
            onRemove={() => {
              if (!isElectionStarted) {
                if (
                  window.confirm(
                    "Are you sure you want to remove this candidate?"
                  )
                )
                  removeCandidate(cand.id.toString());
              }
            }}
          />
        ))}
      </div>
    </>
  );
}
