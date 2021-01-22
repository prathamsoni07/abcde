import React from 'react';
import 'antd/dist/antd.css';
import '../FrontPage/FrontPage.css';
import { Layout, Menu, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  CalendarOutlined ,
  FormOutlined ,
  ProfileOutlined,
  IdcardOutlined,
  FieldTimeOutlined,
  EditOutlined

} from '@ant-design/icons';
import QuizShow from './QuizShow/QuizShow';
import StudentAttendence from './AttendenceShow/Attendence';
import StudentSchedule from './Calender/StudentSchedule';
import AssignmentShow from './AssignmentShow/AssignmentShow';
import Axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string'
import { LoadingOutlined } from '@ant-design/icons';
import { Tabs, Tab } from 'react-bootstrap'
import StudyMaterial from './StudyMaterial/StudyMaterial';
import ResultShow from './ResultShow/ResultShow';
import TimeTable from './TimeTable/TimeTable';
import { Avatar } from 'antd';


const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const { Header, Sider, Content, Footer } = Layout;

class StudentDashboard extends React.Component {
  state = {
    collapsed: true,
    click: false,
    double: true,
    triple: false,
    quad: false,
    attendence: false,
    result: false,
    schoolName: '',
    schoolLogo: '',
    enrollMentid: '',
    spin: false,
    profileshow: false,
    name: '',
    role: '',
    enrollNo: '',
    email: '',
    phone: '',
    dob: '',
    aadhar: '',
    caste: '',
    gender: '',
    childId: '',
    religion: '',
    address: '',
    pincode: '',
    profileImg: '',
    currentAddress: '',
    guardianName: '',
    guardianMobile: '',
    class: '',
    branch: '',
    section: '',
    parentsEmail: '',
    fatherName: '',
    motherName: '',
    parentsOccupation: '',
    changepassword: false,
    currentPassword: '',
    password: '',
    spin1: false,
    timeTable: false
  };

