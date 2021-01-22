import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Axios from 'axios';
import { save } from 'save-file'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function StudyMaterial() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat('studymaterial'), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            res.data.msg.reverse()

            setData(res.data.msg)
        })
    }, [])

    const download = (e) => {
        setOpen(true)
        console.log(e);
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getstudymaterial"), { Key: e }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            save(res.data.Body, e)
            setOpen(false)
        })
    }

    return (
        <div>
            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Study Material</p><hr />
            <table className="table" style={{ textAlign: 'center', border: '2px solid ' }}>
                <thead style={{ backgroundColor: '#001529', color: 'white' }}>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(data => (
                        <tr>
                            <td>{data.Name}</td>
                            <td>{data.Subject}</td>
                            <td><button onClick={() => download(data.Key)} className="btn btn-success">Download</button></td>
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

export default StudyMaterial
