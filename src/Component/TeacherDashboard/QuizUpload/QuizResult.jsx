import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import xlsx from 'xlsx';
import { Spin } from 'antd';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie'



const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


function QuizResult() {
    const [resultShow, setResultShow] = useState(false);
    const [quizData, setQuizData] = useState([]);
    const [spin, setSpin] = useState(false)
    const [loading, setLoading] = useState(false)
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("useEffect called");
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("quizdata"), { hello: "dsfds" }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            res.data.reverse()
            setQuizData(res.data)
            setSpin(true)
        })
    }, [])
    const back = () => setResultShow(false)


    function submitHandle(e) {
        console.log(e);
        setOpen(true)
        Axios.post(process.env.REACT_APP_SECURITY_API.concat('quizresultshow'), { QuizId: e }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            xl(res.data)
            setOpen(false)
        })
    }


    function xl(records) {
        var worksheet = xlsx.utils.json_to_sheet(records)
        var wb = xlsx.utils.book_new()

        xlsx.utils.book_append_sheet(wb, worksheet, 'xl')
        xlsx.writeFile(wb, "Result.xlsx")

    }






    return (
        <div>
            {spin ? <table className="table" style={{ border: '3px solid #001529', textAlign: 'center' }}>
                <thead style={{ backgroundColor: '#001529', color: 'white' }}>
                    <tr >
                        <th>Quiz Date</th>
                        <th>Quiz Name</th>
                        <th>Class</th>
                        <th>Branch</th>
                        <th>Section</th>
                        <th>See Result</th>
                    </tr>
                </thead>
                <tbody>


                    {quizData.map(data => (
                        <tr key={data.QuizId}>
                            <td>{data.Date}</td>
                            <td>{data.Name}</td>
                            <td>{data.Class}</td>
                            <td>{data.Branch}</td>
                            <td>{data.Section}</td>
                            <td><button className="btn btn-info" disabled={loading} onClick={() => submitHandle(data.QuizId)}>Download Result</button></td>

                        </tr>
                    ))}


                </tbody>
            </table> : <div style={{ textAlign: 'center' }}> <Spin /> </div>}
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    )
}

export default QuizResult
