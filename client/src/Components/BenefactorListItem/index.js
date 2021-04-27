import { Modal } from 'bootstrap';
import React from 'react';

// import { idbPromise } from '../../utils/helpers';
// import { useStoreContext } from '../../utils/GlobalState';

// import { ADD_TO_CART } from '../../utils/actions';

function BenefactorListItem(item) {
    // const [state, dispatch] = useStoreContext();

    const openModal = (benefactorId) => {
        alert('you\'ve opened a modal!');
    }

    const { _id, name, age, about } = item;

    return (
        <div className='benefactor-list-item' itemID={_id}>
            <h4>{name}</h4>
            <p>{age}</p>
            <p>{about}</p>
            <button onClick={openModal}>open donation modal</button>
        </div>
    )
}

export default BenefactorListItem;