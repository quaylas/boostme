import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../../utils/queries';


function DonationHistory() {
    
    const [userDonations] = useQuery(QUERY_USER)
    const listItems = userDonations.map((donations) =>
    <li>{donations}</li>
    );
    
    return (
        <div>
            <ul>
                {listItems}
            </ul>
        </div>

    );
}

export default DonationHistory;