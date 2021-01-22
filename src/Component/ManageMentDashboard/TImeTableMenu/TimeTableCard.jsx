import { FormatListBulletedTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import { CardDeck, Card, Button } from 'react-bootstrap'
import DailyTimeTable from './DailyTimTable/DailyTIimeTable'
import ExamTimeTable from './ExamTimeTable/ExamTimeTable';
import TeacherSchedule from './ForTeacher/TeacherSchedule';

function TimeTableCard() {
    const [dailyShow, setDailyShow] = useState(false);
    const [examShow, setExamShow] = useState(false);
    const [fort, setFort] = useState(false)

    function back() {
        setDailyShow(false)
        setExamShow(false)
        setFort(false)
        return TimeTableCard
    }

    if (dailyShow) {
        return (
            <div>
                <Button variant="outline-danger" onClick={back}> go back</Button>
                <DailyTimeTable />
            </div>
        )
    }
    if (examShow) {
        return (
            <div>
                <Button variant="outline-danger" onClick={back}> go back</Button>

                <ExamTimeTable />
            </div>
        )
    }
    if (fort) {
        return (
            <div>
                <Button variant="outline-danger" onClick={back}> go back</Button>

                <TeacherSchedule />
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
                        <Card.Title>Daily / Monthly Time table upload</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setDailyShow(true)}  >Enroll Now</Button>
                    </Card.Footer>
                </Card>
                {/* second Card */}
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Exam / Test Time table upload</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setExamShow(true)}>Upload</Button>
                    </Card.Footer>
                </Card>

                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Teacher table upload</Card.Title>

                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setFort(true)} >Upload</Button>
                    </Card.Footer>
                </Card>


            </CardDeck>
        </div>
    )
}

export default TimeTableCard
