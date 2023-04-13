import axios from "axios";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

//holds logic and styling for checkout button
const PaypalCheckoutButton = (props) => {
  //contains price
  const { newOrder,
    usdAmount, email } = props.obj;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    //if response is success
    setPaidFor(true);

    axios
    .post("http://localhost:8070/order/add", newOrder)
    .then((req, res) => {
      alert("Order Submitted Successfully");
      axios.delete(`http://localhost:8070/ShoppingCart/delete/${email}`);
      window.location.replace("http://localhost:3000/buyerhome");
    })
    .catch((err) => {
      alert(err);
    });

    //if repsonse returns error
    
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
        width: 50,
        tagline: false,
        shape: "pill",
      }}
      onClick={(data, actions) => {
        //validation on button click
        const hasAlreadyBoughtProduct = false;

        if (hasAlreadyBoughtProduct) {
          setError(
            "One or more items have already been selected"
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
              amount: {
                value: usdAmount,
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
        setError(
          "Your payment was not processed successfully. We are unable to fulfill your purchase. Please contact us at spsh@gmail.com for assistance."
        );
        setError(err);
        console.error("PayPal Checkout on Error", err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
