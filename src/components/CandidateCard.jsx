function CandidateCard({
  name,
  id,
  party,
  img,
  onClick,
  active,
  isAdmin,
  onRemove,
  isElectionStarted,
}) {
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
      <div className="info px-4 py-2 flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-sm">{party}</p>
        </div>
        {isAdmin && (
          <div
            className={`hover:bg-red-400 rounded-full p-2 flex justify-center items-center group ${
              isElectionStarted
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer"
            }`}
            onClick={onRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash stroke-red-500 group-hover:stroke-white"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 7l16 0"></path>
              <path d="M10 11l0 6"></path>
              <path d="M14 11l0 6"></path>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateCard;
