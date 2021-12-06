import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router'
import { About } from '../Customer/profile/About'
import { Favorites } from '../Customer/profile/Favourites'
import { Table, Button } from 'react-bootstrap'
import * as moment from 'moment'
import { useQuery, useMutation } from '@apollo/client'
import { GET_COMPLETE_ORDERS_RESTAURANT } from '../../GraphQL/queries'
import { UPDATE_ORDER_STATUS } from '../../GraphQL/mutations'
const CompleteOrders = () => {
    const restaurant = useSelector((state) => state.restLogin.user)
    const [completeOrders, setcompleteOrders] = useState([])
    const [btnDisabled, setBtnDisabled] = useState(true)
    const history = useHistory()
    const [userInfo, setUserInfo] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [orders, setOrders] = useState([])
    const orderStatus = ['Received', 'Delivered', 'Preparing', 'Picked Up', 'Placed', 'Cancel']
    const completeOrdersData = useQuery(GET_COMPLETE_ORDERS_RESTAURANT, {
        variables: { customer: restaurant },
    })
    const [updateOrderStatusMutation, { data, loading, error }] = useMutation(UPDATE_ORDER_STATUS)

    useEffect(() => {
        setcompleteOrders([])
        if (!completeOrdersData?.loading) {
            completeOrdersData.data.restCompleteOrders.forEach((item) => {
                console.log(item)
                setcompleteOrders((prev) => [
                    ...prev,
                    {
                        orderId: item.id,
                        custId: item.customer.username,
                        orderStatus: item.orderStatus,
                        dishes: item.dishes,
                        price: item.price,
                    },
                ])
            })
        }
    }, [completeOrdersData?.loading])

    const showUserInfo = (custId, isClicked) => {
        console.log('clciked' + isClicked)
        setIsClicked(isClicked)
        if (isClicked) setUserInfo(custId)
        console.log(completeOrders)
    }

    const handleChangecompleteOrders = (event, index) => {
        console.log(completeOrders)
        setBtnDisabled(false)
        console.log(event.target.value + ' ' + index)
        event.preventDefault()
        let arr = completeOrders.slice()
        arr[index].orderStatus = event.target.value

        setcompleteOrders(arr)
    }

    const submit = async () => {
        let res = []
        console.log(completeOrders[1])
        for (var i = 0; i < completeOrders.length; i++) {
            // total += (+orders[i].price * orders.text[i]);
            console.log(completeOrders[i].orderId)
            console.log(i)
            updateOrderStatusMutation({
                variables: {
                    orderId: completeOrders[i].orderId,
                    orderStatus: completeOrders[i].orderStatus,
                    date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                },
            })
            if (error) {
                console.log(error)
            }
        }
    }

    return (
        <div style={{ padding: '2rem' }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Customer Contact Info</td>
                        <td>Order Status</td>
                        <td>Summary</td>
                        <td>Total Price</td>
                    </tr>
                </thead>
                <tbody>
                    {completeOrders.length > 0 &&
                        completeOrders.map((el, index) => (
                            <tr key={index}>
                                <td
                                //  onClick={() => showUserInfo(el.custId, !isClicked)}
                                >
                                    <a>{el.custId}</a>
                                </td>
                                <td>
                                    <select
                                        value={el.orderStatus}
                                        onChange={(e) => {
                                            handleChangecompleteOrders(e, index)
                                        }}
                                    >
                                        {orderStatus.map((item, i) => (
                                            <option key={i} name="orderStatus" value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Dish</td>
                                                <td>Price</td>
                                                <td>Quanity</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {el.dishes.map((item, index) => (
                                                <tr>
                                                    <td>{item.dishName}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td> {el.price}</td>
                            </tr>
                        ))}
                    <tr></tr>
                </tbody>
            </Table>
            <Button variant="primary" onClick={submit} disabled={btnDisabled}>
                Save Changes
            </Button>
            {/* {isClicked && (
                <>
                    <About data={userInfo} disabled={true}></About>
                    <hr />
                    <Favorites data={userInfo} />
                </>
            )} */}
        </div>
    )
}

export default CompleteOrders
