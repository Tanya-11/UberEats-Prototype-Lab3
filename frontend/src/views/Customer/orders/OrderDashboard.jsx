import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Orders.css'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Orders from './CancelledOrders'
import { Nav } from 'react-bootstrap'

import Pagination from '@mui/material/Pagination'

const OrderDetails = () => {
    const customer = useSelector((state) => state.userLogin.user)
    const [orders, setOrders] = useState([])
    const [pastOrders, setPastOrders] = useState([])
    const [activeOrders, setActiveOrders] = useState([])
    const [cancelledOrders, setCancelledOrders] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    Axios.defaults.withCredentials = true
    const [index, setIndex] = useState(0)

    return (
        <div>
            <Nav defaultActiveKey="/dashboard/order-details/past-orders" class="flex-column">
                <Nav.Link href="/dashboard/order-details/past-orders">Past Orders</Nav.Link>
                <Nav.Link href="/dashboard/order-details/cancelled-orders">
                    Cancelled Orders
                </Nav.Link>
                <Nav.Link href="/dashboard/order-details/active-orders">Active Orders</Nav.Link>
            </Nav>
        </div>
    )
}

export default OrderDetails
