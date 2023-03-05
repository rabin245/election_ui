import { Link } from "react-router-dom";

const Card = ({ title, desc, icon, color, buttonText, link }) => {
  const colorVariants = {
    blue: "border-blue-400 hover:bg-blue-100",
    indigo: "border-indigo-400 hover:bg-indigo-100",
    purple: "border-purple-400 hover:bg-purple-100",
  };

  const buttonColorVariants = {
    blue: "border-blue-500 hover:bg-blue-500",
    indigo: "border-indigo-500 hover:bg-indigo-500",
    purple: "border-purple-500 hover:bg-purple-500",
  };

  return (
    <div
      className={`card rounded-lg border-4 ${colorVariants[color]} bg-gray-100 
                flex flex-col items-center justify-between p-4 min-h-[220px]`}
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
          className={`card-button border-2 ${buttonColorVariants[color]} rounded-full py-2 px-4 font-bold
                           hover:text-white active:shadow-lg
                          transition-all duration-200 ease-in-out`}
        >
          {buttonText}
        </div>
      </Link>
    </div>
  );
};

export default Card;
