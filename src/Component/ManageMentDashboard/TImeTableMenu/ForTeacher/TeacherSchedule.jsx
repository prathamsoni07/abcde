import React from "react";
import TaskList from "./TeacherTasklist";
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import { PlusSquareOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Spin } from 'antd';
import Cookies from 'js-cookie'








class TeacherSchedule extends React.Component {
    state = {
        taskList: [{ index: Math.random(), teacherId: "", date: "", subject: "", startTime: "", endTime: "" }],
        class: '',
        examTitle: '',
        branch: '',
        branchShow: false,
        classData: [],
        branchName: [],
        open: true,
        studentSection: '',
        sectionName: [],
        studentBranch: '',
        teacherdata: []
    }

    handleChange = (e) => {
        if (["teacherId", "date", "subject", "startTime", "endTime"].includes(e.target.name)) {
            let taskList = [...this.state.taskList]
            taskList[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    addNewRow = () => {
        this.setState((prevState) => ({
            taskList: [...prevState.taskList, { index: Math.random(), teacherId: "", date: "", subject: "", startTime: "", endTime: "" }],
        }));
    }


    deteteRow = (index) => {
        this.setState({
            taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
        });

    }


    componentDidMount = () => {
        console.log("compo Called");
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("section"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            this.setState({ classData: res.data })
        })
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teacherinfo"), { hello: 'hello' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            this.setState({
                teacherdata: res.data
            })

        })

    }



    classClick = (e) => {
        console.log(e);
        this.setState({ class: e })
        const { classData, branchName } = this.state
        console.log(classData);

        branchName.splice(0)
        console.log(e);
        if (e > 10) {
            var branchFind = classData.find(o => o.Class === e)
            console.log(branchFind);
            if (!branchFind) {
                alert(`No branch in class ${e}`)
                this.setState({ branchShow: false })

                return false
            } else {
                branchFind.Branches.map(data => {
                    console.log(data.Branch); branchName.push(data.Branch)
                })
                console.log(branchName);
                this.setState({ branchShow: true })
            }


        } else {

            var classFind1 = classData.find(o => o.Class == e)

            if (!classFind1) {
                alert(`No Section in class ${e}`)
                return false
            } else {
                classFind1.Branches.map((data) => {
                    this.setState({ sectionName: data.Section })
                })



                this.setState({ branchShow: false })

            }
        }
    }



    branchClick = (e) => {
        console.log(e);
        this.setState({ studentBranch: e })
        var branchName = this.state.classData.find(o => o.Class == this.state.class);
        var branchFind = branchName.Branches.find(o => o.Branch == e);
        if (!branchFind) {
            alert(`No section in branch ${e} of class ${this.state.class}`)
            return false
        } else {
            this.setState({
                sectionName: branchFind.Section
            })

        }


    }
    handleSubmit = (e) => {
        const { examTitle, branch, taskList, studentBranch, studentSection } = this.state
        e.preventDefault();
        this.setState({ open: false })
        console.log(examTitle);
        console.log(taskList);
        console.log(branch);
        console.log(this.state.class);
        var Data = {

            Class: this.state.class,
            Branch: studentBranch,
            Section: studentSection,
            Calender: taskList
        }


        console.log(Data);
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("teachercalenderupload"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {

            alert(res.data.msg)
            this.setState({ open: true, branch: '', class: '', examTitle: '' })
            taskList.splice(0);

        })


    }
    clickOnDelete(record) {
        this.setState({
            taskList: this.state.taskList.filter(r => r !== record)
        });
    }
    render() {
        let { taskList, branchName, open, teacherdata } = this.state
        return (
            <div className="content">
                {/* <NotificationContainer/> */}
                {open ? <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <div className="card">
                                <div className="card-header text-center" style={{ fontWeight: 'bolder' }}>Upload Monthly/Daily Time Table</div>
                                <div className="card-body">
                                    <div className="row">

                                        <div className="col-sm-2">
                                            <label>Class</label>
                                            <select style={{ marginTop: '3%' }} required name="class" className="form-control" onChange={(e) => this.classClick(e.target.value)}>
                                                <option value="">Select Class... </option>

                                                <option value="1">Class I </option>
                                                <option value="2">Class II </option>
                                                <option value="3">Class III </option>
                                                <option value="4">Class IV </option>
                                                <option value="5">Class V </option>
                                                <option value="6">Class VI </option>
                                                <option value="7">Class VII </option>
                                                <option value="8">Class VIII </option>
                                                <option value="9">Class IX </option>
                                                <option value="10">Class X </option>
                                                <option value="11">Class XI </option>
                                                <option value="12">Class XII </option>

                                            </select> <br />
                                        </div>


                                        {this.state.branchShow ? <div className="col-sm-2" >
                                            <label>Branch</label>

                                            <select style={{ marginTop: '3%' }} onChange={(e) => this.branchClick(e.target.value)} required name="branch" className="form-control">
                                                <option value="">Select Branch ... </option>
                                                {branchName.map(data => (
                                                    <option key={data} value={data}>{data}</option>
                                                ))}


                                            </select></div> : null}

                                        <div className="col-sm-2">
                                            <label>Section</label>

                                            <select style={{ marginTop: '3%' }} required className="form-control" name="studentSection"  >
                                                <option value="">Select Section... </option>
                                                {this.state.sectionName.map(data => (
                                                    <option key={data}>{data}</option>
                                                ))}



                                            </select> <br />
                                        </div>

                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="required" >Select Teacher</th>
                                                <th className="required" >Date </th>
                                                <th className="required" >Subject</th>
                                                <th className="required" >Start Time</th>

                                                <th>EndTime</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ maxWidth: '100%' }} >
                                            <TaskList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} taskList={taskList} teacherData={teacherdata} />
                                        </tbody>
                                        <tfoot>
                                            <tr><td colSpan="4">
                                                <PlusSquareOutlined onClick={this.addNewRow} className="btn btn-primary" style={{ fontSize: 20, marginTop: 10 }} />
                                            </td></tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="card-footer text-center">
                                    <button type="submit" style={{width:"200px"}} className="btn btn-primary text-center">Submit</button></div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>


                    </div>
                </form> : <div style={{ textAlign: 'center', marginTop: '8%' }}><Spin /></div>}
            </div>
        )
    }
}
export default TeacherSchedule