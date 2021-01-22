import React from "react";
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
const TaskList = (props) => {
  console.log(props.teacherData);


  return (
    props.taskList.map((val, idx) => {
      let teacherId = `teacherId-${idx}`, date = `date-${idx}`, subject = `subject-${idx}`, startTime = `startTime-${idx}`, endTime = `endTime-${idx}`
      return (
        <tr key={val.index}>

          <td>
            <select required className="form-control" id={teacherId} data-id={idx} name="teacherId"  >
              <option value="">Select Teacher</option>
              {props.teacherData.map(data => (
                <option value={data.RollNo}>({data.RollNo}) {data.Name}</option>
              ))}



            </select>          </td>
          <td>
            <input required type="date" name="date" data-id={idx} id={date} className="form-control " />
          </td>

          <td>
            <input required type="text" name="subject" id={subject} data-id={idx} className="form-control" />
          </td>
          <td>
            <input required type="time" name="startTime" id={startTime} data-id={idx} className="form-control" />

          </td>
          <td>
            <input required type="time" name="endTime" id={endTime} data-id={idx} className="form-control" />

          </td>
          <td>
            {
              idx === 0 ? <PlusSquareOutlined onClick={() => props.add()} className="btn btn-primary" style={{ fontSize: 20 }} />
                : <MinusSquareOutlined style={{ fontSize: 20 }} className="btn btn-danger" onClick={(() => props.delete(val))} />
            }
          </td>
        </tr >
      )
    })
  )
}
export default TaskList
