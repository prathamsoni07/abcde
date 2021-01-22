import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Table, Form, Col, Image } from 'react-bootstrap';
import Axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Cookies from 'js-cookie'



const useStyles = makeStyles((theme) => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


function EnrollTeacher() {
  const classes = useStyles();
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
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [file, setFile] = useState('');
  const [go, setGo] = useState(false);
  const [husbandDisable, setHusbandDisable] = useState(true);
  const [classData, setClassData] = useState([]);
  const [branchName, setBranchName] = useState([]);
  const [sectionName, setSectionName] = useState([]);
  const [branchDisable, setbranchDisable] = useState(false)
  const [studentClass, setStudentClass] = useState('');
  const [section, setSection] = useState('');
  const [branch, setBranch] = useState('');







  useEffect(() => {


    Axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: "hello0" }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);
      setClassData(res.data)
    })
  }, [Axios])




  function classClick(e) {
    branchName.splice(0)
    console.log(e);
    setStudentClass(e)
    if (e > 10) {

      setbranchDisable(true)
      var classFind = classData.find(o => o.Class == e)
      if (!classFind) {
        alert("No Branch")
        setbranchDisable(false)
        return false
      } else {
        classFind.Branches.map((data) => {
          branchName.push(data.Branch);

        })
      }

    } else {
      setbranchDisable(false)

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
    console.log(e);
    var branchName = classData.find(o => o.Class == studentClass);
    var branchFind = branchName.Branches.find(o => o.Branch == e);
    if (!branchFind) {
      alert("No Section")
      return false
    } else {
      setSectionName(branchFind.Section)

    }

  }


  function imageHandler(e) {

    // setProfileImg(e.target.files[0])
    const imageFile = e.target.files[0];
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
      if (!mobPattern.test(mobile)) {
        alert("Enter Valid no.")
        return false
      } else {

        var d = window.confirm("Enroll Teacher")
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
          formdata.append('AssignedClass', studentClass)
          formdata.append('AssignedBranch', branch)
          formdata.append('AssignedSection', section)
          formdata.append('file', file)


          Axios.post(process.env.REACT_APP_SECURITY_API.concat("teachersignup"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res);
            alert(res.data.msg)
            document.getElementById("mainForm").reset()
            setProfileImg('')
            setOpen(false)
          })

        } else {
          return false
        }




      }

    } else {
      return false
    }




  }




  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"

      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Preview Form
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: 20, fontFamily: 'unset', marginLeft: '3%', marginRight: '3%' }}><br />

            <Table striped={false} responsive="sm">
              <Image src={profileImg} style={{ height: '80mm', width: '70mm' }} thumbnail />

              <tr>
                <th> First Name  </th>
                <td>{firstName}</td>
              </tr>
              <tr>
                <th> Last Name </th>
                <td>{lastName}</td>
              </tr>
              <tr>
                <th> Marital Status </th>
                <td>{maritalStatus}</td>
              </tr>

              <tr>
                <th> Father's Name  </th>
                <td>{fatherName}</td>
              </tr>
              <tr>
                <th> Husband's Name</th>
                <td>{husbandName}</td>
              </tr>
              <tr>
                <th> Date Of Birth </th>
                <td>{dob}</td>
              </tr>
              <tr>
                <th> Gender </th>
                <td>{gender}</td>
              </tr>

              <tr>
                <th> Category </th>
                <td>{category}</td>
              </tr>
              <tr>
                <th> Assigned Class  </th>
                <td>{studentClass}</td>
              </tr> <tr>
                <th> Assigned Branch </th>
                <td>{branch}</td>
              </tr> <tr>
                <th> Assigned Section </th>
                <td>{section}</td>
              </tr>
              <tr>
                <th> Religion </th>
                <td>{religion}</td>
              </tr>
              <tr>
                <th> Qualification  </th>
                <td>{qualification}</td>
              </tr>
              <tr>
                <th> Main Subject </th>
                <td>{specialSubject}</td>
              </tr>


              <tr>
                <th> Experience </th>
                <td>{experience}</td>
              </tr>
              <tr>
                <th> Designation  </th>
                <td> {designation}</td>
              </tr>
              <tr>
                <th> Mobile No  </th>
                <td>{mobile}</td>
              </tr>
              <tr>
                <th> Email Address  </th>
                <td>{email}</td>
              </tr>

              <tr>
                <th> Aadhar No </th>
                <td>{aadhar}</td>
              </tr>
              <tr>
                <th> Pan Card No  </th>
                <td>{panNo}</td>
              </tr>



              <tr>
                <th> Permanent Address  </th>
                <td>{permanentAddress}</td>
              </tr>
              <tr>
                <th> Current Address </th>
                <td>{currentAddress}</td>
              </tr>
              <tr>
                <th> Pincode  </th>
                <td>{pincode}</td>
              </tr>

              <tr>
                <th> Date Of Joining   </th>
                <td> {dateOfJoining}</td>
              </tr>

              <br />
            </Table>


          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }










  return (
    <div>

      <div ><br />

        <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Enroll Teacher</p><hr />

        <p style={{ color: 'red' }}> * fields are Mandatory</p>
        <form onSubmit={submitHandle} style={{ marginTop: '3%' }} id="mainForm"  >


          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />

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
                }
              }


              } required as="select" defaultValue="Choose...">
                <option value="">Choose...</option>
                <option value="Yes" >Yes</option>
                <option value="No">No</option>
              </select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Father's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" onChange={(e) => setFatherName(e.target.value)} required type="text" placeholder="Enter Father's Name (Full Name)" />

            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Husband/Wife 's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input disabled={husbandDisable} className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" onChange={(e) => setHusbandName(e.target.value)} required type="text" placeholder="Enter Husband's Name (Full Name)" />

            </Form.Group>



          </Form.Row>



          <Form.Row>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Dob</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input className="form-control" onChange={(e) => setDob(e.target.value)} required type="date" />

            </Form.Group>



            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Gender</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <select className="form-control" onChange={(e) => setGender(e.target.value)} required as="select" defaultValue="Choose...">
                <option value="">Choose...</option>
                <option value="Male" >Male</option>
                <option value="Female">Female</option>
              </select>
            </Form.Group>


            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Category</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <select className="form-control" onChange={(e) => setCategory(e.target.value)} required as="select" defaultValue="Choose...">
                <option value="">Choose...</option>
                <option value="General" >General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
              </select>
            </Form.Group>

          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Assign Class For Attendence</Form.Label>
              <select className="form-control" onChange={(e) => {
                setStudentClass(e.target.value)
                classClick(e.target.value)
              }} as="select" defaultValue="Choose...">
                <option value="">Choose...</option>
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
              <Form.Label>Assign Branch</Form.Label>
              <select className="form-control" onChange={(e) => {
                setBranch(e.target.value)
                branchClick(e.target.value)
              }} as="select" defaultValue="Choose...">
                <option value="">Choose...</option>

                {branchName.map(data => (
                  <option key={data} value={data}>{data}</option>
                ))}
              </select>
            </Form.Group> : null}
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Assign Section</Form.Label>
              <select className="form-control" onChange={(e) => setSection(e.target.value)} as="select" defaultValue="Choose...">
                <option value="">Choose...</option>
                {sectionName.map(data => (
                  <option key={data} value={data}>{data}</option>
                ))}
              </select>
            </Form.Group>
          </Form.Row>



          <Form.Row>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Religion</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setReligion(e.target.value)} type="text" placeholder="Enter Religion" />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Qualifications</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setQualification(e.target.value)} placeholder="Enter Qualifications" />

            </Form.Group>

          </Form.Row>
          <Form.Row>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Main Subject</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setSpecialSubject(e.target.value)} type="text" placeholder="Enter Main Subject" />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Experience (in years)</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setExperience(e.target.value)} type="number" placeholder="Enter Here" />

            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Designation in school</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setDesignation(e.target.value)} placeholder="Enter Designation Here" />

            </Form.Group>
          </Form.Row>
          <Form.Row>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Mobile No.</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setMobile(e.target.value)} type="number" placeholder="Enter Mobile No." />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Teacher Email</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Teacher email" />

            </Form.Group>


          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Aadhhar No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setAadhar(e.target.value)} type="number" placeholder="Enter Teacher aadhar No." />

            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Pan No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setPanNo(e.target.value)} type="number" placeholder="Enter Teacher pan No." />

            </Form.Group>


          </Form.Row>

          <Form.Row>




          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Permanent Address</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setPermanentAddress(e.target.value)} type="text" placeholder='Enter Permanent Address' />

            </Form.Group>

          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Current Address</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setCurrentAddress(e.target.value)} type="text" placeholder='Enter Current Address' />

            </Form.Group>

          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Pincode </Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setPincode(e.target.value)} type="text" placeholder='Enter Pincode' />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date Of Joining </Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setDateOfJoining(e.target.value)} type="date" />

            </Form.Group>

          </Form.Row>
          <label>Upload Teacher Photo</label>
          <Col xs={6} md={4}>

            <Image src={profileImg} style={{ height: '80mm', width: '70mm' }} thumbnail />
            <input type="file" required placeholder="enter" onChange={imageHandler} />

          </Col>
          <br />


          <br />
          <NotificationContainer />

          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Preview Form
      </Button>
            <Button style={{ marginLeft: '3%' }} variant="success" type="submit">Enroll Teacher</Button>
          </div>
        </form>


        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Backdrop className={classes.backdrop} open={open} >
          <CircularProgress color="inherit" />
        </Backdrop>

      </div>
    </div>
  );
}
export default EnrollTeacher