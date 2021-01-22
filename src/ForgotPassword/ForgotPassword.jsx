import React, { useState } from 'react'
import { Layout, Spin } from 'antd';
import img from '../Untitled-22.png';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;


function ForgotPassword() {
    const [show, setShow] = useState(true);
    const [userName, setUserName] = useState('');
    const history = useHistory()


    function submitHandle(e) {
        setShow(false)

        e.preventDefault()
        Axios.post(process.env.REACT_APP_SECURITY_API.concat('forgot'), { EnrollmentNo: userName }).then((res) => {
            console.log(res.data);
            alert(res.data.msg)
            setShow(true)
            history.push("/")
        })
    }
    return (
        <div>
            <div  >    <Header style={{ color: 'white', paddingBottom: '4%', fontSize: 30 }} >
                <img src={img} alt=""
                    style={{ marginLeft: '20%' }}
                    width="140"
                    height="90"
                />  <span style={{}} >Urban</span><span style={{ color: 'orange' }}> Educate</span>
            </Header></div>

            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="card" style={{ width: '40%' }}>
                    <label className="card-header" style={{ textAlign: 'center' }}>Reset Password</label>
                    <form className="card-body" onSubmit={submitHandle} >
                        <label > Enter Registered Email or Enrollment Id</label>
                        <input className="form-control" required placeholder="Enter Here" onChange={(e) => setUserName(e.target.value.toUpperCase())} /> <br />
                        {show ? <button type="submit" style={{ width: '35%', marginLeft: '35%' }} className="btn btn-success">Reset</button> : <div style={{ textAlign: 'center' }}><Spin /></div>}
                        <br />
                        <a href="/" className="btn btn-link" style={{ marginLeft: '77%' }}>Login Page ?</a>

                    </form>
                </div>       </div>
        </div>
    )
}

export default ForgotPassword
