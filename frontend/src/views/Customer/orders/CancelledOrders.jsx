import React, { useState, useEffect, Component } from 'react'
import './Orders.css'
import { Col, Container, Row, Badge, Alert, Button } from 'react-bootstrap'
import * as moment from 'moment'
import ReceiptModal from './ReceiptModal'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useQuery } from '@apollo/client'
import { GET_CANCEL_ORDERS_CUSTOMER } from '../../../GraphQL/queries'
const CustomerCancelledOrders = () => {
    const [orders, setOrders] = useState([])
    const [showHide, setShowHide] = useState(false)
    const [receipt, setReceipt] = useState([])
    const [total, setTotal] = useState(0)
    const [sucessMsg, setSuccessMsg] = useState('')
    const [show, setShow] = useState(false)
    const [cancelledOrders, setCancelledOrders] = useState([])
    const customer = useSelector((state) => state.userLogin.user)
    const [pageSize, setPageSize] = React.useState(5)
    const [pageNo, setPageNo] = React.useState(1)
    const [errorMsg, setErrorMsg] = useState('')
    const [instructions, setInstructions] = useState('')
    const cancelOrdersData = useQuery(GET_CANCEL_ORDERS_CUSTOMER, {
        variables: { customer: customer },
    })
    useEffect(() => {
        if (!cancelOrdersData?.loading)
            setCancelledOrders(cancelOrdersData.data?.customerCancelledOrders)
    }, [cancelOrdersData?.loading])

    // const loadOrders = (pageSize, pageNo) => {
    //     Axios.post('http://localhost:3001/api/cancelled-orders', {
    //         user: customer,
    //         size: pageSize,
    //         pageNo: pageNo,
    //     })
    //         .then(async (res) => {
    //             console.log(res.data)
    //             let response = await res.data

    //             if (response.length === 0) {
    //                 setErrorMsg('No data')
    //                 setCancelledOrders([])
    //             } else {
    //                 setCancelledOrders(response)
    //             }
    //         })
    //         .catch((err) => {
    //             //  setErrorMsg('No Data')
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

    // const loadOrders = (event) => {
    //     //  console.log(this.props);
    //     console.log('Hi' + parseInt(event.target.innerText))
    //     props.load(parseInt(event.target.innerText))
    // }

    //   render() {
    return (
        <div class="orders-wrapper">
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
                {/* {cancelledOrders.length == 0 && (
                    <Alert variant="secondary">
                        <Alert.Heading>No Data on this page</Alert.Heading>
                    </Alert>
                )} */}
                {cancelledOrders.length > 0 &&
                    cancelledOrders.map((el, index) => (
                        <div class="order-box" key={index}>
                            <Row>
                                <Col md={6}>
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
                                    style={{
                                        display: 'flex',
                                        alignSelf: 'center',
                                        justifyContent: 'end',
                                    }}
                                >
                                    <Badge pill bg="info" text="dark">
                                        Cancelled
                                    </Badge>
                                </Col>
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

export default CustomerCancelledOrders
