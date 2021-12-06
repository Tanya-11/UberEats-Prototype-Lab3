import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import RestCard from '../../common/RestCard'
import { useHistory } from 'react-router'

export const Favorites = (props) => {
    Axios.defaults.withCredentials = true
    const [restData, setRestData] = useState([])
    const [noDataMsg, setNoDataMsg] = useState('')
    const server = process.env.REACT_APP_WHITELISTED_DOMAINS

    useEffect(() => {
        setRestData([])
        console.log(props.data)
        if (props.data.length === 0) {
            setNoDataMsg("You don't have any favourite restaurant")
        }
        getFavRestaurant()
    }, [props.data])

    const getFavRestaurant = () => {
        console.log(props.data)
        props.data.forEach((element) => {
            let response = Axios.get(`${server}/api/profile/${element.restaurant}`)
            response.then((res) => {
                console.log(res)
                setRestData((prev) => [...prev, { ...res?.data, isFav: true }])
            })
        })
    }

    return (
        <div>
            {noDataMsg && (
                <p
                    style={{
                        margin: '10%',
                        fontSize: '2rem',
                    }}
                >
                    {noDataMsg}
                </p>
            )}
            {restData.map((result, i) => (
                <RestCard key={i} data={result} disabled></RestCard>
            ))}
        </div>
    )
}
