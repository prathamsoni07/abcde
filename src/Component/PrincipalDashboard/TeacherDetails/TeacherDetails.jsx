import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from 'react-bootstrap'
import Axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Cookies from 'js-cookie'



// import Axios from 'axios';

const antIcon = <LoadingOutlined style={{ fontSize: 100, textAlign: 'center' }} spin />;


const useStyles = makeStyles((theme) => ({


    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }

}));

function TeacherDetails(props) {
    const classes = useStyles();
    const [rollNo, setRollNo] = useState('')
    const [updateShow, setUpdateShow] = useState(false);
    const [studentFullName, setStudentFullName] = useState('');
    const [spin, setSpin] = useState(false);
    const [spin1, setSpin1] = useState(false);
    const [data, setData] = useState([]);
    const [profileImg, setProfileImg] = useState('')
    const [edit, setEdit] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('Not Married');
    const [husbandName, setHusbandName] = useState('');
    const [category, setCategory] = useState('General');
    const [religion, setReligion] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [panNo, setPanNo] = useState('');
    const [mobile, setMobile] = useState('');
    const [specialSubject, setSpecialSubject] = useState('');
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [designation, setDesignation] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [assignedClass, setAssignedClass] = useState('')
    const [assignedsection, setAssignedSection] = useState('');
    const [assignedbranch, setAssignedBranch] = useState('');
    const [role, setRole] = useState('')

    var no = 0

    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherinfo1"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setData(res.data)
            setSpin(true)
        })
    }, [Axios])






    function onUpdate(e) {

        console.log(e.Role);
        setUpdateShow(true)
        setSpin1(false)
        setRollNo(e.RollNo)
        setStudentFullName(e.Name)
        console.log(e);
        console.log("function Called");
        if (e.Role === "Admin") {
            Axios.post(process.env.REACT_APP_SECURITY_API.concat("admindetail"), { EnrollmentNo: e.RollNo }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);




                setFirstName(res.data.data.Name)
                setFatherName(res.data.data.FatherName)
                setHusbandName(res.data.data.HusbandWife)
                setAadhar(res.data.data.AadharId);
                setEmail(res.data.data.EmailId)
                setCategory(res.data.data.Caste);
                setCurrentAddress(res.data.data.CurrentAddress);
                setDob(res.data.data.Dob);
                setGender(res.data.data.Gender);
                setPermanentAddress(res.data.data.HomeAddress);
                setMobile(res.data.data.Mobile);
                setPincode(res.data.data.Pincode);
                setReligion(res.data.data.Religion);
                setDateOfJoining(res.data.data.DateOfJoining);
                setDesignation(res.data.data.FacultyDesignation);
                setMaritalStatus(res.data.data.MaritalStatus);
                setSpecialSubject(res.data.data.SubjectSpecialization);
                setPanNo(res.data.data.PanId);
                setQualification(res.data.data.Qualification)
                setExperience(res.data.data.Experience)
                setAssignedClass(res.data.AssignedClass)
                setAssignedBranch(res.data.AssignedBranch)
                setAssignedSection(res.data.AssignedSection)
                setRole(res.data.data.Role)


                let c = new Uint8Array(res.data.file.Body.data)
                const STR = c.reduce((data, byte) => {
                    return data + String.fromCharCode(byte);
                }, '');
                let base64String = btoa(STR)
                setProfileImg(base64String)


                setSpin1(true)

            })

        } else {
            Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherdetail"), { EnrollmentNo: e.EnrollmentNo }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);

                setFirstName(res.data.data.Name)
                setFatherName(res.data.data.FatherName)
                setHusbandName(res.data.data.HusbandWife)
                setAadhar(res.data.data.AadharId);
                setEmail(res.data.data.EmailId)
                setCategory(res.data.data.Caste);
                setCurrentAddress(res.data.data.CurrentAddress);
                setDob(res.data.data.Dob);
                setGender(res.data.data.Gender);
                setPermanentAddress(res.data.data.HomeAddress);
                setMobile(res.data.data.Mobile);
                setPincode(res.data.data.Pincode);
                setReligion(res.data.data.Religion);
                setDateOfJoining(res.data.data.DateOfJoining);
                setDesignation(res.data.data.FacultyDesignation);
                setMaritalStatus(res.data.data.MaritalStatus);
                setSpecialSubject(res.data.data.SubjectSpecialization);
                setPanNo(res.data.data.PanId);
                setQualification(res.data.data.Qualification)
                setExperience(res.data.data.Experience)
                setAssignedClass(res.data.AssignedClass)
                setAssignedBranch(res.data.AssignedBranch)
                setAssignedSection(res.data.AssignedSection)
                setRole(res.data.data.Role)


                let c = new Uint8Array(res.data.file.Body.data)
                const STR = c.reduce((data, byte) => {
                    return data + String.fromCharCode(byte);
                }, '');
                let base64String = btoa(STR)
                setProfileImg(base64String)


                setSpin1(true)

            })



        }



    }

    function back() {
        setEdit(true)
        setUpdateShow(false)
        return TeacherDetails
    }

    if (updateShow) {

        if (assignedbranch === "") {
            setAssignedBranch('Null')
        }
        if (husbandName === "") {
            setHusbandName('Null')


        }



        return (
            <div>
                <br />
                <Button variant="outline-danger" className="btn" onClick={back}> Previous Page</Button><br />

                {spin1 ? <div className="mobileHidden"> <p style={{ fontSize: 20, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529' }}> Teacher Details</p><hr />


                    <div className="container" style={{ background: '-webkit-linear-gradient(left, #3931af, #00c6ff)' }}>
                        <div className="main-body">




                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={`data:image/jpeg;base64,${profileImg}`} alt="Admin" className="rounded-circle" width="180" height="200" />
                                                <div className="mt-3">
                                                    <h4>{firstName[0].toUpperCase() +
                                                        firstName.slice(1)}</h4>
                                                    <p className="text-secondary mb-1">{role}</p>
                                                    <p className="text-muted font-size-sm">{rollNo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-3 " >

                                        <ul className="list-group list-group-flush" style={{ marginBottom: '7%' }}>
                                            <br />
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
                                                <h6 className="d-flex align-items-center mb-3"> <i className="material-icons text-info mr-2">assignment</i>School Details</h6>

                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
                                                <h6 className="mb-0">School Name</h6>
                                                <span className="text-secondary">{props.schoolName}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">Designation </h6>
                                                <span className="text-secondary">{designation}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">Assigned Class   </h6>
                                                <span className="text-secondary">{assignedClass}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">Assigned Branch </h6>
                                                <span className="text-secondary">{assignedbranch}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">Assigned Section </h6>
                                                <span className="text-secondary">{assignedsection}</span>
                                            </li>
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
                                                    {email}                    </div>
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
                                                            <h6 className="mb-0">Marital Status</h6>
                                                            <span className="text-secondary">{maritalStatus}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Husband/Wife Name</h6>
                                                            <span className="text-secondary">{husbandName}</span>
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
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Qualification</h6>
                                                            <span className="text-secondary">{qualification}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Date Of Joining</h6>
                                                            <span className="text-secondary">{dateOfJoining}</span>
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
                                                            <h6 className="mb-0">Experience </h6>
                                                            <span className="text-secondary">{experience}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Main Subject </h6>
                                                            <span className="text-secondary">{specialSubject}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Aadhar Id</h6>
                                                            <span className="text-secondary">{aadhar}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                            <h6 className="mb-0">Pan No</h6>
                                                            <span className="text-secondary">{panNo}</span>
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
                        </div>

                    </div>








                </div> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}




            </div>



        )
    }



    return (

        <div>


            <div className="mobileVisible"><h4 style={{ color: 'red' }}> Please Change to Desktop Site or Login from Computer or Desktop </h4> </div>

            <div className="mobileHidden">
                <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Teacher Details </p><hr />
                <br />

                {spin ? <table className="table" style={{ textAlign: 'center', marginTop: '2%', border: '5px solid #001529' }}>
                    <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                        <tr>
                            <th> S.no</th>
                            <th>Enrollment No</th>
                            <th>Name</th>
                            <th>Role</th>

                            <th>Details</th>


                        </tr>
                    </thead>

                    <tbody>
                        {data.map(data => {
                            no = no + 1
                            return (
                                <tr key={data.EnrollmentNo}>

                                    <td >{no}</td>
                                    <td >{data.EnrollmentNo}</td>

                                    <td >{data.Name}</td>
                                    <td >{data.Role}</td>

                                    <td> <button onClick={(e) => {
                                        e.preventDefault()
                                        onUpdate(data)
                                    }} className="btn btn-primary text-center" >See Details</button> </td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
                <br />









            </div></div>
    )
}

export default TeacherDetails
