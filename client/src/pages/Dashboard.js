import React from "react";
import BenefactorList from '../Components/BenefactorList';
import DonationHistory from '../Components/DonationHist';
import Cart from '../Components/Cart';

const Dashboard = () => {
    return (
    <div style={{display: 'flex'}}>
        <Cart/>
      
          <div>

          <DonationHistory />
          </div>
          
          <div className="container2">
          <BenefactorList />
          </div>

      </div>
       
    );
    }

export default Dashboard;