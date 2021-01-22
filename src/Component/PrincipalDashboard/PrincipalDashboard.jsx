import React from 'react';
import 'antd/dist/antd.css';
import '../FrontPage/FrontPage.css';
import { Layout, Menu, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  LoadingOutlined,
  IdcardOutlined,
  SolutionOutlined,
  SnippetsOutlined,
  FieldTimeOutlined

} from '@ant-design/icons';

import Axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string'
import SchoolDetails from './SchoolDetails/SchoolDetails';
import './SchoolDetails/Schooldetails.css'
import { Avatar } from 'antd';
import StudentDetails from './StudentDetails/StudentDetails';
import TeacherDetails from './TeacherDetails/TeacherDetails';
import ResultPage from './ResultPage/ResultPage';
import ClassTimeTable from './ClassTimeTable/ClassTimeTable';




const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const { Header, Sider, Content, Footer } = Layout;


class PrincipalDashboard extends React.Component {
  state = {
    collapsed: false,

    photo: '',
    schoolName: '',
    schoolLogo: '',
    enrollMentid: '',
    spin: false,
    profileshow: false,
    schoolprofileshow: false,
    StudentShow: false,
    TeacherShow: false,
    ResultShow: false,
    name: '',
    role: '',
    enrollNo: '',
    email: '',
    phone: '',
    dob: '',
    aadhar: '',
    caste: '',
    gender: '',
    panNo: '',
    religion: '',
    address: '',
    pincode: '',
    profileImg: '',
    changepassword: false,
    currentPassword: '',
    password: '',
    spin1: false,
    schoolData: [],
    schoolEmail: "",
    schoolPhone: '',
    schoolCode: '',
    classTimeTableShow: false

  };






  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  Profile = () => {
    this.setState({
      schoolprofileshow: false,
      StudentShow: false,
      TeacherShow: false,
      profileshow: true,
      ResultShow: false,
      collapsed: true,
      classTimeTableShow: false



    })
  }
  schoolProfile = () => {
    this.setState({
      schoolprofileshow: true,
      StudentShow: false,
      TeacherShow: false,
      profileshow: false,
      ResultShow: false,
      classTimeTableShow: false


    })
  }

