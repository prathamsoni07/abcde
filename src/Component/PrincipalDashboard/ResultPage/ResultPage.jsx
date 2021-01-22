import React, { useState, useEffect, createRef } from 'react';
import { InputLabel, MenuItem, Select, FormControl, TextField, Backdrop, CircularProgress } from '@material-ui/core';
import { CardDeck, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'



const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}
))
function ResultPage() {
    //*************STATES************************ */
    const classes = useStyles();
    const wrapper = createRef();
    const [studentResultShow, setStudentResultShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [studentClass, setStudentClass] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [studentBranch, setStudentBranch] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentRollNo, setStudentRollNo] = useState('');
    const [classData, setClassData] = useState([]);
    const [branchDisable, setbranchDisable] = useState(true);
    const [branchName, setBranchName] = useState([]);
    const [sectionName, setSectionName] = useState([]);
    const [examName, setExamName] = useState([]);
    const [examName1, setExamName1] = useState([]);
    const [studentData, setStudentData] = useState([])
    const [examSelect, setExamSelect] = useState('');
    const [studentMarks, setStudentMarks] = useState([]);
    const [totalObtainedMarks, setTotalObtainedMarks] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [spin, setSpin] = useState(false);
    const [spin1, setSpin1] = useState(false)



    var no = 0
    useEffect(() => {

        classData.splice(0)
        examName.splice(0)
        console.log("useEffect Called");
        axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setClassData(res.data)
        })

        axios.post(process.env.REACT_APP_SECURITY_API.concat("exam"), { hello: 'heelo' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            setExamName(res.data)
        })
    }, [axios])
    //********************Menu Functions And Back Function*******************/

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };




    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleOpen1 = () => {
        setOpen1(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };



    function back1() {
        setSpin1(false)

        setStudentResultShow(false)
        return ResultPage
    }
    function classClick(e) {
        console.log(e);
        setSpin1(false)

        branchName.splice(0);
        setStudentBranch('')


        if (e > 10) {

            setbranchDisable(false)
            var classFind = classData.find(o => o.Class == e)
            if (!classFind) {
                alert("No Branch")
                setbranchDisable(false)

                return false
            } else {
                classFind.Branches.map((data) => {
                    branchName.push(data.Branch);
                })
            }



        } else {
            setbranchDisable(true)
            var classFind1 = classData.find(o => o.Class == e)
            if (!classFind1) {
                alert("No Section")
                return false
            } else {
                classFind1.Branches.map((data) => {
                    setSectionName(data.Section)
                })

                var examFind = examName.filter((f) => {
                    return f.Class === e
                })
                setExamName1(examFind)
            }





        }
    }
    function branchClick(e) {
        var branchName = classData.find(o => o.Class == studentClass);
        var branchFind = branchName.Branches.find(o => o.Branch == e);

        if (!branchFind) {
            alert("No Section")
            return false
        } else {
            setSectionName(branchFind.Section)

            var examFind1 = examName.filter((el) => { return el.Class === studentClass && el.Branch === e })

            setExamName1(examFind1)
        }

    }













    function resultShow(e) {
        setStudentResultShow(false)
        setStudentRollNo('')
        studentMarks.splice(0)
        console.log(e);
        setStudentName(e.Name);
        setStudentRollNo(e.RollNo)

        var da2 = studentData.find(o => o.RollNo === e.RollNo)
        console.log(da2);


        if (da2.found === false) {
            console.log("caleld");
            alert("Not uploaded")
            setStudentResultShow(false)

            return false
        } else {
            console.log("else Called");
            var da = studentData.find(o => o.RollNo === e.RollNo)
            console.log(da);
            da.Marks.map(data => studentMarks.push(data))
            setTotalObtainedMarks(da2.obtainedMarks)
            setTotalMarks(da2.MaximumMarks)
            setStudentResultShow(true)



        }




    }



    function fetchClassDetails1(e) {
        setSpin1(true)
        setSpin(false)
        e.preventDefault();
        console.log(studentClass);
        console.log(studentBranch);
        console.log(studentSection);
        console.log(examSelect);

        var Data = {
            Class: studentClass,
            Branch: studentBranch,
            Section: studentSection,
            ExamId: examSelect.split("/")[0]
        }


        axios.post(process.env.REACT_APP_SECURITY_API.concat("resultShow"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            console.log(res.data.Marks);
            setStudentData(res.data)
            setSpin(true)
        })

    }
    //***************ResultShow Functions Ended *******************/

    if (studentResultShow) {
        return (
            <div ref={wrapper} >
                <Button variant="outline-danger" className="btn" style={{}} onClick={back1}> back</Button>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Result</p><hr />


                    <table className="table" >
                        <tbody style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                            <tr>
                                <th>Student Name : </th>
                                <th>{studentName}</th>
                                <th>Student Roll No. :</th>
                                <th>{studentRollNo}</th>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ border: '2px solid grey' }}>    <table className="table">
                        <thead >
                            <tr>
                                <th>Subject</th>
                                <th>Obtained Marks</th>
                                <th>Practical Marks</th>
                                <th>Maximum Marks</th>
                            </tr>
                        </thead>
                        <tbody>

                            {studentMarks.map(data => (
                                <tr>
                                    <td>{data.Subject}</td>
                                    <td>{data.obtainedMarks}</td>
                                    <td>{data.MaximumMarks}</td>
                                    <td>{data.MaximumMarks}</td>
                                </tr>

                            ))}


                        </tbody>
                        <tfoot  >
                            <tr style={{ color: 'red' }} >

                                <td></td>
                                <td></td>
                                <td >Total Marks </td>
                                <td>{totalObtainedMarks}/{totalMarks}</td>

                            </tr>
                        </tfoot>
                    </table></div>


                </div>


            </div>
        )

    }









    return (
        <div ref={wrapper} style={{}}>
            <br />
            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Result Page</p><hr />


            <div ref={wrapper}>
                <Card className="text-center" style={{ width: "50%", marginLeft: '25%', border: '2px solid grey' }}>
                    <Card.Header>  Student Result</Card.Header>
                    <form onSubmit={fetchClassDetails1}   >
                        <Card.Body>



                            <FormControl ref={wrapper} required className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Class</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={studentClass}
                                    onChange={(e) => {
                                        setStudentClass(e.target.value)
                                        classClick(e.target.value)
                                    }
                                    }
                                >

                                    <MenuItem value={"1"}>Class I</MenuItem>
                                    <MenuItem value={"2"}>Class II</MenuItem>
                                    <MenuItem value={"3"}>Class III</MenuItem>
                                    <MenuItem value={"4"}>Class IV</MenuItem>
                                    <MenuItem value={"5"}>Class V</MenuItem>
                                    <MenuItem value={"6"}>Class VI</MenuItem>
                                    <MenuItem value={"7"}>Class VII</MenuItem>
                                    <MenuItem value={"8"}>Class VIII</MenuItem>
                                    <MenuItem value={"9"}>Class IX</MenuItem>
                                    <MenuItem value={"10"}>Class X</MenuItem>
                                    <MenuItem value={"11"}>Class XI</MenuItem>
                                    <MenuItem value={"12"}>Class XII</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl disabled={branchDisable} required={!branchDisable} className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Branch</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open2}
                                    onClose={handleClose2}
                                    onOpen={handleOpen2}
                                    value={studentBranch}
                                    onChange={(e) => {
                                        setStudentBranch(e.target.value)
                                        branchClick(e.target.value)
                                    }}
                                >
                                    {branchName.map(data => (

                                        <MenuItem key={data} value={data}>{data}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Section</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open1}
                                    onClose={handleClose1}
                                    onOpen={handleOpen1}
                                    value={studentSection}
                                    onChange={(e) => setStudentSection(e.target.value)}
                                >
                                    {sectionName.map(data => (

                                        <MenuItem key={data} value={data}>{data}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Exam Name</InputLabel>
                                <Select onChange={(e) => {

                                    setExamSelect(e.target.value)
                                    setSpin1(false)
                                }}
                                >
                                    {examName1.map(data => (

                                        <MenuItem key={data.ExamId} value={data.ExamId + "/" + data.ExamName}>{data.ExamName}  </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                            <br />



                        </Card.Body>
                        <Card.Footer >
                            <button type="submit" className="btn btn-primary text-center">Fetch Class Details</button>

                        </Card.Footer>
                    </form>
                </Card>



                <br />


                {spin1 ? spin ? <table style={{ textAlign: 'center', border: '5px solid #001529' }} className="table">
                    <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Fetch Result</th>

                        </tr>
                    </thead>

                    <tbody>
                        {studentData.map(data => {
                            no = no + 1
                            return (
                                <tr>
                                    <td>{no}</td>
                                    <td>{data.Name}</td>
                                    <td>{data.RollNo}</td>

                                    <td> <button onClick={(e) => {
                                        resultShow(data)
                                        e.preventDefault()
                                    }} className="btn btn-primary text-center" >Fetch </button> </td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table> : <div style={{ textAlign: 'center', marginTop: '4%' }}><Spin indicator={antIcon} /></div> : null} <hr />




            </div>

            <br />
        </div>
    )
}

export default ResultPage
