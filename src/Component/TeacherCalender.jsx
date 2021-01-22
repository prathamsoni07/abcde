import React, { Component } from 'react';
import { enableRipple } from '@syncfusion/ej2-base';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, TimelineViews } from '@syncfusion/ej2-react-schedule';

import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { PropertyPane } from './property-pane';
import * as dataSource from './DATA.json';
import Axios from 'axios';
enableRipple(false);

class Calender extends Component {
    // constructor() {
    //     super();
    //     this.state{}
    //     this.data = extend([], dataSource.scheduleData, null, true);
    // }
    constructor(props) {
        super(props)

        this.state = {
            data: extend([], [], null, true)
        }
    }


    componentDidMount = () => {
        console.log("compoCalender");
        Axios.post(process.env.REACT_APP_READ_API.concat("calender")).then((res) => {
            console.log(res.data);
            console.log(this.state.data);
            // this.setState({ data: res.data })
            // console.log(this.data);
            this.setState({ data: extend([], res.data, null, true) })
            console.log(this.state.data);

        })

    }

    change(args) {
        this.scheduleObj.selectedDate = args.value;
        this.scheduleObj.dataBind();
    }

    onDragStart(args) {
        args.navigation.enable = true;
    }
    render() {
        return (<div className='schedule-control-section'>
            <div className='col-lg-9 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent height='850px' width='120%' ref={schedule => this.scheduleObj = schedule} selectedDate={new Date()} eventSettings={{ dataSource: this.state.data }} readOnly dragStart={(this.onDragStart.bind(this))}>
                        <ViewsDirective>
                            <ViewDirective readonly option='Day' />
                            <ViewDirective readonly option='Week' />
                            <ViewDirective readonly option='WorkWeek' />
                            <ViewDirective readonly option='Month' />
                            <ViewDirective readonly option='Agenda' />
                            <ViewDirective readonly option='TimelineWeek' />
                            <ViewDirective readonly option='TimelineViews' />
                        </ViewsDirective>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, TimelineViews]} />
                    </ScheduleComponent>
                </div>
            </div>
            <div className='col-lg-3 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '30%' }}>
                                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Current Date</div>
                                </td>
                                <td style={{ width: '70%' }}>
                                    <div className='datepicker-control-section'>
                                        <DatePickerComponent value={new Date()} showClearButton={true} change={this.change.bind(this)}></DatePickerComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div>);
    }
}
export default Calender