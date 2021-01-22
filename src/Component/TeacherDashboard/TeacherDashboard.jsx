import React from 'react';
import 'antd/dist/antd.css';
import '../FrontPage/FrontPage.css';
import { Layout, Menu, Spin, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  FieldTimeOutlined,
  UploadOutlined,
  ProfileOutlined,
  CalendarOutlined,
  IdcardOutlined,
  FormOutlined,
  SnippetsOutlined


} from '@ant-design/icons';
import QuizUpload from './QuizUpload/QuizUpload';
import QuizResult from './QuizUpload/QuizResult';
import AssignmentUpload from './AssignmentUpload/AssignmentUpload';
import StudyMaterial from './StudyMaterial/StudyMaterial';
import Attendence from './Attendence/Attendence';
import TeacherCalender from './TeacherCalender/TeacherCalender';
import AssignmentTeacher from './AssignmentShow/AssignmentTeacher';
import Axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string'
import { LoadingOutlined } from '@ant-design/icons';
import TimeTableT from './TimeTable/TimeTableT';
import StudentDetails from '../PrincipalDashboard/StudentDetails/StudentDetails';


const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const { Header, Sider, Content, Footer } = Layout;

class TeacherDashboard extends React.Component {
  state = {
    collapsed: true,
    quiz: false,
    result: false,
    assignment: false,
    study: false,
    attendenceShow: false,
    calender: true,
    ashow: false,
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
    timeTable: false,
    assignedClass: '',
    assignedBranch: '',
    assignedSection: '',
    StudentShow: false,

  };



