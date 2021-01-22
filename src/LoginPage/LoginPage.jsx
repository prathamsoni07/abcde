import React, { useState, useEffect } from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import { Layout } from 'antd';
import img from '../Untitled-22.png';
import './Login.css'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const { Header, Footer, Content } = Layout;
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const a = Cookies.get("Authorization")

    useEffect(() => {
        console.log("useEffect Caleed");
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("direct"), { data: 'check' }, { headers: { Authorization: a } }).then((res) => {
            console.log(res.data);

            if (res.data.success === true) {
                switch (res.data.msg.Role) {
                    case "Admin":
                        history.push(`/admin?enrollMentid=${res.data.msg.EnrollmentNo}?id`)
                        break;
                    case "Teacher":
                        history.push(`/teacher?enrollMentid=${res.data.msg.EnrollmentNo}?id`)
                        break;
                    case "Student":
                        history.push(`/student?enrollMentid=${res.data.msg.EnrollmentNo}?id`)
                        break;
                    case "SuperAdmin":
                        history.push(`/sadmin`)
                        break;
                    case "Principal":
                        history.push(`/principal?enrollMentid=${res.data.msg.EnrollmentNo}?id`)
                        break;
                    case "Parents":
                        history.push(`/parents?enrollMentid=${res.data.msg.EnrollmentNo}?id`)
                        break;
                    default:
                        history.push("/")


                }
            } else history.push("/")
        })

    }, [])



    function submitHandle(e) {
        e.preventDefault();
        setOpen(true)
        console.log(userName);
        console.log(password);
        var Data = {
            username: userName,
            password: password
        }

        var d = JSON.stringify(Data).length
        var e = d.toString();
        Axios.post(process.env.REACT_APP_SECURITY_API.concat('login'), Data).then((res) => {
            console.log(res.data);


            if (res.data.success === true) {
                switch (res.data.msg.Role) {
                    case "Admin":
                        Cookies.set("Authorization", res.data.msg.token)

                        history.push(`/admin?enrollMentid=${userName}?id`)
                        break;
                    case "Teacher":
                        Cookies.set("Authorization", res.data.msg.token)

                        history.push(`/teacher?enrollMentid=${userName}?id`)
                        break;
                    case "Student":
                        Cookies.set("Authorization", res.data.msg.token)

                        history.push(`/student?enrollMentid=${userName}?id`)
                        break;
                    case "SuperAdmin":
                        Cookies.set("Authorization", res.data.msg.token)

                        history.push(`/sadmin`)
                        break;

                    case "Principal":
                        Cookies.set("Authorization", res.data.msg.token)
                        history.push(`/principal?enrollMentid=${userName}?id`)
                        break;
                    case "Parents":
                        Cookies.set("Authorization", res.data.msg.token)
                        history.push(`/parents?enrollMentid=${userName}?id`)
                        break;
                    default:
                        history.push("/")


                }
            } else {
                alert(res.data.msg)
                setOpen(false)
                return false
            }
        }).catch(err => {
            if (err) {
                alert("Something went wrong")
                setOpen(false)
                return false
            }
        })



    }


    return (
        <div >

            <Layout className="time">
                <div  >    <Header style={{ color: 'white', paddingBottom: '4%', fontSize: 30 }} >
                    <img src={img} alt=""
                        style={{ marginLeft: '20%' }}
                        width="140"
                        height="90"
                    />  <span style={{}} >Urban</span><span style={{ color: 'orange' }}> Educate</span>
                </Header></div>
                <Content>
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: '10%' }}>
                        <div style={{ width: '50%', }}>




                            <CardGroup>
                                <Card>
                                    <Card.Header className="he" style={{ textAlign: 'center' }}>Sign In   </Card.Header>
                                    <form onSubmit={submitHandle}> <Card.Body>
                                        <label>Username  </label>  <input required onChange={(e) => setUserName(e.target.value.toUpperCase())} style={{ height: '25%' }} className="form-control" />
                                        <label>Password </label> <input required onChange={(e) => setPassWord(e.target.value)} style={{ height: '25%' }} className="form-control" /><br />


                                    </Card.Body><br />
                                        <Card.Footer style={{ textAlign: 'center' }}>
                                            <button type="submit" className="btn  " style={{ width: '100%', fontFamily: "'Merriweather', serif", backgroundColor: '#001529', color: 'white' }}>Sign In</button>

                                            <div style={{ textAlign: 'left' }}><a className="btn btn-link" href="/forgot" >Forgot password ? </a></div>

                                        </Card.Footer>
                                    </form> </Card>
                                <Card style={{ backgroundColor: '#001529' }} >

                                    <span style={{ fontSize: 25, color: 'white', marginTop: '20%', textAlign: 'center', fontFamily: "'Merriweather', serif" }}>Welcome Back</span>
                                </Card>
                            </CardGroup>

                        </div></div>




                </Content>
                <br /><br /><br /><br /><br /><br />
                <Footer>
                    Footer<p></p>
                Footer<p></p>
                Footer<p></p>
                Footer<p></p>

                </Footer>
            </Layout>

            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default LoginPage



