import React from 'react';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';

const TaskList = (props) => {
    return (
        props.taskList.map((val, idx) => {
            let sectionName = `sectionName-${idx}`
            return (
                <tr key={val.index}>

                    <td>
                        <input required type="text" placeholder="Enter Section Name" name="sectionName" id={sectionName} data-id={idx} className="form-control " />
                    </td>



                    <td style={{ textAlign: 'center' }}>
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