  componentDidMount = () => {
    console.log("component TEacher called");
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
            enrollNo: res.data.data.FacultyId,
            email: res.data.data.EmailId,
            phone: res.data.data.Mobile,
            dob: res.data.data.Dob,
            aadhar: res.data.data.AadharId,
            caste: res.data.data.Caste,
            gender: res.data.data.Gender,
            childId: res.data.data.PanId,
            religion: res.data.data.Religion,
            address: res.data.data.HomeAddress,
            pincode: res.data.data.Pincode,
            profileImg: base64String,
            currentAddress: res.data.data.CurrentAddress,
            guardianName: res.data.data.Experience,
            guardianMobile: res.data.data.SubjectSpecialization,
            class: res.data.data.FacultyDesignation,
            branch: res.data.data.DateOfJoining,
            section: res.data.data.Qualification,
            parentsEmail: res.data.data.ParentEmail,
            fatherName: res.data.data.FatherName,
            motherName: res.data.data.HusbandWife,
            parentsOccupation: res.data.data.MaritalStatus,

            assignedClass: res.data.AssignedClass,
            assignedBranch: res.data.AssignedBranch,
            assignedSection: res.data.AssignedSection
          })

        })






        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getSchooldata"), { data: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
          console.log(res.data);
          let c = new Uint8Array(res.data.file.Body.data)
          const STR = c.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STR)
          this.setState({ schoolLogo: base64String, schoolName: res.data.Name, spin: true })

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

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  quizShow = () => {
    this.setState({
      quiz: true,
      result: false,
      assignment: false,
      study: false,
      attendenceShow: false,
      calender: false,
      ashow: false,
      profileshow: false,
      timeTable: false,
      StudentShow: false,





    })
  }

  resultShow = () => {
    this.setState({
      quiz: false,
      result: true,
      assignment: false,
      study: false,
      attendenceShow: false,
      calender: false,
      ashow: false,
      profileshow: false,
      timeTable: false,
      StudentShow: false,






    })
  }


  assignmentShow = () => {
    this.setState({
      quiz: false,
      result: false,
      assignment: true,
      study: false,
      attendenceShow: false,
      calender: false,
      ashow: false,
      profileshow: false,
      timeTable: false,
      StudentShow: false,






    })
  }
  studyMaterial = () => {
    this.setState({
      quiz: false,
      result: false,
      assignment: false,
      study: true,
      attendenceShow: false,
      calender: false,
      ashow: false,
      profileshow: false,
      timeTable: false,
      StudentShow: false,






    })
  }

  attendence = () => {
    this.setState({
      quiz: false,
      result: false,
      assignment: false,
      study: false,
      attendenceShow: true,
      calender: false,
      ashow: false,
      profileshow: false,
      timeTable: false,
      StudentShow: false,






    })
  }

  calenderShow = () => {
    this.setState({
      quiz: false,
      result: false,
      assignment: false,
      study: false,
      attendenceShow: false,
      calender: true,
      ashow: false,
      profileshow: false,
      timeTable: false,
      StudentShow: false,






    })
  }

  assignment = () => {
    this.setState({
      quiz: false,
      result: false,
      assignment: false,
      study: false,
      attendenceShow: false,
      calender: false,
      ashow: true,
      profileshow: false,
      timeTable: false,
      StudentShow: false,







    })
  }

  Profile = () => {
    this.setState({
      quiz: false,
      result: false,
      assignment: false,
      study: false,
      attendenceShow: false,
      calender: false,
      ashow: false,

      profileshow: true,
      timeTable: false,
      StudentShow: false,


    })
  }


  timeTableShow = () => {
    this.setState({
      quiz: false,
      result: false,
      assignment: false,
      study: false,
      attendenceShow: false,
      calender: false,
      ashow: false,

      profileshow: false,
      timeTable: true,
      StudentShow: false,


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
  logout = () => {
    var d = window.confirm("Leave Site")
    if (d) {
      this.setState({ spin: false })
      Axios.post(process.env.REACT_APP_SECURITY_API.concat("logout"), { hello: 'logout' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
        console.log(res.data);
        Cookies.remove("Authorization")
        this.props.history.push('/')
      })
    } else return false


  }

  studentDetails = () => {
    this.setState({
      StudentShow: true,



      quiz: false,
      result: false,
      assignment: false,
      study: false,
      attendenceShow: false,
      calender: false,
      ashow: false,

      profileshow: false,
      timeTable: false


    })
  }

  render() {
    const { name, role, enrollNo, email, phone, dob, aadhar, caste, gender, childId, religion, address, pincode, profileImg, changepassword, fatherName, motherName, guardianMobile, guardianName,
      branch, section, currentAddress, parentsOccupation, parentsEmail, schoolName, assignedClass, assignedBranch, assignedSection } = this.state
    return (
      <div>
        {this.state.spin ? <div>
          <Layout>
            <Sider breakpoint="xs" className="sider" trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" style={{ color: "white", paddingBottom: 80 }} > {this.state.collapsed ? <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ marginTop: '20%', height: '50px', width: '50px' }} /> : <div style={{ textAlign: 'center', fontFamily: 'cursive' }}> {this.state.enrollMentid}   Teacher Dashboard </div>} </div>
              <Menu className='nav' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="8" onClick={this.Profile} icon={<UserOutlined />}>Profile </Menu.Item>
                <Menu.Item key="1" onClick={this.calenderShow} icon={<ScheduleOutlined />}>Schedule</Menu.Item>
                <Menu.Item key="5" onClick={this.attendence} icon={<CalendarOutlined />}>Attendence </Menu.Item>
                <Menu.Item key="6" onClick={this.quizShow} icon={<FormOutlined />}> Upload Quiz</Menu.Item>
                <Menu.Item key="2" onClick={this.resultShow} icon={<SnippetsOutlined />}> Quiz Result</Menu.Item>
                <Menu.Item key="4" onClick={this.studyMaterial} icon={<IdcardOutlined />}> Study Material</Menu.Item>
                <Menu.Item key="3" onClick={this.assignmentShow} icon={<UploadOutlined />}> Upload Assignment</Menu.Item>
                <Menu.Item key="7" onClick={this.assignment} icon={<ProfileOutlined />}>Assignment Result</Menu.Item>
                <Menu.Item key="11" onClick={this.studentDetails} icon={<SolutionOutlined />}>Student Details</Menu.Item>
                <Menu.Item key="9" onClick={this.timeTableShow} icon={<FieldTimeOutlined />}>Exam Time Table </Menu.Item>
                <Menu.Item key="10" onClick={this.logout} icon={<LogoutOutlined />}>Sign out </Menu.Item>
              </Menu>


            </Sider>
            <Layout className="site-layout">
              <div className="mobileHidden">    <Header className="site-layout-background" style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, textAlign: 'left' }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                  style: { fontSize: 30, zIndex: 10 }
                })}


                <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 25, marginTop: -50, textAlign: 'center' }} >  <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ height: '50px', width: '50px', marginRight: '1%' }} />{this.state.schoolName}  <span style={{ float: 'right', marginRight: '2%', cursor: 'pointer' }} onClick={this.Profile}> <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" src={`data:image/jpeg;base64,${profileImg}`} icon={<UserOutlined />} /></span></p>

              </Header></div>
              <div className="mobileVisible" style={{ backgroundColor: 'white' }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: this.toggle,
                  style: { fontSize: 25, zIndex: 10, marginTop: '4%' }
                })} <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, marginTop: -27, marginLeft: 60 }} >Teacher Dashboard </p>
              </div>

              <Content
                className="site-layout-background"
                style={{
                  margin: '30px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >

                {this.state.quiz ? <QuizUpload /> : null}
                {this.state.result ? <QuizResult /> : null}
                {this.state.assignment ? <AssignmentUpload /> : null}
                {this.state.study ? <StudyMaterial /> : null}
                {this.state.attendenceShow ? <Attendence /> : null}
                {this.state.calender ? <TeacherCalender /> : null}
                {this.state.ashow ? <AssignmentTeacher /> : null}
                {this.state.timeTable ? <TimeTableT /> : null}
                {this.state.StudentShow ? <StudentDetails schoolName={schoolName} /> : null}



                {this.state.profileshow ?








                  <div>

                    <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Profile Page</p><hr />

                    <div className="container" style={{ background: '-webkit-linear-gradient(left, #3931af, #00c6ff)' }}>
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
                                  <h6 className="mb-0">Designation </h6>
                                  <span className="text-secondary">{this.state.class}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <h6 className="mb-0">Assigned Class   </h6>
                                  <span className="text-secondary">{assignedClass}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <h6 className="mb-0">Assigned Branch </h6>
                                  <span className="text-secondary">{assignedBranch}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <h6 className="mb-0">Assigned Section </h6>
                                  <span className="text-secondary">{assignedSection}</span>
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
                                        <h6 className="mb-0">Marital Status</h6>
                                        <span className="text-secondary">{parentsOccupation}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Husband/Wife Name</h6>
                                        <span className="text-secondary">{motherName}</span>
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
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Qualification</h6>
                                        <span className="text-secondary">{section}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Date Of Joining</h6>
                                        <span className="text-secondary">{branch}</span>
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
                                        <span className="text-secondary">{guardianName}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Main Subject </h6>
                                        <span className="text-secondary">{guardianMobile}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Aadhar Id</h6>
                                        <span className="text-secondary">{aadhar}</span>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Pan No</h6>
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
                          <h5 className="d-flex align-items-center mb-3">Change Password</h5>

                          <label>Enter Current Password</label>
                          <input placeholder="Enter Here" className="form-control" required onChange={(e) => this.setState({ currentPassword: e.target.value })} /><br />
                          <label>Enter New Password </label>
                          <input placeholder="Enter Here" className="form-control" required onChange={(e) => this.setState({ password: e.target.value })} /><br />
                          {this.state.spin1 ? <div style={{ textAlign: 'center' }}><Spin /></div> : <div style={{ textAlign: 'center' }}><button className="btn btn-success" type="submit">Submit</button></div>}
                        </form>
                      </div></div> : null}
                  </div> : null}




              </Content>
            </Layout>


          </Layout>

          <div>

            <Footer>Student Footer</Footer>
          </div>
        </div> : <div style={{
          textAlign: 'center', position: "fixed",
          top: '50%',
          left: '50%',

          transform: "translate(-50%, -50%)"
        }}> <Spin indicator={antIcon} /></div>}
      </div>


    );
  }
}

export default TeacherDashboard

