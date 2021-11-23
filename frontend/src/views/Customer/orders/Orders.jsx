import React, { useState, useEffect, Component } from 'react'
import './Orders.scss'
import { Col, Container, Row, Badge } from 'react-bootstrap'
import * as moment from 'moment'
import ReceiptModal from './ReceiptModal'

class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: this.props.data,
            showHide: false,
            receipt: [],
            total:0
        }
        this.viewReceipt = this.viewReceipt.bind(this)
        console.log();
    }

    viewReceipt = (val, receipt,total) => {
        console.log(val)
        this.setState({
            showHide: val,
            receipt: receipt,
            total:total
        })
        console.log(this.state.showHide)
    }
    render() {
        return (
            <Container fluid>
                {this.state.orders.length > 0 &&
                    this.state.orders.map((el, index) => (
                        <div className="order-box" key={index}>
                            <Row>
                                <Col md={6}>
                                    <span>{el.orders.restId}</span>
                                    <div>
                                        {el.orders.quantity} items for ${el.orders.price} on{' '}
                                        {new Date(el.orders.date).toGMTString()}
                                        <input
                                            type="submit"
                                            value="View Receipt"
                                            onClick={() => this.viewReceipt(true, el?.orders?.dishes,el.orders.price)}
                                        />
                                    </div>
                                </Col>
                                <Col md={{ span: 1, offset: 4 }}>
                                    <Badge pill bg="info" text="dark">
                                        {el.orders.orderStatus}
                                    </Badge>
                                </Col>
                            </Row>
                        </div>
                    ))}
                {this.state.showHide && (
                    <ReceiptModal
                        showHide={this.state.showHide}
                        modal={this.viewReceipt.bind(this)}
                        data={this.state.receipt}
                        total={this.state.total}
                    ></ReceiptModal>
                )}
            </Container>
        )
    }
}

export default Orders
