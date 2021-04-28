import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { UPDATE_DONATIONS } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';

function DonationHistory() {

    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_ME);

    useEffect(() => {
        if(data) {
            console.log(data);
            dispatch({
                type: UPDATE_DONATIONS,
                donations: data.me.donations
            });
    
            data.me.donations.forEach((donation) => {
                idbPromise('donations', 'put', donation);
            });
        } else if (!loading) {
            idbPromise('donations', 'get').then((donations) => {
                dispatch({
                    type: UPDATE_DONATIONS,
                    donations: donations
                });
            });
        }
    }, [data, loading, dispatch]);
    

    return (
        <div className='containersidebar'>
            {state.donations.length ? (
            <ul className="admin-menu">
            <h3 style={{color: 'white'}}>My Donation History</h3><br></br>
                {data.me.donations.map((donation) => (
                    <li className="menu-heading" key={donation._id}>
        
                        Date: {donation.donationDate} {<br></br>}
                        4H Member: {donation.benefactor} {<br></br>}
                        Amount: ${donation.amount} {<br></br>}
                        {<br></br>}
                        
                    </li>
                ))}
            </ul>
            ) : (<div>No donations yet!</div>)}
            { loading ? <div>Please give us a second to load ...</div> : null }
        </div>

    );
};

export default DonationHistory;
