import React from 'react';
import 'antd/dist/antd.css';
import '../FrontPage/FrontPage.css';
import { Layout, Menu, Spin, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  LogoutOutlined,
  ProfileOutlined,
  FieldTimeOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import StudentCard from './StudentMenu/StudentCard';
import TeacherCard from './TeacherMenu/TeacherCard';
import TimeTableCard from './TImeTableMenu/TimeTableCard';
import Axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string'
import { LoadingOutlined } from '@ant-design/icons';





const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const { Header, Sider, Content, Footer } = Layout;


class ManageMentDashboard extends React.Component {
  state = {
    collapsed: false,
    Studentclick: true,
    TeacherClick: false,
    updatestudent: false,
    timeTable: false,
    photo: '',
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
    panNo: '',
    religion: '',
    address: '',
    pincode: '',
    profileImg: '',
    changepassword: false,
    currentPassword: '',
    password: '',
    spin1: false,
    schoolEmail: '',
    schoolPhone: '',
    schoolCode: ''
  };






  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  enrollClicked = () => {
    this.setState({
      Studentclick: true,
      TeacherClick: false,
      updatestudent: false,
      timeTable: false,
      profileshow: false
    })
  }
  enrollteacher = () => {
    this.setState({
      Studentclick: false,
      TeacherClick: true,
      updatestudent: false,
      timeTable: false,
      profileshow: false

    })
  }
  updateStudent = () => {
    this.setState({
      Studentclick: false,
      TeacherClick: false,
      updatestudent: true,
      timeTable: false,
      profileshow: false
    })
  }
  timeTableUpload = () => {
    this.setState({
      Studentclick: false,
      TeacherClick: false,
      updatestudent: false,
      timeTable: true,
      profileshow: false
    })
  }
  Profile = () => {
    this.setState({
      Studentclick: false,
      TeacherClick: false,
      updatestudent: false,
      timeTable: false,
      profileshow: true
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

        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getSchooldata"), { data: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
          console.log(res.data);
          let c = new Uint8Array(res.data.file.Body.data)
          const STR = c.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(STR)
          this.setState({
            schoolLogo: base64String, schoolName: res.data.Name, spin: true, schoolEmail: res.data.Email,
            schoolPhone: res.data.Contact, schoolCode: res.data.SchoolId
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

  render() {



    const { name, role, enrollNo, email, phone, dob, aadhar, caste, gender, panNo, religion, address, pincode, profileImg, changepassword, schoolEmail, schoolName, schoolPhone, schoolCode } = this.state
    return (
      <div>

        {this.state.spin ? <div>     <Layout>
          <Sider breakpoint="xs" className="sider" trigger={null} collapsible collapsed={this.state.collapsed} >
            <div className="logo" style={{ color: "white", paddingBottom: 80 }} > {this.state.collapsed ? <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ marginTop: '20%', height: '50px', width: '50px' }} /> : <div style={{ textAlign: 'center', fontFamily: 'cursive' }}> {this.state.enrollMentid}   Management Dashboard </div>} </div>
            <Menu className='nav' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="5" onClick={this.Profile} icon={<UserOutlined />}>
                Profile       
            </Menu.Item>  
            <Menu.Item key="1" onClick={this.enrollClicked} icon={<ProfileOutlined />}>
                Student Menu
            </Menu.Item>
              <Menu.Item key="2" onClick={this.enrollteacher} icon={<IdcardOutlined />}>
                Teacher Menu
            </Menu.Item>
              <Menu.Item key="3" onClick={this.updateStudent} icon={<UploadOutlined />}>
                Update Student Details
            </Menu.Item>
              <Menu.Item key="4" onClick={this.timeTableUpload} icon={<FieldTimeOutlined />}>
                Time Table
            </Menu.Item>
            <Menu.Item key="6" onClick={this.logout} icon={<LogoutOutlined />}>
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


              <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 25, marginTop: -50, textAlign: 'center' }} >  <img src={`data:image/jpeg;base64,${this.state.schoolLogo}`} style={{ height: '50px', width: '50px', marginRight: '1%' }} />{this.state.schoolName}  <span style={{ float: 'right', marginRight: '2%', cursor: 'pointer' }} onClick={this.Profile}> <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" src={`data:image/jpeg;base64,${profileImg}`} icon={<UserOutlined />} /></span> </p>

            </Header></div>
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
                {this.state.Studentclick ? <StudentCard /> : null}
                {this.state.TeacherClick ? <TeacherCard schoolName={this.state.schoolName} /> : null}
                {this.state.timeTable ? <TimeTableCard /> : null}
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
                                  <h4>{name[0].toUpperCase() +
                                    name.slice(1)}</h4>
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
                        <h5 className="d-flex align-items-center mb-3">Change Password</h5>

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
            <Footer>ManageMent Footer</Footer>
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

export default ManageMentDashboard




// footer.style
// style={{
//   position: 'absolute',
//   bottom: 0,
//   width: '100%',
//   height: '2.5rem'
// }}