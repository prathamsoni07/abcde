import React, { useEffect, useState } from 'react';
import { Button, Modal, Image, Col, Form } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Axios from 'axios';
import img from '../../../download.png';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import Cookies from 'js-cookie';



const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;




const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


function EnrollStudent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [section, setSection] = useState('');
  const [branch, setBranch] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [childiId, setChildId] = useState('');
  const [mobile, setMobile] = useState('');
  const [occupation, setOccupation] = useState('');
  const [category, setCategory] = useState('General');
  const [religion, setReligion] = useState('');
  const [guardian, setGuardian] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [guardianMobile, setGuardianMobile] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [previousPercent, setPreviousPercent] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const [profileImg, setProfileImg] = useState(img);
  const [file, setFile] = useState('');
  const [go, setGo] = useState(false);
  const [classData, setClassData] = useState([]);
  const [branchName, setBranchName] = useState([]);
  const [sectionName, setSectionName] = useState([]);
  const [branchDisable, setbranchDisable] = useState(false);
  const [spin, setSpin] = useState(false)



  useEffect(() => {

    setSpin(false)
    Axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: "hello0" }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);
      setClassData(res.data)
      setSpin(true)
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
      alert("No section")
      return false
    } else {
      setSectionName(branchFind.Section)

    }

  }


  function imageHandler(e) {

    // setProfileImg(e.target.files[0])
    const imageFile = e.target.files[0];
    console.log(e.target.files)
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
      if (!mobPattern.test(mobile && guardianMobile)) {
        alert("Enter Valid no.")
        return false
      } else {

        if (mobile === guardianMobile) {
          alert(" Mobile No. cannot be same")
          return false
        } else {

          var d = window.confirm("Enroll Student")
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
            formdata.append('Class', studentClass)
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
            formdata.append('file', file)


            Axios.post(process.env.REACT_APP_SECURITY_API.concat("studentenroll"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
              console.log(res);
              alert(res.data.msg)
              document.getElementById("mainForm").reset()
              setModalShow(false)
              setProfileImg('')
              setOpen(false)
            }).catch(err => {
              if (err) {
                setOpen(false)
              }
            })

          }
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

            <table className="table" style={{ border: '5px solid #001529 ' }}>
              <thead>
                <th><Image src={profileImg} style={{ height: '80mm', width: '70mm' }} thumbnail /></th><td></td>

              </thead>
              <tr>
                <th> First Name  </th>
                <td>{firstName}</td>
              </tr>
              <tr>
                <th> Last Name </th>
                <td>{lastName}</td>
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
                <th> Father's Name  </th>
                <td>{fatherName}</td>
              </tr>
              <tr>
                <th> Mother's Name </th>
                <td>{motherName}</td>
              </tr>
              <tr>
                <th> Class </th>
                <td>{studentClass}th</td>
              </tr>
              <tr>
                <th> Section  </th>
                <td>{section}</td>
              </tr>

              <tr>
                <th> Student's Email  </th>
                <td>{studentEmail}</td>
              </tr>
              <tr>
                <th> Parent's Email  </th>
                <td>{parentEmail}</td>
              </tr>
              <tr>
                <th> Aadhar No </th>
                <td>{aadhar}</td>
              </tr>
              <tr>
                <th> Child Id  </th>
                <td>{childiId}</td>
              </tr>
              <tr>
                <th> Mobile No  </th>
                <td>{mobile}</td>
              </tr>
              <tr>
                <th> Occupation  </th>
                <td>{occupation}</td>
              </tr>
              <tr>
                <th> category </th>
                <td>{category}</td>
              </tr>
              <tr>
                <th> Religion </th>
                <td>{religion}</td>
              </tr>
              <tr>
                <th> Guardian Name  </th>
                <td>{guardian}</td>
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
                <th> Guardian Mobile No  </th>
                <td>{guardianMobile}</td>
              </tr>
              <tr>
                <th> Previous School  </th>
                <td>{previousSchool}</td>
              </tr>
              <tr>
                <th> Previous Class Percentage </th>
                <td>{previousPercent}</td>
              </tr><br />
            </table>


          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={submitHandle}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }










  return (
    <div ><br />

      {spin ? <div><p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Enroll Student</p><hr />
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
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Father's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" onChange={(e) => setFatherName(e.target.value)} required type="text" placeholder="Enter Father's Name (Full Name)" />

            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Mother's Name</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input className="form-control" pattern="[a-zA-Z][a-zA-Z ]{2,}" onChange={(e) => setMotherName(e.target.value)} required type="text" placeholder="Enter Mother's Name (Full Name)" />

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
              <Form.Label>Class</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <select className="form-control" onChange={(e) => {
                setStudentClass(e.target.value)
                classClick(e.target.value)
              }} required as="select" defaultValue="Choose...">
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
              <Form.Label>Branch</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <select className="form-control" onChange={(e) => {
                setBranch(e.target.value)
                branchClick(e.target.value)
              }} required as="select" defaultValue="Choose...">
                <option value="">Choose...</option>

                {branchName.map(data => (
                  <option key={data} value={data}>{data}</option>
                ))}
              </select>
            </Form.Group> : null}
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Section</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <select className="form-control" onChange={(e) => setSection(e.target.value)} required as="select" defaultValue="Choose...">
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

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Mobile No.</Form.Label><Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setMobile(e.target.value)} type="number" placeholder="Enter Mobile No." />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Student Email</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setStudentEmail(e.target.value)} type="email" placeholder="Enter student email" />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Parent's Email</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setParentEmail(e.target.value)} type="email" placeholder="Enter parent's email" />

            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Aadhhar No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setAadhar(e.target.value)} type="number" placeholder="Enter student aadhar No." />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Child Id</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setChildId(e.target.value)} type="number" placeholder="Enter child id No." />

            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Father's Occupation</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setOccupation(e.target.value)} type="text" placeholder="Enter Father's Occupation" />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Gaurdian Name</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setGuardian(e.target.value)} type="text" placeholder="Enter Guardian's Name" />

            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Gaurdian Mobile No.</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setGuardianMobile(e.target.value)} type="number" placeholder="Enter Mobile No." />

            </Form.Group>
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
              <input required className="form-control" onChange={(e) => setPincode(e.target.value)} type="number" placeholder='Enter Pincode' />

            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Previous School</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setPreviousSchool(e.target.value)} type="text" placeholder='Enter Previous School' />

            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Previous Class %</Form.Label>  <Form.Label style={{ color: "red" }}>  *</Form.Label>
              <input required className="form-control" onChange={(e) => setPreviousPercent(e.target.value)} type="number" placeholder='Enter  Percentage' />

            </Form.Group>

          </Form.Row>

          <Col xs={6} md={4}>
            <label>Upload Student Photo</label>
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
            <Button style={{ marginLeft: '3%' }} variant="success" type="submit">Enroll Student</Button>
          </div>
        </form>


        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Backdrop className={classes.backdrop} open={open} >
          <CircularProgress color="inherit" />
        </Backdrop>

      </div> : <div style={{

        textAlign: 'center', position: "fixed",
        top: '50%',
        left: '50%',

        transform: "translate(-50%, -50%)"
      }}> <Spin indicator={antIcon} /></div>} </div>
  );
}
export default EnrollStudent





