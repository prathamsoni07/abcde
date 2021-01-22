import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie'
import { Spin } from 'antd';
import {Button} from 'react-bootstrap'

function ResultShow(props) {
    const [studentMarks, setStudentMarks] = useState([]);
    const [totalObtainedMarks, setTotalObtainedMarks] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [result, setResult] = useState(false);
    const [data, setData] = useState([]);
    const [branchShow, setBranchShow] = useState(true)
    const [spin, setSpin] = useState(false)



    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("studentresultshow"), { hello: 'result' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setData(res.data)


            if (props.Class > 10) {
                setBranchShow(false)
            } else setBranchShow(true)

            setSpin(true)
        })
    }, [])



    function fetch(e) {
        console.log(e);
        var c = data.find(o => o.ExamId === e)
        console.log(c)
        setStudentMarks(c.Marks)
        setTotalObtainedMarks(c.ObtainedMarks)
        setTotalMarks(c.MaximumMarks)
        setResult(true)


    }

    console.log(studentMarks);
    const back = () => setResult(false)

    if (result) {
        return (
            <div> <Button variant="outline-danger" onClick={back}>back</Button>
                <div style={{ textAlign: 'center' }}>

                    <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Result</p><hr />


                    <table className="table" >
                        <tbody style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                            <tr>
                                <th>Name : </th>
                                <th>{props.Name.toUpperCase()}</th>
                                <th> Roll No. :</th>
                                <th>{props.EnrollmentNo}</th>
                            </tr>
                        </tbody>
                    </table>

                    <div >    <table className="table" style={{ border: '3px solid #001529' }}>
                        <thead >
                            <tr>
                                <th>Subject</th>
                                <th>Obtained Marks</th>
                                <th>Practical Marks</th>
                                <th>Maximum Marks</th>
                            </tr>
                        </thead>
                        <tbody>

                            {studentMarks.map(data => (
                                <tr>
                                    <td>{data.Subject}</td>
                                    <td>{data.obtainedMarks}</td>
                                    <td>{data.MaximumMarks}</td>
                                    <td>{data.MaximumMarks}</td>
                                </tr>

                            ))}


                        </tbody>
                        <tfoot  >
                            <tr style={{ color: 'red' }} >

                                <td></td>
                                <td></td>
                                <td >Total Marks </td>
                                <td>{totalObtainedMarks}/{totalMarks}</td>

                            </tr>
                        </tfoot>
                    </table></div>


                </div>


            </div>
        )
    }

    return (
        <div>{spin ? <div>

            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Result</p><hr />

            <label style={{ color: 'red' }}>Class : {props.Class} {branchShow ? null : { ",Branch": props.Branch }} , Section : {props.Section}</label><br /><br />
            <table className="table" style={{ textAlign: 'center', border: '3px solid #001529' }}>
                <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                    <tr>
                        <th>Exam Name</th>
                        <th>Exam Id</th>
                        <th>Fetch Result</th>
                    </tr>

                </thead>

                <tbody>

                    {data.map(data => (
                        <tr>
                            <td>{data.ExamName}</td>
                            <td>{data.ExamId}</td>
                            <td><button onClick={() => fetch(data.ExamId)} className="btn btn-info">Fetch </button></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div> : <div style={{
            textAlign: 'center', position: "fixed",
            top: '30%',
            left: '50%',

            transform: "translate(-50%, -50%)"
        }}><Spin /></div>}


        </div>
    )
}

export default ResultShow
