import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OEQ8QIUYfXVTgToR6r3vc06aTDKKz2F9lWOdgw9PFDkr61xvpBjVe5hREPUVTDVfQdiCuAh3sj1sRQ5nCoF5FAi00wyzfEzS9"
);

const DonationButton = ({ itemID, amount }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.protocol + "//localpdf.tech/merge",
        cancelUrl: window.location.protocol + "//localpdf.tech/merge",
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleClick}
      >
        Donate {amount}$
      </button>
    </>
  );
};

export default DonationButton;
