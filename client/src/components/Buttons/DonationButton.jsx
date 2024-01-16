import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";

// Stripe public key which does not need to be kept secret
const stripePromise = loadStripe(
  "pk_live_51OEQ8QIUYfXVTgTojMTTZ0FpHN5xQYruAb4JGPHlI3QMWCW9kkQ7f6JmZV9txvtdr3i9u72O2FJJSVSy7ySnFJmQ00WhjlRlw7"
);

// Define DonationButton component
const DonationButton = ({ itemID, amount }) => {
  const handleClick = async () => {
    // Await Stripe response
    const stripe = await stripePromise;
    // Redirect to Stripe page checkout when user is on the set window location only.
    const stripeCheckoutSession = await stripe.redirectToCheckout({
      lineItems: [{ price: itemID, quantity: 1 }],
      mode: "payment",
      successUrl:
        window.location.protocol +
        "//skyward-project-57c549ccb969.herokuapp.com/donate",
      cancelUrl:
        window.location.protocol +
        "//skyward-project-57c549ccb969.herokuapp.com/donate",
      submitType: "donate",
    });

    // Open the Stripe checkout session in a new tab
    if (stripeCheckoutSession && stripeCheckoutSession.url) {
      window.open(stripeCheckoutSession.url, "_blank");
    }
  };

  // Return component data
  return (
    <>
      {" "}
      <motion.button
        data-testid="btn"
        className="D-Button"
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        Donate {amount}$
      </motion.button>
    </>
  );
};

// Define prop types
DonationButton.propTypes = {
  itemID: PropTypes.string,
  amount: PropTypes.string,
};

// Export component
export default DonationButton;
