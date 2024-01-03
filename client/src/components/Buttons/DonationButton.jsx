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
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl:
          window.location.protocol +
          "//skyward-project-57c549ccb969.herokuapp.com/donate",
        cancelUrl:
          window.location.protocol +
          "//skyward-project-57c549ccb969.herokuapp.com/donate",
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(result);
        }
      });
  };
  // Return component data
  return (
    <>
      {" "}
      <button className="D-Button" onClick={handleClick}>
        Donate {amount}$
      </button>
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
