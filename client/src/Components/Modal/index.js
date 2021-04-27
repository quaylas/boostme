import {React, useState, useEffect} from "react";
import {QUERY_BENEFACTORS} from "../../utils/mutations"
import {Modal, Button, } from 'react-bootstrap'
import Benefactor from "../../../../server/models/Benefactor";

function modalComponent (){

    const data = useQuery(QUERY_BENEFACTORS);

    const benefactors = data.benefactorName

    /*function ifbenefactors(){  This will check and make sure benefactors are returning. This is the logic set up if we don't have any benefactors in our DB yet. 
        if(!benefactors){
            return state 
        }
    } */

    useEffect(() => {
      
    })

    /*state*/
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    return(

<div className="benefactorSelection">

    <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Please Select a benefactor</Form.Label>
    <Form.Control as="select">{map(data => (
     <option oncclick={handleShow} >{data.benefactorName}</option>   

    ))}
    
     <Modal.Header>
    <Modal.Title>Donations</Modal.Title>
    </Modal.Header>
    <Form.Control className="benefactorNameModal" type="text" placeholder="Benefactor's Name Here" readOnly />
    <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>How Much would you like to Donate?</Form.Label>
          <Form.Control required type="int" placeholder="$"/>
          <Form.Control.Feedback>Thank you!</Form.Control.Feedback>
        </Form.Group>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>Close</Button>
    <Button variant="primary">Submit Donation</Button>
    </Modal.Footer>

 </Form.Control>
    </Form.Group>
    


</div>


    )


    
}

export default modalComponent;