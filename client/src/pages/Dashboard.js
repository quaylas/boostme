import React from "react";
import BenefactorList from '../Components/BenefactorList';
import DonationHistory from '../Components/DonationHist';
import Cart from '../Components/Cart';

const Dashboard = () => {
    return (
    <div className='dashboardContainer' style={{display: 'flex'}}>

          <DonationHistory />
          
          <div className="container2">
          <BenefactorList />
          </div>
        <Cart />

      </div>
       
    );
    }

export default Dashboard;