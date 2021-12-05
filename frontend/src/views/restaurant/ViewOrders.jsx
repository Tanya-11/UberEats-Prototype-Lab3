import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import DishCard from './DishCards'
import './Profile.css'

const ViewOrder = () => {
    const restaurant = useSelector((state) => state.restLogin.user)
    const [dishData, setDishData] = useState([])
    // const addCardObj = {
    //     dishId: 0,
    //     dishName: '',
    //     ingredients: '',
    //     price: '',
    //     description: '',
    //     category: '',
    //     restRef: restaurant,
    // }
    useEffect(() => {
        getDishData()
    }, [])

    const getDishData = () => {
        Axios.post('http://localhost:3001/api/dishes', {
            username: restaurant,
        })
            .then((res) => {
                console.log(res)
                res.data[0]?.dishes.map((el) => {
                    setDishData((prev) => [...prev, { ...el, restRef: restaurant }])
                })
                //  setDishData([{...res.data[0]?.dishes, restaurant}])
                console.log(dishData)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const addCard = () => {
        const addCardObj = {
            dishName: '',
            ingredients: '',
            price: '',
            description: '',
            category: 'Vegetarian',
            restRef: restaurant,
        }
        setDishData((prev) => [...prev, addCardObj])
        console.log(dishData)
    }

    return (
        <>
            <div>
                <button class="add" onClick={addCard}>
                    +
                </button>
            </div>
            {dishData.length > 0 &&
                dishData.map((el, index) => <DishCard key={index} data={el}></DishCard>)}
        </>
    )
}

export default ViewOrder
