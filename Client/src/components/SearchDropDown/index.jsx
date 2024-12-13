import PropTypes from 'prop-types'; // Import PropTypes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SearchDropDown = ({ placeholder, options, onChange }) => {
  return (
    <div className="relative lg:max-w-sm">
      <div className="relative">
        <div className="relative">
          <select
            className="w-44 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none border-gray-600 hover:cursor-pointer"
            onChange={(e) => onChange(e.target.value)}
          >
            {placeholder && (
              <option value="" disabled selected>
                {placeholder}
              </option>
            )}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the SearchDropDown component
SearchDropDown.propTypes = {
  placeholder: PropTypes.string, // Optional placeholder string
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Label of the dropdown option
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // Value can be string or number
        .isRequired,
    })
  ).isRequired, // Ensure options is an array of objects with `label` and `value`
  onChange: PropTypes.func.isRequired, // Ensure onChange is a function
};

export default SearchDropDown;
