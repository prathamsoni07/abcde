import React, { Component } from 'react';
import Axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Spin } from 'antd';
import Cookies from 'js-cookie'
import {Button} from 'react-bootstrap'


class StudentAttendence extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: {},
            spin: false,
            attendence: false
        }
    }


    componentDidMount = () => {
        console.log("dfasffdsadsfdsa");
        Axios.post(process.env.REACT_APP_SECURITY_API.concat('studentattendence'), { hello: "afsf" }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            this.setState({
                chartData: {
                    labels: ['Present', 'Absent', 'On leave'],
                    datasets: [
                        {
                            label: 'Population',
                            data: [
                                res.data.NoOfPresent,
                                res.data.NoOfAbsent,
                                res.data.NoOfApplication,

                            ],
                            backgroundColor: [
                                '#90ee90',
                                '#FA4659',
                                'skyblue',


                            ]
                        }
                    ]
                },
                spin: true
            })
        })
    }

    back = () => {
        this.setState({ attendence: false })
    }

    render() {

        if (this.state.attendence) {
            return (
                <div>
                    <Button variant="outline-danger" onClick={this.back}>back</Button>
                    <h1>Hello</h1>
                </div>
            )
        }

        return (
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <div className="card" style={{ width: '35%' }}>
                    <label className="card-header" style={{ textAlign: 'center' }}>Attendence</label>
                    {this.state.spin ? <div >



                        <div className="card-body" style={{ background: ' -webkit-linear-gradient(left, #3931af, #00c6ff)' }} >
                            <Pie


                                data={this.state.chartData}



                                options={{
                                    legend: { position: 'right', }
                                }}
                            />
                        </div>
                        <div className="card-footer" style={{ textAlign: 'center' }}  ><button className="btn btn-info" onClick={() => this.setState({ attendence: true })}>See Details</button></div>
                    </div> : <Spin />}
                </div>
            </div>
        )
    }
}

export default StudentAttendence