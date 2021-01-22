import React, { useState } from 'react';
import { Card, Button, CardDeck } from 'react-bootstrap'
import EnrollAdmin from './EnrollCards/AdminEnroll';
import DeletePage from './UpdateandDelete/DeletePage';
import EnrollPrincipal from './EnrollCards/EnrollPrincipal';
import EnrollSchool from './EnrollCards/EnrollSchool';
import DeleteSection from './SectionAndBranch/DeleteSection';
import SectionAndBranch from './SectionAndBranch/SectionAndBranchUpload'
import UpdateSchool from './UpdateandDelete/UpdateSchool';


function SuperAdminDashboard() {
    const [enrollShow, setEnrollShow] = useState(false);
    const [sectionShow, setSectionShow] = useState(false);
    const [deleteSectionShow, setDeleteSectionShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false);
    const [principalShow, setPrincipalShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [enrollAdmin, setEnrollAdmin] = useState(false);
    function back() {
        setEnrollShow(false);
        setSectionShow(false);
        setDeleteSectionShow(false);
        setUpdateShow(false)
        setPrincipalShow(false);
        setDeleteShow(false);
        setEnrollAdmin(false)

    }
    if (sectionShow) {
        return (
            <div><button onClick={back}>Back</button>
                <SectionAndBranch />
            </div>
        )
    }

    if (enrollShow) {
        return (
            <div><button onClick={back}>Back</button>
                <EnrollSchool />
            </div>

        )
    }
    if (deleteSectionShow) {
        return (
            <div>
                <button onClick={back}>Back</button>
                <DeleteSection />
            </div>
        )
    }

    if (updateShow) {
        return (
            <div>
                <button onClick={back}>Back</button>

                <UpdateSchool />
            </div>
        )
    }

    if (principalShow) {
        return (
            <div>
                <button onClick={back}>Back</button>
                <EnrollPrincipal />
            </div>
        )
    }

    if (deleteShow) {
        return (
            <div>
                <button onClick={back}>Back</button>
                <DeletePage />
            </div>
        )
    }
    if (enrollAdmin) {
        return (
            <div>
                <button onClick={back}>Back</button>
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
                        <Button onClick={() => setEnrollShow(true)} >dfsf </Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Upload Section and Branch</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setSectionShow(true)}  >dfsf </Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Delete Section</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setDeleteSectionShow(true)} >dfsf </Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Update</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setUpdateShow(true)} >dfsf </Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Principal Enroll</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setPrincipalShow(true)} >dfsf </Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Delete Page</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setDeleteShow(true)} >dfsf </Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Admin Enroll</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setEnrollAdmin(true)} >dfsf </Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </div>
    )
}

export default SuperAdminDashboard
