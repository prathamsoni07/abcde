import React from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'

const antIcon = <LoadingOutlined style={{ fontSize: 100, textAlign: 'center' }} spin />;

class StudyMaterial extends React.Component {
    state = {
        class: '',
        branch: '',
        branchShow: false,
        classData: [],
        branchName: [],
        open: false,
        studentSection: '',
        file: '',
        subject: '',
        go: false,
        topicName: ''


    }

    imageHandler = (e) => {

        const imageFile = e.target.files[0];
        console.log(imageFile);
        const isLt2M = imageFile.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            NotificationManager.warning('Image must smaller than 2MB!');
            this.setState({ file: '' })
            return false
        }


        if (!imageFile.name.match(/\.(pdf|PDF)$/)) {
            NotificationManager.warning("Please select valid pdf file.")
            this.setState({ file: '' })

            return false;
        }

        if (imageFile && isLt2M) {
            console.log("hello");
            this.setState({ file: imageFile, go: true })
        }


    }


    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })

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

        branchName.splice(0)
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
            this.setState({ branchShow: false })

        }
    }



    handleSubmit = (e) => {
        e.preventDefault();
        const { branch, studentSection, subject, file, topicName } = this.state


        if (this.state.go) {
            var d = window.confirm(`Upload Study Material --${subject}`)
            if (d) {
                console.log(this.state.class);
                this.setState({ open: false })
                console.log(branch);
                console.log(studentSection);
                console.log(file);
                console.log(subject);
                const formdata = new FormData()
                formdata.append("Class", this.state.class)
                formdata.append("Branch", branch)
                formdata.append("Subject", subject)
                formdata.append("file", file)
                formdata.append("Name", topicName)


                Axios.post(process.env.REACT_APP_SECURITY_API.concat("studymaterialupload"), formdata, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                    console.log(res);
                    alert(res.data.msg)
                    this.setState({ open: true, branch: '', class: '', assignmentTitle: '' })
                    document.getElementById("formreset").reset()

                })

            } else return false


        } else return false




    }

    render() {
        let { branchName, open } = this.state
        return (
            <div className="content">
                <div style={{ color: 'red' }}> <NotificationContainer /></div>
                {open ? <form onSubmit={this.handleSubmit} onChange={this.handleChange} id="formreset" >
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-1 "></div>
                        <div className="col-sm-10">
                            <div className="card" style={{ border: '4px solid #001529' }} >
                                <div className="card-header text-center" style={{ fontWeight: 'bolder', backgroundColor: '#001529', color: 'white' }}><label> Upload Study Material </label></div>
                                <div className="card-body" >
                                    <div className="row" >

                                        <div className="col-sm-5">
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


                                        {this.state.branchShow ? <div className="col-sm-5" >
                                            <label> Branch  </label>

                                            <select required name="branch" className="form-control" >
                                                <option value="">Select Branch ... </option>
                                                {branchName.map(data => (
                                                    <option key={data} value={data}>{data}</option>
                                                ))}


                                            </select></div> : null}


                                    </div>
                                    <div className="row">

                                        <div className="col-sm-4">
                                            <label> Subject  </label>
                                            <input className="form-control" type="text" placeholder="Enter  Here" name="subject" required />

                                            <br />
                                        </div>

                                        <div className="col-sm-4">
                                            <label> Topic Name  </label>
                                            <input className="form-control" type="text" placeholder="Enter topic Here" name="topicName" required />


                                        </div>


                                        <div className="col-sm-4" >
                                            <label>Upload file  </label>

                                            <input className="form-control" type="file" onChange={this.imageHandler} required />
                                        </div>


                                    </div>

                                </div>
                                <div className="card-footer text-center">
                                    <button type="submit" style={{width:"200px"}} className="btn btn-primary text-center">Submit</button></div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>


                    </div>
                </form> : <div style={{ textAlign: 'center', marginTop: '8%' }}><Spin indicator={antIcon} /></div>
                }
            </div>
        )
    }
}
export default StudyMaterial