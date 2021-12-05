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
    const [completeOrders, setcompleteOrders] = useState([
        // {
        //     orderId: 0,
        //     custId: '',
        //     orderStatus: '',
        //     dishes: [],
        //     price: 0,
        // },
    ])
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
    // const getOrders = Axios.post('http://localhost:3001/api/orders/complete', {
    //     user: restaurant,
    // })
    // const getOrderStatus = Axios.get('/get-orderStatus')
    // const deliveryMode = localStorage.getItem('deliveryMode')
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
    // useEffect(() => {
    //     setcompleteOrders([])
    //     getOrders
    //         .then(
    //             (res) => {
    //                 console.log(res)
    //                 res.data.forEach((item) => {
    //                     console.log(item)
    //                     setcompleteOrders((prev) => [
    //                         ...prev,
    //                         {
    //                             orderId: item._id,
    //                             custId: item.customer.username,
    //                             orderStatus: item.orderStatus,
    //                             dishes: item.dishes,
    //                             price: item.price,
    //                         },
    //                     ])
    //                 })
    //             },
    //             (err) => {
    //                 console.log(err)
    //             }
    //         )
    //         .catch((error) => {
    //             console.log(error)
    //         })
    //     // Promise.all([getOrders, getOrderStatus])
    //     //     .then((res) => {
    //     //         console.log('Promise' + JSON.stringify(res))
    //     //         res[0].data.map((el) => {
    //     //             res[1].data.map((item) => {
    //     //                 if (el.orderStatus === item.orderStatusId) {
    //     //                     console.log('favvvvv' + item)
    //     //                     el['orderStatusName'] = item.orderStatusTitle
    //     //                 }
    //     //             })
    //     //         })
    //     //         setcompleteOrders(
    //     //             res[0].data.filter((el) => el.orderStatus !== 2 && el.orderStatus !== 5)
    //     //         )

    //     //         if (deliveryMode == 'delivery') {
    //     //             res[1].data.splice(4, 2)
    //     //             setOrders(res[1].data)
    //     //             //  res[1].data.splice(5, 1);
    //     //         } else if (deliveryMode === 'pick') {
    //     //             res[1].data.splice(2, 2)
    //     //             setOrders(res[1].data)
    //     //         } else setOrders(res[1].data)

    //     //         // console.log(completedOrders);
    //     //     })
    //     //     .catch((err) => {
    //     //         throw err
    //     //     })
    //     //   console.log(completeOrders)
    //     // console.log(completedOrders)
    // }, [])

    const showUserInfo = (custId, isClicked) => {
        console.log('clciked' + isClicked)
        setIsClicked(isClicked)
        if (isClicked) setUserInfo(custId)
        console.log(completeOrders)
    }
    // const setOrderStatus = (event) => {
    //     const [name, value] = event.target
    //     console.log(value)

    //     setcompleteOrders((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }))
    //     console.log('click' + event.target.name)
    // }

    const handleChangecompleteOrders = (event, index) => {
        console.log(completeOrders)
        setBtnDisabled(false)
        console.log(event.target.value + ' ' + index)
        event.preventDefault()
        let arr = completeOrders.slice()
        //  let order = orders.filter((el) => el.orderId === parseInt(event.target.value))
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
            {' '}
            {/* <h1>{completedOrders.length}</h1> */}
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
