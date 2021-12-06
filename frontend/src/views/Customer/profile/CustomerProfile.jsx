import React, { useEffect, useState } from 'react'
import './CustomerProfile.css'
import Axios from 'axios'
import { useSelector } from 'react-redux'
// import RestCard from '../common/RestCard'
import { useHistory } from 'react-router'
import { Favorites } from './Favourites'
import { About } from './About'
import { gql, useQuery } from '@apollo/client'
import { LOAD_PROFILE } from '../../../GraphQL/queries'
const CustomerProfile = () => {
    const [file, setFile] = useState('')
    const history = useHistory()
    const customer = useSelector((state) => state.userLogin.user)
    const { error, loading, data } = useQuery(LOAD_PROFILE, {
        variables: { customer: customer },
    })
    Axios.defaults.withCredentials = true
    const [userData, setUserData] = useState({
        name: '',
        username: customer,
        phoneNo: '',
        city: '',
        state: '',
        country: '',
        nickName: '',
        fav: [],
        image: '',
    })
    const [showAbout, setShowAbout] = useState(false)
    const setShowState = () => {
        setShowAbout(!showAbout)
    }

    const navigateToDashboard = () => {
        history.push('/dashboard')
    }
    // useEffect(() => {
    //     getCustomerData()
    // }, [])
    useEffect(() => {
        console.log(data)
        console.log(error)
        console.log(loading)
        if (!loading) {
            console.log(data)
            setUserData(
                {
                    name: data.customerProfile.name || '',
                    username: data.customerProfile.username || '',
                    phoneNo: data.customerProfile.phoneNo || '',
                    city: data.customerProfile.city || '',
                    state: data.customerProfile.state || '',
                    country: data.customerProfile.country || '',
                    nickName: data.customerProfile.nickName || '',
                    fav: data.customerProfile.fav || [],
                    image: data.customerProfile.imageURL || '',
                }
                //  setImage(res?.data?.image)

                //  email: res.data[0].email
            )
        }
    }, [loading])

    const onImageChange = (event) => {
        console.log(event.target.files[0])
        if (event.target.value) {
            setFile(URL.createObjectURL(event.target.value))
        }
    }

    return (
        <div class="CustomerProfile">
            <div class="leftContent">
                <ul className="customer-profile-wrapper">
                    <li className="uber-logo" onClick={navigateToDashboard}></li>
                    <li onClick={setShowState}>About</li>
                    <li onClick={setShowState}>Favorites</li>
                </ul>
            </div>
            <div class="rightContent">
                {!showAbout && userData ? (
                    <About data={userData} disabled={false} />
                ) : (
                    <Favorites data={userData?.fav} />
                )}
                {/* {/* <span>Profile Img</span>
      <input type="file" onChange={(e) => onImageChange(e)} value={file}></input>  
        */}
            </div>
        </div>
    )
}
export default CustomerProfile
