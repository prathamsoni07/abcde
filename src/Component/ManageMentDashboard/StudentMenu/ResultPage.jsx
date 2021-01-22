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
    const [ResultShow, setResultShow] = useState(false);
    const [studentResultShow, setStudentResultShow] = useState(false);
    const [uploadShow, setUploadShow] = useState(false);
    const [uploadResultShow, setUploadResultShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [studentClass, setStudentClass] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [studentBranch, setStudentBranch] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentRollNo, setStudentRollNo] = useState('');
    const [obtainedMarks, setObtainedMarks] = useState([])
    const [maximumMarks, setMaximumMarks] = useState([]);
    const [finalMarks, setFinalMarks] = useState([]);
    const [classData, setClassData] = useState([]);
    const [branchDisable, setbranchDisable] = useState(true);
    const [branchName, setBranchName] = useState([]);
    const [sectionName, setSectionName] = useState([]);
    const [examName, setExamName] = useState([]);
    const [examName1, setExamName1] = useState([]);
    const [studentData, setStudentData] = useState([])
    const [examSelect, setExamSelect] = useState('');
    const [examSelectId, setExamSelectId] = useState('');
    const [studentDetails, setStudentDetails] = useState(false);
    const [backdrop, setBackDrop] = useState(false);
    const [subjectName, setSubjectName] = useState([]);
    const [studentFind, setStudentFind] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);
    const [totalObtainedMarks, setTotalObtainedMarks] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [spin, setSpin] = useState(false);
    const [spin1, setSpin1] = useState(false)


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

    function back() {
        setSpin1(false)
        setResultShow(false)
        setStudentResultShow(false)
        setUploadShow(false);
        setUploadResultShow(false);
        setStudentDetails(false)
        return ResultPage
    }
    function back2() {
        setResultShow(false)
        setStudentResultShow(false)
        setUploadShow(true);
        setUploadResultShow(false);
        setStudentDetails(false)
        return ResultPage
    }
    function back1() {
        setSpin1(false)

        setUploadResultShow(false)
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


    function fetchClassDetails(e) {
        setStudentDetails(true)
        setSpin(false)
        console.log(examSelect);
        console.log(examSelect.split("/")[0]);
        e.preventDefault()


        var DATA = {
            Class: studentClass,
            Branch: studentBranch,
            Section: studentSection,

        }
        axios.post(process.env.REACT_APP_SECURITY_API.concat("studentdetails"), DATA, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setStudentData(res.data)


        })

        axios.post(process.env.REACT_APP_SECURITY_API.concat("checkentry"), { ExamId: examSelect.split("/")[0] }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setStudentFind(res.data)

            setSpin(true)

        })





    }


    function fetchSubjectName(e) {
        e.preventDefault();
        setExamSelect(e.target.value)
        console.log(e.target.value);
        console.log(examName1);
        var subName = examName1.filter((o) => { return o.ExamId === e.target.value.split("/")[0] })
        console.log(subName);
        subName.map(data => setSubjectName(data.Subjecs))
    }

    //********************Menu Functions And Back Function Ended*******************/
    console.log(subjectName);
    //**********************Upload FUNCTIONS AREA *************************/

    function uploadGo(e) {
        console.log(e.RollNo);

        setStudentRollNo(e.RollNo)
        setStudentName(e.Name);
        setUploadResultShow(true)


    }
    async function uploadResult(e) {
        var d = window.confirm("Upload Result")

        if (d) {
            setBackDrop(true)
            finalMarks.splice(0);
            e.preventDefault();

            obtainedMarks.map(data => {
                var max = maximumMarks.find(o => o.Subject == data.Subject)
                console.log(max);
                var final = {
                    Subject: data.Subject,
                    obtainedMarks: data.Marks,
                    MaximumMarks: max.maximumMarks,

                }

                finalMarks.push(final)
            })




            var Data = {
                Marks: finalMarks,
                ExamId: examSelect.split("/")[0],
                StudentRollNo: studentRollNo,
                StudentClass: studentClass,
                StudentBranch: studentBranch,
                StudentSection: studentSection

            }
            console.log(Data);

            await axios.post(process.env.REACT_APP_SECURITY_API.concat("resultupload"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                alert(res.data.msg)
                setBackDrop(false)
                setUploadResultShow(false)
                setSpin(false)
                studentFind.splice(0);
            })


            axios.post(process.env.REACT_APP_SECURITY_API.concat("checkentry"), { ExamId: examSelect.split("/")[0] }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                setStudentFind(res.data)

                setSpin(true)

            }
            )
        }




    }

    //**********************Upload FUNCTIONS AREA ENDED  *************************/

    // **********************UPLOAD RESULT PAGE AREA********************************//
    if (uploadResultShow) {

        return (
            <div ref={wrapper}>
                <a className="btn btn-link" style={{ marginLeft: '4%', marginTop: '-4%' }} onClick={back1}>/ back</a>

                <div>

                    <label style={{ textAlign: 'center', fontSize: 25 }} >{examSelect.split("/")[1]} Result Upload</label>


                    <div style={{ color: 'green', fontWeight: 800 }}>
                        <p> Name : {studentName}         ,            Section : {studentRollNo}
                        </p>


                    </div>

                    <form onSubmit={uploadResult} style={{ textAlign: 'center' }}>


                        <table className="table" style={{ border: '2px solid grey' }}>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Obtained Marks</th>
                                    <th>Maximum Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjectName.map(data => (
                                    <tr>
                                        <td>{data}</td>
                                        <td>


                                            <TextField type="number" onChange={(e) => {
                                                var Find = obtainedMarks.find(o => o.Subject === data)
                                                var Find2 = obtainedMarks.indexOf(Find)


                                                if (Find) {
                                                    obtainedMarks.splice(Find2, 1)
                                                    obtainedMarks.push({ Subject: data, Marks: e.target.value })

                                                } else {
                                                    obtainedMarks.push({ Subject: data, Marks: e.target.value })
                                                }
                                            }} required style={{ width: '20%' }} /> </td>
                                        <td>
                                            <TextField type="number" onChange={(e) => {
                                                var mFind = maximumMarks.find(o => o.Subject === data)
                                                var mFind2 = maximumMarks.indexOf(mFind)


                                                if (mFind) {
                                                    maximumMarks.splice(mFind2, 1)
                                                    maximumMarks.push({ Subject: data, maximumMarks: e.target.value })

                                                } else {
                                                    maximumMarks.push({ Subject: data, maximumMarks: e.target.value })
                                                }
                                            }} style={{ width: '20%' }} />
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className="btn btn-primary" type='submit' style={{ textAlign: "center" }}>Upload </button>
                    </form>
                </div>
                <Backdrop className={classes.backdrop} open={backdrop} >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </div>

        )
    }
    // **********************UPLOAD RESULT PAGE ENDED********************************//

    if (studentDetails) {


        return (
            <div>
                {spin ? <div>
                    <Button style={{ marginLeft: '4%', marginTop: '-4%' }} variant="outline-danger" onClick={back2}>Previous Page</Button>
                    <br />
                    <p style={{ textAlign: 'center', fontSize: 25 ,fontWeight: 'bolder', fontFamily: 'initial', color: '#001529'}}>{examSelect.split("/")[1]} Result Upload</p>
                    <table className="table" style={{ textAlign: 'center', border: '5px solid #001529' }} >
                        <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Upload Result</th>

                            </tr>
                        </thead>

                        <tbody>
                            {studentData.map(data => {

                                var max = studentFind.find(o => o === data.RollNo);
                                console.log(max);
                                if (max === data.RollNo) {
                                    return (<tr>
                                        <td key={data.Name}>{data.Name}</td>
                                        <td key={data.RollNo}>{data.RollNo}</td>


                                        <td>  <button className="btn btn-success text-center" >   Uploaded  </button> </td>

                                    </tr>)
                                }
                                return (
                                    <tr>
                                        <td key={data.Name}>{data.Name}</td>
                                        <td key={data.RollNo}>{data.RollNo}</td>


                                        <td>  <button key={data.RollNo} value={data.RollNo} onClick={(e) => {
                                            e.preventDefault()
                                            uploadGo(data)

                                        }} className="btn btn-primary text-center" >  Upload  </button></td>

                                    </tr>
                                )







                            })}

                        </tbody>
                    </table></div> : <div style={{ textAlign: 'center', marginTop: '4%' }}><Spin indicator={antIcon} /></div>}
            </div>
        )
    }

    //***********UPLOAD FETCH DATA**************/
    if (uploadShow) {
        return (
            <div ref={wrapper}>
                <Button style={{ marginLeft: '3%', marginTop: '-4%' }} variant="outline-danger" onClick={back}>Previous Page</Button>

                <div >



                    <Card className="text-center" style={{ width: "50%", marginLeft: '25%', border: '2px solid grey' }}>
                        <Card.Header> Upload Student Result</Card.Header>
                        <form onSubmit={fetchClassDetails}   >
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
                                    <Select
                                        onChange={(e) => fetchSubjectName(e)}

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

                </div>







            </div>
        )
    }






    //***********UPLOAD FETCH DATA ENDED**************/


    //**************Result Show ********************** */

    //***************ResultShow Functions *******************/
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

    console.log(studentMarks);
    console.log(studentData);

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
    console.log(studentData);

    if (studentResultShow) {
        return (
            <div ref={wrapper} >
                <Button variant="outline-danger" style={{ marginLeft: '4%', marginTop: '-5%' }} onClick={back}>Previous Page</Button>
                <Button variant="outline-danger" style={{ marginTop: '-5%' }} onClick={back1}>back</Button>

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
    //**************Result Show Ended ********************** */

    //**************Result Fetch Start********************** */

    if (ResultShow) {

        return (
            <div ref={wrapper}>
                <Button variant="outline-danger" style={{ marginLeft: '4%', marginTop: '-5%' }} onClick={back}>Previous Page</Button>
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
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Fetch Result</th>

                        </tr>
                    </thead>

                    <tbody>
                        {studentData.map(data => (
                            <tr>
                                <td>{data.Name}</td>
                                <td>{data.RollNo}</td>

                                <td> <button onClick={(e) => {
                                    resultShow(data)
                                    e.preventDefault()
                                }} className="btn btn-primary text-center" >Fetch </button> </td>

                            </tr>

                        ))}

                    </tbody>
                </table> : <div style={{ textAlign: 'center', marginTop: '4%' }}><Spin indicator={antIcon} /></div> : null} <hr />




            </div>
        )
    }
    //**************Result Fetch Ended********************** */







    // ************************** Main Page **********************//
    return (
        <div ref={wrapper} style={{ marginLeft: '20%', width: '50%' }}>
            <br />
            <CardDeck>
                {/* firstCard */}
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Upload Result</Card.Title>

                    </Card.Body>
                    <Card.Footer style={{ textAlign: 'center' }}>
                        <Button onClick={() => setUploadShow(true)}>Upload</Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Fetch Result</Card.Title>

                    </Card.Body>
                    <Card.Footer style={{ textAlign: 'center' }}>
                        <Button onClick={() => setResultShow(true)}> Fetch </Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
            <br />
        </div>
    )
}

export default ResultPage
