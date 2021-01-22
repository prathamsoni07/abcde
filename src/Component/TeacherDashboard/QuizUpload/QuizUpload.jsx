import React from "react";
import TaskList from "./QuizTaskList";
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import { PlusSquareOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'

const antIcon = <LoadingOutlined style={{ fontSize: 100, textAlign: 'center' }} spin />;








class DailyTimeTable extends React.Component {
    state = {
        taskList: [{ index: Math.random(), question: "", answer: "", option1: "", option2: "", option3: "", option4: "" }],
        class: '',
        quizTitle: '',
        branch: '',
        branchShow: false,
        classData: [],
        branchName: [],
        open: false,
        studentSection: '',
        sectionName: [],
        quizDate: '',
        quizStime: '',
        quizEtime: '',
        duration: ''


    }

    handleChange = (e) => {
        if (["question", "answer", "option1", "option2", "option3", "option4"].includes(e.target.name)) {
            let taskList = [...this.state.taskList]
            taskList[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    addNewRow = () => {
        this.setState((prevState) => ({
            taskList: [...prevState.taskList, { index: Math.random(), question: "", answer: "", option1: "", option2: "", option3: "", option4: "" }],

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
            this.setState({ classData: res.data, open: true })
        })

    }



    classClick = (e) => {
        console.log(e);
        this.setState({ class: e })
        const { classData, branchName } = this.state
        console.log(classData);

        this.setState({ sectionName: [] })

        console.log(e);
        if (e > 10) {
            var branchFind = classData.find(o => o.Class === e)
            console.log(branchFind);

            if (branchFind === undefined) {
                alert("No branch found")
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
            console.log(classFind1);
            if (classFind1 === undefined) {
                alert("No Section Found")
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
        var branchName = this.state.classData.find(o => o.Class == this.state.class);
        var branchFind = branchName.Branches.find(o => o.Branch == e);
        this.setState({
            sectionName: branchFind.Section
        })

        console.log(this.state.sectionName);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { branch, studentSection, quizTitle, quizDate, quizStime, quizEtime, taskList, duration } = this.state

        var d = window.confirm(`Upload Quiz ---- ${quizTitle}`)
        if (d) {
            this.setState({ open: false })



            var Data = {

                Class: this.state.class,
                Branch: branch,
                Section: studentSection,
                NameOfQuiz: quizTitle,
                Date: quizDate,
                StartTime: quizStime,
                EndTime: quizEtime,
                QuizData: taskList,
                Duration: duration
            }


            console.log(Data);
            Axios.post(process.env.REACT_APP_SECURITY_API.concat("quizupload"), Data, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res);
                alert(res.data.msg)
                this.setState({ open: true, branch: '', class: '', quizTitle: '' });
                document.getElementById("formreset").reset()
                taskList.splice(0);

            })

        } else {
            return false
        }


    }
    clickOnDelete(record) {
        this.setState({
            taskList: this.state.taskList.filter(r => r !== record)
        });
    }
    render() {
        let { taskList, branchName, open } = this.state
        return (
            <div className="content">
                {/* <NotificationContainer/> */}
                {open ? <form onSubmit={this.handleSubmit} onChange={this.handleChange} id="formreset" >
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                            <div className="card" style={{ border: '4px solid #001529' }} >
                                <div className="card-header text-center" style={{ fontWeight: 'bolder', backgroundColor: '#001529', color: 'white' }}><label> Upload Quiz </label></div>
                                <div className="card-body">
                                    <div className="row">

                                        <div className="col-sm-3">
                                            <label> Class  </label>

                                            <select required name="class" className="form-control" onChange={(e) => this.classClick(e.target.value)}>
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


                                        {this.state.branchShow ? <div className="col-sm-3" >
                                            <label> Branch  </label>

                                            <select onChange={(e) => this.branchClick(e.target.value)} required name="branch" className="form-control" >
                                                <option value="">Select Branch ... </option>
                                                {branchName.map(data => (
                                                    <option key={data} value={data}>{data}</option>
                                                ))}


                                            </select></div> : null}

                                        <div className="col-sm-3">
                                            <label> Section  </label>

                                            <select required className="form-control" name="studentSection" >
                                                <option value="">Select Section... </option>
                                                {this.state.sectionName.map(data => (
                                                    <option key={data}>{data}</option>
                                                ))}



                                            </select> <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label> Quiz Title  </label>

                                            <input required type="text" placeholder="Enter Quiz Title" className="form-control " name="quizTitle" />
                                            <br />
                                        </div>

                                        <div className="col-sm-2">
                                            <label> Quiz Date  </label>

                                            <input required type="date" className="form-control " name="quizDate" />
                                            <br />
                                        </div>


                                        <div className="col-sm-2" >
                                            <label> Quiz Start Time                                            </label>

                                            <input required type="time" className="form-control " name="quizStime" />
                                        </div>

                                        <div className="col-sm-2">
                                            <label> Quiz End Time                                           </label>

                                            <input required type="time" className="form-control " name="quizEtime" />

                                        </div>
                                        <div className="col-sm-2">
                                            <label> Duration (in minutes)                                       </label>

                                            <input required type="number" className="form-control " name="duration" />

                                        </div>
                                    </div>

                                    <hr />
                                    <table className="table">

                                        <tbody  >
                                            <TaskList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} taskList={taskList} />

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
                </form> : <div style={{ textAlign: 'center', marginTop: '8%' }}><Spin indicator={antIcon} /></div>}
            </div>
        )
    }
}
export default DailyTimeTable