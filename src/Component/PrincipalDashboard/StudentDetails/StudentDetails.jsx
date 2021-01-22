import React, { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card , Button } from 'react-bootstrap'
import Axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { Pie } from 'react-chartjs-2';


const antIcon = <LoadingOutlined style={{ fontSize: 100, textAlign: 'center' }} spin />;


const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }

}));

function StudentDetails() {
    const classes = useStyles();
    const [rollNo, setRollNo] = useState('')
    const [studentClass, setStudentClass] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [studentBranch, setStudentBranch] = useState('');
    const [updateShow, setUpdateShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [section, setSection] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [childiId, setChildId] = useState('');
    const [mobile, setMobile] = useState('');
    const [occupation, setOccupation] = useState('');
    const [category, setCategory] = useState('');
    const [religion, setReligion] = useState('');
    const [guardian, setGuardian] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [guardianMobile, setGuardianMobile] = useState('');
    const [classData, setClassData] = useState([]);
    const [spin, setSpin] = useState(false);
    const [spin1, setSpin1] = useState(false);
    const [spin2, setSpin2] = useState(false);
    const [spin3, setSpin3] = useState(false);
    const [sectionName, setSectionName] = useState([]);
    const [branchName, setBranchName] = useState([]);
    const [branchDisable, setbranchDisable] = useState(true);
    const [data, setData] = useState([]);
    const [branch, setBranch] = useState('');
    const [profileImg, setProfileImg] = useState('')

    const [sClass, setSclass] = useState('')

    const [role, setRole] = useState('');
    const [chartData, setChartData] = useState({});
    const [feesData, setFeesData] = useState([])
    var no = 0


    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setClassData(res.data)
            setSpin(true)
        })
    }, [])



    function classClick(e) {
        setStudentBranch("")
        setSpin2(false)
        branchName.splice(0)
        setStudentClass(e)
        if (e > 10) {

            setbranchDisable(false)
            var classFind = classData.find(o => o.Class == e)
            if (!classFind) {
                alert("No Branch ")
                return false
            } else {
                classFind.Branches.map((data) => {
                    branchName.push(data.Branch);
                })
            }

        } else {
            setbranchDisable(true)

            var classFind1 = classData.find(o => o.Class == e)
            if (!classFind1) {
                alert("No Section")
                return false
            } else {
                classFind1.Branches.map((data) => {
                    setSectionName(data.Section)
                })

            }
        }

    }
    function branchClick(e) {

        var branchName = classData.find(o => o.Class == studentClass);
        var branchFind = branchName.Branches.find(o => o.Branch == e);
        if (!branchFind) {
            alert("No Section")
            return false
        } else {
            setSectionName(branchFind.Section)

        }




    }


    function fetchClassDetails(e) {
        setSpin2(true)
        setSpin3(false)

        e.preventDefault();
        var DATA = {
            Class: studentClass,
            Branch: studentBranch,
            Section: studentSection
        }


        Axios.post(process.env.REACT_APP_SECURITY_API.concat("studentdetails"), DATA, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setData(res.data)
            setSpin3(true)
        })
    }







    async function onUpdate(e) {


        setUpdateShow(true)
        setSpin1(false)
        setRollNo(e.RollNo)
        console.log(e);
        console.log("function Called");
        var data = {
            RollNo: e.RollNo,
            Branch: studentBranch,
            Section: studentSection,
            Class: studentClass

        }


        await Axios.post(process.env.REACT_APP_SECURITY_API.concat("studentdetails1"), data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);

            setFirstName(res.data.Name.Name)
            setFatherName(res.data.Name.FatherName)
            setMotherName(res.data.Name.MotherName)
            setStudentEmail(res.data.Name.StudentEmail);
            setAadhar(res.data.Name.AadharId);
            setBranch(res.data.Name.Branch);
            setCategory(res.data.Name.Category);
            setChildId(res.data.Name.ChildId);
            setSclass(res.data.Name.Class);
            setCurrentAddress(res.data.Name.CurrentAddress);
            setDob(res.data.Name.Dob);
            setGender(res.data.Name.Gender);
            setGuardianMobile(res.data.Name.GuardianMobile);
            setGuardian(res.data.Name.GuardianName);
            setPermanentAddress(res.data.Name.HomeAddress);
            setMobile(res.data.Name.Mobile);
            setParentEmail(res.data.Name.ParentEmail);
            setOccupation(res.data.Name.ParentsOccupation);
            setPincode(res.data.Name.Pincode);
            setReligion(res.data.Name.Religion);
            setSection(res.data.Name.Section)
            setRole(res.data.Name.Role)

            let c = new Uint8Array(res.data.file.Body.data)
            const STR = c.reduce((data, byte) => {
                return data + String.fromCharCode(byte);
            }, '');
            let base64String = btoa(STR)
            setProfileImg(base64String)

            if (res.data.Name.Class > 10) {
                setbranchDisable(true)
            } else {
                setbranchDisable(false)
            }
            setSpin1(true)

        })

        await Axios.post(process.env.REACT_APP_SECURITY_API.concat("attendence1"), { RollNo: e.RollNo }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {

            setChartData({
                labels: ['Present', 'Absent', 'On leave'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            res.data.NoOfPresent,
                            res.data.NoOfAbsent,
                            res.data.NoOfApplication,

                        ],
                        backgroundColor: [
                            '#90ee90',
                            '#FA4659',
                            'skyblue',


                        ]
                    }
                ]
            })
        })


        Axios.post(process.env.REACT_APP_SECURITY_API.concat('fees'), data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res);
            console.log(res.data.msg.FeesPayment);
            if (res.data.success === false) {
                alert(res.data.msg)

                return false
            }
            setFeesData(res.data.msg.FeesPayment);
        })

    }

    function back() {
        setUpdateShow(false)
        return StudentDetails
    }

    if (updateShow) {
        if (branch === '') {
            setBranch('null')
        }
        return (
            <div><br />
                <Button className="btn" variant="outline-danger" style={{ marginLeft: '3%', marginTop: '-5%' }} onClick={back}> Previous Page</Button><br />

                {spin1 ? <div > <p style={{ fontSize: 20, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529' }}> Search Details</p><hr />


                    <div>   <div className="container" style={{ background: '-webkit-linear-gradient(left, #3931af, #00c6ff)', padding: '1%' }}>
                        <div className="main-body">




                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={`data:image/jpeg;base64,${profileImg}`} alt="Admin" className="rounded-circle" width="150" height="200" />
                                                <div className="mt-3">
                                                    <h4>{firstName[0].toUpperCase() +
                                                        firstName.slice(1)}</h4>
                                                    <p className="text-secondary mb-1">{role}</p>
                                                    <p className="text-muted font-size-sm">{rollNo}</p>
                                                    <p className="text-muted font-size-sm">Class : {sClass},Branch : {branch},Section : {section}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-3 " >

                                        <ul className="list-group list-group-flush" style={{ marginBottom: '15%' }}>

                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
                                                <h6 className="d-flex align-items-center mb-3"> <i className="material-icons text-info mr-2">assignment</i>Attendence Details</h6>

                                            </li>
                                            <div style={{ marginTop: '8%' }}><Pie


                                                data={chartData}



                                                options={{
                                                    legend: { position: 'bottom', }
                                                }}
                                            /></div>

                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Full Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {firstName}             </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {studentEmail}                    </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Phone</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {mobile}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Dob</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {dob}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0"> Address</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {permanentAddress}                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gutters-sm">
                                        <div className="col-sm-6 mb-3">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Personal Details</h6>
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Father Name</h6>
                                                            <span className="text-secondary">{fatherName}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Mother Name</h6>
                                                            <span className="text-secondary">{motherName}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Parent's Email</h6>
                                                            <span className="text-secondary">{parentEmail}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Occupation</h6>
                                                            <span className="text-secondary">{occupation}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Gender</h6>
                                                            <span className="text-secondary">{gender}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Caste</h6>
                                                            <span className="text-secondary">{category}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Religion</h6>
                                                            <span className="text-secondary">{religion}</span>
                                                        </li>


                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-3">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Other Details</h6>
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Guardian Name</h6>
                                                            <span className="text-secondary">{guardian}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Guardian Mobile </h6>
                                                            <span className="text-secondary">{guardianMobile}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Aadhar Id</h6>
                                                            <span className="text-secondary">{aadhar}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Child Id</h6>
                                                            <span className="text-secondary">{childiId}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Current Address</h6>
                                                            <span className="text-secondary">{currentAddress}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Permanent Address</h6>
                                                            <span className="text-secondary">{permanentAddress}</span>
                                                        </li>

                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Pincode</h6>
                                                            <span className="text-secondary">{pincode}</span>
                                                        </li>


                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div classname="col-sm-6 mb-3">
                                <div className="card">
                                    <br />
                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2" style={{ marginLeft: '3%' }}>assignment</i>Fees Details</h6>
                                    <div className="card-body">

                                        <table style={{ textAlign: 'center' }} className="table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Deposited Month</th>
                                                    <th>Deposited Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {feesData.map(data => (

                                                    <tr>

                                                        <td>{data.Date}</td>
                                                        <td>{data.Month}</td>
                                                        <td>{data.Amount}</td>

                                                    </tr>

                                                ))}

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>




                    </div>


                </div> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
                <br />




            </div>



        )
    }



    return (

        <div>


            <div className="mobileVisible"><h4 style={{ color: 'red' }}> Please Change to Desktop Site or Login from Computer or Desktop </h4> </div>

            <div className="mobileHidden">
                <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Student Details </p><hr />

                {spin ? <Card className="text-center" style={{ width: "50%", marginLeft: '25%' , border: '2px solid grey' }}>
                    <Card.Header > <label> Student Information</label></Card.Header>
                    <div>   <form id="resetform" onSubmit={fetchClassDetails}  >
                        <Card.Body>
                            <FormControl id="class" required className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Class</InputLabel>
                                <Select
                                    onChange={(e) => {
                                        classClick(e.target.value)
                                    }
                                    }
                                >
                                    <MenuItem value={'1'}>Class I</MenuItem>
                                    <MenuItem value={'2'}>Class II</MenuItem>
                                    <MenuItem value={'3'}>Class III</MenuItem>
                                    <MenuItem value={'4'}>Class IV</MenuItem>
                                    <MenuItem value={'5'}>Class V</MenuItem>
                                    <MenuItem value={'6'}>Class VI</MenuItem>
                                    <MenuItem value={'7'}>Class VII</MenuItem>
                                    <MenuItem value={'8'}>Class VIII</MenuItem>
                                    <MenuItem value={'9'}>Class IX</MenuItem>
                                    <MenuItem value={'10'}>Class X</MenuItem>
                                    <MenuItem value={'11'}>Class XI</MenuItem>
                                    <MenuItem value={'12'}>Class XII</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl id="branch" disabled={branchDisable} required={!branchDisable} className={classes.formControl}>
                                <InputLabel >Branch</InputLabel>
                                <Select onChange={(e) => {
                                    branchClick(e.target.value)
                                    setStudentBranch(e.target.value)
                                }}
                                >{branchName.map(data => (<MenuItem key={data} value={data}>{data}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <FormControl id="section" required className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Section</InputLabel>
                                <Select labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={studentSection}
                                    onChange={(e) => {
                                        setStudentSection(e.target.value)
                                    }}
                                >
                                    {sectionName.map(data => (

                                        <MenuItem key={data} value={data}>{data}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            <br />
                        </Card.Body>
                        <Card.Footer >
                            <button type="submit" className="btn btn-primary text-center">Fetch Class Details</button>
                        </Card.Footer>
                    </form></div>
                </Card> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
                <br />



                {spin2 ? spin3 ? <table className="table" style={{ textAlign: 'center', marginTop: '2%', border: '5px solid #001529' }}>
                    <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Details</th>


                        </tr>
                    </thead>

                    <tbody>
                        {data.map(data => {
                            no = no + 1

                            return (
                                <tr>
                                    <td>{no}</td>
                                    <td>{data.Name}</td>
                                    <td>{data.RollNo}</td>

                                    <td> <button onClick={(e) => {
                                        e.preventDefault()
                                        onUpdate(data)
                                    }} className="btn btn-primary text-center" >See Details</button> </td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div> : null}

                <hr />









            </div></div>
    )
}

export default StudentDetails
