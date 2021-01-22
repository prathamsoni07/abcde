import React, { useState } from 'react';
import { Card, Button, CardDeck } from 'react-bootstrap'
import DeleteSection from './DeleteSection';
import SectionAndBranch from './SectionAndBranchUpload'


function SectionCards() {
    const [sectionShow, setSectionShow] = useState(false);
    const [deleteSectionShow, setDeleteSectionShow] = useState(false);

    function back() {

        setSectionShow(false);
        setDeleteSectionShow(false);


    }
    if (sectionShow) {
        return (
            <div><Button onClick={back} variant="outline-danger">Back</Button>
                <SectionAndBranch />
            </div>
        )
    }


    if (deleteSectionShow) {
        return (
            <div>
                <Button onClick={back} variant="outline-danger">Back</Button>
                <DeleteSection />
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
                        <Card.Title>Upload Section and Branch</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setSectionShow(true)}>Upload</Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Delete Section</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setDeleteSectionShow(true)}>Delete</Button>
                    </Card.Footer>
                </Card>

            </CardDeck>
        </div>
    )
}

export default SectionCards
