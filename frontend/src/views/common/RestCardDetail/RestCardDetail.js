import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import styles from './RestCardDetail.module.scss'
import RestDishCard from '../RestDishCard/RestDishCard'

const RestCardDetail = () => {
    const [dish, setDish] = useState([])
    const [image, setImage] = useState([])

    useEffect(() => {
        if (localStorage.getItem('RestCardDetails')) {
          //  getRestDishDetails(JSON.parse(localStorage.getItem('RestCardDetails')).restId)
            setDish(JSON.parse(localStorage.getItem('RestCardDetails')));
            setImage(JSON.parse(localStorage.getItem('RestCardDetails')).image)
        }
    }, [])

    // const getRestDishDetails = async (restId) => {
    //     const api = '/getDataForRestDish'
    //     let response = []
    //     try {
    //         response = await Axios.post(api, {
    //             city: localStorage.getItem('city'),
    //             mode: '',
    //             searchTabText: restId,
    //         }).then((res) => {
    //             setDish(res.data)
    //             return res
    //         })
    //     } catch (err) {
    //         throw err
    //     }
    // }

    return (
        <div className={styles.RestCardDetail} data-testid="RestCardDetail">
            <div className={styles.RestImg}>
                {image && <img src={`http://localhost:3001/${image}`} />}
            </div>
            <div className={styles.RestdescWrapper}>
                <div className={styles.Restdesc}>
                    <div className="name">
                        {dish.name}({dish?.addressLine1})
                    </div>
                    <div className="desc">{dish?.description}</div>
                    <div className="open-hrs">{dish?.openHrs}</div>
                </div>
                <div className={styles.dishcardWrapper}>
                    <div className={styles.dishcards}>
                        { dish?.dishes?.length>0 && dish?.dishes.map((result, i) => (
                            <RestDishCard key={i} dishes={result} restName={dish.name} restId={dish.username}></RestDishCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestCardDetail

/**
 * todo: get restdetails(rest,dish) by refID
 */
