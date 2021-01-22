import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {Button} from 'react-bootstrap'


function TimeTable(props) {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [examData, setExamData] = useState([]);
    const [examName, setExamName] = useState('')
    console.log(props);
    let no = 0
    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("examShow"), { Class: props.Class, Branch: props.Branch }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setData(res.data)
        })
    }, [])


    const timetab = (e) => {
        console.log(e.ExamName);
        setExamName(e.ExamName)
        var c = data.find(o => o.ExamId === e.ExamId)
        console.log(c.ExamDetails);
        setExamData(c.ExamDetails)
        setShow(true)


    }

    const back = () => setShow(false)


    if (show) {
        return (
            <div>
                <Button variant="outline-danger" onClick={back}>back</Button>
                <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>{examName} Time Table</p><hr />

                <table className="table" style={{ textAlign: 'center' , border: '3px solid #001529'}}>
                    <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                        <tr>
                            <th>S.No</th>
                            <th>Subject</th>
                            <th>Date Of Exam</th>
                            <th>Time (from)</th>
                            <th>Time (to)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {examData.map(data => (
                            <tr>
                                <td>{no = no + 1}</td>
                                <td>{data.subjectName}</td>
                                <td>{data.dateOfExam}</td>
                                <td>{data.startTime}</td>
                                <td>{data.endTime}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div>
            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}> Time Table</p><hr />

            <table className="table" style={{ textAlign: 'center' , border: '3px solid #001529'}}>

                <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Timetable</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(data => {
                        no = no + 1
                        return (
                            <tr>
                                <td>{no}</td>
                                <td>{data.ExamName}</td>

                                <td><button onClick={() => timetab(data)} className="btn btn-info">See Timetable</button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default TimeTable
