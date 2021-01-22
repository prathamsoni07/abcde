import React from "react";
import {PlusSquareOutlined,MinusSquareOutlined} from '@ant-design/icons';
const TaskList = (props) => {
  return (
    props.taskList.map((val, idx) => {
      let subjectName = `subjectName-${idx}`, dateOfExam = `dateOfExam-${idx}`, startTime = `taskNotes-${idx}`, endTime = `taskStatus-${idx}`
      return (
        <tr key={val.index}>

<td>
            <input required type="text" placeholder="Enter Subject Name" name="subjectName" id={subjectName} data-id={idx} className="form-control " />
          </td>
          <td>
            <input required type="date"  name="dateOfExam" data-id={idx} id={dateOfExam} className="form-control " />
          </td>

          <td>
            <input required type="time" name="startTime" id={startTime} data-id={idx} className="form-control"/>
          </td>
          <td>
                      <input required type="time"  name="endTime" id={endTime} data-id={idx} className="form-control"/>

          </td>
          <td>
            {
            idx===0?<PlusSquareOutlined onClick={()=>props.add()} className="btn btn-primary" style={{fontSize:20}}/>
            : <MinusSquareOutlined  style={{fontSize:20}} className="btn btn-danger" onClick={(() => props.delete(val))}/>
            }
          </td>
        </tr >
      )
    })
  )
}
export default TaskList
