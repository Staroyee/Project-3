import { motion } from "framer-motion";
import PropTypes from "prop-types"
import "./Button.css"

function Button({ value }) {
  return (
    <motion.button
      className="button"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {value}
    </motion.button>
  );
}

Button.propTypes = {
    value: PropTypes.object
}

export default Button;