  studentDetails = () => {
    this.setState({
      schoolprofileshow: false,
      StudentShow: true,
      TeacherShow: false,
      profileshow: false,
      ResultShow: false,
      classTimeTableShow: false

    })
  }
  componentDidMount = () => {
    console.log("component MAnagement called");
    Axios.post(process.env.REACT_APP_SECURITY_API.concat("verification"), { data: 'verification' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);
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
            email: res.data.data.EmailId,
            phone: res.data.data.Mobile,
            dob: res.data.data.Dob,
            aadhar: res.data.data.AadharId,
            caste: res.data.data.Caste,
            gender: res.data.data.Gender,
            panNo: res.data.data.Id,
            religion: res.data.data.Religion,
            address: res.data.data.HomeAddress,
            pincode: res.data.data.Pincode,
            profileImg: base64String
          })

        })

        Axios.post(process.env.REACT_APP_SECURITY_API.concat("schooldetail"), { data: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
          console.log(res.data);
          console.log(res.data.Data.Email[0]);
          let c = new Uint8Array(res.data.file.Body.data)
          const STR = c.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STR)
          this.setState({
            schoolLogo: base64String, schoolName: res.data.Data.Name, spin: true, schoolData: res.data, schoolEmail: res.data.Data.Email[0],
            schoolPhone: res.data.Data.Contact[0], schoolCode: res.data.Data.SchoolId
          })

        })

        const username1 = queryString.parse(window.location.href.split('?')[1])
        this.setState({ enrollMentid: username1.enrollMentid })
      }


    }).catch(err => {
      if (err) {
        this.props.history.push("/")

      }
    }

    )



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


  teacherDetails = () => {
    this.setState({
      schoolprofileshow: false,
      StudentShow: false,
      TeacherShow: true,
      profileshow: false,
      ResultShow: false,
      classTimeTableShow: false


    })
  }


  result = () => {
    this.setState({
      schoolprofileshow: false,
      StudentShow: false,
      TeacherShow: false,
      profileshow: false,
      ResultShow: true,
      classTimeTableShow: false


    })
  }

  classTimeTable = () => {
    this.setState({
      schoolprofileshow: false,
      StudentShow: false,
      TeacherShow: false,
      profileshow: false,
      ResultShow: false,
      classTimeTableShow: true


    })
  }

  render() {



    const { name, role, enrollNo, email, phone, dob, aadhar, caste, gender, panNo, religion, address, pincode, profileImg, changepassword,
      schoolEmail, schoolName, schoolPhone, schoolCode } = this.state
    return (
      <div>

        {this.state.spin ? <div>     <Layout>
          <Sider breakpoint="xs" className="sider" trigger={null} collapsible collapsed={this.state.collapsed} >
            <div className="logo" style={{ color: "white", paddingBottom: 80 }} > {this.state.collapsed ? <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ marginTop: '20%', height: '50px', width: '50px' }} /> : <div style={{ textAlign: 'center', fontFamily: 'cursive' }}> {this.state.enrollMentid}   Principal Dashboard </div>}


            </div>
            <Menu className='nav' theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ paddingBottom: "150%" }}>
            <Menu.Item key="5" onClick={this.Profile} icon={<UserOutlined />}>
                Profile       
            </Menu.Item>
            <Menu.Item key="1" onClick={this.schoolProfile} icon={<ProfileOutlined />}>
                School Profile
            </Menu.Item>
              <Menu.Item key="2" onClick={this.teacherDetails} icon={<IdcardOutlined />}>
                Teacher Details
            </Menu.Item>
              <Menu.Item key="3" onClick={this.studentDetails} icon={<SolutionOutlined />}>
                Student Details
            </Menu.Item>
            <Menu.Item key="4" onClick={this.result} icon={<SnippetsOutlined />}>
                Result Page
            </Menu.Item>
            <Menu.Item key="6" onClick={this.classTimeTable} icon={<FieldTimeOutlined />}>
                Time Table        
            </Menu.Item>
            <Menu.Item key="7" onClick={this.logout} icon={<LogoutOutlined />}>
                Sign Out
            </Menu.Item>

            </Menu>
          </Sider>
          <Layout className="site-layout">
            <div className="mobileHidden">    <Header className="site-layout-background" style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, textAlign: 'left' }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
                style: { fontSize: 30, zIndex: 10 }
              })}

              <div style={{ display: 'inline' }}>
                <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 25, marginTop: -50, textAlign: 'center' }} >  <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ height: '50px', width: '50px', marginRight: '1%' }} />{this.state.schoolName}  <span style={{ float: 'right', marginRight: '2%', cursor: 'pointer' }} onClick={this.Profile}> <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" src={`data:image/jpeg;base64,${profileImg}`} icon={<UserOutlined />} /></span>  </p>
                <div ></div>
              </div>  </Header></div>
            <div className="mobileVisible" style={{ backgroundColor: 'white' }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
                style: { fontSize: 25, zIndex: 10, marginTop: '4%' }
              })} <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, marginTop: -32, marginLeft: 60 }} >{this.state.schoolName} </p>
            </div>

            <Content
              className="site-layout-background"
              style={{
                margin: '30px 16px',
                padding: 24,
                minHeight: 280,

              }}
            >
              <div>

                {this.state.schoolprofileshow ? <SchoolDetails data={this.state.schoolData} /> : null}
                {this.state.StudentShow ? <StudentDetails schoolName={schoolName} /> : null}
                {this.state.TeacherShow ? <TeacherDetails schoolName={schoolName} /> : null}
                {this.state.ResultShow ? <ResultPage schoolName={schoolName} /> : null}
                {this.state.classTimeTableShow ? <ClassTimeTable schoolName={schoolName} /> : null}
                {this.state.profileshow ? <div>

                  <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Profile Page</p><hr />



                  <div className="container" style={{ background: '-webkit-linear-gradient(left, #3931af, #00c6ff)' }}>
                    <div className="main-body">




                      <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="d-flex flex-column align-items-center text-center">
                                <img src={`data:image/jpeg;base64,${profileImg}`} alt="Admin" className="rounded-circle" width="150" height="150" />
                                <div className="mt-3">
                                  <h4>{name}</h4>
                                  <p className="text-secondary mb-1">{role}</p>
                                  <p className="text-muted font-size-sm">{enrollNo}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card mt-3">

                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>School Id</h6>
                                <span className="text-secondary">{schoolCode}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">School Name</h6>
                                <span className="text-secondary">{schoolName}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">School Email </h6>
                                <span className="text-secondary">{schoolEmail}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0">School Phone </h6>
                                <span className="text-secondary">{schoolPhone}</span>
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
                                  <h6 className="mb-0">Address</h6>
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
                                      <h6 className="mb-0">Aadhar Id</h6>
                                      <span className="text-secondary">{aadhar}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                      <h6 className="mb-0">Pan No</h6>
                                      <span className="text-secondary">{panNo}</span>
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













                </div> : null}


              </div>


            </Content>
          </Layout>
        </Layout>
          <div  >
            <Footer>Principal Footer</Footer>
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

export default PrincipalDashboard




// footer.style
// style={{
//   position: 'absolute',
//   bottom: 0,
//   width: '100%',
//   height: '2.5rem'
// }}



