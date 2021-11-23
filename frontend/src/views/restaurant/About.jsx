import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import './Profile.scss'
import { Button } from 'react-bootstrap'

const About = () => {
    const restaurant = useSelector((state) => state.restLogin.user)
    const [startOpenHrs, setStartOpenHrs] = useState('00:00:00')
    const [endOpenHrs, setEndOpenHrs] = useState('00:00:00')
    const mode = {
        delivery:false,
        pickedUp:false
    }
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
        delivery:false,
        pickedUp:false
    })
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    const [changed, setChanged] = useState(false)
    const [openHrsMsg, setOpenHrsMsg] = useState(
        'The format is "HH:mm", "HH:mm:ss" or "HH:mm:ss.SSS" where HH is 00-23, mm is 00-59, ss is 00-59, and SSS is 000-999'
    )
    Axios.defaults.withCredentials = true

    useEffect(() => {
        getRestData()
    }, [])
    const getRestData = () => {
        console.log(restaurant);
        Axios.get(`http://localhost:3001/api/profile/${restaurant}`
        )
            .then((res) => {
                console.log(res)
               console.log(res.data)
                setRestData({
                    name: res.data.name,
                    username: restaurant,
                    phoneNo: res.data.phoneNo,
                    addressLine1: res.data.addressLine1,
                    city: res.data.city,
                    state: res.data.state,
                    country: res.data.country,
                    description: res.data.description || '',
                    openHrs: res.data.openHrs,
                    delivery:res.data?.delivery|| false,
                    pickedUp:res.data?.pickedUp|| false
                })
                setImage(res.data.image)
                setStartOpenHrs(res.data.openHrs.split(' - ')[0])
                setEndOpenHrs(res.data.openHrs.split(' - ')[1])

                localStorage.setItem('deliveryMode', res.data.deliveryMode)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (event) => {
        // console.log(startOpenHrs)
        // event.preventDefault()
        setChanged(true)
        console.log(event.target.value)
        const { name, value } = event.target
        // console.log(name)
        // console.log(value)
        // console.log(restData)
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

    const handleMode=(event)=>{
        
        const { name, value } = event.target
        console.log(value);
        // console.log(restData.deliveryMode[name]);
        // var a =!restData.deliveryMode[name]
        // console.log(a);
        let val=false;
        if(restData[name]==true) val= false;
        else val =true;
        console.log(val);
        setRestData((prevState) => ({
            ...prevState,
            [name]: val,
        }))
    }

    const handleChangeOpenHrs = (e) => {
        console.log(e)
        setChanged(true)
        // if (e.name === 'startOpenHrs') setStartOpenHrs(e.value)
        // if (e.name === 'endOpenHrs') {
        //     if (e.value > startOpenHrs) {
        //     setEndOpenHrs(e.value)
        setRestData((prevState) => ({
            ...prevState,
            openHrs: `${startOpenHrs} - ${endOpenHrs}`,
        }))
        // } else {
        //     setEndOpenHrs(0)
        //     setOpenHrsMsg('End Hrs should be greater than Start Hr')
        // }

        console.log(startOpenHrs)
        console.log(endOpenHrs)
        console.log(restData)
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
        const setProfile = Axios.post('http://localhost:3001/api/profile', {
            restData,
        })
      //  const setPhoto = Axios.post('http://localhost:3001/upload-pic', formData, config)
        Promise.all([setProfile
          //  , setPhoto
        ])
            .then((res) => {
                console.log(JSON.parse(res[0].config.data))
                //  localStorage.setItem('deliveryMode', restData.deliveryMode)
                setImage(res[1]?.data)
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
        <div className="rightContent">
            <label className="label">
                Name:
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={restData.name}
                ></input>
            </label>
            <label className="label">
                Email
                <input
                    type="text"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    value={restData.username}
                ></input>
            </label>
            <label className="label">
                Phone
                <input
                    type="number"
                    name="phoneNo"
                    onChange={(e) => handleChange(e)}
                    value={restData.phoneNo}
                ></input>
            </label>
            <label className="label">
                Address
                <input
                    name="addressLine1"
                    onChange={(e) => handleChange(e)}
                    value={restData.addressLine1}
                ></input>
            </label>
            <label className="label">
                City
                <input
                    type="text"
                    name="city"
                    onChange={(e) => handleChange(e)}
                    value={restData.city}
                ></input>
            </label>
            <label className="label">
                State
                <input
                    type="text"
                    name="state"
                    onChange={(e) => handleChange(e)}
                    value={restData.state}
                ></input>
            </label>
            <label className="label">
                Country
                <input
                    name="country"
                    onChange={(e) => handleChange(e)}
                    value={restData.country}
                ></input>
            </label>
            <label className="label">
                Description
                <input
                    name="description"
                    onChange={(e) => handleChange(e)}
                    value={restData.description}
                ></input>
            </label>
            <label className="label">
                Opening Hrs
                <input
                    type="time"
                    name="startOpenHrs"
                    onChange={(e) => {
                        setChanged(true)
                        setStartOpenHrs(e.target.value)
                    }}
                    value={startOpenHrs}
                ></input>
                <input
                    type="time"
                    name="endOpenHrs"
                    onChange={(e) => {
                        setChanged(true)
                        setEndOpenHrs(e.target.value)
                    }}
                    value={endOpenHrs}
                ></input>
            </label>
            <div className="mode"
           //  onChange={(e) => handleChange(e)}
             >
                <label className="label">
                    Mode:
                    <label style={{ width: '100px' }}>
                        <input
                            type="checkbox"
                            value={!restData?.delivery}
                            name="delivery"
                            checked={restData?.delivery===true}
                            onChange={(e) => handleMode(e)}
                        />
                        Delivery
                    </label>
                    <label style={{ width: '100px' }}>
                        <input
                            type="checkbox"
                            value={!restData?.pickedUp}
                            name="pickedUp"
                            checked={restData?.pickedUp===true}
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
                    type="file"
                    name="image"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                />
                {image && (
                    <img
                        style={{ width: '100px', height: '100px' }}
                        src={`http://localhost:3001/${image}`}
                    />
                )}
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
