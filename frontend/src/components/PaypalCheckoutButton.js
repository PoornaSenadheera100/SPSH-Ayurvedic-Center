import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

//holds logic and styling for checkout button
const PaypalCheckoutButton = (props) => {
  //contains product
  const { product } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    //call backend function to fullfill order

    //if response is success
    setPaidFor(true);

    //refresh user's account or subscription status

    //if repsonse returns error
    setError(
      "Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at spsh@gmail.com for assistance."
    );
  };

  if (paidFor) {
    //success
    alert("Thankyou for your purchase");
  }

  if (error) {
    alert(error);
  }

  return (
    <PayPalButtons
      style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      onClick={(data, actions) => {
        //validation on button click
        const hasAlreadyBoughtProduct = false;

        if (hasAlreadyBoughtProduct) {
          setError(
            "You already bought this course. Go to your account to view your list of courses."
          );

          return actions.reject();
        } else {
            return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price,
              },
            },
          ],
        });
      }}
      onCancel={() => {
        //go back to checkout page
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);
        handleApprove(data.orderID);
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
