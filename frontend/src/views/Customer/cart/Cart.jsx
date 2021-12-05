import React, { useEffect, useState } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { useHistory } from 'react-router'
import { userOrderPlaced } from '../../../redux/actions/actions'
import { Button, Table } from 'react-bootstrap'
import * as moment from 'moment'
import OrderDetails from '../orders/OrderDashboard'
import { useMutation } from '@apollo/client'
import { PLACE_ORDER } from '../../../GraphQL/mutations'
const Cart = () => {
    const [orderPlaced, setOrderPlaced] = useState(false)
    const cart = useSelector((state) => state.cart)
    const customer = useSelector((state) => state.userLogin)
    const [cartStatus, setCartStatus] = useState('Cart is Empty')
    const dispatch = useDispatch()
    const history = useHistory()
    const [total, setTotal] = useState(0)
    const [restName, setRestName] = useState('')
    const [instructions, setInstructions] = useState('')
    const [addr2, setAddr2] = useState('')
    const [mode, setMode] = useState('')
    const [orders, setOrders] = useState([])
    const [placeOrderMutation, { data, loading, error }] = useMutation(PLACE_ORDER)
    useEffect(() => {
        setMode(JSON.parse(localStorage.getItem('RestCardDetails')).deliveryMode)
        console.log('calcul', cart)
        console.log(customer)
        let total = 0
        if (cart.length > 0) setRestName(cart[0].restName)
        for (var i = 0; i < cart.length; i++) {
            total = total + cart[i].price * cart[i].text
            setTotal(total)
        }
        placeOrder()

        // getAddr()
    }, [])
    useEffect(() => {
        console.log(loading)
        console.log(data)
        if (!loading && data) {
            setCartStatus('Your Order Placed')
            dispatch(userOrderPlaced([]))
            history.push('/dashboard')
        }
    }, [loading])
    // const getAddr = () => {
    //     Axios.post('/get-address', {
    //         custId: customer,
    //     })
    //         .then((res) => {
    //             console.log(res.data[0])
    //             setInstructions(res.data[0].address1)
    //             setAddr2(res.data[0].address2)
    //         })
    //         .catch((err) => {
    //             throw err
    //         })
    // }
    const setAddr = () => {
        console.log('ss' + addr2)
        Axios.post('/set-address', {
            address1: instructions,
            address2: addr2,
            custId: customer,
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                throw err
            })
    }
    const placeOrder = () => {
        // setOrderPlaced(true)
        let res = []
        //  setAddr()
        console.log(cart)
        setOrders([])
        // for (var i = 0; i < cart.length; i++) {
        //     // total += (+cart[i].price * cart.text[i]);
        //     res.push(
        //         await Axios.post('/place-cart', {
        //             carttatus: 0,
        //             custId: customer,
        //             dishId: cart[i].dishId,
        //             dishName: cart[i].dishName,
        //             dishPrice: cart[i].price,
        //             restId: cart[i].restId,
        //             quantity: cart[i].text,
        //             price: parseInt(cart[i].text) * parseInt(cart[i].price),
        //             date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        //             address: instructions,
        //         })
        //     )
        // }
        // console.log(res.length);
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i]);
        //     if (res[i].status == 200) {
        //         console.log('Order Updated')
        //     } else console.log(`error in placing order for ${i}`)
        // }

        cart.forEach((item) => {
            console.log(item)
            setOrders((prev) => [
                ...prev,
                {
                    dishName: item.dishName,
                    dishPrice: item.price,
                    quantity: item.text,
                    price: parseInt(item.text) * parseInt(item.price),
                },
            ])
        })
    }

    const setOrderVal = () => {
        console.log(orders.length)
        console.log(cart.length)
        console.log(orders)
        placeOrderMutation({
            variables: {
                orderStatus: 'Placed',
                restId: cart[0].restId,
                user: {
                    user_id: customer.user_id,
                    username: customer.user,
                },
                date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
                orders: orders,
                price: total,
            },
        })
        if (error) {
            setCartStatus('Sorry! Try Again')
            console.log(err)
        }
        // Axios.post('http://localhost:3001/api/cart/placed', {
        //     orders: orders,
        //     user: {
        //         user_id: customer.user_id,
        //         username: customer.user,
        //     },
        //     orderStatus: 'Placed',
        //     date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        //     address: instructions,
        //     restId: cart[0].restId,
        //     price: total,
        //     instructions: instructions,
        // }).then(
        //     (res) => {
        //         console.log(res)
        //         if (res.status == 200) {
        //             setCartStatus('Your Order Placed')
        //             dispatch(userOrderPlaced([]))
        //             history.push('/dashboard')
        //         }
        //     },
        //     (err) => {
        //         setCartStatus('Sorry! Try Again')
        //         console.log(err)
        //     }
        // )
    }

    return (
        <div class="Cart" data-testid="Cart">
            {!orderPlaced && cart.length > 0 && (
                <div>
                    <div class="restName">{restName}</div>
                    <Table class="cart">
                        <thead>
                            <tr class="cartRow">
                                <th>Quantity</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((order, index) => (
                                <tr key={index} class="cartRow">
                                    <td>{order.text}</td>
                                    <td>{order.dishName}</td>
                                    <td>${order.text * +order.price}</td>
                                </tr>
                            ))}
                            <tr className="total">
                                <td>Total</td>
                                <td />
                                <td>${total}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* <div class="instructions">
                        Instructions:
                        <textarea
                            // type="text"
                            value={instructions}
                            onChange={(e) => {
                                setInstructions(e.target.value)
                            }}
                        />
                        {/* <span style={{ display: 'inline-flex' }}>
                            Mode:
                            {
                                // <>
                                mode == 'both' && (
                                    <div onChange={(e) => setMode(e.target.value)}>
                                        <label>
                                            <input type="radio" value="delivery" name="mode" />
                                            Delivery
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="pick"
                                                name="mode"
                                                // onChange={(e) => setMode(e.target.value)}
                                            />
                                            Pick Up
                                        </label>
                                    </div>
                                )
                            }
                            {mode !== 'both' && <span>{mode}</span>}
                        </span> */}
                    {/* <div style={{ margin: '3%' }}>
                            <Button type="submit" onClick={setAddr}>
                                Save Address
                            </Button>
                      //  </div> 
                    </div> */}
                </div>
            )}
            {orderPlaced && <h2>{cartStatus}</h2>}

            {!orderPlaced && cart.length > 0 && (
                <Button style={{ margin: '3%', float: 'right' }} onClick={setOrderVal}>
                    Place Order
                </Button>
            )}
        </div>
    )
}

export default Cart
