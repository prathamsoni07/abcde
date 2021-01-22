import React from "react";
import TaskList from "./TaskList"
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import { PlusSquareOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Spin } from 'antd';
import Cookies from 'js-cookie'







class SectionAndBranch extends React.Component {
    state = {
        taskList: [{ index: Math.random(), sectionName: "" }],
        class: '',
        branch: '',
        branchShow: false,
        schoolData: [],
        open: true,
        schoolName: ''
    }

    handleChange = (e) => {
        if (["sectionName"].includes(e.target.name)) {
            let taskList = [...this.state.taskList]
            taskList[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    addNewRow = () => {
        this.setState((prevState) => ({
            taskList: [...prevState.taskList, { index: Math.random(), sectionName: "" }],
        }));
    }


    deteteRow = (index) => {
        this.setState({
            taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
        });

    }


    componentDidMount = () => {
        console.log("compo Called");
        this.setState({ open: false })
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("getschoolinfo"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            this.setState({ schoolData: res.data, open: true })
        })

    }




    classClick = (e) => {
        if (e > 10) {
            this.setState({ branchShow: true })
        } else {
            this.setState({ branchShow: false })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ open: false })
        var ab = []
        this.state.taskList.map(data => {
            ab.push(data.sectionName)
        })

        var Data = {
            SchoolId: this.state.schoolName.split(" ")[0].split('(')[1].split(')')[0],
            Class: this.state.class,
            Branches: {
                Branch: this.state.branch,
                Section: ab
            }

        }
        console.log(Data.SchoolId);
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("sectionupload"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            alert(res.data.msg)
            this.setState({ open: true })



        })


    }
    clickOnDelete(record) {
        this.setState({
            taskList: this.state.taskList.filter(r => r !== record)
        });
    }
    render() {
        let { taskList, open, schoolData, schoolName } = this.state
        console.log(schoolName);
        return (
            <div className="content" >
                {/* <NotificationContainer/> */}
                {open ? <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="card" style={{ border: "3px solid #001529" }}>
                                <div className="card-header text-center" style={{ fontWeight: 'bolder', backgroundColor: '#001529', color: 'white' }}>Upload Section And Branch</div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <select style={{ marginTop: '3%' }} onChange={(e) => this.setState({ schoolName: e.target.value })} required className="form-control" >
                                                <option value="">Select School ... </option>
                                                {schoolData.map(data => (
                                                    <option key={data} value={data}>{data}</option>
                                                ))}


                                            </select> <br />
                                        </div>

                                        <div className="col-sm-4">
                                            <select style={{ marginTop: '3%' }} required name="class" className="form-control" onSelect={(e) => this.setState({ class: e.target.value })} onChange={(e) => this.classClick(e.target.value)}>
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


                                        {this.state.branchShow ? <div className="col-sm-4" >  <input style={{ marginTop: '3%', marginBottom: '3%' }} required name="branch" className="form-control" placeholder="Enter BranchName" /></div> : null}
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="required" > Sections of Class {this.state.class}</th>
                                                <th className="required" > </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <TaskList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} taskList={taskList} />
                                        </tbody>
                                        <tfoot>
                                            <tr><td colSpan="4">
                                                <PlusSquareOutlined onClick={this.addNewRow} className="btn btn-primary" style={{ fontSize: 20, marginTop: 10 }} />
                                            </td></tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="card-footer text-center"> <button type="submit" style={{width:"200px"}} className="btn btn-primary text-center">Submit</button></div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>


                    </div>
                </form> : <div style={{ textAlign: 'center', marginTop: '8%' }}><Spin /></div>}
            </div>
        )
    }
}
export default SectionAndBranch