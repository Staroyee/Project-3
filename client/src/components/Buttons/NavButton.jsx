import PropTypes from "prop-types";
import "./NavButton.css";

function NavButton({ valueOne, valueTwo, style }) {
  return (
    <>
      <button className="button-57" style={style}>
        <span className="text">{valueOne}</span>
        <span>{valueTwo}</span>
      </button>
    </>
  );
}

NavButton.propTypes = {
  valueOne: PropTypes.string,
  valueTwo: PropTypes.string,
  style: PropTypes.object,
};

export default NavButton;
