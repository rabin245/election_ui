import CandidateCard from "../components/CandidateCard";
import { useEffect, useState, useContext } from "react";
import { ContractContext } from "../context/contractContext";

export default function CandidatesList({ currentCandidate, onClick }) {
  const { candidates: cands } = useContext(ContractContext);

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setCandidates(cands);
  }, [cands]);

  return (
    <div className="cardsGrid p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {candidates.map((cand) => (
        <CandidateCard
          key={cand.id.toString()}
          id={cand.id.toString()}
          name={cand.name}
          party={cand.partyName}
          img={cand.imageUrl}
          onClick={() => {
            console.log(cand);
            onClick(cand.id.toString());
          }}
          active={currentCandidate === cand.id.toString()}
        />
      ))}
    </div>
  );
}
