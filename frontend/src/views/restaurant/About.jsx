import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import './Profile.css'
import { Button } from 'react-bootstrap'
import NativeSelect from '@mui/material/NativeSelect'
import { useMutation, useQuery } from '@apollo/client'
import { LOAD_PROFILE } from '../../GraphQL/queries'
import { SAVE_PROFILE } from '../../GraphQL/mutations'
const About = () => {
    const restaurant = useSelector((state) => state.restLogin.user)
    const [startOpenHrs, setStartOpenHrs] = useState('00:00')
    const [endOpenHrs, setEndOpenHrs] = useState('00:00')
    const [restData, setRestData] = useState({
        name: '',
        username: restaurant,
        phoneNo: '',
        addressLine1: '',
        city: '',
        state: '',
        country: '',
        description: '',
        openHrs: `${startOpenHrs} - ${endOpenHrs}`,
        delivery: false,
        pickedUp: false,
    })
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    const [changed, setChanged] = useState(false)
    const [countriesData, setCountryData] = useState([])
    const [openHrsMsg, setOpenHrsMsg] = useState(
        'The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999'
    )
    const [saveProfileMutation, { data, loading, error }] = useMutation(SAVE_PROFILE)
    Axios.defaults.withCredentials = true
    const restProfile = useQuery(LOAD_PROFILE, {
        variables: { customer: restaurant },
    })
    useEffect(() => {
        //  getRestData()
        fetchCountryData()
    }, [])

    useEffect(() => {
        if (!restProfile?.loading) {
            console.log(restProfile?.data)
            setRestData({
                name: restProfile.data.customerProfile.name,
                username: restaurant,
                phoneNo: restProfile.data.customerProfile.phoneNo,
                addressLine1: restProfile.data.customerProfile.addressLine1,
                city: restProfile.data.customerProfile.city,
                state: restProfile.data.customerProfile.state,
                country: restProfile.data.customerProfile.country,
                description: restProfile.data.customerProfile.description || '',
                openHrs: restProfile.data.customerProfile.openHrs,
                delivery: restProfile.data.customerProfile.delivery || false,
                pickedUp: restProfile.data.customerProfile.pickedUp || false,
            })
            setImage(restProfile.data.customerProfile.imageURL)
            setStartOpenHrs(restProfile?.data?.customerProfile?.openHrs.split(' - ')[0])
            setEndOpenHrs(restProfile?.data?.customerProfile?.openHrs.split(' - ')[1])

            // localStorage.setItem('deliveryMode', res.data.deliveryMode)
        }
    }, [restProfile?.loading])
    const fetchCountryData = async () => {
        const countries = await Axios.get('https://restcountries.com/v3.1/all')
        console.log(countries)
        countries.data.forEach((el) => {
            console.log(el)
            setCountryData((prev) => [...prev, el.name.common])
        })
    }
    // const getRestData = () => {
    //     console.log(restaurant)
    //     Axios.get(`http://localhost:3001/api/profile/${restaurant}`)
    //         .then((res) => {
    //             console.log(res)
    //             console.log(res.data)
    //             setRestData({
    //                 name: res.data.name,
    //                 username: restaurant,
    //                 phoneNo: res.data.phoneNo,
    //                 addressLine1: res.data.addressLine1,
    //                 city: res.data.city,
    //                 state: res.data.state,
    //                 country: res.data.country,
    //                 description: res.data.description || '',
    //                 openHrs: res.data.openHrs,
    //                 delivery: res.data?.delivery || false,
    //                 pickedUp: res.data?.pickedUp || false,
    //             })
    //             setImage(res.data.imageURL)
    //             setStartOpenHrs(res.data.openHrs.split(' - ')[0])
    //             setEndOpenHrs(res.data.openHrs.split(' - ')[1])

    //             localStorage.setItem('deliveryMode', res.data.deliveryMode)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    const handleChange = (event) => {
        // console.log(startOpenHrs)
        // event.preventDefault()
        setChanged(true)
        console.log(event.target.value)
        const { name, value } = event.target
        // console.log(name)
        // console.log(value)
        // console.log(restData)
        if (name === 'phoneNo') value = parseInt(value, 10)
        setRestData((prevState) => ({
            ...prevState,
            [name]: value,
            // deliveryMode.delivery:
            // deliveryMode.pickedUp:
            //   deliveryMode:prevState.deliveryMode.includes('delivery') && prevState.deliveryMode.includes('pick')?value :prevState.deliveryMode.concat(value),
            openHrs: `${startOpenHrs} - ${endOpenHrs}`,
        }))

        console.log(restData)
    }

    const handleMode = (event) => {
        const { name, value } = event.target
        console.log(value)
        // console.log(restData.deliveryMode[name]);
        // var a =!restData.deliveryMode[name]
        // console.log(a);
        let val = false
        if (restData[name] == true) val = false
        else val = true
        console.log(val)
        setRestData((prevState) => ({
            ...prevState,
            [name]: val,
        }))
    }

    const handleChangeOpenHrs = (e) => {
        console.log(e.target.name)
        setChanged(true)
        if (e.target.name === 'startOpenHrs') setStartOpenHrs(e.target.value)
        if (e.target.name === 'endOpenHrs') setEndOpenHrs(e.target.value)
        setRestData((prevState) => ({
            ...prevState,
            openHrs: `${startOpenHrs} - ${endOpenHrs}`,
        }))
    }

    const submitRestaurantData = () => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('username', restaurant)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        saveProfileMutation({
            variables: {
                userId: restaurant,
                name: restData.name,
                username: restData.username,
                city: restData.city,
                nickName: restData.nickName,
                phoneNo: restData.phoneNo,
                country: restData.country,
                addressLine1: restData.addressLine1,
                description: restData.description,
                openHrs: restData.openHrs,
                delivery: restData.delivery,
                pickedUp: restData.pickedUp,
                state: restData.state,
            },
        })
        if (error) {
            console.log(error)
        }
        const setPhoto = Axios.post('http://localhost:3001/api/upload/photo', formData, config)
        //  Promise.all([setProfile, setPhoto])
        setPhoto
            .then((res) => {
                // console.log(JSON.parse(res[0].config.data))
                //  localStorage.setItem('deliveryMode', restData.deliveryMode)
                setImage(res?.data.imageURL)
                setChanged(false)
            })
            .catch((err) => {
                throw err
            })
        // .then((res) => {
        //     console.log(res)
        //     localStorage.setItem('deliveryMode', restData.deliveryMode)
        //     // console.log(restName);
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }
    return (
        <div className="rest-about-rightContent">
            {image && (
                <img
                    style={{
                        width: '100px',
                        height: '100px',
                        display: 'inline',
                        margin: '12%',
                        float: 'right',
                    }}
                    src={`http://localhost:3001/api/images/${image}`}
                />
            )}
            <label className="rest-label-container">
                <span className="rest-label"> Name </span>
                <input
                    className="rest-input"
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={restData.name}
                ></input>
            </label>
            <label className="rest-label-container">
                <span className="rest-label"> Email </span>
                <input
                    className="rest-input"
                    type="text"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    value={restData.username}
                ></input>
            </label>
            <label className="rest-label-container">
                <span className="rest-label"> Phone </span>
                <input
                    className="rest-input"
                    type="number"
                    name="phoneNo"
                    onChange={(e) => handleChange(e)}
                    value={restData.phoneNo}
                ></input>
            </label>
            <label className="rest-label-container">
                <span className="rest-label"> Address</span>
                <input
                    className="rest-input"
                    name="addressLine1"
                    onChange={(e) => handleChange(e)}
                    value={restData.addressLine1}
                ></input>
            </label>
            <label className="rest-label-container">
                <span className="rest-label"> City</span>
                <input
                    className="rest-input"
                    type="text"
                    name="city"
                    onChange={(e) => handleChange(e)}
                    value={restData.city}
                ></input>
            </label>
            <label className="rest-label-container">
                <span className="rest-label"> State</span>
                <input
                    className="rest-input"
                    type="text"
                    name="state"
                    onChange={(e) => handleChange(e)}
                    value={restData.state}
                ></input>
            </label>
            <label className="rest-label-container">
                <span className="rest-label"> Country</span>
                <NativeSelect
                    inputProps={{
                        name: 'country',
                        id: 'uncontrolled-native',
                    }}
                    name="country"
                    onChange={(e) => handleChange(e)}
                >
                    <option value={restData.country}>{restData.country}</option>
                    {countriesData.map((el, index) => (
                        <option value={el}>{el}</option>
                    ))}
                </NativeSelect>
            </label>
            <label className="rest-label-container">
                <span className="rest-label"> Opening Hrs</span>
                <input
                    className="rest-input"
                    type="time"
                    name="startOpenHrs"
                    onChange={(e) => {
                        handleChangeOpenHrs(e)
                    }}
                    value={startOpenHrs}
                ></input>
                <input
                    className="rest-input"
                    type="time"
                    name="endOpenHrs"
                    onChange={(e) => {
                        handleChangeOpenHrs(e)
                    }}
                    value={endOpenHrs}
                ></input>
            </label>
            <div
                className="mode"
                //  onChange={(e) => handleChange(e)}
            >
                <label className="rest-label-container">
                    <span className="rest-label"> Mode</span>
                    <label style={{ width: '100px' }}>
                        <input
                            className="rest-input"
                            type="checkbox"
                            value={!restData?.delivery}
                            name="delivery"
                            checked={restData?.delivery === true}
                            onChange={(e) => handleMode(e)}
                        />
                        Delivery
                    </label>
                    <label style={{ width: '100px' }} classNameName="rest-label-container">
                        <input
                            className="rest-input"
                            type="checkbox"
                            value={!restData?.pickedUp}
                            name="pickedUp"
                            checked={restData?.pickedUp === true}
                            onChange={(e) => handleMode(e)}
                        />
                        Pick Up
                    </label>
                    {/* <label style={{ width: '100px' }}>
                        <input
                            type="checkbox"
                            value="both"
                            name="deliveryMode"
                            checked={restData.deliveryMode === 'both'}
                        />
                        Both
                    </label> */}
                </label>
                <input
                    className="rest-input"
                    type="file"
                    name="image"
                    onChange={(e) => {
                        setChanged(true)
                        setFile(e.target.files[0])
                    }}
                    accept="image/*"
                />
            </div>
            {/* <label>Delivery Mode:
                <input type="radio" name="deliveryMode"
                    value='delivery'
                    onChange={(e) => handleChangeDeliveryMode(e)}
                    checked={restData.deliveryMode === 'delivery'}
                /> Delivery
                <input type="radio" name="deliveryMode"
                    value='pick'
                    onChange={(e) => handleChangeDeliveryMode(e)}
                    checked={restData.deliveryMode === 'pick'}
                /> Pick Up
                {/* <input name="deliveyMode" onChange={(e) => handleChange(e)} value={restData.deliveryMode}></input> 
            </label> }*/}
            <Button
                variant="primary"
                type="submit"
                className="submit-button"
                disabled={!changed}
                onClick={submitRestaurantData}
            >
                Save Changes
            </Button>
        </div>
    )
}

export default About
