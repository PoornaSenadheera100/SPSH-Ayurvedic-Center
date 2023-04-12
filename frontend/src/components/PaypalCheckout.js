// Checkout.js
import PaypalCheckoutButton from "./PaypalCheckoutButton";

export const PayPalCheckout = () => {
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