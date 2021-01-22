import React, { useState, useEffect } from 'react'
import { Radio } from 'antd';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Alert } from 'react-bootstrap'
import Axios from 'axios';
import { Spin } from 'antd';
import Cookies from 'js-cookie'


const attendenceOptions = ['P', 'A', 'L'];

function Attendence() {
    const [data, setData] = useState([])
    const [attendence, setAttendence] = useState([]);
    const [wshow, setWshow] = useState(false);
    const [pClass, setPCLass] = useState('');
    const [branch, setBranch] = useState('')
    const [section, setSection] = useState('');
    const [adisable, setAdisable] = useState(true);
    const [spin, setSpin] = useState(false)



    useEffect(() => {
        console.log(attendence);
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("studentdetails3"), { hello: 'Dfdsfsa' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setSpin(true)
            if (res.data.uploaded === true) {
                alert("already uploaded")
                setData(res.data.data.data)
                setPCLass(res.data.data.Class)
                setBranch(res.data.data.Branch)
                setSection(res.data.data.Section)
                setAdisable(true)

                return false
            } else {
                setData(res.data.data.data)
                setPCLass(res.data.data.Class)
                setBranch(res.data.data.Branch)
                setSection(res.data.data.Section)
                setAdisable(false)
            }

        })

    }, [])
    function handleSubmit(e) {
        console.log("function called");
        e.preventDefault()
        console.log(attendence);
        var fr = false


        data.map(data => {
            console.log(data);
            var d = attendence.find(o => o.RollNo === data.RollNo)
            console.log(d);

            if (!d) {
                NotificationManager.warning(`Please Select Any One Field in Attendence Of Roll No ${data.RollNo}`)
                fr = false
                return false;
            } else {
                fr = true
            }
        })


        if (fr) {
            var d = window.confirm("Upload Student Attendence")
            if (d) {

                var Data = {
                    Class: pClass,
                    Branch: branch,
                    Section: section,
                    attendence: attendence
                }

                Axios.post(process.env.REACT_APP_SECURITY_API.concat("attendenceupload"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                    console.log(res.data.msg);
                    alert(res.data.msg);
                })
            } else return false
        } else return false


    }




    return (


        <div >
            {spin ? <div>
                <label style={{ fontSize: 30 }}>Attendence Page</label>
                {wshow ? <Alert variant='warning' style={{ fontFamily: 'Allerta Stencil sans-serif' }}>
                    <NotificationContainer />

                </Alert> : null}<br />
                <label style={{ color: 'green' }}>Class : <span style={{ color: 'red' }}> {pClass} </span> , Branch : <span> {branch}  </span> , Section : <span style={{ color: 'red' }}> {section} </span> </label>
                <fieldset disabled={adisable}>    <form onSubmit={handleSubmit}>



                    <table className="table" style={{ textAlign: 'center', border: '3px solid #001529' }}>
                        <thead style={{ backgroundColor: '#001529', color: 'white' }}>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>

                                <th>Attendence</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(data => (
                                <tr>
                                    <td>{data.Name}</td>
                                    <td>{data.RollNo}</td>


                                    <td>
                                        <Radio.Group options={attendenceOptions} onChange={(e) => {
                                            var Find = attendence.find(o => o.RollNo == data.RollNo)
                                            var Find2 = attendence.indexOf(Find)


                                            if (Find) {
                                                attendence.splice(Find2, 1)
                                                attendence.push({ RollNo: data.RollNo, Status: e.target.value })

                                            } else {
                                                attendence.push({ RollNo: data.RollNo, Status: e.target.value })
                                            }




                                        }} />
                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                    <button type='submit' className={adisable ? "btn btn-dark" : "btn btn-primary"} style={{width:"200px"}} onClick={() => setWshow(true)}  >  submit</button>
                </form></fieldset>
            </div> : <Spin />}
        </div>
    )
}

export default Attendence
