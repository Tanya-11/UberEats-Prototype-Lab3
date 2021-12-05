import React, { useState, useEffect, Component } from 'react'
import './Orders.css'
import { Col, Container, Row, Badge, Alert, Button } from 'react-bootstrap'
import * as moment from 'moment'
import ReceiptModal from './ReceiptModal'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useQuery } from '@apollo/client'
import { GET_ACTIVE_ORDERS_CUSTOMER } from '../../../GraphQL/queries'
const CustomerActiveOrders = () => {
    const [showHide, setShowHide] = useState(false)
    const [receipt, setReceipt] = useState([])
    const [total, setTotal] = useState(0)
    const [sucessMsg, setSuccessMsg] = useState('')
    const [show, setShow] = useState(false)
    const [activeOrders, setActiveOrders] = useState([])
    const customer = useSelector((state) => state.userLogin.user)
    const [pageSize, setPageSize] = React.useState(5)
    const [pageNo, setPageNo] = React.useState(1)
    const [errorMsg, setErrorMsg] = useState('')
    const [instructions, setInstructions] = useState('')
    const activeOrdersData = useQuery(GET_ACTIVE_ORDERS_CUSTOMER, {
        variables: { customer: customer },
    })
    useEffect(() => {
        if (!activeOrdersData?.loading) setActiveOrders(activeOrdersData.data?.customerActiveOrders)
    }, [activeOrdersData?.loading])

    // const loadOrders = (pageSize, pageNo) => {
    //     Axios.post('http://localhost:3001/api/active-orders', {
    //         user: customer,
    //         size: pageSize,
    //         pageNo: pageNo,
    //     })
    //         .then((res) => {
    //             console.log(res.data)
    //             let response = res.data

    //             console.log(response.length)
    //             if (response.length === 0) {
    //                 setErrorMsg('No data')
    //                 setActiveOrders([])
    //             } else setActiveOrders(response)
    //         })
    //         .catch((err) => {
    //             setErrorMsg('No Data')
    //         })
    // }

    const viewReceipt = (val, receipt, total, instructions = '') => {
        console.log(val)
        setShowHide(val)
        setReceipt(receipt)
        setTotal(total)
        setInstructions(instructions)
        console.log(showHide)
    }
    const handleChangeForSize = (event) => {
        setPageSize(event.target.value)
    }
    const handleChangeForPageNo = (event, value) => {
        setPageNo(value)
    }

    const cancelOrder = (item) => {
        console.log(item)
        Axios.post('http://localhost:3001/api/orders/update/status', {
            orderId: item._id,
            orderStatus: 'Cancelled',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        })
            .then(
                (res) => {
                    console.log(res)
                    if ((res.status = 200)) {
                        setSuccessMsg('Cancelled Order')
                        setShow(true)
                        setTimeout(() => {
                            setShow(false)
                            window.location.reload()
                        }, 1000)
                    }
                },
                (err) => {
                    console.log(err)
                }
            )
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div class="orders-wrapper">
            <Alert show={show} variant="success">
                <Alert.Heading>{sucessMsg}</Alert.Heading>
            </Alert>

            {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                label="Page"
                onChange={handleChangeForSize}
            >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
            </Select> */}
            <Container fluid>
                {activeOrders.length === 0 && (
                    <Alert variant="secondary">
                        <Alert.Heading>No Data on this page</Alert.Heading>
                    </Alert>
                )}
                {activeOrders.map((el, index) => (
                    <div class="order-box" key={index}>
                        <Row>
                            <Col md={6} sm={3}>
                                <span>
                                    <b>{el.restId}</b>
                                </span>
                                <div>
                                    Ordered for ${el.price} on {moment(el.date).format('LLL')}
                                    <input
                                        className="view-receipt-btn"
                                        type="submit"
                                        value="View Receipt"
                                        onClick={() =>
                                            viewReceipt(
                                                true,
                                                el?.dishes,
                                                el.price,
                                                el?.instructions
                                            )
                                        }
                                    />
                                </div>
                            </Col>
                            <Col
                                md={3}
                                sm={1}
                                style={{
                                    display: 'flex',
                                    alignSelf: 'center',
                                    justifyContent: 'end',
                                }}
                            >
                                <Badge pill bg="info" text="dark">
                                    {el.orderStatus}
                                </Badge>
                            </Col>
                            {el.orderStatus === 'Placed' && (
                                <Col
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    style={{
                                        display: 'flex',
                                        alignSelf: 'center',
                                        justifyContent: 'end',
                                    }}
                                    // disabled={el.orderStatus !== 'Placed'}
                                    onClick={() => cancelOrder(el)}
                                >
                                    <DeleteForeverIcon />
                                </Col>
                            )}
                        </Row>
                    </div>
                ))}
                {showHide && (
                    <ReceiptModal
                        showHide={showHide}
                        modal={viewReceipt}
                        data={receipt}
                        total={total}
                        instructions={instructions}
                    ></ReceiptModal>
                )}
                {/* <Pagination count={5} shape="rounded" onChange={handleChangeForPageNo} /> */}
            </Container>
        </div>
    )
    //   }
}

export default CustomerActiveOrders
