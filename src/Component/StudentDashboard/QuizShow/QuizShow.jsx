import React, { useEffect, useState, useRef } from 'react';
import './Quiz.css'
import { Radio } from 'antd';
import Axios from 'axios';
import CountDownTime from 'react-countdown'
import { Spin } from 'antd';
import { LoadingOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Moment from 'moment';
import Cookies from 'js-cookie'

const antIcon = <LoadingOutlined style={{ fontSize: 100, textAlign: 'center' }} spin />;



function QuizShow() {
    const [userAnswer, setUserAnswer] = useState([])
    const [quizData, setQuizData] = useState([])
    const [data, setData] = useState([])
    const [mshow, setMshow] = useState(false);
    const [qid, setQid] = useState('');
    const [qname, setQname] = useState('');
    const [quiztime, setQuiztime] = useState('');
    const [spin, setSpin] = useState(false);
    const [spin1, setSpin1] = useState(false);
    const [bdisable, setBdisaable] = useState(true);
    const [endt, setEndt] = useState('');


    var date = new Date();
    let da = ("0" + date.getDate()).slice(-2)
    let da1 = ("0" + date.getMonth() + 1).slice(-2)
    let da3 = date.getFullYear()
    let da4 = date.getHours()
    let da5 = ("0" + date.getMinutes()).slice(-2)

    let fulldate = da3 + "-" + da1 + "-" + da + "T" + da4 + ":" + da5





    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };



    useEffect(() => {
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("quizshow"), { hello: 'hiii' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            console.log(res.data);
            if (res.data.success === false) {
                alert(res.data.msg + "fdsfafdf")
                setSpin(true)
                return false

            } else {

                res.data.reverse()

                setQuizData(res.data)
                setSpin(true)

            }

        })
    }, [])






    function handleSubmit(e) {
        e.preventDefault()
        console.log(userAnswer);
        var d = window.confirm("Finish Quiz")
        if (d) {
            setSpin1(false)
            var data = {
                QuizId: qid,
                Answer: userAnswer
            }
            console.log('sdfsadff');
            Axios.post(process.env.REACT_APP_SECURITY_API.concat("quizresultupload"), data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                alert(res.data.msg);
                setMshow(false)
            })
        }
    }






    function attemptQuiz(e) {

        var date1 = new Date()
        let d1 = ("0" + date1.getDate()).slice(-2)
        let d2 = ("0" + date1.getMonth() + 1).slice(-2)
        let d3 = date1.getFullYear()
        let d4 = date1.getHours()
        let d5 = ("0" + date1.getMinutes()).slice(-2)
        let fulldate1 = d3 + "-" + d2 + "-" + d1 + "T" + d4 + ":" + d5
        console.log(fulldate1);

        if (fulldate1 >= e.End) {

            alert("Time Over ")

            return false
        }



        var c1 = Moment(date1).add(parseInt(e.Duration), 'm').format()
        var c2 = c1.split("+")[0]
        console.log(c2);
        let c3 = e.End + ":00"
        console.log(c3);

        if (c2 > c3) {

            setEndt(c3)
            setBdisaable(true)
            var s = window.confirm("Are you sure you want to attempt the quiz ")
            if (s) {
                setMshow(true)
                setSpin1(false)


                console.log(e.QuizId);
                setQid(e.QuizId)

                setQname(e.Name)


                Axios.post(process.env.REACT_APP_SECURITY_API.concat("quizquestions"), { QuizId: e.QuizId }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                    console.log(res.data);
                    if (res.data.success === false) {
                        alert(res.data.msg)
                        setMshow(false)
                        return false
                    } else {
                        setData(res.data)
                        setSpin1(true)

                    }

                })
            }
        } else {
            var f = parseInt(e.Duration)
            setQuiztime(f)
            setBdisaable(false)

            var d = window.confirm("Are you sure you want to attempt the quiz")

            if (d) {
                setMshow(true)
                setSpin1(false)


                console.log(e.QuizId);
                setQid(e.QuizId)

                setQname(e.Name)


                Axios.post(process.env.REACT_APP_SECURITY_API.concat("quizquestions"), { QuizId: e.QuizId }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                    console.log(res.data);
                    if (res.data.success === false) {
                        alert(res.data.msg)
                        setMshow(false)
                        return false
                    } else {
                        setData(res.data)
                        setSpin1(true)

                    }

                })
            }
        }












    }



    function back() {
        var d = window.confirm("are you sure yout want to leave the page all your progress will be lost")
        if (d) {
            console.log("ccasfsdff");
            setMshow(false)
        }

    }


    function Completionist() {
        console.log("sdfsdffffsd");

        alert("Time up!!")
        setSpin1(false)

        var data = {
            QuizId: qid,
            Answer: userAnswer
        }
        console.log('sdfsadff');
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("quizresultupload"), data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            alert(res.data.msg);
            setMshow(false)
        })

    }



    if (mshow) {
        console.log(quiztime);
        console.log(endt);
        console.log(bdisable);
        return (

            <div>
                {spin1 ? <div>
                    <button onClick={back} className="btn btn-danger">back</button><br />
                    <div style={{ textAlign: 'center', fontSize: 25 }}> <label style={{ color: 'green' }}>Quiz Name : {qname}   </label></div><span style={{ textAlign: 'right' }}>  <CountDownTime date={bdisable ? endt : Date.now() + quiztime * 60 * 1000} renderer={props => (
                        <div>
                            Time Left : <ClockCircleOutlined style={{ fontSize: 25, color: '#08c' }} /> {props.formatted.hours}:{props.formatted.minutes}:
                            {props.formatted.seconds}
                        </div>
                    )}
                        zeroPadTime={2} onComplete={Completionist} /></span>

                    {/**  <label>quiz End in {time.hours}:{time.minutes}:{time.seconds}</label> */}

                    {data.map(data => {

                        return (
                            <div className="card" style={{ marginTop: '4%' }}>

                                <div className="card-header">  <label>Que No: {data.questionid}</label><br />
                                    <label>Question :{data.question}</label><br />
                                </div>
                                <label className="card-header">Options</label>

                                <div className="card-body" >


                                    <Radio.Group onChange={(e) => {
                                        var Find = userAnswer.find(o => o.QuesNo == data.questionid)
                                        var Find2 = userAnswer.indexOf(Find)

                                        if (e.target.value === "Clear My Choice") {
                                            userAnswer.splice(Find2, 1)
                                        } else {
                                            if (Find) {
                                                userAnswer.splice(Find2, 1)
                                                userAnswer.push({ QuesNo: data.questionid, Answer: e.target.value })

                                            } else {
                                                userAnswer.push({ QuesNo: data.questionid, Answer: e.target.value })
                                            }
                                        }





                                    }}>
                                        <Radio style={radioStyle} value={data.option1} >{data.option1}</Radio>
                                        <Radio style={radioStyle} value={data.option2}>  {data.option2}    </Radio>
                                        <Radio style={radioStyle} value={data.option3}>{data.option3} </Radio>
                                        <Radio style={radioStyle} value={data.option4}>{data.option4} </Radio>
                                        <Radio style={radioStyle} value="Clear My Choice">Clear My Choice </Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        )
                    }

                    )}

                    <br />
                    <div style={{ textAlign: 'right' }}> <button className="btn btn-success" onClick={handleSubmit} >Submit</button></div>



                </div> : <div style={{ textAlign: 'center' }}> <Spin indicator={antIcon} /> </div>}
            </div>
        )
    }

    return (
        <div>
            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Quizes</p><hr />


            {spin ? <table className="table" style={{ textAlign: "center", border: '4px solid #001529' }}>
                <thead style={{ backgroundColor: '#001529', color: 'white' }}>

                    <tr>
                        <th>Quiz Name</th>
                        <th>Quiz Date</th>
                        <th>Quiz Start Time</th>
                        <th>Quiz End Time</th>
                        <th>Quiz Duration</th>
                        <th>Score</th>
                        <th>Attempt Quiz</th>
                    </tr>
                </thead>

                <tbody>

                    {quizData.map(data => {
                        let c = true
                        if (fulldate >= data.Start) {
                            c = false
                        } else {
                            c = true
                        }



                        return (


                            <tr key={data.QuizId}>
                                <td>{data.Name}</td>
                                <td>{data.Date}</td>
                                <td>{data.QuizStartTime}</td>
                                <td>{data.QuizEndTime} </td>
                                <td style={{ color: 'red' }}>{data.Duration} Minutes</td>
                                <td>{data.Score}</td>

                                <td><button className="btn btn-success" disabled={c} onClick={() => attemptQuiz(data)}>{c ? "Not Started Yet" : "Attempt"}</button> </td>

                            </tr>
                        )
                    })}


                </tbody>
            </table> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}   <div>



            </div>
        </div>
    )
}

export default QuizShow