  componentDidMount = () => {
    console.log("component MAnagement called");
    Axios.post(process.env.REACT_APP_SECURITY_API.concat("verification"), { data: 'verification' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.status);
      if (res.data === true) {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("everydetail"), { hello: 'profile' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
          console.log(res.data);
          let c = new Uint8Array(res.data.file.Body.data)
          const STR = c.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STR)
          this.setState({
            name: res.data.data.Name,
            role: res.data.data.Role,
            enrollNo: res.data.data.EnrollmentNo,
            email: res.data.data.StudentEmail,
            phone: res.data.data.Mobile,
            dob: res.data.data.Dob,
            aadhar: res.data.data.AadharId,
            caste: res.data.data.Category,
            gender: res.data.data.Gender,
            childId: res.data.data.ChildId,
            religion: res.data.data.Religion,
            address: res.data.data.HomeAddress,
            pincode: res.data.data.Pincode,
            profileImg: base64String,
            currentAddress: res.data.data.CurrentAddress,
            guardianName: res.data.data.GuardianName,
            guardianMobile: res.data.data.GuardianMobile,
            class: res.data.data.Class,
            branch: res.data.data.Branch,
            section: res.data.data.Section,
            parentsEmail: res.data.data.ParentEmail,
            fatherName: res.data.data.FatherName,
            motherName: res.data.data.MotherName,
            parentsOccupation: res.data.data.ParentsOccupation,
          })

        })




        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getSchooldata"), { data: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
          console.log(res.data);
          let c = new Uint8Array(res.data.file.Body.data)
          const STR = c.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STR)
          this.setState({ schoolName: res.data.Name, spin: true, schoolLogo: base64String, })

        })

        const username1 = queryString.parse(window.location.href.split('?')[1])
        this.setState({ enrollMentid: username1.enrollMentid })
      }
    }).catch(err => {
      if (err) {
        this.props.history.push("/")

      }
    })



  }




  handleSubmit = (e) => {
    e.preventDefault()
    var d = window.confirm("Change Password")

    if (d) {
      this.setState({ spin1: true })
      var data = {
        CurrentPassword: this.state.currentPassword,
        NewPassword: this.state.password
      }
      Axios.post(process.env.REACT_APP_SECURITY_API.concat("password"), data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
        console.log(res.data);
        alert(res.data.msg)
        if (res.data.success === true) {
          this.setState({ changepassword: false, spin1: false })
        } else {
          this.setState({ changepassword: true, spin1: false })
        }

      })
    }

  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  clicked = () => {
    this.setState({
      click: true, double: false, triple: false, quad: false, attendence: false, profileshow: false,
      result: false, timeTable: false

    })
  }
  doubleClick = () => {
    this.setState({
      click: false, double: true, triple: false, quad: false, attendence: false, profileshow: false,
      result: false, timeTable: false
    })

  }
  tripleClick = () => {
    this.setState({
      click: false, triple: true, double: false, quad: false, attendence: false, profileshow: false,
      result: false, timeTable: false
    })
  }
  quadClick = () => {
    this.setState({
      click: false, triple: false, double: false, quad: true, attendence: false, profileshow: false,
      result: false, timeTable: false
    })

  }

  aclick = () => {
    this.setState({
      click: false, triple: false, double: false, quad: false, attendence: true, profileshow: false,
      result: false, timeTable: false
    })

  }
  Profile = () => {
    this.setState({
      click: false, triple: false, double: false, quad: false, attendence: false,
      profileshow: true,
      result: false, timeTable: false
    })
  }

  ResultShow = () => {
    this.setState({
      click: false, triple: false, double: false, quad: false, attendence: false,
      profileshow: false, result: true, timeTable: false
    })
  }

  timeTableShow = () => {
    this.setState({
      click: false, triple: false, double: false, quad: false, attendence: false,
      profileshow: false, result: false, timeTable: true
    })
  }

  logout = () => {
    var d = window.confirm("Leave Site")
    if (d) {
      this.setState({ spin: false })
      Axios.post(process.env.REACT_APP_SECURITY_API.concat("logout"), { hello: 'logout' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
        console.log(res.data);
        Cookies.remove("Authorization")
        this.props.history.push('/')
        alert("Successfully Logged out")

      })

    } else return false


  }

  render() {
    const { name, role, enrollNo, email, phone, dob, aadhar, caste, gender, childId, religion, address, pincode, profileImg, changepassword, fatherName, motherName, guardianMobile, guardianName,
      branch, section, currentAddress, parentsOccupation, parentsEmail, schoolName

    } = this.state

    return (
      <div >
        {this.state.spin ? <div>
          <Layout>
            <Sider breakpoint="xs" className="sider" trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" style={{ color: "white", paddingBottom: 80 }} > {this.state.collapsed ? <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ marginTop: '20%', height: '50px', width: '50px' }} /> : <div style={{ textAlign: 'center', fontFamily: 'cursive' }}> {this.state.enrollMentid}   Student Dashboard </div>} </div>
              <Menu className='nav' theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                <Menu.Item key="7" onClick={this.Profile} icon={<UserOutlined />}>Profile</Menu.Item>
                <Menu.Item onClick={this.doubleClick} key="2" icon={<ScheduleOutlined />}>Schedule   </Menu.Item>
                <Menu.Item onClick={this.aclick} key="5" icon={<CalendarOutlined />}>Attendence</Menu.Item>
                <Menu.Item onClick={this.clicked} key="1" icon={<FormOutlined />}>Quizes</Menu.Item>
                <Menu.Item onClick={this.quadClick} key="4" icon={<ProfileOutlined />}>Assignment</Menu.Item>
                <Menu.Item onClick={this.tripleClick} key="3" icon={<IdcardOutlined />}>Study Material  </Menu.Item>
                <Menu.Item key="8" onClick={this.timeTableShow} icon={<FieldTimeOutlined />}> Exam Time Table    </Menu.Item>
                <Menu.Item onClick={this.ResultShow} key="6" icon={<EditOutlined />}>Result</Menu.Item>
                <Menu.Item onClick={this.logout} key="9" icon={<LogoutOutlined />}> Sign Out</Menu.Item>


              </Menu>
            </Sider>
            <Layout className="site-layout">
              <div className="mobileHidden">    <Header className="site-layout-background" style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, textAlign: 'left' }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                  style: { fontSize: 30, zIndex: 10 }
                })}


                <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 25, marginTop: -50, textAlign: 'center' }} >  <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ height: '50px', width: '50px', marginRight: '1%' }} />{this.state.schoolName}  <span style={{ float: 'right', marginRight: '2%', cursor: 'pointer' }} onClick={this.Profile}> <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" src={`data:image/jpeg;base64,${profileImg}`} icon={<UserOutlined />} /></span> </p>

              </Header></div>
              <div className="mobileVisible" style={{ backgroundColor: 'white' }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                  style: { fontSize: 25, zIndex: 10, marginTop: '4%' }
                })} <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, marginTop: -27, marginLeft: 60 }} >Student Dashboard </p>
              </div>

              <Content
                className="site-layout-background"
                style={{
                  margin: '30px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              ><div>



                  {this.state.click ? <QuizShow /> : null}
                  {this.state.double ? <StudentSchedule /> : null}
                  {this.state.triple ? <StudyMaterial /> : null}
                  {this.state.timeTable ? <TimeTable Class={this.state.class} Branch={branch} /> : null}

                  {this.state.quad ? <AssignmentShow /> : null}
                  {this.state.attendence ? <StudentAttendence /> : null}
                  {this.state.result ? <ResultShow Name={name} Class={this.state.class} Branch={branch} EnrollmentNo={enrollNo} Section={section} /> : null}
                  {this.state.profileshow ? <div>


                    <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Profile Page</p><hr />


                    <div>   <div className="container" style={{ background: '-webkit-linear-gradient(left, #3931af, #00c6ff)' }}>
                      <div className="main-body">




                        <div className="row gutters-sm">
                          <div className="col-md-4 mb-3">
                            <div className="card">
                              <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                  <img src={`data:image/jpeg;base64,${profileImg}`} alt="Admin" className="rounded-circle" width="150" height="200" />
                                  <div className="mt-3">
                                    <h4>{name.toLocaleUpperCase()}</h4>
                                    <p className="text-secondary mb-1">{role}</p>
                                    <p className="text-muted font-size-sm">{enrollNo}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card mt-3 " >

                              <ul className="list-group list-group-flush">
                                <br />
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
                                  <h6 className="d-flex align-items-center mb-3"> <i className="material-icons text-info mr-2">assignment</i>School Details</h6>

                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
                                  <h6 className="mb-0">School Name</h6>
                                  <span className="text-secondary">{schoolName}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <h6 className="mb-0">Class </h6>
                                  <span className="text-secondary">{this.state.class}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <h6 className="mb-0">Branch  </h6>
                                  <span className="text-secondary">{branch}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <h6 className="mb-0">Section </h6>
                                  <span className="text-secondary">{section}</span>
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
                                    {name}             </div>
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
                                    {phone}
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
                                    {address}                    </div>
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
                                        <span className="text-secondary">{parentsEmail}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Occupation</h6>
                                        <span className="text-secondary">{parentsOccupation}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Gender</h6>
                                        <span className="text-secondary">{gender}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Caste</h6>
                                        <span className="text-secondary">{caste}</span>
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
                                        <span className="text-secondary">{guardianName}</span>
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
                                        <span className="text-secondary">{childId}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Current Address</h6>
                                        <span className="text-secondary">{currentAddress}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Permanent Address</h6>
                                        <span className="text-secondary">{address}</span>
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







                      <br />
                      <button onClick={() => this.setState({ changepassword: !changepassword })} className="btn btn-primary"> {changepassword ? "Cancel" : "Change Password"}</button>


                      {changepassword ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="card" style={{ width: '40%', boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)' }}>
                          <form className="card-body" onSubmit={this.handleSubmit}>
                            <h6 className="d-flex align-items-center mb-3">Change Password</h6>

                            <label>Enter Current Password</label>
                            <input placeholder="Enter Here" className="form-control" required onChange={(e) => this.setState({ currentPassword: e.target.value })} /><br />
                            <label>Enter New Password </label>
                            <input placeholder="Enter Here" className="form-control" required onChange={(e) => this.setState({ password: e.target.value })} /><br />
                            {this.state.spin1 ? <div style={{ textAlign: 'center' }}><Spin /></div> : <div style={{ textAlign: 'center' }}><button className="btn btn-success" type="submit">Submit</button></div>}
                          </form>
                        </div></div> : null}













                    </div>




                  </div>
                    : null}


                </div>
              </Content>
            </Layout>


          </Layout>
          <div>

            <Footer>Student Footer</Footer>
          </div>
        </div> : <div style={{
          padding: '100%',
          background: '#001529',
          textAlign: 'center', position: "fixed",
          top: '50%',
          left: '50%',

          transform: "translate(-50%, -50%)"
        }}> <Spin indicator={antIcon} /></div>}
      </div>


    );
  }
}

export default StudentDashboard

//-webkit-linear-gradient(left, #3931af, #00c6ff)