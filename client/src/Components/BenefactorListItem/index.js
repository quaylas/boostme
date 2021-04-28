import React, {useState } from 'react';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input, } from 'reactstrap';
import { ADD_TO_CART, REMOVE_FROM_CART} from "../../utils/actions"
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {ADD_DONATION} from "../../utils/mutations"

function BenefactorListItem(benefactor) {
    const [addDonation, {error}] = useMutation(ADD_DONATION)
    const [modal, setModal] =useState(false);
    const toggle = () => setModal(!modal); 
    const { _id, name, age, about } = benefactor;
    const [formState, setFormState] = useState({ benefactor: name, amount: 0});
    /* add to cart */
    const [state, dispatch] = useStoreContext();
    const handleChange =event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: parseFloat(value)
        });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const mutationResponse = await addDonation({
                variables: {
                    benefactor: formState.benefactor, amount: formState.amount
                }
            });
            const donation = mutationResponse.data.addDonation
            addToCart(donation);
        } catch(e){
            console.log(e);
        }
    } 
    const addToCart = (donation) => {
            dispatch({
                type: ADD_TO_CART,
                donation: donation
            });
            idbPromise('cart', 'put', {
                ...donation,
            });
        }
    return (

        <div>

        <div className='benefactor-list-item' itemID={_id}>
            <h4>{name}</h4>
            <p>{age}</p>
            <p>{about}</p>
            <button onClick={toggle}>test open donation modal</button>
        </div>

        <Modal  isOpen={modal} toggle={toggle} >
            <ModalHeader >{name}</ModalHeader>
            <ModalBody>
                <div>Age:{age}</div>
                <div>A little bit about <strong>{name}</strong></div>
                <div>{about}</div>
                <div>{name} would welcome your support!</div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input name="amount" onChange={handleChange} className="modaltextarea donationamount" placeholder="Amount" min={1} max={10000000} type="number" step="1" /> 
                </InputGroup>       
            </ModalBody>
            <ModalFooter>
            <Button onClick={handleFormSubmit}>Submit Donation</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>


        </div>
    )
} 

export default BenefactorListItem;