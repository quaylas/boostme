import {React, useState, useEffect} from "react";
import {QUERY_BENEFACTORS} from "../../utils/mutations"
import {Modal, Button, } from 'react-bootstrap'
import Benefactor from "../../../../server/models/Benefactor";

function modalComponent (){

    const data = useQuery(QUERY_BENEFACTORS);

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
    <Form.Control as="select">
    
     
    </Form.Control>
    </Form.Group>

<Modal.Dialog>
    <Modal.Header closeButton>
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
</Modal.Dialog>

</div>


    )


    
}

export default modalComponent;