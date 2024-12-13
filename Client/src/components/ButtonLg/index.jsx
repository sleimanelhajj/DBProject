import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ButtonLg = ({ buttonText, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-neutral-800 py-4 px-8 font-semibold rounded-tr-2xl bg-primary hover:bg-secondary hover:text-white text-lg whitespace-pre-wrap shadow-md hover:shadow-lg transition-all"
    >
      {buttonText} <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
};

ButtonLg.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonLg;
