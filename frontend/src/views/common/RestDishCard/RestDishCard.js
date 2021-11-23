import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import styles from './RestDishCard.module.scss'
import { userOrderIncrement } from '../../../redux/actions/actions'
import NewOrderModal from './newOrderModal'

const RestDishCard = (props) => {
    const orders = useSelector((state) => state.cart)
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const addToCart = () => {
        if (
            orders.length === 0 ||
            (orders.length > 0 && orders[0].restId === props.restId)
        ) {
            dispatch(
                userOrderIncrement({
                    text: 1,
                    dishId: props.dishes._id,
                    dishName: props.dishes.dishName,
                    restId: props.restId,
                    restName: props.restName,
                    price: props.dishes.price,
                })
            )
            console.log(orders)
            console.log(props.restName)
        } else {
            console.log(props.restName)       
                 console.log('modallll')
            setShowModal(true)
            // setErrorMsg(`Your Order contains items from ${orders[0].restName}, Want to Create a new Order from ${props.data.restName}`)
        }
    }

    const showHide = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={styles.RestDishCard} data-testid="RestDishCard">
            {<span>{errorMsg}</span>}
            <div className={styles.RestDishCardWrapper}>
                <div className={styles.dishImage}>
                    <div className={styles.dishAddIcon} onClick={addToCart}>
                        <AddIcon />
                    </div>
                </div>
                <div className={styles.dishDetail}>
                    <div>
                        <em>{props.dishes.dishName}</em>
                    </div>
                    <div>{props.dishes.ingredients}</div>
                    <div>${props.dishes.price}</div>
                </div>
            </div>
            {showModal && (
                <NewOrderModal
                    data={showModal}
                    modal={showHide}
                    rest1={orders[0].restId}
                    rest2={props.restId}
                ></NewOrderModal>
            )}
        </div>
    )
}

export default RestDishCard
