import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../../utils/queries';


function DonationHistory() {
    
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }
    
    return (
        <>
        <div>
            {user ? (
                <>
                <h2>Donation History</h2>
        
                {user.donations.map(({ donationDate, benefactor, amount }, index) => (
                    <div key={index}>
                        <li>
                            {
                            user.donations.donationDate,
                            user.donations.benefactor,
                            user.donations.amount
                            }
                        </li>

                    </div>

                )

            )}
            </>
        ) : null}

        </div>
        </>

    );
}

export default DonationHistory;