import React, { useState } from 'react';
import { CardDeck, Card, Button } from 'react-bootstrap';
import EnrollStudent from './EnrollStudent';
import { LeftCircleFilled } from '@ant-design/icons'
import StudentUpdate from './StudentUpdate';
import StudentPromotion from './PromoteStudent';
import StudentFees from './StudentFees';
import ResultPage from './ResultPage';
import StudentDetails from '../../PrincipalDashboard/StudentDetails/StudentDetails';
import './style.css'

function StudentCard() {

  const [enrollshow, setEnrollShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [promoteShow, setPromoteShow] = useState(false);
  const [feeShow, setFeeShow] = useState(false);
  const [resultShow, setResultShow] = useState(false);
  const [studentDetails, setStudentDetails] = useState(false)

  function cardShow() {
    console.log("function Called");
    setEnrollShow(false)
    setUpdateShow(false)
    setPromoteShow(false)
    setFeeShow(false)
    setResultShow(false)
    setStudentDetails(false)
    return StudentCard

  }

  if (enrollshow) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <EnrollStudent />

      </div>

    )
  }
  if (updateShow) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <StudentUpdate />

      </div>

    )
  }
  if (promoteShow) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <StudentPromotion />

      </div>

    )
  }
  if (feeShow) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <StudentFees />

      </div>

    )
  }

  if (resultShow) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <ResultPage />
        <br />

      </div>

    )
  }
  if (studentDetails) {
    return (
      <div>
        <LeftCircleFilled onClick={cardShow} style={{ fontSize: 30, zIndex: 10 }} />
        <StudentDetails />
        <br />

      </div>

    )
  }


  return (
    <div style={{ width: '80%' }}>


      {/**           <Card.Img variant="top" src="holder.js/100px160" />
*/}

      <div >
        <CardDeck>
          {/* firstCard */}
          <Card className="card">
            <div className="inner">
              <Card.Img variant="top" src="/enrolls.jpg" />
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>ENROLL NEW STUDENT</Card.Title>

              <div style={{ textAlign: "center" }}>
                <Button onClick={() => setEnrollShow(true)} >Enroll Now</Button>
              </div>
            </Card.Body>
          </Card>
          {/* second Card */}


          <Card className="card">
            <div className="inner">
              <Card.Img variant="top" src="/s.jpg" />
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>STUDENT UPDATE AND DELETE</Card.Title>
              <div style={{ textAlign: "center" }}>
                <Button onClick={() => setUpdateShow(true)} >Fetch Details</Button>
              </div>
            </Card.Body>
          </Card>
          {/* third Card */}
          <Card className="card">
            <div className="inner">
              <Card.Img variant="top" src="/details.jpeg" />
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>STUDENT DETAILS</Card.Title>
              <div style={{ textAlign: "center" }}>
                <Button onClick={() => setStudentDetails(true)} >Fetch Details</Button>
              </div>
            </Card.Body>
          </Card>

        </CardDeck>
        <br />
        <CardDeck>

          {/* fourth Card */}

          <Card className="card">
            <div className="inner">
              <Card.Img variant="top" src="/Promotion.jpg" />
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>STUDENT PROMOION</Card.Title>
              <div style={{ textAlign: "center" }}>
                <Button onClick={() => setPromoteShow(true)} variant="dark" >Fetch Details</Button>
              </div>
            </Card.Body>
          </Card>
          {/* fifth Card */}

          <Card className="card">
            <div className="inner">
              <Card.Img variant="top" src="/Fees.jpeg" />
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>FEES PORTAL</Card.Title>
              <div style={{ textAlign: "center" }}>
                <Button onClick={() => setFeeShow(true)} >Fetch Details</Button>
              </div>
            </Card.Body>
          </Card>
          {/* sixth Card */}

          <Card className="card">
            <div className="inner">
              <Card.Img variant="top" src="/Result.jpg" />
            </div>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>RESULT PAGE</Card.Title>
              <div style={{ textAlign: "center" }}>
                <Button onClick={() => setResultShow(true)} >Fetch Details</Button>
              </div>
            </Card.Body>
          </Card>

        </CardDeck>
      </div>



    </div>
  )
}

export default StudentCard




{/**

 <CardDeck>
      
        <Card style={{ backgroundColor: '#8bc8cb' }}>
          <Card.Body>
            <Card.Title>Enroll New Student</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setEnrollShow(true)} >Enroll Now</Button>
          </Card.Footer>
        </Card>
      


        <Card style={{ backgroundColor: '#EA3E7A  ' }}>
          <Card.Body>
            <Card.Title>Student Update And Delete</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setUpdateShow(true)} >Fetch Details</Button>
          </Card.Footer>
        </Card>
        <Card style={{ backgroundColor: '#EA3E7A  ' }}>
          <Card.Body>
            <Card.Title>Student Details</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setStudentDetails(true)} >Fetch Details</Button>
          </Card.Footer>
        </Card>
       

        <Card style={{ backgroundColor: '#e9da89' }}>
          <Card.Body>
            <Card.Title>Student Promotion</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setPromoteShow(true)} variant="dark" >Fetch Details</Button>
          </Card.Footer>
        </Card>


      </CardDeck>
      <br />
      <CardDeck>

        <Card style={{ backgroundColor: '#e9da89' }}>
          <Card.Body>
            <Card.Title>Fees Portal</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setFeeShow(true)} >Fetch Details</Button>
          </Card.Footer>
        </Card>
        <Card style={{ backgroundColor: '#8bc8cb' }}>
          <Card.Body>
            <Card.Title>Result Page</Card.Title>

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => setResultShow(true)} >Fetch Details</Button>
          </Card.Footer>
        </Card>

      </CardDeck>




*/}