import PropTypes from "prop-types";
import "./NavButton.css";

function NavButton({ valueOne, valueTwo, style }) {
  return (
    <>
      <button data-testid="btn" className="button-57" style={style}>
        <span data-testid="span1" className="text">
          {valueOne}
        </span>
        <span data-testid="span2">{valueTwo}</span>
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
