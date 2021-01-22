import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { Spin } from 'antd';
import {Button} from 'react-bootstrap'

function TimeTableT() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [spin, setSpin] = useState(false)
    const [spin1, setSpin1] = useState(false)
    const [examt, setExamt] = useState([]);
    const [examName, setExamName] = useState([]);
    const [name, setName] = useState('')
    const [sclass, setSclass] = useState('')
    var no = 0

    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherexamshow"), { hello: 'classexam' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setData(res.data)
            setSpin1(true)
        })
    }, [])


    const timetable = (e) => {

        var c = data.find(o => o.ExamId === e.ExamId)
        setExamt(c.ExamDetails)
        setName(e.ExamName)
        setShow(true)
    }

    const back = () => setShow(false)

    const find = (e) => {
        setSpin(false)

        e.preventDefault()
        console.log(sclass);

        var d = data.filter(o => o.Class === sclass)
        console.log(d);
        if (d.length < 1) {
            alert(`No time table for Class ${sclass}`)
            setSpin(false)
            return false
        } else {
            setExamName(d)
            setSpin(true)
        }

    }


    if (show) {
        return (
            <div>
                <Button onClick={back} variant="outline-danger">back</Button>
                <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>{name} Time Table</p>
                <table className="table" style={{ textAlign: 'center' , border: '3px solid #001529'}}>
                    <thead style={{ backgroundColor: '#001529', color: 'white' }}>
                        <tr>
                            <th>S.No</th>
                            <th>Subject</th>
                            <th>Date Of Exam</th>
                            <th>Start</th>
                            <th>End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examt.map(time => {
                            no = no + 1
                            return (
                                <tr key={time.index}>
                                    <td>{no}</td>
                                    <td>{time.subjectName}</td>
                                    <td>{time.dateOfExam}</td>
                                    <td>{time.startTime}</td>
                                    <td>{time.endTime}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <div>            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Time Table</p><hr />

                {spin1 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                    <div className="card" style={{ width: '50%' , border: '2px solid grey' }}>

                        <div className="card-header" style={{ textAlign: 'center' }}>
                            Find Time Table
      </div>
                        <form onSubmit={find}>
                            <div className="card-body">
                                <select className="form-control" required onChange={(e) => setSclass(e.target.value)}>
                                    <option value="" >Choose</option>
                                    <option value="1" >Class I</option>
                                    <option value="2" >Class II</option>
                                    <option value="3" >Class III</option>
                                    <option value="4" >Class IV</option>
                                    <option value="5" >Class V</option>
                                    <option value="6" >Class VI</option>
                                    <option value="7" >Class VII</option>
                                    <option value="8" >Class VIII</option>
                                    <option value="9" >Class IX</option>
                                    <option value="10" >Class X</option>
                                    <option value="11" >Class XI</option>
                                    <option value="12" >Class XII</option>
                                </select>

                            </div>
                            <div className="card-footer" style={{ textAlign: 'center' }}><button type="submit" className="btn btn-info" style={{ width: '50%' }}>Find</button></div>

                        </form></div>
                </div>
                    : <div style={{ textAlign: 'center' }}><Spin /> </div>}
                <br /><br />


                {spin ? <div><table className="table" style={{ textAlign: 'center' , border: '3px solid #001529'}}>
                    <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                        <tr>
                            <th>S.No</th>
                            <th>Class</th>
                            <th>Branch</th>
                            <th>Exam Name</th>
                            <th>See Time Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examName.map(time => {
                            no = no + 1
                            return (
                                <tr key={time.ExamId}>
                                    <td>{no}</td>
                                    <td>{time.Class}</td>
                                    <td>{time.Branch}</td>
                                    <td>{time.ExamName}</td>
                                    <td><button onClick={() => timetable(time)} className="btn btn-info">See Time Table</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table></div> : null}
            </div>
        </div>
    )
}

export default TimeTableT
