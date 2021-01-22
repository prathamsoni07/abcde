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

function StudentUpdate() {
  const classes = useStyles();
  const [rollNo, setRollNo] = useState('')
  const [studentClass, setStudentClass] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [studentBranch, setStudentBranch] = useState('');
  const [updateShow, setUpdateShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
  const [previousSchool, setPreviousSchool] = useState('');
  const [previousPercent, setPreviousPercent] = useState('');
  const [studentFullName, setStudentFullName] = useState('');
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
  const [profileImg1, setProfileImg1] = useState('')
  const [file, setFile] = useState('')
  const [go, setGo] = useState(false);
  const [edit, setEdit] = useState(true);
  const [sClass, setSclass] = useState('')
  const [open, setOpen] = useState(false);
  const [imgShow, setImgShow] = useState(true)



  useEffect(() => {
    Axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);
      setClassData(res.data)
      setSpin(true)
    })
  }, [])


  function imageHandler(e) {

    const imageFile = e.target.files[0];
    console.log(imageFile);
    const isLt2M = imageFile.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      NotificationManager.warning('Image must smaller than 2MB!');
      setProfileImg1("")
      setGo(false)

    }


    if (!imageFile.name.match(/\.(jpg|jpeg|png|PNG)$/)) {
      NotificationManager.warning("Please select valid image.")
      setProfileImg1("")
      setImgShow(true)

      setGo(false)
      return false;
    }
    const reader = new FileReader();

    if (imageFile && isLt2M) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImg1(reader.result)
          setImgShow(false)
          setFile(imageFile)
          setGo(true)
        }
      }
      reader.readAsDataURL(e.target.files[0])

    }


  }

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


  function submitHandle(e) {
    e.preventDefault();

    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (!mobPattern.test(mobile && guardianMobile)) {
      alert("Enter Valid no.")
      return false
    } else {

      if (mobile === guardianMobile) {
        alert(" Mobile No. cannot be same")
        return false
      } else {

        var d = window.confirm("Update Student Details")
        if (d) {
          setOpen(true)
          const formdata = new FormData();
          formdata.append('Name', firstName + " " + lastName)
          formdata.append('Dob', dob)
          formdata.append('FatherName', fatherName)
          formdata.append('MotherName', motherName)
          formdata.append('StudentEmail', studentEmail)
          formdata.append('ParentsEmail', parentEmail)
          formdata.append('Mobile', mobile);
          formdata.append('HomeAddress', permanentAddress)
          formdata.append('CurrentAddress', currentAddress)
          formdata.append('Gender', gender)
          formdata.append('Class', sClass)
          formdata.append('Branch', branch)
          formdata.append('Section', section)
          formdata.append('PreviousSchool', previousSchool)
          formdata.append('AadharId', aadhar)
          formdata.append('ChildId', childiId)
          formdata.append('Pincode', pincode)
          formdata.append('GuardianName', guardian)
          formdata.append('GuardianMobile', guardianMobile)
          formdata.append('Category', category)
          formdata.append('Religion', religion)
          formdata.append('LastYearPercentage', previousPercent)
          formdata.append('ParentsOccupation', occupation)
          formdata.append('RollNo', rollNo)
          formdata.append('file', file)


          Axios.post(process.env.REACT_APP_SECURITY_API.concat("studentupdate"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res);
            alert(res.data.msg)
            setOpen(false)
            setUpdateShow(false);
            setEdit(true)
          })

        }
      }



    }







  }



  function onDelete(e) {
    console.log(studentBranch);

    console.log("function Called");
    var d = window.confirm(`Are you sure you want to delete - ${e.Name}  --- ${e.RollNo} - from your school`);

    if (d) {
      setOpen(true)
      var data = {
        Class: studentClass,
        Branch: studentBranch,
        Section: studentSection,
        RollNo: e.RollNo
      }

      Axios.post(process.env.REACT_APP_SECURITY_API.concat("deletestudent"), data).then((res) => {
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
    var data = {
      RollNo: e.RollNo,
      Branch: studentBranch,
      Section: studentSection,

    }


    Axios.post(process.env.REACT_APP_SECURITY_API.concat("studentdetails1"), data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);

      setFirstName(res.data.Name.Name.split(" ")[0])
      setLastName(res.data.Name.Name.split(" ")[1])
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
      setPreviousPercent(res.data.Name.LastYearPercentage)
      setMobile(res.data.Name.Mobile);
      setParentEmail(res.data.Name.ParentEmail);
      setOccupation(res.data.Name.ParentsOccupation);
      setPincode(res.data.Name.Pincode);
      setPreviousSchool(res.data.Name.PreviousSchool);
      setReligion(res.data.Name.Religion);
      setSection(res.data.Name.Section)

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



  }

  function back() {
    setEdit(true)
    setUpdateShow(false)
    return StudentUpdate
  }

  if (updateShow) {
    return (
      <div>
        <a className="btn btn-link" style={{ marginLeft: '3%', marginTop: '-5%' }} onClick={back}>/ Previous Page</a><br />

        {spin1 ? <div className="mobileHidden"> <p style={{ fontSize: 20, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529' }}>Update Student Details</p><hr />

          <div style={{ color: 'green', fontWeight: 800 }}>
            <label> Name : {studentFullName}  , Roll No : {rollNo}
            </label>
            <hr />

          </div>
          <div style={{ textAlign: 'right' }}> <button className="btn btn-info" onClick={() => setEdit(!edit)}> {edit ? "Edit" : "Cancel"} </button></div>
          <fieldset disabled={edit}>
            <form aria-readonly="true" onSubmit={submitHandle} style={{ marginTop: '3%' }} id="mainForm"  >


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
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Father's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" defaultValue={fatherName} onChange={(e) => setFatherName(e.target.value)} required type="text" placeholder="Enter Father's Name (Full Name)" />

                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Mother's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" defaultValue={motherName} onChange={(e) => setMotherName(e.target.value)} required type="text" placeholder="Enter Mother's Name (Full Name)" />

                </Form.Group>

              </Form.Row>



              <Form.Row>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Dob</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input className="form-control" defaultValue={dob} onChange={(e) => setDob(e.target.value)} required type="date" />

                </Form.Group>



                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Gender</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <select className="form-control" onChange={(e) => setGender(e.target.value)} required as="select" >
                    <option value={gender} disabled>{gender}</option>
                    <option value="Male" >Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Class</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <select className="form-control" onChange={(e) => {
                    setSclass(e.target.value)
                    classClick(e.target.value)
                  }} required as="select" defaultValue={sClass}>
                    <option value={sClass} disabled>Class {sClass}</option>
                    <option value={"1"}>Class I</option>
                    <option value={"2"}>Class II</option>
                    <option value={"3"}>Class III</option>
                    <option value={"4"}>Class IV</option>
                    <option value={"5"}>Class V</option>
                    <option value={"6"}>Class VI</option>
                    <option value={"7"}>Class VII</option>
                    <option value={"8"}>Class VIII</option>
                    <option value={"9"}>Class IX</option>
                    <option value={"10"}>Class X</option>
                    <option value={"11"}>Class XI</option>
                    <option value={"12"}>Class XII</option>
                  </select>
                </Form.Group>
                {branchDisable ? <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Branch</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <select className="form-control" onChange={(e) => {
                    setBranch(e.target.value)
                    branchClick(e.target.value)
                  }} required as="select" >
                    <option value={branch} disabled>{branch}</option>

                    {branchName.map(data => (
                      <option key={data} value={data}>{data}</option>
                    ))}
                  </select>
                </Form.Group> : null}
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Section</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <select className="form-control" onChange={(e) => setSection(e.target.value)} required as="select" >
                    <option value={section} disabled>{section}</option>
                    {sectionName.map(data => (
                      <option key={data} value={data}>{data}</option>
                    ))}
                  </select>
                </Form.Group>
              </Form.Row>

              <Form.Row>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Religion</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setReligion(e.target.value)} defaultValue={religion} type="text" placeholder="Enter Religion" />

                </Form.Group>



                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Category</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <select className="form-control" onChange={(e) => setCategory(e.target.value)} required as="select" defaultValue='Choose'>
                    <option disabled>{category}</option>
                    <option value="General" >General</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="OBC">OBC</option>
                  </select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Mobile No.</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setMobile(e.target.value)} type="number" placeholder="Enter Mobile No." defaultValue={mobile} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Student Email</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setStudentEmail(e.target.value)} type="email" placeholder="Enter student email" defaultValue={studentEmail} />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Parent's Email</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setParentEmail(e.target.value)} type="email" placeholder="Enter parent's email" defaultValue={parentEmail} />

                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Aadhar No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setAadhar(e.target.value)} type="number" placeholder="Enter student aadhar No." defaultValue={aadhar} />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Child Id</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setChildId(e.target.value)} type="number" placeholder="Enter child id No." defaultValue={childiId} />

                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Father's Occupation</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setOccupation(e.target.value)} type="text" placeholder="Enter Father's Occupation" defaultValue={occupation} />

                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Gaurdian Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setGuardian(e.target.value)} type="text" placeholder="Enter Guardian's Name" defaultValue={guardian} />

                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Gaurdian Mobile No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setGuardianMobile(e.target.value)} type="number" placeholder="Enter Mobile No." defaultValue={guardianMobile} />

                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Permanent Address</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setPermanentAddress(e.target.value)} type="text" placeholder='Enter Permanent Address' defaultValue={permanentAddress} />

                </Form.Group>

              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Current Address</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setCurrentAddress(e.target.value)} type="text" placeholder='Enter Current Address' defaultValue={currentAddress} />

                </Form.Group>

              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Pincode </Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setPincode(e.target.value)} type="text" placeholder='Enter Pincode' defaultValue={pincode} />

                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Previous School</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setPreviousSchool(e.target.value)} type="text" placeholder='Enter Previous School' defaultValue={previousSchool} />

                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Previous Class %</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
                  <input required className="form-control" onChange={(e) => setPreviousPercent(e.target.value)} type="text" placeholder='Enter  Percentage' defaultValue={previousPercent} />

                </Form.Group>

              </Form.Row>
              <label> Student Photo</label>
              {imgShow ? <Col xs={6} md={4}>

                <Image id="img" style={{ height: '80mm', width: '70mm' }} src={`data:image/jpeg;base64,${profileImg}`} thumbnail />


              </Col> : <Col xs={6} md={4}>

                  <Image style={{ height: '80mm', width: '70mm' }} src={profileImg1} thumbnail />


                </Col>}




              <label> Update Student Photo    </label>  <input type="file" onChange={imageHandler} />

              <br />


              <br />
              <NotificationContainer />

              <div style={{ textAlign: 'center' }}>

                <Button style={{ marginLeft: '3%' }} variant="success" type="submit">Update Student Details</Button>
              </div>
            </form>


          </fieldset>

        </div> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
        <br />



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
        <p style={{ fontSize: 25, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Update Page</p>

        {spin ? <Card className="text-center" style={{ width: "50%", marginLeft: '25%' }}>
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
              <th>Name</th>
              <th>Roll No</th>
              <th>Update</th>
              <th>Delete</th>

            </tr>
          </thead>

          <tbody>
            {data.map(data => (
              <tr>
                <td>{data.Name}</td>
                <td>{data.RollNo}</td>

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
        </table> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div> : null}

        <hr />






        <Backdrop className={classes.backdrop} open={open} >
          <CircularProgress color="inherit" />
        </Backdrop>


      </div></div>
  )
}

export default StudentUpdate
