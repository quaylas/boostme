import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import BenefactorList from '../Components/BenefactorList';
import BenefactorListItem from '../Components/BenefactorListItem';
import DonationHistory from '../Components/DonationHist';
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

const Dashboard = () => {
    return (
    <div style={{display: 'flex'}}>
        <div >
          <DonationHistory />
          </div>
          
          <div className="container2">
          <BenefactorList />
          </div>

         <div className="container2">
            <BenefactorListItem />
        </div> 

      </div>


       
  


 /*        <div>
        <header class="page-header">
        
          <button class="toggle-mob-menu" aria-expanded="false" aria-label="open menu">
            <svg width="20" height="20" aria-hidden="true">
              <use xlink:href="#down"></use>
            </svg>
          </button>


          <ul class="admin-menu">
             <li class="menu-heading">
              <h3 style="color: aliceblue;">Janele Leathman</h3>
         
            <br />
                         </li>
              <button class="button" aria-expanded="#" aria-label="#">
                <span>Sign Out</span>
              </button>
            </li>
          </ul>


        </nav>
      </header>

      <section class="page-content">
        <section class="search-and-user">
          <form>
            <input type="search" placeholder="Begin Typing a Name...">
            <button type="submit" aria-label="submit form">
              <svg aria-hidden="true">
                <use xlink:href="#search"></use>
              </svg>
            </button>
          </form>
          <div class="admin-profile">
            <span class="greeting">Hello Janele</span>
            <div class="notifications">
              <span class="badge">1</span>
              <svg>
                <use xlink:href="#users"></use>
              </svg>
            </div>
          </div>
        </section>
        <section class="grid">

        
          <article style="padding-bottom: 50%;">
            <form style="padding-left: 5%;">
                <label for="fname">Name:</label>
                <input type="text" id="fname" name="fname">
                <label for="lname">Benefactor:</label>
                <input type="text" id="lname" name="lname">
                <label for="lname">Amount:</label>
                <input type="text" id="lname" name="lname">
                <br />
                <input type="submit" value="Donate Now">
            </form>
          </article>
        
        </section>
      </section>
      </div> */ 


       
    );
    }

export default Dashboard;