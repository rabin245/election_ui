import TestImage from "../assets/image.jpg";

function CandidateCard({ name, onClick, active }) {
  return (
    <div
      className={`card border border-gray-300 rounded-sm hover:shadow-xl h-max
      ${active && "shadow-2xl ring-1 ring-blue-400"}
      `}
      onClick={onClick}
    >
      <div className="image">
        <img src={TestImage} alt="" />
      </div>
      <div className="info px-4 py-2">{name}</div>
    </div>
  );
}

export default CandidateCard;
