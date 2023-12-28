import { motion } from "framer-motion";
import "./logo.css"

const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(0, 0, 0, 0)"
    },
    visible: {
      pathLength: 1,
      fill: "rgba(0, 0, 0, 1)"
    }
  }

  export const Logo = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="item"
    >
      <motion.path
        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: { duration: 2, ease: "easeInOut" },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] }
        }}
      />
    </motion.svg>
  )
}