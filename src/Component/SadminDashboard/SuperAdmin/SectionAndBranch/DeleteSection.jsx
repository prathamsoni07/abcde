import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import Axios from 'axios';
import Cookies from 'js-cookie'

function DeleteSection() {
    const [open, setOpen] = useState(false);
    const [branchShow, setBranchShow] = useState(false);
    const [studentClass, setStudentClass] = useState('')
    const [branch, setBranch] = useState('');
    const [schoolData, setSchoolData] = useState([]);
    const [schoolName, setSchoolName] = useState('');
    const [sectionName, setSectionName] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false)



    useEffect(() => {
        console.log("useEffect Called");

        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getschoolinfo"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setSchoolData(res.data)
            setOpen(true)
        })

    }, [])
    console.log(schoolData);

    function classClick(e) {
        setStudentClass(e)
        if (e > 10) {
            setBranchShow(true)
        } else {
            setBranchShow(false)
        }
    }

    console.log(studentClass);

    function sectionFind(e) {
        setOpen1(true);
        setOpen2(false);
        e.preventDefault();
        console.log("function called");
        var data = {

            SchoolId: schoolName.split(" ")[0].split('(')[1].split(')')[0],
            Class: studentClass,
            Branch: branch
        }

        Axios.post(process.env.REACT_APP_SECURITY_API.concat("sectionfetch"), data, console.log("req sent"), { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            if (res.data.msg === "not found") {
                alert(res.data.msg)
                setOpen1(false)

                return false
            } else {
                setSectionName(res.data)
                setOpen2(true)
            }

        })
    }
    console.log(sectionName);

    function removeSection(e) {
        e.preventDefault();
        var d = window.confirm(`are you sure you want to delete ${e.target.value}`)
        console.log(d);
        if (d === true) {
            console.log(e);
            console.log(e.target.value);
            var DATA = {
                SchoolId: schoolName.split(" ")[0].split('(')[1].split(')')[0],
                Class: studentClass,
                Branch: branch,
                Section: e.target.value
            }
            console.log(DATA);

            Axios.post(process.env.REACT_APP_SECURITY_API.concat("deletesection"), DATA, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                alert(res.data.msg)
            })

        } else {
            return false
        }


    }
    return (
        <div>
            <div className="content" >
                {/* <NotificationContainer/> */}
                {open ? <form onSubmit={sectionFind}  >
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header text-center" style={{ fontWeight: 'bolder' }}>Delete Section</div>
                                <div className="card-body">
                                    <div className="row">

                                        <div className="col-sm-6">
                                            <select style={{ marginTop: '3%' }} required name="class" onChange={(e) => setSchoolName(e.target.value)} className="form-control" >
                                                <option value="">Select School ... </option>
                                                {schoolData.map(data => (
                                                    <option key={data} value={data}>{data}</option>
                                                ))}


                                            </select> <br />
                                        </div>

                                        <div className="col-sm-3">
                                            <select style={{ marginTop: '3%' }} required name="class" className="form-control" onChange={(e) => classClick(e.target.value)} >
                                                <option value="">Select Class... </option>

                                                <option value="1">Class I </option>
                                                <option value="2">Class II </option>
                                                <option value="3">Class III </option>
                                                <option value="4">Class IV </option>
                                                <option value="5">Class V </option>
                                                <option value="6">Class VI </option>
                                                <option value="7">Class VII </option>
                                                <option value="8">Class VIII </option>
                                                <option value="9">Class XI </option>
                                                <option value="10">Class X </option>
                                                <option value="11">Class XI </option>
                                                <option value="12">Class XII </option>

                                            </select> <br />
                                        </div>

                                        {branchShow ? <div className="col-sm-3" >  <input style={{ marginTop: '3%' }} onChange={(e) => setBranch(e.target.value)} required name="branch" className="form-control" placeholder="Enter BranchName" /></div> : null}
                                    </div>

                                </div>
                                <div className="card-footer text-center"> <button type="submit" style={{width:"200px"}} className="btn btn-primary text-center">Fetch Section Details</button></div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>


                    </div>
                </form> : <div style={{ textAlign: 'center', marginTop: '8%' }}><Spin /></div>}


                <br />

                {open1 ? open2 ? <div className="card" style={{ textAlign: 'center', marginLeft: '20%', marginRight: '20%' }} ><table style={{ textAlign: 'center' }} className="table">
                    <thead>
                        <tr>
                            <th>Section </th>
                            <th>Delete</th>

                        </tr>
                    </thead>

                    <tbody>
                        {sectionName.map(data => (
                            <tr>
                                <td key={data} >{data}</td>
                                <td  ><button className="btn btn-danger" value={data} onClick={(e) => removeSection(e)}>Delete</button> </td>

                            </tr>

                        ))}
                    </tbody>
                </table></div> : <div style={{ textAlign: 'center', marginTop: '8%' }}><Spin /></div> : null}
            </div>
        </div>
    )
}

export default DeleteSection


{/**        */ }
