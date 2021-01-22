import React, { useState, useEffect } from 'react';
import { Form, Col, Card } from 'react-bootstrap';
import Axios from 'axios';
import Cookies from 'js-cookie'
import { Spin } from 'antd';


function AssignClass() {

    const [classData, setClassData] = useState([]);
    const [branchName, setBranchName] = useState([]);
    const [sectionName, setSectionName] = useState([]);
    const [branchDisable, setbranchDisable] = useState(false)
    const [studentClass, setStudentClass] = useState('');
    const [section, setSection] = useState('');
    const [branch, setBranch] = useState('');
    const [data, setData] = useState([]);
    const [enrollmentNo, setEnrollmentNo] = useState('');
    const [spin, setSpin] = useState(false);
    const [spin1, setSpin1] = useState(false);




    useEffect(async () => {


        await Axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: "hello0" }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setClassData(res.data)
        })
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherinfo"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setData(res.data)
            setSpin(true)

        })
    }, [Axios])




    function classClick(e) {
        branchName.splice(0)
        setStudentClass(e)
        if (e > 10) {

            setbranchDisable(true)
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
            setbranchDisable(false)

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
        console.log(e);
        var branchName = classData.find(o => o.Class == studentClass);
        var branchFind = branchName.Branches.find(o => o.Branch == e);
        if (!branchFind) {
            alert("No Section")
            return false
        } else {
            setSectionName(branchFind.Section)

        }

    }


    function handleSubmit(e) {
        console.log(enrollmentNo);
        console.log(studentClass);
        console.log(branch);
        console.log(section);
        e.preventDefault()
        console.log("sdfasdf");

        var d = window.confirm(`Assign Class ${studentClass},Branch ${branch},Section ${section} to ${enrollmentNo}`)

        if (d) {
            setSpin1(true)
            var DATA = {
                EnrollmentNo: enrollmentNo,
                Class: studentClass,
                Branch: branch,
                Section: section
            }


            Axios.post(process.env.REACT_APP_SECURITY_API.concat("assignclass"), DATA, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                alert(res.data.msg);
                document.getElementById("reset").reset()
                setSpin1(false)

            })
        } else return false
    }



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >


            {spin ? <div className="card" style={{ width: '40%', border: '2px solid #001529' }} >
                <label style={{ textAlign: 'center', backgroundColor: "#001529", color: 'white' }} className="card-header"> Assign Class For Attendence</label>
                <form id="reset" className="card-body" onSubmit={handleSubmit}>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label> Teacher </Form.Label>
                        <select required className="form-control" onChange={(e) => setEnrollmentNo(e.target.value)} as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>
                            {data.map(data => (
                                <option value={data.RollNo}>({data.RollNo}) {data.Name}</option>
                            ))}
                        </select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label> Class </Form.Label>
                        <select required className="form-control" onChange={(e) => {
                            setStudentClass(e.target.value)
                            classClick(e.target.value)
                        }} as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>
                            <option value={"1"}>Class I</option>
                            <option value={"2"}>Class II</option>
                            <option value={"3"}>Class III</option>
                            <option value={"4"}>Class IV</option>
                            <option value={"5"}>Class V</option>
                            <option value={"6"}>Class VI</option>
                            <option value={"7"}>Class VII</option>
                            <option value={"8"}>Class VIII</option>
                            <option value={"9"}>Class IX</option>
                            <option value={"10"}>Class X</option>
                            <option value={"11"}>Class XI</option>
                            <option value={"12"}>Class XII</option>
                        </select>
                    </Form.Group>
                    {branchDisable ? <Form.Group as={Col} controlId="formGridState">
                        <Form.Label> Branch</Form.Label>
                        <select required className="form-control" onChange={(e) => {
                            setBranch(e.target.value)
                            branchClick(e.target.value)
                        }} as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>

                            {branchName.map(data => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                    </Form.Group> : null}
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label> Section</Form.Label>
                        <select required className="form-control" onChange={(e) => setSection(e.target.value)} as="select" defaultValue="Choose...">
                            <option value="">Choose...</option>
                            {sectionName.map(data => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                    </Form.Group>
                    {spin1 ? <div style={{ textAlign: 'center' }}><Spin />  </div> : <div style={{ textAlign: 'center' }} ><button style={{ width: "30%" }} type="submit" className="btn btn-primary">Assign</button></div>}
                </form>



            </div> : <div style={{ textAlign: 'center' }}><Spin />  </div>}

        </div>
    )
}

export default AssignClass
