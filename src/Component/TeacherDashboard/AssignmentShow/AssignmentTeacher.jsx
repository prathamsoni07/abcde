import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { save } from 'save-file'
import { Spin } from 'antd';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie'
import {Button} from 'react-bootstrap'



const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


function AssignmentTeacher() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [evaluate, setEvaluate] = useState(false);
    const [sclass, setSclass] = useState('');
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [sdata, setSdata] = useState([]);
    const [spin, setSpin] = useState(false)
    const [spin1, setSpin1] = useState(false)
    const [open, setOpen] = useState(false);


    useEffect(() => {
        console.log("useEffect Called");
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherassignment"), { hello: 'dfds' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data.msg);
            res.data.msg.reverse();
            setData(res.data.msg)
            setSpin(true)
        })
    }, [])



    const download = (e) => {
        setOpen(true)
        console.log(e);

        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getassignment"), { Key: e }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            save(res.data.Body, e)
            setOpen(false)
        })
    }

    const check = (e) => {
        console.log(e.AssignmentId);
        setEvaluate(true)
        setSpin1(false)
        setSclass(e.Class)
        setBranch(e.Branch)
        setSection(e.Section)

        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getstudentsassignment"), { AssignmentId: e.AssignmentId }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            if (res.data.success === false) {
                alert(res.data.msg)
                setEvaluate(false)
                return false
            } else {
                setSdata(res.data)
                setSpin1(true)
            }





        })
    }

    const back = () => setEvaluate(false)

    if (evaluate) {
        return (
            <div>
                {spin1 ? <div> <Button className="btn" variant="outline-danger" onClick={back}>Previous page</Button><br /><br />
                    <label style={{ color: 'green' }}>Class : {sclass}, Branch : {branch}, Section : {section}</label>
                    <table className="table" style={{ border: '2px solid', textAlign: 'center' }} >
                        <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th> Student Submission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sdata.map(data => (
                                <tr id={data.AssignmentId}>
                                    <td>{data.EnrollmentNo}</td>
                                    <td>{data.Name}</td>
                                    <td><button value={data.Key} onClick={(e) => download(e.target.value)} className="btn btn-info">Download</button></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div> : <div style={{ textAlign: 'center' }}> <Spin /> </div>}

                <Backdrop className={classes.backdrop} open={open} >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </div>
        )
    }

    return (
        <div>
            {spin ?
                <div>
                    <hr /><div style={{ textAlign: 'center' }}><label style={{ fontSize: 25 }}>Assignment Page</label></div><hr /><br />
                    <table className="table" style={{ border: '3px solid #001529' }}>
                        <thead style={{ backgroundColor: '#001529', color: 'white' }}>
                            <tr>
                                <th>Assignment Name</th>
                                <th>Class</th>
                                <th>Branch</th>
                                <th>Section</th>
                                <th>Submission Date</th>
                                <th>Download</th>
                                <th>Evaluate</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(data => (
                                <tr>
                                    <td>{data.Name}</td>
                                    <td>{data.Class}</td>
                                    <td>{data.Branch}</td>
                                    <td>{data.Section}</td>
                                    <td>{data.SubmissionDate}</td>
                                    <td><button value={data.Key} onClick={(e) => download(e.target.value)} className="btn btn-info">Download</button></td>
                                    <td><button onClick={() => check(data)} className="btn btn-primary">Evaluate</button></td>


                                </tr>

                            ))}
                        </tbody>

                    </table></div> : <div style={{ textAlign: 'center' }}> <Spin /> </div>}

            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    )
}

export default AssignmentTeacher
