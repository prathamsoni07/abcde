import React, { useState } from 'react';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { LeftCircleFilled } from '@ant-design/icons'
import EnrollTeacher from './EnrollTeacher';
import TeacherInfo from './TeacherInfo';
import AssignClass from './AssignClass';
import TeacherDetails from '../../PrincipalDashboard/TeacherDetails/TeacherDetails';

function TeacherCard(props) {

  const [enrollshow, setEnrollShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [assignShow, setAssignShow] = useState(false);
  const [tdetails, setTdetails] = useState(false)


  function cardShow() {
    console.log("function Called");
    setEnrollShow(false)
    setUpdateShow(false)
    setAssignShow(false)
    setTdetails(false)

    return TeacherCard

  }

  if (enrollshow) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <EnrollTeacher />
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30 }} />

      </div>

    )
  }
  if (updateShow) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <TeacherInfo />
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />

      </div>

    )
  }



  if (assignShow) {
    return (
      <div>        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />

        <AssignClass />
      </div>
    )
  }

  if (tdetails) {
    return (
      <div>        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />

        <TeacherDetails schoolName={props.schoolName} />
      </div>
    )
  }

  return (
    <div>

      <CardDeck>
        {/* firstCard */}
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Enroll New Teacher</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setEnrollShow(true)}  >Enroll Now</Button>
          </Card.Footer>
        </Card>
        {/* second Card */}
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Teacher Update And Delete</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setUpdateShow(true)} >Fetch </Button>
          </Card.Footer>
        </Card>


        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Assign Class And Section</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setAssignShow(true)} >Assign Class </Button>
          </Card.Footer>
        </Card>


        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Teacher Information</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setTdetails(true)} >See Details </Button>
          </Card.Footer>
        </Card>

      </CardDeck>
      <br />





    </div>
  )
}

export default TeacherCard
