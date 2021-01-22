import React, { useEffect, useState } from 'react';
import { Form, Col, Image, Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Axios from 'axios';
import { Spin } from 'antd';
import Cookies from 'js-cookie'

// import Pincode from "react-pincode";

function EnrollPrincipal() {
    const [schoolCode, setSchoolCode] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [panNo, setPanNo] = useState('');
    const [mobile, setMobile] = useState('');
    const [category, setCategory] = useState('');
    const [religion, setReligion] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [file, setFile] = useState('')
    const [go, setGo] = useState(false)
    const [spin, setSpin] = useState(true)
    const [schoolData, setSchoolData] = useState([])

    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getschoolinfo"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setSchoolData(res.data)
            setSpin(false)
        })
    }, [])

    function imageHandler(e) {

        setProfileImg(e.target.files[0])
        const imageFile = e.target.files[0];
        const isLt2M = imageFile.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            NotificationManager.warning('Image must smaller than 2MB!');
            setProfileImg("")
            setGo(false)

        }


        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
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

            if (!mobPattern.test(mobile)) {
                alert("Enter Valid no.")

                return false
            } else {
                var d = window.confirm(" Enroll Principal")


                if (d === true) {
                    setSpin(true)
                    const formdata = new FormData();

                    formdata.append("Name", name)
                    formdata.append("SchoolCode", schoolCode.split(")")[0].split("(")[1])
                    formdata.append("Dob", dob)
                    formdata.append("Gender", gender)
                    formdata.append("FatherName", fatherName)
                    formdata.append("EmailId", email)
                    formdata.append("Aadhar", aadhar)
                    formdata.append("PanNo", panNo)
                    formdata.append("Mobile", mobile)
                    formdata.append("Category", category)
                    formdata.append("Religion", religion)
                    formdata.append("Address", permanentAddress)
                    formdata.append("Pincode", pincode)
                    formdata.append("file", file)
                    Axios.post(process.env.REACT_APP_SECURITY_API.concat("principalenroll"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                        console.log(res);
                        alert(res.data.msg)
                        setSpin(false)

                    })
                } else {
                    return false
                }

            }






        }




    }

    return (
        <div >
            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Principal Enrollment Form</p><hr />
            {spin ? <div style={{ textAlign: 'center' }}><Spin /> </div> : <form style={{ marginTop: '3%' }} onSubmit={submitHandle}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Full Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" required onChange={(e) => setName(e.target.value)} pattern="[a-zA-Z][a-zA-Z ]{2,}" placeholder="Enter Full Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Father's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>

                        <input className="form-control" onChange={(e) => setFatherName(e.target.value)} pattern="[a-zA-Z][a-zA-Z ]{2,}" required type="text" placeholder="Enter Father's Name" />

                    </Form.Group>

                </Form.Row>


                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>School Code</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <select onChange={(e) => setSchoolCode(e.target.value)} required className="form-control" >
                            <option value="">Select School ... </option>
                            {schoolData.map(data => (
                                <option key={data} value={data}>{data}</option>
                            ))}


                        </select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Dob</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input type="date" className="form-control" onChange={(e) => setDob(e.target.value)} required />

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Gender</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <select className="form-control" onChange={(e) => setGender(e.target.value)} required as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label> Email Address</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter Email Address" />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Category</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <select className="form-control" onChange={(e) => setCategory(e.target.value)} required as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>
                            <option value="General">General</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="OBC">OBC</option>
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Religion</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setReligion(e.target.value)} required />

                    </Form.Group>



                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label> Phone No.</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setMobile(e.target.value)} required type="number" placeholder="Enter Phone No." />

                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Aadhar Number</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setAadhar(e.target.value)} required type="number" placeholder="Enter Aadhar No." />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Pan No. </Form.Label>
                        <input className="form-control" onChange={(e) => setPanNo(e.target.value)} required type="text" placeholder="Enter Pan Card No." />
                    </Form.Group>

                </Form.Row>

                <Form.Row>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Address</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                        <input className="form-control" onChange={(e) => setPermanentAddress(e.target.value)} required type="text" placeholder="Enter Address" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Pincode</Form.Label>
                        <input className="form-control" required onChange={(e) => setPincode(e.target.value)} type="text" placeholder="Enter Pincode" />
                    </Form.Group>

                </Form.Row>


                <Col xs={6} md={4}><Form.Label > Profile Image </Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                    <Image style={{ maxWidth: '30%', maxHeight: '30%' }} src={profileImg} thumbnail placeholder="Profile" /><br />
                    <input required type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
                </Col>
                <NotificationContainer />
                <div style={{ textAlign: 'center '}}>
                    <Button variant="primary" type="submit" style={{width:"300px"}}>
                    Submit
                    </Button>
                </div>
            </form>}


        </div>
    )
}

export default EnrollPrincipal
