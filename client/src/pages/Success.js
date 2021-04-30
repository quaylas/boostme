import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const donations = cart.map(donation => donation._id);

            if(donations.length) {
                const { data } = await addOrder({ variables: { donations }});
                const donationData = data.addOrder.donations;

                donationData.forEach((donation) => {
                    idbPromise('cart', 'delete', donation);
                });
            }

            setTimeout(()=> {
                window.location.assign('/dashboard');
            }, 3000);
        };

        saveOrder();
    },  [addOrder]);

    return (
        <div className='container2'>
            <h2>Success!</h2>
            <div>Thank you for your donation!</div>
            <div>You will now be redirected to your dashboard.</div>
        </div>
    )
};

export default Success;