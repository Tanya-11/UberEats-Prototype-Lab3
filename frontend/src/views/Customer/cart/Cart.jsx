import React, { useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { useHistory } from 'react-router'
import { userOrderPlaced } from '../../../redux/actions/actions'
import { Button, Table } from 'react-bootstrap'
import * as moment from 'moment'
const Cart = () => {
    const [orderPlaced, setOrderPlaced] = useState(false)
    const cart = useSelector((state) => state.cart)
    const customer = useSelector((state) => state.userLogin)
    const [cartStatus, setCartStatus] = useState('Cart is Empty')
    const dispatch = useDispatch()
    const history = useHistory()
    const [total, setTotal] = useState(0)
    const [restName, setRestName] = useState('')
    const [addr1, setAddr1] = useState('')
    const [addr2, setAddr2] = useState('')
    const [mode, setMode] = useState('')
    const [orders, setOrders] = useState([]);

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

       // getAddr()
    }, [])

    // const getAddr = () => {
    //     Axios.post('/get-address', {
    //         custId: customer,
    //     })
    //         .then((res) => {
    //             console.log(res.data[0])
    //             setAddr1(res.data[0].address1)
    //             setAddr2(res.data[0].address2)
    //         })
    //         .catch((err) => {
    //             throw err
    //         })
    // }
    const setAddr = () => {
        console.log('ss' + addr2)
        Axios.post('/set-address', {
            address1: addr1,
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
        setAddr()
        console.log(cart);
        setOrders([]);
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
        //             address: addr1,
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

        cart.forEach(item=>{
            console.log(item);
            setOrders(
                (prev)=>([
                ...prev,
                {
                    dishName: item.dishName,
                    dishPrice: item.price,
                    quantity: item.text,
                    price: parseInt(item.text) * parseInt(item.price),
                }
           ])
            )
        })
  
   
    }

    const setOrderVal=()=>{
        console.log(cart.length);
        console.log(orders);
        Axios.post('http://localhost:3001/api/cart/placed',{
            orders:orders,
            user:{
                user_id:customer.user_id,
                username:customer.user
            },
            orderStatus: 'Placed',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
            address: addr1,
            restId: cart[0].restId,
            price:total

        })
        .then(
            (res)=>{
                console.log(res);
                if(res.status==200){
                setCartStatus('Your Order Placed')
                dispatch(userOrderPlaced([]))
                history.push('/dashboard')
                }
               
            },
            (err)=>{
                setCartStatus('Sorry! Try Again')
                console.log(err);
            }
        )
    }

    return (
        <div className={styles.Cart} data-testid="Cart">
            {!orderPlaced && cart.length > 0 && (
                <div>
                    <div className={styles.restName}>{restName}</div>
                    <Table class={styles.cart}>
                        <thead>
                            <tr class={styles.cartRow}>
                                <th>Quantity</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((order, index) => (
                                <tr key={index} class={styles.cartRow}>
                                    <td>{order.text}</td>
                                    <td>{order.dishName}</td>
                                    <td>${order.text * +order.price}</td>
                                </tr>
                            ))}
                            <tr style={styles.total}>
                                <td>Total</td>
                                <td />
                                <td>${total}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className={styles.addr}>
                        <span>
                            Address:
                            <input
                                type="text"
                                value={addr1}
                                onChange={(e) => {
                                    setAddr1(e.target.value)
                                }}
                            />
                        </span>
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

                        <div style={{ margin: '3%' }}>
                            <Button type="submit" onClick={setAddr}>
                                Save Address
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {orderPlaced && <h2>{cartStatus}</h2>}

            {!orderPlaced && cart.length > 0 && (
                <Button style={{ margin: '3%', float: 'right' }} onClick={placeOrder}>
                    Place Order
                </Button>
            )}
              <Button style={{ margin: '3%', float: 'right' }} onClick={setOrderVal}>
                    Place 
                </Button>
        </div>
    )
}

export default Cart
