import React, { useEffect, useState } from 'react';
import Axios from 'axios'


function DeletePage() {

    const [schoolCode, setSchoolCode] = useState("");
    const [role, setRole] = useState('');
    const [data, setData] = useState([])


    function fetchData(e) {
        e.preventDefault();
        console.log(schoolCode);
        console.log(role);
        var Data = {
            SchoolCode: schoolCode,
            Role: role
        }
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getdetails"), Data).then((res) => {
            console.log(res);
            setData(res.data)
        })

    }
    function deleteData(e) {
        e.preventDefault();
        console.log(e.target.value);
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("deletedata"), { EnrollmentNo: e.target.value, Role: role }).then((res) => {
            console.log(res.data);
        })
    }

    return (
        <div><div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
                <form onSubmit={fetchData}> <div className="card">
                    <div className="card-header text-center" style={{ fontWeight: 'bolder' }}>Delete page</div>
                    <div className="card-body">
                        <div className="row">

                            <div className="col-sm-6">
                                <input type="text" className="form-control" onChange={(e) => setSchoolCode(e.target.value)} required placeholder="Enter School Code" /> <br />
                            </div>

                            <div className="col-sm-3">
                                <select className="form-control" onChange={(e) => setRole(e.target.value)}>
                                    <option value="" >Choose...</option>
                                    <option value="Principal" >Principal</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Student">Student</option>
                                    <option value="Parents">Parents</option>

                                </select>
                            </div>

                        </div>

                    </div>

                    <div className="card-footer text-center"> <button type="submit" className="btn btn-info text-center">Fetch  Details</button></div>
                </div></form>
            </div>
            <div className="col-sm-1"></div>
        </div>
            <div className="card" style={{ textAlign: 'center' }}>
                <table className="table">
                    <tbody>
                        {data.map(data => (
                            <tr>
                                <td>  {data.EnrollmentNo}</td>
                                <td>  {data.Name}</td>
                                <td><button value={data.EnrollmentNo} onClick={(e) => deleteData(e)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default DeletePage
