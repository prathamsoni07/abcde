import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { save } from 'save-file'
import { Spin } from 'antd';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Alert , Button } from 'react-bootstrap';
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function AssignmentShow() {
    const [data, setData] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState(false);
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentId, setAssignmentId] = useState('');
    const [file, setFile] = useState('');
    const [spin, setSpin] = useState(false)
    
    useEffect(() => {
        console.log("useEffectCalled")
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("assignmentshowclass"), { hello: "hello" }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data)
            res.data.reverse()
            setData(res.data)
        })
    }, [])


    async function downloadAssignment(e) {
        console.log(e);
        setOpen(true)
        await Axios.post(process.env.REACT_APP_SECURITY_API.concat("getassignment"), { Key: e }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            save(res.data.Body, e)
            setOpen(false)

        })
    }

    function imageHandler(e) {

        const imageFile = e.target.files[0];
        console.log(e.target.files)
        console.log(e.target.files.length)
        if (e.target.files.length === 0) {
            return false
        } else {
            console.log(imageFile);
            const isLt2M = imageFile.size / 1024 / 1024 < 10;
            console.log(isLt2M);


            if (!isLt2M) {
                NotificationManager.warning('Image must smaller than 10MB!');
                return false
            }


            if (!imageFile.name.match(/\.(pdf|PDF)$/)) {
                NotificationManager.warning("Please select valid file.")

                return false;
            }
            const reader = new FileReader();

            if (imageFile && isLt2M) {
                reader.onload = () => {
                    if (reader.readyState === 2) {

                        setFile(imageFile)

                    }
                }
                reader.readAsDataURL(e.target.files[0])

            }

        }




    }

    function check(e) {
        setAssignmentName(e.Name)
        setAssignmentId(e.AssignmentId)
        setUpload(true)
        console.log(e.Name);
    }
    console.log(assignmentId);
    function submitHandle(e) {
        e.preventDefault()

        var d = window.confirm("Submit Assignment")
        if (d) {
            setSpin(true)
            console.log(assignmentId);
            console.log(file);
            const formdata = new FormData();
            formdata.append("AssignmentId", assignmentId)
            formdata.append("file", file)

            Axios.post(process.env.REACT_APP_SECURITY_API.concat("assignmentsubmit"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                alert(res.data.msg)
                setSpin(false)
                setUpload(false)
            })

        } else return false




    }
    const back = () => setUpload(false)


    if (upload) {
        return (<div  >
            <Button variant="outline-danger" onClick={back} disabled={spin} className="btn" >Back</Button><br />
            <Alert variant="warning" >
                <NotificationContainer />  </Alert>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div className="card" style={{ width: '50%', textAlign: 'center' }} >
                    <label className="card-header" >Upload Assignment</label>
                    <form className="card-body" onSubmit={submitHandle} >

                        <label > Assignment Name : <span style={{ color: 'red' }}>{assignmentName}</span></label><br />
                        <input type="file" className="btn btn-light" required onChange={imageHandler} /><br /><br />
                        {spin ? <Spin /> : <button type="submit" className="btn btn-primary" style={{ width: '30%' }}>Submit </button>}
                    </form></div>
            </div>
        </div>
        )
    }



    return (
        <div>
            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Assignment</p><hr />


            <table className="table" style={{ textAlign: 'center', border: '3px solid #001529' }}>
                <thead style={{ backgroundColor: '#001529', color: 'white' }}>
                    <tr>
                        <th>Name</th>
                        <th>Submission Date</th>
                        <th>Download Assignment</th>
                        <th>Upload Assignment</th>

                    </tr></thead>
                <tbody>

                    {data.map(data => (
                        <tr key={data.AssignmentId}>
                            <td>{data.Name}</td>
                            <td>{data.SubmissionDate}</td>
                            <td >  <button value={data.Key} className="btn btn-info" onClick={(e) => downloadAssignment(e.target.value)}>Download  </button></td>
                            <td > <button id={data.AssignmentId} className="btn btn-success" onClick={() => check(data)} >Upload</button> </td>

                        </tr>
                    ))}


                </tbody>


            </table>

            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>




        </div>
    )
}

export default AssignmentShow
