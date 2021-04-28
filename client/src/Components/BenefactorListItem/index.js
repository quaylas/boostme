import React, {useState} from 'react';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input, } from 'reactstrap';
import { ADD_TO_CART, REMOVE_FROM_CART} from "../../utils/actions"
import { useLazyQuery } from '@apollo/react-hooks';




function BenefactorListItem(item) {
    // const [state, dispatch] = useStoreContext();
    const [modal, setModal] =useState(false);

    const toggle = () => setModal(!modal); 

    const { _id, name, age, about } = item;

    /* add to cart */

    const {state, dispatch} = useStoreContext();

    const {cart} = state
    
    const addToCart = () => {
        const donationincart = cart.find((donation) => donationincart._id === _id)
        if (!donationincart) {
            dispatch({
                type: ADD_TO_CART,
                _id: _id,
                purchaseQuantity: parseInt(donationincart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
              ...donationincart,
              purchaseQuantity: parseInt(donationincart.purchaseQuantity) + 1
            });
          } else {
            dispatch({
              type: ADD_TO_CART,
              product: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
          }
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
                    <Input className="modaltextarea donationamount" placeholder="Amount" min={1} max={10000000} type="number" step="1" /> 
                </InputGroup>       
            </ModalBody>
            <ModalFooter>
            <Button>Submit Donation</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>


        </div>
    )
 } 

export default BenefactorListItem;