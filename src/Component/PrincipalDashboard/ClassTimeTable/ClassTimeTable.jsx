import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Modal , Button} from 'react-bootstrap'
import { Card , CardDeck } from 'react-bootstrap'

function ClassTimeTable() {

    const [studentShow, setStudentShow] = useState(false);
    const [teacherShow, setTeacherShow] = useState(false);
    const [classData, setClassData] = useState([]);
    const [sclass, setSclass] = useState("");
    const [branchName, setBranchName] = useState([]);
    const [branchShow, setBranchShow] = useState(false);
    const [sectionName, setSectionName] = useState([]);
    const [studentBranch, setStudentBranch] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [studentSection, setStudentSection] = useState('');
    const [scalender, setScalender] = useState([]);
    const [tcalender, setTcalender] = useState('');
    const [tableShow, setTableShow] = useState(false)
    const [tableShow1, setTableShow1] = useState(false)
    const [teachername, setTeacherName] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [teacherEnroll, setTeacherEnroll] = useState('')

    var no = 0
    var vo = 0



    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: 'classdetails' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setClassData(res.data)
        })
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("allclasscalender"), { hello: 'classTimeTable' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setStudentData(res.data.student)
            setTeacherData(res.data.Teacher)
        })
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherinfo"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setTeacherName(res.data)

        })
    }, [])


    const classClick = (e) => {
        console.log(e);
        setSclass(e)
        setTableShow(false)

        console.log(classData);

        branchName.splice(0)
        console.log(e);
        if (e > 10) {
            var branchFind = classData.find(o => o.Class === e)
            if (!branchFind) {
                alert(`No branch in class ${e}`)
                setBranchShow(false)

                return false
            } else {
                branchFind.Branches.map(data => {
                    console.log(data.Branch);
                    branchName.push(data.Branch)
                })
                console.log(branchName);
                setBranchShow(true)
            }


        } else {

            var classFind1 = classData.find(o => o.Class == e)

            if (!classFind1) {
                alert(`No Section in class ${e}`)
                return false
            } else {
                classFind1.Branches.map((data) => {
                    setSectionName(data.Section)

                })

                setBranchShow(false)



            }
        }
    }



    const branchClick = (e) => {
        console.log(e);
        setStudentBranch(e)
        var branchName = classData.find(o => o.Class == sclass);
        var branchFind = branchName.Branches.find(o => o.Branch == e);
        if (!branchFind) {
            alert(`No section in branch ${e} of class ${sclass}`)
            return false
        } else {
            setSectionName(branchFind.Section)


        }


    }


    const find = (e) => {

        e.preventDefault()
        var c = studentData.filter(data => data.Class === sclass && data.Branch === studentBranch && data.Section === studentSection)
        console.log(c);

        if (c.length < 1) {
            alert("No schdeule for this class")
            setTableShow(false)
            return false
        } else {
            c.map(data => {
                console.log(data.Calender)
                setScalender(data.Calender)
                setTableShow(true)
            })
        }


    }

    const teacherFind = (e) => {
        console.log(e);
        setTeacherEnroll(e)
        var c = teacherData.filter(data => data.EnrollmentNo === e)
        console.log(c);
        c.map(data => setTcalender(data.Calender))
        setTableShow1(true)
        setModalShow(true)
    }


    if (studentShow) {
        return (
            <div>
                <Button variant="outline-danger" onClick={() => setStudentShow(false)}>back</Button>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <form className="card" style={{ width: '50%' , border: '2px solid grey' }} onSubmit={find}>
                        <label className='card-header' style={{ textAlign: 'center' }} >Student Schedule </label>
                        <div className="card-body" >
                            <div >
                                <label>Class</label>
                                <select required name="class" className="form-control" onChange={(e) => classClick(e.target.value)}>
                                    <option value="">Select Class... </option>

                                    <option value="1">Class I </option>
                                    <option value="2">Class II </option>
                                    <option value="3">Class III </option>
                                    <option value="4">Class IV </option>
                                    <option value="5">Class V </option>
                                    <option value="6">Class VI </option>
                                    <option value="7">Class VII </option>
                                    <option value="8">Class VIII </option>
                                    <option value="9">Class IX </option>
                                    <option value="10">Class X </option>
                                    <option value="11">Class XI </option>
                                    <option value="12">Class XII </option>

                                </select> <br />
                            </div>


                            {branchShow ? <div  >
                                <label>Branch</label>

                                <select onChange={(e) => branchClick(e.target.value)} required name="branch" className="form-control" >
                                    <option value="">Select Branch ... </option>
                                    {branchName.map(data => (
                                        <option key={data} value={data}>{data}</option>
                                    ))}


                                </select></div> : null}

                            <div >
                                <label>Section</label>

                                <select required className="form-control" name="studentSection" onChange={(e) => setStudentSection(e.target.value)}  >
                                    <option value="">Select Section... </option>
                                    {sectionName.map(data => (
                                        <option key={data}>{data}</option>
                                    ))}



                                </select> <br />
                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: 'center' }} >  <button type="submit" style={{ width: '50%' }} className='btn btn-info '>find</button></div>

                    </form>
                </div>
                <br /> <br />
                {tableShow ? <table className="table" style={{ textAlign: 'center' , border: '3px solid #001529'}}>
                    <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                        <tr>
                            <th>S.no</th>
                            <th>Subject Name</th>
                            <th>Start Date </th>
                            <th>End Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scalender.map(data => {
                            no = no + 1
                            return (
                                <tr key={data.index}>
                                    <td>{no}</td>
                                    <td>{data.subjectName}</td>
                                    <td>{data.startDate}</td>
                                    <td>{data.endDate}</td>
                                    <td>{data.startTime}</td>
                                    <td>{data.endTime}</td>
                                    <td>{data.subLocation}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : null}


            </div>
        )
    }

    if (teacherShow) {
        return (
            <div>
                <Button variant="outline-danger" onClick={() => setTeacherShow(false)}>back</Button>
                <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Teacher Schedule</p>
                <table className="table" style={{ textAlign: 'center' , border: '3px solid #001529'}}>
                    <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                        <tr>
                            <th>S.no</th>
                            <th> Name</th>
                            <th>Enrollment No </th>

                            <th>Schedule</th>


                        </tr>
                    </thead>

                    <tbody>
                        {teachername.map(data => {
                            no = no + 1
                            return (
                                <tr key={data.RollNo}>
                                    <td>{no}</td>
                                    <td>{data.Name}</td>
                                    <td>{data.RollNo}</td>

                                    <td><Button variant="info" value={data.RollNo} onClick={(e) => teacherFind(e.target.value)}>Find</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {tableShow1 ? <Modal show={modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header style={{backgroundColor:"whitesmoke"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {teacherEnroll} Schedule
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:"whitesmoke"}}>
                        <table className="table" style={{ textAlign: 'center' , border: '3px solid #001529'}}>
                            <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                                <tr>
                                    <th>S.no</th>
                                    <th> Name</th>
                                    <th>Enrollment No </th>
                                    <th>Timing</th>
                                    <th>Location</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tcalender.map(data => {
                                    vo = vo + 1
                                    return (
                                        <tr key={data.Id}>
                                            <td>{vo}</td>
                                            <td>{data.Subject}</td>
                                            <td>{data.StartTime}</td>
                                            <td>{data.EndTime}</td>
                                            <td>{data.Location}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor:"whitesmoke"}}>
                        <Button variant="primary" onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal> : null}




            </div>
        )
    }


    return (
        <div>

            <CardDeck className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Student Schedule</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                          <Button variant="primary" onClick={() => setStudentShow(true)}>Check</Button>
                    </Card.Footer>
                </Card>
                <Card style={{ marginLeft: '3%' }}>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Teacher Schedule</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                          <Button variant="primary" onClick={() => setTeacherShow(true)}>Check</Button>               
                    </Card.Footer>
                </Card>

            </CardDeck>
        </div>
    )
}

export default ClassTimeTable
