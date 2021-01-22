import React, { useState } from 'react';
import { Card, Button, CardDeck } from 'react-bootstrap'
import DeletePage from './DeletePage';

import UpdateSchool from './UpdateSchool';


function UpdateCard() {

    const [updateShow, setUpdateShow] = useState(false);

    const [deleteShow, setDeleteShow] = useState(false);
    function back() {

        setUpdateShow(false)

        setDeleteShow(false);


    }


    if (updateShow) {
        return (
            <div>
                <Button onClick={back} variant="outline-danger">Back</Button>

                <UpdateSchool />
            </div>
        )
    }


    if (deleteShow) {
        return (
            <div>
                <Button onClick={back} variant="outline-danger">Back</Button>
                <DeletePage />
            </div>
        )
    }

    return (
        <div>
            {/**  
               <EnrollSchool /> 

                           <SectionAndBranch />

 */}

            <CardDeck>



                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Update School</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setUpdateShow(true)}>Update</Button>
                    </Card.Footer>
                </Card>

                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Delete Page</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setDeleteShow(true)}>Delete</Button>
                    </Card.Footer>
                </Card>

            </CardDeck>
        </div>
    )
}

export default UpdateCard
