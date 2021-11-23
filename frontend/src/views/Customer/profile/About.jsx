import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import './CustomerProfile.scss'
export const About = (props) => {
    const [changed, setChanged] = useState(false)
    const history = useHistory()
    const customer = useSelector((state) => state.userLogin.user)
    Axios.defaults.withCredentials = true
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        phoneNo: '',
        city: '',
        state: '',
        country: '',
        nickName: '',
    })
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    useEffect(() => {
        setUserData(props.data)
    }, [props.data])

    const submitCustomerData = () => {
        console.log('hI')
        const formData = new FormData()
        formData.append('image', file)
        formData.append('username', customer)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        const setProfile = Axios.post('http://localhost:3001/api/customer/profile/save', {
            ...userData,
            userId: customer,
        })
        const setPhoto = Axios.post('http://localhost:3001/api/upload/photo', formData, config)
        Promise.all([setPhoto])

            .then((res) => {
              //  console.log(userData);
                console.log(res)
           //   setImage(res[0].data)
            })
            .catch((err) => {
                throw err
            })
    }
    const handleChange = (e) => {
        console.log(e.target.name)
        const { name, value } = e.target
        // const
        setChanged(true)
        setUserData((prevSate) => ({
            ...prevSate,
            [name]: value,
        }))
        console.log(userData)
    }

    const uploadImage = (event) => {
        console.log(event.target.files)
    }
    const submit = async (event) => {
        event.preventDefault()
        console.log(file)
        const formData = new FormData()
        formData.append('image', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        //  const result = await Axios.post('http://localhost:3001/upload-pic', formData, config)
        //  setImage(result.data.imagePath)
        //  setImage('image/3fe4ee4f70dfcfc6cf0fc7acb09ea0f5')
        const result = await Axios.get('http://localhost:3001/fetch-file')
        console.log(result.data[0])
      //  setImage(result.data[1].image)
        // console.log(res);
        // setImage(res.data)
        // console.log(formData);
    }

    return (
        <div>
            {image && (
                <img
                    style={{
                        width: '100px',
                        height: '100px',
                        display: 'inline',
                        margin: '12%',
                        float: 'right',
                    }}
                    src={`http://localhost:3001/${image}`}
                />
            )}
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.name}
                ></input>
            </label>
            {/* 
      <span>DOB</span>
      <input type="text" onChange={setDOB} value={dob}></input> */}

            <label>
                Email
                <input
                    type="text"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.username}
                ></input>
            </label>
            <label>
                Nick Name
                <input
                    type="text"
                    name="nickName"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.nickName}
                ></input>
            </label>
            <label>
                Phone
                <input
                    type="number"
                    name="phoneNo"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.phoneNo}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                ></input>
            </label>
            <label>
                City
                <input
                    type="text"
                    name="city"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.city}
                ></input>
            </label>
            <label>
                State
                <input
                    type="text"
                    name="state"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.state}
                ></input>
            </label>
            <label>
                Country
                <input
                    name="country"
                    onChange={(e) => handleChange(e)}
                    disabled={props.disabled}
                    value={userData.country}
                ></input>
            </label>
            <input
                type="file"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
            />
            {/* <button type="submit">Submit</button> */}
            {!props.disabled && (
                <button type="submit" disabled={!changed} onClick={submitCustomerData}>
                    Save Changes
                </button>
            )}
            {/* </form> */}
        </div>
    )
}
