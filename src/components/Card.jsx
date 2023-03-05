import { Link } from "react-router-dom";

const Card = ({ title, desc, icon, buttonText, color, link }) => {
  return (
    <div
      className={`card rounded-lg border-4 border-${color}-400 bg-gray-100 hover:bg-${color}-100 
                          flex flex-col items-center justify-between 
                          p-4 min-h-[220px]`}
    >
      <div className="flex flex-col items-center">
        <div className="card-header text-xl font-semibold">
          <h3>{title}</h3>
        </div>
        <div className="card-icon">
          <img src={icon} alt="user icon" className="w-12 h-12" />
        </div>
        <div className="desc text-center px-2 font-light tracking-wide">
          {desc}
        </div>
      </div>
      <Link to={`${link}`}>
        <div
          className={`card-button border-2 border-${color}-500 rounded-full py-2 px-4 font-bold
                          hover:bg-${color}-500 hover:text-white active:shadow-lg
                          transition-all duration-200 ease-in-out`}
        >
          {buttonText}
        </div>
      </Link>
    </div>
  );
};

export default Card;
