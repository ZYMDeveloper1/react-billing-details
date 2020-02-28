import React from "react";
import styled from "styled-components";
import BillingDetails from "./components/BillingDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const AppBlock = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 1rem;
`;

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function App() {
  return (
    <AppBlock>
      <Elements stripe={stripePromise}>
        <BillingDetails />
      </Elements>
    </AppBlock>
  );
}

export default App;
