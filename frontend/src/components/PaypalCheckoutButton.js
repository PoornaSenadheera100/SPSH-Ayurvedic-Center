import {PayPalButtons} from "@paypal/react-paypal-js"

//holds logic and styling for checkout button
const PaypalCheckoutButton = (props) => {//contains product
    const {product} = props;

    return <PayPalButtons
    style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill"
    }}
    />;
};

export default PaypalCheckoutButton;