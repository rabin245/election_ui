function CandidateCard({ name, id, party, img, onClick, active }) {
  return (
    <div
      className={`card border border-gray-300 rounded-sm hover:shadow-xl h-max
      ${active && "shadow-2xl ring-1 ring-blue-400"}
      `}
      onClick={onClick}
    >
      <div className="image">
        <img src={`${img}?random=${id}`} alt="party image" loading="lazy" />
      </div>
      <div className="info px-4 py-2 ">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-sm">{party}</p>
      </div>
    </div>
  );
}

export default CandidateCard;
