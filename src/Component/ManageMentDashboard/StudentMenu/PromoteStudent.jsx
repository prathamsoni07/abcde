import React, { useState, useEffect } from 'react'
import { Spin } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import { Card , Button} from 'react-bootstrap';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Cookies from 'js-cookie'

const antIcon = <LoadingOutlined style={{ fontSize: 100, textAlign: 'center' }} spin />;
const useStyles = makeStyles((theme) => ({


    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }

}));

function Promotion() {
    const classes = useStyles();
    const [spin, setSpin] = useState(false)
    const [secondSpin, setSecondSpin] = useState(false)

    const [promote, setPromote] = useState([]);
    const [studentClass, setStudentClass] = useState('');
    const [studentSection, setStudentSection] = useState('');
    const [studentBranch, setStudentBranch] = useState('');
    const [open3, setOpen3] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [classData, setClassData] = useState([]);
    const [branchDisable, setbranchDisable] = useState(true);
    const [branchName, setBranchName] = useState([]);
    const [sectionName, setSectionName] = useState([]);
    const [sectionName1, setSectionName1] = useState([]);
    const [data, setData] = useState([]);
    const [tableShow, setTableShow] = useState(false);
    const [promoteClass, setPromoteClass] = useState('');
    const [promoteSection, setPromoteSection] = useState([]);
    const [finalPromotion, setFinalPromotion] = useState([]);
    const [branchName1, setBranchName1] = useState([]);
    const [branch11, setBranch11] = useState('');
    const [section11, setSection11] = useState('')
    const [tableShow11, setTableShow11] = useState(false)

    useEffect(() => {
        axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setClassData(res.data)
            setSpin(true)
        })
    }, [])


    function classClick(e) {
        setStudentBranch("")
        branchName.splice(0)
        setStudentClass(e)
        let add = parseInt(e) + 1
        let add2 = add.toString();
        setPromoteClass(add2)
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
            }


        }
    }
    function branchClick(e) {
        sectionName1.splice(0)

        var branchName = classData.find(o => o.Class == studentClass);
        var branchFind = branchName.Branches.find(o => o.Branch == e);

        if (!branchFind) {
            alert("No Section")
            setbranchDisable(true)
            return false
        } else {
            setSectionName(branchFind.Section)
        }


        var BranchName1 = classData.find(o => o.Class === promoteClass)
        if (!BranchName1) {
            alert(`No Section in class ${promoteClass}`)
            return false
        } else {
            var Section = BranchName1.Branches.find(o => o.Branch === e)
            setSectionName1(Section.Section)
        }




    }
    function branchClick1(e) {
        if (e === "") {
            NotificationManager.warning("please Choose Branch")
        } else {
            setBranch11(e)
            var branchName = classData.find(o => o.Class == promoteClass);
            var branchFind = branchName.Branches.find(o => o.Branch == e);
            setSectionName1(branchFind.Section)
        }
    }

    function handleSubmit1(e) {
        e.preventDefault();
        var d = window.confirm("Promote Student")
        if (d) {
            setOpen3(true)
            var Data = {
                PreviousClass: studentClass,
                Class: promoteClass,
                Promotion: promote,
                Branch: branch11,
                Section: section11
            }
            axios.post(process.env.REACT_APP_SECURITY_API.concat("promotestudent"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                alert(res.data)
                promote.splice(0)
                setSection11("")
                setBranch11("")
                setStudentClass("")
                setPromoteClass("")
                setOpen3(false)
                setTableShow11(false)

            })
        } else {
            return false
        }

    }

    function fetchClassDetails(e) {
        setOpen2(false)
        e.preventDefault();
        setTableShow(true)
        setSecondSpin(false)
        var DATA = {
            Class: studentClass,
            Branch: studentBranch,
            Section: studentSection
        }
        var classFind1 = classData.find(o => o.Class == promoteClass)
        classFind1.Branches.map((data) => {
            setSectionName1(data.Section)
        })

        if (DATA.Class === "10") {
            branchName1.splice(0)
            var ClassFind = classData.find(o => o.Class === "11")
            ClassFind.Branches.map((data) => {
                branchName1.push(data)
                sectionName1.splice(0)
            })
        }
        if (DATA.Class > 10) {
            setOpen2(true)
            setSectionName1(sectionName1)
        }
        axios.post(process.env.REACT_APP_SECURITY_API.concat("studentdetailspromote"), DATA, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            setData(res.data)
            setSecondSpin(true)
            branchName.splice(0)
            if (studentClass === "10") {
                setTableShow(false)
                setTableShow11(true)
            } else {
                setTableShow11(false)
                setSecondSpin(true)
            }
        })
    }




    function handleSubmit(e) {
        e.preventDefault();
        var fr = false
        finalPromotion.splice(0)
        promote.map(data => {
            var find = promoteSection.filter(o => { return o.RollNo === data.RollNo })
            if (find.length > 0) {
                find.map(o => {
                    var final = {
                        Class: promoteClass,
                        Promote: data.promotion,
                        RollNo: data.RollNo,
                        PromoteSection: o.section
                    }
                    finalPromotion.push(final)
                })
            } else {
                var final1 = {
                    Promote: data.promotion,
                    RollNo: data.RollNo,
                    section: null
                }
                finalPromotion.push(final1)
            }
        })

        finalPromotion.map(data => {
            if (data.Promote === "Yes") {
                if (data.section === null) {
                    NotificationManager.warning(`Warning : Please Fill up Required Field . Please check section roll no of ${data.RollNo}`);
                    fr = false
                    return false;
                } else {
                    fr = true
                }
            }
        })
        if (fr) {
            var d = window.confirm("Promote Student")
            if (d) {
                setOpen3(true)
                var Data = {
                    Branch: studentBranch,
                    PreviousClass: studentClass,
                    Class: promoteClass,
                    Promotion: finalPromotion
                }
                axios.post(process.env.REACT_APP_SECURITY_API.concat("promotestudent"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                    console.log(res.data);
                    alert(res.data.msg)
                    finalPromotion.splice(0)
                    promote.splice(0)
                    promoteSection.splice(0)
                    setTableShow(false)
                    branchName1.splice(0)
                    setOpen3(false);
                    setTableShow(false)
                })
            } else {
                return false
            }

        }
    }

    if (tableShow11) {
        return (
            <div>
                <Button variant="outline-danger" onClick={() => {
                    setTableShow11(false)
                    setStudentBranch("")
                    setStudentSection("")
                    setStudentClass("")
                }}>
                    Back</Button>  <div style={{ fontSize: 21 }}>
                    <p> Class : {studentClass}</p>
                    <p> Section : {studentSection}</p>

                </div>
                <div style={{ textAlign: 'center', color: "red" }}> <NotificationContainer /> </div>

                <form id="refresh" style={{ textAlign: 'center', marginTop: '2%', border: '5px solid #001529' }} onSubmit={handleSubmit1} >


                    <table id="secondTable" className="table">
                        <thead  >
                            <tr>
                                <th>{promoteClass}Branch : </th>
                                <th>  <select className="form-control" style={{ marginTop: '3%' }} defaultValue="choose" required onChange={(e) => {

                                    branchClick1(e.target.value)
                                }} >
                                    <option value="">Choose ...</option>


                                    {branchName1.map(data => (
                                        <option>{data.Branch}</option>
                                    ))}
                                </select></th>
                                <th> Section : </th>
                                <th>  <select className="form-control" style={{ marginTop: '3%' }} defaultValue="choose" required value={section11}
                                    onChange={(e) => {
                                        setSection11(e.target.value)

                                    }} >
                                    <option value="">Choose ...</option>
                                    {sectionName1.map(data =>

                                    (
                                        <option value={data}>{data}</option>
                                    )
                                    )}


                                </select></th>
                            </tr>
                        </thead>
                        <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th> </th>
                                <th> Promote</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(data => (
                                <tr>
                                    <td>{data.Name}</td>
                                    <td>{data.RollNo}</td>
                                    <td></td>

                                    <td >

                                        <select className="form-control" style={{ marginTop: '3%' }} defaultValue="choose" required onChange={(e) => {
                                            var Find = promote.find(o => o.RollNo === data.RollNo)
                                            var Find2 = promote.indexOf(Find)
                                            if (Find) {
                                                promote.splice(Find2, 1)
                                                promote.push({ RollNo: data.RollNo, promotion: e.target.value })

                                            } else {
                                                promote.push({ RollNo: data.RollNo, promotion: e.target.value })
                                            }
                                        }} >
                                            <option value="">Choose ...</option>
                                            <option value="Yes">Yes </option>
                                            <option value="No">No</option>
                                        </select> <br />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table><hr />
                    <button className="btn btn-success text-center" type="submit" >  Promote</button>    <hr />
                    <Backdrop className={classes.backdrop} open={open3} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form></div>
        )
    }

    if (tableShow) {
        return (
            <div>


                {secondSpin ? <div><Button variant="outline-danger" onClick={() => {
                    setTableShow(false)
                    setStudentBranch("")
                    setStudentSection("")
                    setStudentClass("")
                }}>  Back</Button>

                    <div style={{ color: 'green', fontWeight: 800 }}>
                        <p> Class : {studentClass}          {open2 ? `,Branch : ${studentBranch} ` : null}  ,            Section : {studentSection}
                        </p>


                    </div>
                    <form id="refresh" style={{ textAlign: 'center', marginTop: '2%', border: '5px solid #001529' }} onSubmit={handleSubmit} >
                        <table id="secondTable" className="table">
                            <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }} >
                                <tr>
                                    <th>Name</th>
                                    <th>Roll No</th>
                                    <th> Promote</th>
                                    <th> Class  {promoteClass} (Section)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(data => (
                                    <tr>
                                        <td>{data.Name}</td>
                                        <td>{data.RollNo}</td>
                                        <td >
                                            <select className="form-control" defaultValue="choose" required onChange={(e) => {
                                                var Find = promote.find(o => o.RollNo === data.RollNo)
                                                var Find2 = promote.indexOf(Find)
                                                if (Find) {
                                                    promote.splice(Find2, 1)
                                                    promote.push({ RollNo: data.RollNo, promotion: e.target.value })
                                                } else {
                                                    promote.push({ RollNo: data.RollNo, promotion: e.target.value })
                                                }
                                            }} >
                                                <option value="">Choose ...</option>
                                                <option value="Yes">Yes </option>
                                                <option value="No">No</option>
                                            </select> <br />
                                        </td>
                                        <td><select className="form-control" style={{ color: 'red' }} onChange={(e) => {
                                            var Find = promoteSection.find(o => o.RollNo === data.RollNo)
                                            var Find2 = promoteSection.indexOf(Find)
                                            if (Find) {
                                                promoteSection.splice(Find2, 1)
                                                promoteSection.push({ RollNo: data.RollNo, section: e.target.value })

                                            } else {
                                                promoteSection.push({ RollNo: data.RollNo, section: e.target.value })
                                            }
                                        }}  >
                                            <option value="">Choose ...</option>
                                            {sectionName1.map(data => (
                                                <option value={data}>{data}</option>
                                            ))}
                                        </select></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table><hr />
                        <div style={{ textAlign: 'center', color: "red" }}>                <NotificationContainer /> </div>
                        <button className="btn btn-primary text-center" type="submit" >  Promote</button>    <hr />
                        <Backdrop className={classes.backdrop} open={open3} >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </form></div> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
            </div>
        )
    }

    return (
        <div>
            {spin ? <Card className="text-center" style={{ width: "50%", marginLeft: '25%', border: '2px solid grey' }}>
                <Card.Header>  Student Information</Card.Header>
                <div>   <form id="resetform" onSubmit={fetchClassDetails}  >
                    <Card.Body>
                        <h3 style={{ textAlign: "center" }} >Promotion Page</h3>  <br />
                        <FormControl id="class" required className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Class</InputLabel>
                            <Select
                                onChange={(e) => {
                                    classClick(e.target.value)
                                }
                                }
                            >
                                <MenuItem value={'1'}>Class I</MenuItem>
                                <MenuItem value={'2'}>Class II</MenuItem>
                                <MenuItem value={'3'}>Class III</MenuItem>
                                <MenuItem value={'4'}>Class IV</MenuItem>
                                <MenuItem value={'5'}>Class V</MenuItem>
                                <MenuItem value={'6'}>Class VI</MenuItem>
                                <MenuItem value={'7'}>Class VII</MenuItem>
                                <MenuItem value={'8'}>Class VIII</MenuItem>
                                <MenuItem value={'9'}>Class IX</MenuItem>
                                <MenuItem value={'10'}>Class X</MenuItem>
                                <MenuItem value={'11'}>Class XI</MenuItem>
                                <MenuItem value={'12'}>Class XII</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl id="branch" disabled={branchDisable} required={!branchDisable} className={classes.formControl}>
                            <InputLabel >Branch</InputLabel>
                            <Select onChange={(e) => {
                                branchClick(e.target.value)
                                setStudentBranch(e.target.value)
                            }}
                            >{branchName.map(data => (<MenuItem key={data} value={data}>{data}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl id="section" required className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Section</InputLabel>
                            <Select labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                value={studentSection}
                                onChange={(e) => {
                                    setStudentSection(e.target.value)
                                }}
                            >
                                {sectionName.map(data => (

                                    <MenuItem key={data} value={data}>{data}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <br />
                    </Card.Body>
                    <Card.Footer >
                        <button type="submit" className="btn btn-info text-center">Fetch Class Details</button>
                    </Card.Footer>
                </form></div>
            </Card> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /> </div>}
        </div>
    )
}
export default Promotion