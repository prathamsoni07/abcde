import React, { useState } from 'react';
import { Form, Col, Button, Image } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Axios from 'axios';
import { Spin } from 'antd';
import Cookies from 'js-cookie'


function EnrollSchool() {

    const [profileImg, setProfileImg] = useState('');
    const [file, setFile] = useState('')
    const [schoolName, setSchoolName] = useState('');
    const [schoolDescription, setSchoolDescription] = useState('');
    const [schoolCode, setSchoolCode] = useState('');
    const [schoolBoard, setSchoolBoard] = useState('');
    const [schoolMedium, setSchoolMedium] = useState('');
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [phone, setPhone] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [directorName, setDirectorName] = useState('');
    const [principal, setPrincipal] = useState('');
    const [vicep, setViceP] = useState('');
    const [address, setAddress] = useState('');
    const [timing, setTiming] = useState('');
    const [go, setGo] = useState(false);
    const [spin, setSpin] = useState(false)

    function imageHandler(e) {

        // setProfileImg(e.target.files[0])
        const imageFile = e.target.files[0];
        console.log(imageFile);
        const isLt2M = imageFile.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            NotificationManager.warning('Image must smaller than 2MB!');
            setProfileImg("")
            setGo(false)

        }


        if (!imageFile.name.match(/\.(jpg|jpeg|png|PNG)$/)) {
            NotificationManager.warning("Please select valid image.")
            setProfileImg("")
            setGo(false)
            return false;
        }
        const reader = new FileReader();

        if (imageFile && isLt2M) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProfileImg(reader.result)
                    setFile(imageFile)
                    setGo(true)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        }


    }


    function submitHandle(e) {
        e.preventDefault();


        if (go) {

            var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
            if (!mobPattern.test(phone && phone1)) {
                alert("Enter Valid no.")
                return false
            } else {
                var d = window.confirm(" Enroll School")


                if (d) {
                    setSpin(true)
                    const formdata = new FormData();

                    formdata.append("SchoolName", schoolName)
                    formdata.append("SchoolDes", schoolDescription)
                    formdata.append("SchoolCode", schoolCode)
                    formdata.append("SchoolBoard", schoolBoard)
                    formdata.append("SchoolMedium", schoolMedium)
                    formdata.append("Email", email)
                    formdata.append("Email1", email1)
                    formdata.append("Email2", email2)
                    formdata.append("Phone", phone)
                    formdata.append("Phone1", phone1)
                    formdata.append("Phone2", phone2)
                    formdata.append("DirectorName", directorName)
                    formdata.append("Principal", principal)
                    formdata.append("ViceP", vicep)
                    formdata.append("Address", address)
                    formdata.append("timing", timing)
                    formdata.append("file", file)
                    Axios.post(process.env.REACT_APP_SECURITY_API.concat("schoolenroll"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                        console.log(res);
                        alert(res.data.msg)
                        setSpin(false)

                    })
                } else {
                    return false
                }

            }






        } else {
            return false
        }




    }
    console.log(process.env.REACT_APP_SECURITY_API)
    return (
        <div >
            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>School Enrollment Form</p><hr />
            {spin ? <div style={{ textAlign: 'center' }}><Spin /> </div> : <form onSubmit={submitHandle} style={{ marginTop: '3%' }}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>School Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" required onChange={(e) => setSchoolName(e.target.value)} pattern="[a-zA-Z][a-zA-Z ]{2,}" placeholder="Enter School Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>School Description</Form.Label>
                        <input className="form-control" onChange={(e) => setSchoolDescription(e.target.value)} type="text" placeholder="Enter Description" />

                    </Form.Group>
                </Form.Row>


                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School Code</Form.Label><Form.Label style={{ color: "red" }}>*</Form.Label>
                        <input className="form-control" onChange={(e) => setSchoolCode(e.target.value)} required type="text" placeholder="Enter Two Alphabets + Two Numbers" />

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Board</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <select className="form-control" onChange={(e) => setSchoolBoard(e.target.value)} required as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>
                            <option value="CBSE" >CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="State Board">State Board</option>
                        </select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Medium</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <select className="form-control" onChange={(e) => setSchoolMedium(e.target.value)} required as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>
                            <option value="English Medium">English Medium</option>
                            <option value="Hindi Medium">Hindi Medium</option>
                            <option value="Both Hindi And English Medium">Both Hindi And English Medium</option>
                        </select>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School Email Address</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter Email Address" />

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School Alternate Email Address</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setEmail1(e.target.value)} required type="email" placeholder="Enter Email Address" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School Email Address </Form.Label>
                        <input className="form-control" onChange={(e) => setEmail2(e.target.value)} type="email" placeholder="Enter Email Address" />
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School Phone No.</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setPhone(e.target.value)} required type="number" placeholder="Enter Phone No." />

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School alternate Phone No. </Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setPhone1(e.target.value)} required type="number" placeholder="Enter Phone No." />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School alternate Phone No. </Form.Label>
                        <input className="form-control" onChange={(e) => setPhone2(e.target.value)} type="number" placeholder="Enter Phone No." />
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Director's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>

                        <input className="form-control" onChange={(e) => setDirectorName(e.target.value)} pattern="[a-zA-Z][a-zA-Z ]{2,}" required type="text" placeholder="Enter Director's Name" />

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Principal Name </Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setPrincipal(e.target.value)} pattern="[a-zA-Z][a-zA-Z ]{2,}" required type="text" placeholder="Enter Principal's Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Vice-Principal Name </Form.Label>
                        <input className="form-control" onChange={(e) => setViceP(e.target.value)} pattern="[a-zA-Z][a-zA-Z ]{2,}" type="text" placeholder="Enter Vice-Principal's Name" />
                    </Form.Group>

                </Form.Row>



                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                    <input className="form-control" onChange={(e) => setAddress(e.target.value)} required type="text" placeholder="Full Address" />
                </Form.Group>



                <Col xs={6} md={4}>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School Timing (from - to -)</Form.Label>
                        <input className="form-control" onChange={(e) => setTiming(e.target.value)} type="text" placeholder="Full Timing" />
                    </Form.Group>
                </Col>

                <Col xs={6} md={4}><Form.Label > School Logo </Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                    <Image style={{ maxWidth: '20%' }} src={profileImg} thumbnail placeholder="Logo" /><br />
                    <input required type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
                </Col>
                <NotificationContainer />
                <div style={{textAlign:"center"}}> 
                <Button variant="primary" type="submit" style={{width:"300px",marginTop:"2%"}}>
                    Submit
                </Button>
                </div>
            </form>}
        </div>
    )
}

export default EnrollSchool



