import React from "react";
//import Header from "../Components/Header";
import BenefactorList from '../Components/BenefactorList';

const NoMatch = () => {
  return (
    <div>
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