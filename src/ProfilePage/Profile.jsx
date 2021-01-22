import React, { useEffect, useState } from 'react'
import './Profile.css';
import Axios from 'axios'

import Cookies from 'js-cookie'
import { Tabs, Tab } from 'react-bootstrap'


function Profile() {


    const [profileImg, setProfileImg] = useState('');
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [enrollNo, setEnrollNo] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [aadhar, setAadhar] = useState('')
    const [caste, setCaste] = useState('');
    const [gender, setGender] = useState('');
    const [panNo, setPanNo] = useState('');
    const [religion, setReligion] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');


    useEffect(() => {
        console.log("useEffect Called");
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("everydetail"), { EnrollmenId: 'UE012100001' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            setName(res.data.data.Name)
            setRole(res.data.data.Role)
            setEnrollNo(res.data.data.EnrollmentNo)
            setEmail(res.data.data.EmailId)
            setPhone(res.data.data.Mobile)
            setDob(res.data.data.Dob)
            setAadhar(res.data.data.AadharId)
            setCaste(res.data.data.Caste)
            setGender(res.data.data.Gender)
            setPanNo(res.data.data.Id)
            setReligion(res.data.data.Religion)
            setAddress(res.data.data.HomeAddress)
            setPincode(res.data.data.Pincode)

            let c = new Uint8Array(res.data.file.Body.data)
            const STR = c.reduce((data, byte) => {
                return data + String.fromCharCode(byte);
            }, '');
            let base64String = btoa(STR)
            setProfileImg(base64String)




        })
    }, [])



    return (
        <h1>dfs</h1>
    )
}

export default Profile
