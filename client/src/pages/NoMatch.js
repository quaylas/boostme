import React from "react";
//import Header from "../Components/Header";
import BenefactorList from '../Components/BenefactorList';
import DonationHistory from '../Components/DonationHist';
import Cart from '../Components/Cart';
const NoMatch = () => {
  return (
    <div>
        <Cart/>
        <DonationHistory />
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
          <BenefactorList />
        </h1>
    </div>
  );
};

export default NoMatch;