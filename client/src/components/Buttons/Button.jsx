import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./Button.css";

function Button({ value }) {
  return (
    <motion.button
      data-testid="btn"
      className="button"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {value}
    </motion.button>
  );
}

Button.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string, // Allow strings
    PropTypes.object, // Allow objects
  ]),
};

export default Button;
