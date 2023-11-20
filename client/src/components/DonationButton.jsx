import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51OEQ8QIUYfXVTgTojMTTZ0FpHN5xQYruAb4JGPHlI3QMWCW9kkQ7f6JmZV9txvtdr3i9u72O2FJJSVSy7ySnFJmQ00WhjlRlw7"
);

const DonationButton = ({ itemID, amount }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.protocol + "//skyward-project-57c549ccb969.herokuapp.com/donate",
        cancelUrl: window.location.protocol + "//skyward-project-57c549ccb969.herokuapp.com/donate",
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(result);
        }
      });
  };

  return (
    <>
      {" "}
      <button
        className="D-Button"
        onClick={handleClick}
      >
        Donate {amount}$
      </button>
    </>
  );
};

export default DonationButton;
