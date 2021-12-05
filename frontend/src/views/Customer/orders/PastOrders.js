import React, { useState, useEffect, Component } from 'react'
import './Orders.css'
import { Col, Container, Row, Badge, Alert, Button } from 'react-bootstrap'
import * as moment from 'moment'
import ReceiptModal from './ReceiptModal'
import { useSelector } from 'react-redux'

import { useQuery } from '@apollo/client'
import { GET_PAST_ORDERS_CUSTOMER } from '../../../GraphQL/queries'
const PastOrders = () => {
    const [orders, setOrders] = useState([])
    const [showHide, setShowHide] = useState(false)
    const [receipt, setReceipt] = useState([])
    const [total, setTotal] = useState(0)
    const [instructions, setInstructions] = useState('')
    const [show, setShow] = useState(false)
    const [pastOrders, setPastOrders] = useState([])
    const customer = useSelector((state) => state.userLogin.user)
    const pastOrdersData = useQuery(GET_PAST_ORDERS_CUSTOMER, {
        variables: { customer: customer },
    })
    useEffect(() => {
        if (!pastOrdersData?.loading) setPastOrders(pastOrdersData.data?.customerPastOrders)
    }, [pastOrdersData?.loading])

    const viewReceipt = (val, receipt, total, instructions = '') => {
        console.log(val)
        setShowHide(val)
        setReceipt(receipt)
        setTotal(total)
        setInstructions(instructions)
        console.log(showHide)
    }
    // const handleChangeForSize = (event) => {
    //     setPageSize(event.target.value)
    // }
    // const handleChangeForPageNo = (event, value) => {
    //     setPageNo(value)
    // }

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
                {pastOrders.map((el, index) => (
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
                                    {el.orderStatus}
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
}

export default PastOrders
