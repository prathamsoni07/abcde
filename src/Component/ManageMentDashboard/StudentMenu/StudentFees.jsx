import React, { useEffect, useState } from 'react';
import * as dataStorage from './Data1.json';
import { InputLabel, MenuItem, Select, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card , Button } from 'react-bootstrap';
import axios from 'axios';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd';
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
  }

}));

function StudentFees() {

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [studentClass, setStudentClass] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [studentBranch, setStudentBranch] = useState('');
  const [check, setCheck] = useState(false);
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [updateShow, setUpdateShow] = useState(false)
  const [d, setD] = useState(date)
  const [month, setMonth] = useState('')
  const [amount, setAmount] = useState('')
  const [classData, setClassData] = useState([])





  const [studentData, setStudentData] = useState([])


  const [branchDisable, setbranchDisable] = useState(true);
  const [branchName, setBranchName] = useState([]);
  const [sectionName, setSectionName] = useState([]);

  const [studentDetails, setStudentDetails] = useState(false);
  const [spin, setSpin] = useState(false);
  const [spin1, setSpin1] = useState(false);
  const [feesData, setFeesData] = useState([])
  const [buttonSpin, setButtonSpin] = useState(true)




  useEffect(() => {

    classData.splice(0)
    console.log("useEffect Called");
    axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);
      setClassData(res.data)
    })


  }, [axios])

  //********** Menu Options Area**************//
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
  //********** Menu Options Area Ended**************//
  function classClick(e) {
    console.log(e);
    setSpin(false)

    branchName.splice(0);
    setStudentBranch('')


    if (e > 10) {

      setbranchDisable(false)
      var classFind = classData.find(o => o.Class == e)
      if (!classFind) {
        alert("No Branch")
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
    var branchName = classData.find(o => o.Class == studentClass);
    var branchFind = branchName.Branches.find(o => o.Branch == e);
    if (!branchFind) {
      alert("No Section")
      return false
    } else {
      setSectionName(branchFind.Section)

    }


  }


  function fetchClassDetails(e) {
    console.log("function Called");
    setStudentDetails(true)
    setSpin(true)
    setSpin1(false)
    e.preventDefault()


    var DATA = {
      Class: studentClass,
      Branch: studentBranch,
      Section: studentSection,

    }
    if (DATA.Class > 10) {
      setOpen3(true)
    } else {
      setOpen3(false)
    }
    axios.post(process.env.REACT_APP_SECURITY_API.concat("studentdetails"), DATA, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);
      setStudentData(res.data)
      setSpin1(true)


    })







  }
  // ****************  Button Options *********//

  function onCheck(e) {
    console.log("function Called");
    setName(e.Name)
    setRollNo(e.RollNo)
    setCheck(true)
    console.log(e.RollNo,
      studentClass,
      studentBranch,
      studentSection);
    var Data = {
      RollNo: e.RollNo,
      Class: studentClass,
      Branch: studentBranch,
      Section: studentSection,

    }

    axios.post(process.env.REACT_APP_SECURITY_API.concat('fees'), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res);
      console.log(res.data.msg.FeesPayment);
      if (res.data.success === false) {
        alert(res.data.msg)
        setCheck(false)

        return false
      }
      setFeesData(res.data.msg.FeesPayment);
    })


  }


  function onUpdate(e) {
    console.log(e);
    setUpdateShow(true)

  }

  function back() {
    setButtonSpin(true)

    setCheck(false)
    setUpdateShow(false)
    return StudentFees
  }

  function updateFees(e) {
    e.preventDefault();
    console.log("function Called");
    setButtonSpin(false)

    var Data = {
      Class: studentClass,
      Branch: studentBranch,
      Section: studentSection,
      RollNo: rollNo,
      Date: d,
      Month: month,
      Amount: amount
    }

    console.log(Data);
    axios.post(process.env.REACT_APP_SECURITY_API.concat("feesupload"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
      console.log(res.data);
      alert(res.data.msg)
      setButtonSpin(true)
      setCheck(false)
      setUpdateShow(false)

    })


  }

  // ****************  Button Options Ended *********//


  //********************** Check Page*************//

  if (check) {

    return (
      <div>

        <Button variant="outline-danger" style={{ marginLeft: '3%', marginTop: '-5%' }} onClick={back}>Previous Page</Button><br /><br />
        <label style={{ fontSize: 30, fontWeight: 400 }}>Fees Page </label><br /><br />





        <div style={{ color: 'green', fontWeight: 800 }}>
          <p> Name : {name}        ,            Roll No : {rollNo}
          </p>


        </div>

        <table style={{ textAlign: 'center', border: '3px solid #001529' }} className="table">
          <thead style={{ backgroundColor: '#001529' , color: 'white' }}>
            <tr>
              <th>Date</th>
              <th>Deposited Month</th>
              <th>Deposited Amount</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map(data => (

              <tr>

                <td>{data.Date}</td>
                <td>{data.Month}</td>
                <td>{data.Amount}</td>

              </tr>

            ))}

          </tbody>
        </table>
        <div style={{ textAlign: 'center' }}> <button className="btn btn-primary" onClick={(e) => {
          e.preventDefault();
          onUpdate(e)
        }}>Update Fees</button></div><br />

        {/* ********************** Check Page Ended************* */}
        {/* ********************** Update Page************* */}

        {updateShow ?

          <div>
            <div style={{ textAlign: 'right' }}><CloseOutlined style={{ border: "1px solid black" }} onClick={() => {
              setUpdateShow(false)
              setButtonSpin(true)
            }} />
            </div>
            <form style={{ border: '2px solid black' }} onSubmit={updateFees} >


              <table className="table"  >

                <thead>
                  <tr>
                    <th> Roll Number</th>
                    <th>Name</th>
                    <th>Date </th>
                    <th>Installment No.</th>
                    <th>Enter Amount</th>
                    <th>update</th>

                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td> <p>{rollNo}</p></td>
                    <td> <p>{name}</p></td>

                    <td>
                      <TextField defaultValue={date} type="Date" onChange={(e) => setD(e.target.value)} required id="standard-basic" /></td>
                    <td>   <select onChange={(e) => setMonth(e.target.value)} required style={{ border: 'none' }} >
                      <option value="" >Choose ...</option>
                      <option value="January" >January</option>
                      <option value="Febrauary">Febrauary</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>  </td>

                    <td> <TextField type="number" onChange={(e) => setAmount(e.target.value)} required id="standard-basic" /></td>
                    {buttonSpin ? <td><button className="btn btn-success" type="submit" >Update</button> </td> : <Spin indicator={antIcon} />}



                  </tr>
                </tbody>
              </table>


            </form><br /></div>
          : null}
        {/* //********************** Update Page Ended************ */}

      </div>

    )


  }

  //************************main Page ***************************//

  return (
    <div>
      <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>Fees Page :</p>
      
      <div>


        <div className="mobileVisible"><h4 style={{ color: 'red' }}> Please Change to Desktop Site or Login from Computer or Desktop </h4> </div>

        <div className="mobileHidden">


          <div >



            <Card className="text-center" style={{ width: "50%", marginLeft: '25%', border: '2px solid grey' }}>
              <Card.Header>  Student Fees Details and Update</Card.Header>
              <form onSubmit={fetchClassDetails}   >
                <Card.Body>



                  <FormControl required className={classes.formControl}>
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


                  <br />



                </Card.Body>
                <Card.Footer >
                  <button type="submit" className="btn btn-primary text-center">Fetch Class Details</button>

                </Card.Footer>
              </form>
            </Card>

          </div>










          <br />


          {spin ? spin1 ? <div>
            <div style={{ color: 'green', fontWeight: 800 }}>
              <p> Class : {studentClass}          {open3 ? `,Branch : ${studentBranch} ` : null}  ,            Section : {studentSection}
              </p>


            </div>
            <table style={{ textAlign: 'center', border: '5px solid #001529' }} className="table">
              <thead style={{ fontSize: 18, backgroundColor: '#001529', color: 'white' }}>
                <tr >
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Check</th>

                </tr>
              </thead>

              <tbody>
                {studentData.map(data => (
                  <tr>
                    <td>{data.Name}</td>
                    <td>{data.RollNo}</td>

                    <td> <button onClick={(e) => {
                      e.preventDefault()
                      onCheck(data)
                    }} className="btn btn-primary text-center" >Check</button> </td>

                  </tr>

                ))}

              </tbody>
            </table></div> : <div style={{ textAlign: 'center' }}><Spin indicator={antIcon} /></div> : null}<hr />










        </div></div>

    </div>
  )
}

export default StudentFees
