import React, {useState } from 'react';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input, } from 'reactstrap';
import { ADD_TO_CART } from "../../utils/actions"
import { useMutation } from '@apollo/react-hooks';
import {ADD_DONATION} from "../../utils/mutations"
import { Card, CardHeader, CardBody,
    CardTitle, CardText } from 'reactstrap';

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
            toggle();
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

        <div className='benefactor-list-item' itemID={_id}>
            <Card className='benefactorCard'>
                <CardHeader tag='h5'>{name}</CardHeader>
                <CardBody>
                <CardTitle>{age} years old</CardTitle>
                <CardText>{about}</CardText>
                <Button className='donationButtons' onClick={toggle}>Enter donation</Button>
                </CardBody>
            </Card>
                

        <Modal  isOpen={modal} toggle={toggle} >
            <ModalHeader>Donating to: {name}</ModalHeader>
            <ModalBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input name="amount" onChange={handleChange} className="modaltextarea donationamount" placeholder="Amount" min={1} max={10000000} type="number" step="1" /> 
                </InputGroup>       
            </ModalBody>
            <ModalFooter>
            <Button className="donationButtons" onClick={handleFormSubmit}>Submit Donation</Button>
            <Button onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>


        </div>
    )
} 

export default BenefactorListItem;