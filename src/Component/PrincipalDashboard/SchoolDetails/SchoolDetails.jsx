import React, { useState } from 'react'
import './Schooldetails.css'

function SchoolDetails(props) {
    console.log(props);

    let c = new Uint8Array(props.data.file.Body.data)
    const STR = c.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, '');
    let base64String = btoa(STR)





    return (

        <div>

            <p style={{ fontSize: 30, fontWeight: 'bolder', fontFamily: 'initial', color: '#001529', textAlign: 'center' }}>School Profile</p><hr />


            <div className="container" style={{ background: '-webkit-linear-gradient(left, #3931af, #00c6ff)' }}>
                <div className="main-body">




                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`data:image/jpeg;base64,${base64String}`} alt="Admin" className="rounded-circle" width="150" height="180" />
                                        <div className="mt-3">
                                            <h4>{props.data.Data.SchoolId}</h4>
                                            <p className="text-secondary mb-1">{props.data.Data.Name.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-4">

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>School Id</h6>
                                        <span className="text-secondary">{props.data.Data.SchoolId}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Director Name</h6>
                                        <span className="text-secondary">{props.data.Data.Director}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Principal Name </h6>
                                        <span className="text-secondary">{props.data.Data.PrincipalName}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Vice-Principal Name </h6>
                                        <span className="text-secondary">{props.data.Data.VicePrincipalName}</span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">School Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {props.data.Data.Name.toUpperCase()}             </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">School Board</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {props.data.Data.SchoolBoard}                    </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">School Medium</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {props.data.Data.SchoolMedium}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {props.data.Data.Address}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Description</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {props.data.Data.Description}                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row gutters-sm">
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Email Details</h6>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Email I</h6>
                                                    <span className="text-secondary">{props.data.Data.Email[0]}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Email II</h6>
                                                    <span className="text-secondary">{props.data.Data.Email[1]}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Email III</h6>
                                                    <span className="text-secondary">{props.data.Data.Email[2]}</span>
                                                </li>


                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Contact Details</h6>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Contact I</h6>
                                                    <span className="text-secondary">{props.data.Data.Contact[0]}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Contact II</h6>
                                                    <span className="text-secondary">{props.data.Data.Contact[1]}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                    <h6 className="mb-0">Contact III</h6>
                                                    <span className="text-secondary">{props.data.Data.Contact[2]}</span>
                                                </li>


                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        </div>















    )
}

export default SchoolDetails
