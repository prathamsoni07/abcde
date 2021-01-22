import React, { useState } from 'react';
import { Card, Button, CardDeck } from 'react-bootstrap'
import EnrollAdmin from './AdminEnroll';
import EnrollPrincipal from './EnrollPrincipal';
import EnrollSchool from './EnrollSchool';


function EnrollCards() {
    const [enrollShow, setEnrollShow] = useState(false);
    const [principalShow, setPrincipalShow] = useState(false);
    const [enrollAdmin, setEnrollAdmin] = useState(false);
    function back() {
        setEnrollShow(false);

        setPrincipalShow(false);
        setEnrollAdmin(false)

    }

    if (enrollShow) {
        return (
            <div><Button onClick={back} variant="outline-danger">Back</Button>
                <EnrollSchool />
            </div>

        )
    }



    if (principalShow) {
        return (
            <div>
                <Button onClick={back} variant="outline-danger">Back</Button>
                <EnrollPrincipal />
            </div>
        )
    }


    if (enrollAdmin) {
        return (
            <div>
                <Button onClick={back} variant="outline-danger">Back</Button>
                <EnrollAdmin />
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
                        <Card.Title>Enroll School</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setEnrollShow(true)}>Enroll</Button>
                    </Card.Footer>
                </Card>



                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Principal Enroll</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setPrincipalShow(true)} >Enroll</Button>
                    </Card.Footer>
                </Card>

                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Admin Enroll</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setEnrollAdmin(true)} >Enroll</Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </div>
    )
}

export default EnrollCards
