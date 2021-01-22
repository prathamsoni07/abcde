import React,{useState,useEffect} from 'react'
import *  as dataStorage from './Data.json';
import { Radio } from 'antd';


const promotionOptions = ['Present','Absent','On Leave'];

function StudentAttendence() {

          const [promote, setPromote] = useState([]);
          const [name, setName] = useState([]);
          const [rollNo,setRollNo] = useState([]);
useEffect(() => {
    console.log(promote);
})
function handleSubmit(e){
    console.log("function called");
    e.preventDefault()
    console.log(promote);
}
 
function clickOnDelete(record) {
   

    setPromote(promote.filter(r=> r !== record))

}

   let Data =  dataStorage.default
    
   return (
        <div>
            <h1>promotion page</h1>
            
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Class</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Section</th>
                        </tr>
                    </thead>

                    <tbody>
                    {Data.map(data=>(
                        <tr>
                            <td>{data.Name}</td>
                            <td>{data.RollNo}</td>
                            <td>{data.Class}</td>
                            <td>{data.Age}</td>
                            <td>{data.Gender}</td>
                            <td>{data.Section}</td>
                            <td>  <div > 
                                <label >Promote   :  </label>
           <Radio.Group options={promotionOptions} onChange={(e) => {
              var Find = promote.find(o=>o.RollNo==data.RollNo)
              var Find2 = promote.indexOf(Find)
              
              
        if (Find) {
            promote.splice(Find2,1 )
            promote.push({RollNo:data.RollNo,promotion:e.target.value})

        }else{
            promote.push({RollNo:data.RollNo,promotion:e.target.value})
        }
               
                
            
        
                }   }  />
                              </div> </td>
                        </tr>

))}
<button type='submit' onClick={handleSubmit}  >  submit</button>
                    </tbody>
                </table>
           
        </div>
    )
}

export default StudentAttendence
