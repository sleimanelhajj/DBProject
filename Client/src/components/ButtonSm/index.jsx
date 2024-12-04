import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const ButtonSm = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="text-white bg-[#5a30e2] py-4 font-semibold px-5 rounded-lg hover:bg-purple-700 text-sm whitespace-pre-wrap"
    >
      {buttonText}{" "}
      {buttonText === "Logout" ? (
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
      ) : (
        <FontAwesomeIcon icon={faArrowRight} />
      )}
    </button>
  );
};

export default ButtonSm;
