import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import RestCard from '../../common/RestCard'
import { useHistory } from 'react-router'

export const Favorites = (props) => {
    Axios.defaults.withCredentials = true
    const [restData, setRestData] = useState([])
    const [noDataMsg, setNoDataMsg] = useState('')

    useEffect(() => {
        setRestData([]);
        console.log(props.data);
        if(props.data.length===0){
            setNoDataMsg('No Favorite Restaurant')

        }
       getFavRestaurant()
    }, [props.data])

    const getFavRestaurant = () => {
        console.log(props.data);
        props.data.forEach(element => {
            let response = Axios.get(`http://localhost:3001/api/profile/${element.restaurant}`);
            response.then((res)=>{
                console.log(res);
                setRestData((prev)=>([
                    ...prev,
                    {...res?.data,isFav:true}
                  
                ]))
            })
        });
    }

    return (
        <div>
            {noDataMsg && <p>{noDataMsg}</p>}
            {restData.map((result, i) => (
                <RestCard key={i} data={result} disabled></RestCard>
            ))}
        </div>
    )
}
