import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './DishCards.css'
import { Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { ADD_DISH } from '../../GraphQL/mutations'
const DishCard = (props) => {
    const restaurant = useSelector((state) => state.restLogin.user)
    const [dishData, setDishData] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [changed, setChanged] = useState(false)
    const [addDishMutation, { data, loading, error }] = useMutation(ADD_DISH)
    useEffect(() => {
        console.log(props.data)
        setDishData(props.data)
        //   getDishData()
    }, [])

    useEffect(() => {
        if (!loading && data) {
            setChanged(false)
        }
    }, [loading])
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
        addDishMutation({
            variables: {
                restRef: restaurant,
                dishName: dishData.dishName,
                ingredients: dishData.ingredients,
                price: parseInt(dishData.price, 10),
                description: dishData.description,
                category: dishData.category,
                id: dishData._id,
            },
        })
        if (error) {
            console.log(error)
            setErrorMsg('Error! Try again')
            setTimeout(() => {
                setErrorMsg('')
                window.location.reload()
            }, 3000)
        }
    }
    return (
        <div>
            <div className="dish-card-wrapper">
                {errorMsg && <label>{errorMsg}</label>}

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
