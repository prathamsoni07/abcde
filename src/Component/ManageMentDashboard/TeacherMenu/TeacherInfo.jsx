import React, { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Image, Button, Col, Form } from 'react-bootstrap'
import Axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookies from 'js-cookie'



// import Axios from 'axios';

const antIcon = <LoadingOutlined style={{ fontSize: 100, textAlign: 'center' }} spin />;


const useStyles = makeStyles((theme) => ({


    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }

}));

function TeacherUpdate() {
    const classes = useStyles();
    const [rollNo, setRollNo] = useState('')
    const [updateShow, setUpdateShow] = useState(false);
    const [studentFullName, setStudentFullName] = useState('');
    const [spin, setSpin] = useState(false);
    const [spin1, setSpin1] = useState(false);
    const [data, setData] = useState([]);
    const [profileImg, setProfileImg] = useState('')
    const [profileImg1, setProfileImg1] = useState('')
    const [file, setFile] = useState('')
    const [edit, setEdit] = useState(true);
    const [open, setOpen] = useState(false);
    const [imgShow, setImgShow] = useState(true)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
    const [husbandDisable, setHusbandDisable] = useState(true);



    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherinfo"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setData(res.data)
            setSpin(true)
        })
    }, [Axios])


    function imageHandler(e) {

        const imageFile = e.target.files[0];
        console.log(imageFile);
        const isLt2M = imageFile.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            NotificationManager.warning('Image must smaller than 2MB!');
            setProfileImg1("")

        }


        if (!imageFile.name.match(/\.(jpg|jpeg|png|PNG)$/)) {
            NotificationManager.warning("Please select valid image.")
            setProfileImg1("")
            setImgShow(true)

            return false;
        }
        const reader = new FileReader();

        if (imageFile && isLt2M) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfileImg1(reader.result)
                    setImgShow(false)
                    setFile(imageFile)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        }


    }



    function submitHandle(e) {
        e.preventDefault();

        var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
        if (!mobPattern.test(mobile)) {
            alert("Enter Valid no.")
            return false
        } else {


            var d = window.confirm("Update Teacher  Details")
            if (d) {
                setOpen(true)
                const formdata = new FormData();
                formdata.append('Name', firstName + " " + lastName)
                formdata.append('Dob', dob)
                formdata.append('FatherName', fatherName)
                formdata.append('HusbandWifeName', husbandName)
                formdata.append('EmailId', email)
                formdata.append('MaritalStatus', maritalStatus)
                formdata.append('Mobile', mobile);
                formdata.append('HomeAddress', permanentAddress)
                formdata.append('CurrentAddress', currentAddress)
                formdata.append('Gender', gender)
                formdata.append('MainSubject', specialSubject)
                formdata.append('AadharId', aadhar)
                formdata.append('PanId', panNo)
                formdata.append('Pincode', pincode)
                formdata.append('Qualification', qualification)
                formdata.append('Designation', designation)
                formdata.append('Category', category)
                formdata.append('Religion', religion)
                formdata.append('Experience', experience)
                formdata.append('DateOfJoining', dateOfJoining)
                formdata.append('file', file)
                formdata.append('EnrollmentNo', rollNo)




                Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherupdate"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                    console.log(res);
                    alert(res.data.msg)
                    setOpen(false)
                    setUpdateShow(false);
                    setEdit(true)
                })

            } else {
                return false
            }




        }







    }



    function onDelete(e) {

        console.log("function Called");
        var d = window.confirm(`Are you sure you want to delete - ${e.Name}  --- ${e.RollNo} - from your school`);

        if (d) {
            setOpen(true)


            Axios.post(process.env.REACT_APP_SECURITY_API.concat("deleteteacher"), { EnrollmentNo: e.RollNo }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                alert(res.data.msg)
                setOpen(false)
            })
        }



    }

    function onUpdate(e) {


        setUpdateShow(true)
        setSpin1(false)
        setRollNo(e.RollNo)
        setStudentFullName(e.Name)
        console.log(e);
        console.log("function Called");



        Axios.post(process.env.REACT_APP_SECURITY_API.concat("facultydetails"), { EnrollmentNo: e.RollNo }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);

            setFirstName(res.data.Name.Name.split(" ")[0])
            setLastName(res.data.Name.Name.split(" ")[1])
            setFatherName(res.data.Name.FatherName)
            setHusbandName(res.data.Name.HusbandWife)
            setAadhar(res.data.Name.AadharId);
            setEmail(res.data.Name.EmailId)
            setCategory(res.data.Name.Caste);
            setCurrentAddress(res.data.Name.CurrentAddress);
            setDob(res.data.Name.Dob);
            setGender(res.data.Name.Gender);
            setPermanentAddress(res.data.Name.HomeAddress);
            setMobile(res.data.Name.Mobile);
            setPincode(res.data.Name.Pincode);
            setReligion(res.data.Name.Religion);
            setDateOfJoining(res.data.Name.DateOfJoining);
            setDesignation(res.data.Name.FacultyDesignation);
            setMaritalStatus(res.data.Name.MaritalStatus);
            setSpecialSubject(res.data.Name.SubjectSpecialization);
            setPanNo(res.data.Name.PanId);
            setQualification(res.data.Name.Qualification)
            setExperience(res.data.Name.Experience)


            let c = new Uint8Array(res.data.file.Body.data)
            const STR = c.reduce((data, byte) => {
                return data + String.fromCharCode(byte);
            }, '');
            let base64String = btoa(STR)
            setProfileImg(base64String)


            setSpin1(true)

        })



    }

    function back() {
        setEdit(true)
        setUpdateShow(false)
        return TeacherUpdate
    }

    if (updateShow) {
        return (
            <div>
                <a className="btn btn-link" style={{ marginLeft: '3%', marginTop: '-5%' }} onClick={back}>/ Previous Page</a><br />

                {spin1 ? <div className="mobileHidden"> <p style={{ fontSize: 20, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529' }}>Update Teacher Details</p><hr />

                    <div style={{ color: 'green', fontWeight: 800 }}>
                        <label> Name : {studentFullName}  , Roll No : {rollNo}
                        </label>
                        <hr />

                    </div>
                    <div style={{ textAlign: 'right' }}> <button className="btn btn-info" onClick={() => {
                        setEdit(!edit)
                        setImgShow(true)
                    }}> {edit ? "Edit" : "Cancel"} </button></div>
                    <fieldset disabled={edit}>
                        <form onSubmit={submitHandle} style={{ marginTop: '3%' }} id="mainForm"  >


                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Last Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />

                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label> Marital Status</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <select className="form-control" onChange={(e) => {
                                        setMaritalStatus(e.target.value)
                                        if (e.target.value === "Yes") {
                                            setHusbandDisable(false)
                                        } else {
                                            setHusbandDisable(true)
                                            setHusbandName("")
                                        }
                                    }


                                    } required as="select" defaultValue="Choose...">
                                        <option value={maritalStatus}>{maritalStatus}</option>
                                        <option value="Yes" >Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Father's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" defaultValue={fatherName} onChange={(e) => setFatherName(e.target.value)} required type="text" placeholder="Enter Father's Name (Full Name)" />

                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Husband/Wife 's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input disabled={husbandDisable} className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" defaultValue={husbandName} onChange={(e) => setHusbandName(e.target.value)} required type="text" placeholder="Enter Husband's Name (Full Name)" />

                                </Form.Group>



                            </Form.Row>



                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Dob</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input className="form-control" defaultValue={dob} onChange={(e) => setDob(e.target.value)} required type="date" />

                                </Form.Group>



                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Gender</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <select className="form-control" onChange={(e) => setGender(e.target.value)} required as="select" defaultValue="Choose...">
                                        <option value={gender}>{gender}</option>
                                        <option value="Male" >Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </Form.Group>


                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Category</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <select className="form-control" onChange={(e) => setCategory(e.target.value)} required as="select" defaultValue="Choose...">
                                        <option value={category}>{category}</option>
                                        <option value="General" >General</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                        <option value="OBC">OBC</option>
                                    </select>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Religion</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={religion} onChange={(e) => setReligion(e.target.value)} type="text" placeholder="Enter Religion" />

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Qualifications</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="Enter Qualifications" />

                                </Form.Group>

                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Main Subject</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={specialSubject} onChange={(e) => setSpecialSubject(e.target.value)} type="text" placeholder="Enter Main Subject" />

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Experience (in years)</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={experience} onChange={(e) => setExperience(e.target.value)} type="number" placeholder="Enter Here" />

                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Designation in school</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Enter Designation Here" />

                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Mobile No.</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={mobile} onChange={(e) => setMobile(e.target.value)} type="number" placeholder="Enter Mobile No." />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Teacher Email</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Teacher email" />

                                </Form.Group>


                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Aadhhar No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={aadhar} onChange={(e) => setAadhar(e.target.value)} type="number" placeholder="Enter Teacher aadhar No." />

                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Pan No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={panNo} onChange={(e) => setPanNo(e.target.value)} type="number" placeholder="Enter Teacher pan No." />

                                </Form.Group>


                            </Form.Row>

                            <Form.Row>




                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Permanent Address</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} type="text" placeholder='Enter Permanent Address' />

                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Current Address</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} type="text" placeholder='Enter Current Address' />

                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Pincode </Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={pincode} onChange={(e) => setPincode(e.target.value)} type="text" placeholder='Enter Pincode' />

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Date Of Joining </Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                                    <input required className="form-control" defaultValue={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} type="date" />

                                </Form.Group>

                            </Form.Row>


                            <label> Teacher Photo</label>
                            {imgShow ? <Col xs={6} md={4}>

                                <Image id="img" style={{ height: '80mm', width: '70mm' }} src={`data:image/jpeg;base64,${profileImg}`} thumbnail />


                            </Col> : <Col xs={6} md={4}>

                                    <Image style={{ height: '80mm', width: '70mm' }} src={profileImg1} thumbnail />


                                </Col>}




                            <label> Update Teacher Photo    </label>  <input type="file" required={!imgShow} onChange={imageHandler} />

                            <br />


                            <br />
                            <NotificationContainer />

                            <div style={{ textAlign: 'center' }}>

                                <Button style={{ marginLeft: '3%' }} variant="success" type="submit">Update Teacher Details</Button>
                            </div>
                        </form>


                    </fieldset>







                </div> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
                <a className="btn btn-link" style={{ marginLeft: '3%', marginBottom: "-4%" }} onClick={back}>/ Previous Page</a><br />



                <Backdrop className={classes.backdrop} open={open} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>



        )
    }



    return (

        <div>


            <div className="mobileVisible"><h4 style={{ color: 'red' }}> Please Change to Desktop Site or Login from Computer or Desktop </h4> </div>

            <div className="mobileHidden">
                <label style={{ textAlign: "center", fontSize: 25 }} >Update Page</label>  <br />

                {spin ? <table className="table" style={{ textAlign: 'center', marginTop: '2%', border: '5px solid #001529' }}>
                    <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                        <tr>
                            <th>Enrollment No</th>
                            <th>Name</th>

                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.map(data => (
                            <tr>
                                <td key={data.Name}>{data.Name}</td>
                                <td key={data.RollNo}>{data.RollNo}</td>

                                <td> <button onClick={(e) => {
                                    e.preventDefault()
                                    onUpdate(data)
                                }} className="btn btn-primary text-center" >Update</button> </td>
                                <td> <button className="btn btn-danger text-center" onClick={(e) => {
                                    e.preventDefault();

                                    onDelete(data)

                                }}   >Delete</button> </td>
                            </tr>

                        ))}

                    </tbody>
                </table> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
                <br />







                <Backdrop className={classes.backdrop} open={open} >
                    <CircularProgress color="inherit" />
                </Backdrop>


            </div></div>
    )
}

export default TeacherUpdate
