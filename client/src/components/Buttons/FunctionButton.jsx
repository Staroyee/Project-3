import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./Button.css";

function FunctionButton({ value, onClick }) {
  return (
    <motion.button
      data-testid="btn"
      onClick={onClick}
      className="button"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {value}
    </motion.button>
  );
}

FunctionButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string, // Allow strings
    PropTypes.object, // Allow objects
  ]),
};

export default FunctionButton;
