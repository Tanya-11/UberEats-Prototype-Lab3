import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import './DishCards.scss'
import { Button } from 'react-bootstrap'

const DishCard = (props) => {
    const restaurant = useSelector((state) => state.restLogin.user)
    const [dishData, setDishData] = useState([])
    /**
     * {
        dishId: 0,
        dishName: '',
        ingredients: '',
        price: '',
        description: '',
        category: '',
        restRef: restaurant,
    }
     */
    const [changed, setChanged] = useState(false)
    useEffect(() => {
        console.log(props.data)
        setDishData(props.data)
        //   getDishData()
    }, [])
    // const getDishData = () => {
    //     Axios.post('/get-dishes', {
    //         restId: restaurant,
    //     })
    //         .then((res) => {
    //             console.log(res)
    //             setDishData(res.data[0])
    //         })
    //         .catch((err) => {
    //             throw err
    //         })
    // }
    const handleChange = (event) => {
        console.log(dishData)
        event.preventDefault()
        setChanged(true)
        console.log(event.target.value)
        const { name, value } = event.target
        console.log(name)
        console.log(value)
        setDishData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        console.log(dishData)
    }

    const submitDishData = () => {
        console.log(dishData)
        Axios.post('http://localhost:3001/api/newdish', {
            ...dishData,
        })
            .then((res) => {
                console.log(res)
                  setChanged(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className="dish-card-wrapper">
                <label>
                    Name:
                    <input
                        type="text"
                        name="dishName"
                        onChange={(e) => handleChange(e)}
                        value={dishData.dishName}
                    ></input>
                </label>
                <label>
                    Ingredients:
                    <input
                        type="text"
                        name="ingredients"
                        onChange={(e) => handleChange(e)}
                        value={dishData.ingredients}
                    ></input>
                </label>
                <label>
                    Price($):
                    <input
                        type="number"
                        name="price"
                        onChange={(e) => handleChange(e)}
                        value={dishData.price}
                    ></input>
                </label>
                <label>
                    Category:
                    <select
                        name="category"
                        value={dishData.category}
                        onChange={(e) => handleChange(e)}
                    >
                        <option name="category" value="Vegetarian">
                            Vegetarian
                        </option>
                        <option name="category" value="Halal">
                            Halal
                        </option>
                    </select>
                </label>
                <Button
                    size="sm"
                    variant="secondary"
                    type="submit"
                    className="submit"
                    disabled={!changed}
                    onClick={submitDishData}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

export default DishCard
