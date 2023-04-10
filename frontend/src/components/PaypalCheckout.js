// Checkout.js
import PaypalCheckoutButton from "./PaypalCheckoutButton";

const PaypalCheckout = () => {
  const product = {
    description: "Design+Code React Hooks Course",
    price: 19
  };

  return (
      <div className="paypal-button-container">
        <PaypalCheckoutButton product={product} />
      </div>
  );
};

export default PaypalCheckout;