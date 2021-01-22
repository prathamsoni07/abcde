import React from "react";
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';

const TaskList = (props) => {
    return (
        props.taskList.map((val, idx) => {
            let question = `question-${idx}`, answer = `answer-${idx}`, option1 = ` option1-${idx}`, option2 = ` option1-${idx}`, option3 = ` option3-${idx}`, option4 = ` option4-${idx}`


            return (
                <>

                    <label style={{ marginTop: '5%', color: 'red' }}> Question {idx + 1}</label>
                    <input className="form-control" name="question" required id={question} data-id={idx} style={{ width: '500%', marginBottom: '6%' }} placeholder="Enter Question Here" />


                    <tr key={val.index} style={{ border: '2px solid' }}>




                        <td>
                            <label>Enter Answer</label>

                            <input required type="text" placeholder="Enter Answer" name="answer" id={answer} data-id={idx} className="form-control " />
                        </td>
                        <td >
                            <label> Option 1</label>

                            <input required type="text" name="option1" data-id={idx} id={option1} className="form-control " placeholder="Enter Option" />
                        </td>
                        <td>
                            <label> Option 2</label>

                            <input required type="text" name="option2" data-id={idx} id={option2} className="form-control " placeholder="Enter Option" />
                        </td>

                        <td>
                            <label> Option 3</label>

                            <input required type="text" name="option3" id={option3} data-id={idx} className="form-control" placeholder="Enter Option" />
                        </td>
                        <td>
                            <label> Option 4</label>

                            <input required type="text" name="option4" id={option4} data-id={idx} className="form-control" placeholder="Enter Option" />

                        </td>

                        <td>
                            {
                                idx === 0 ? <PlusSquareOutlined onClick={() => props.add()} className="btn btn-primary" style={{ fontSize: 20 }} />
                                    : <MinusSquareOutlined style={{ fontSize: 20 }} className="btn btn-danger" onClick={(() => props.delete(val))} />
                            }
                        </td>
                    </tr >




                </>

            )
        })
    )
}
export default TaskList
