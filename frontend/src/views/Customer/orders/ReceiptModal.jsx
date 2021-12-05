import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Axios from 'axios'
import * as moment from 'moment'
import { ThumbUpSharp } from '@mui/icons-material'

class ReceiptModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide: this.props.showHide,
            orders: this.props.data,
            total: this.props.total,
            instructions: this.props.instructions,
        }
        console.log(this.props)
        //    this.getReceipt = this.getReceipt.bind(this)
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
        console.log(this.props)
        console.log(this.state.showHide)
        this.props.modal(false)
    }
    componentDidMount() {
        console.log(this.props.showHide)
        console.log(new Date(this.props.data.date).toGMTString())
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showHide}>
                    <Modal.Header onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Order Receipt</Modal.Title>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <table class="table">
                            <thead>
                                <tr>
                                    <td>Quantity</td>
                                    <td>Dish</td>
                                    <td>Price</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((el, index) => (
                                    <tr key={index}>
                                        <td>{el.quantity}</td>
                                        <td>{el.dishName}</td>
                                        <td>{el.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total:</td>
                                    <td />
                                    <td>{this.state.total}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold' }}>Special Instructions:</td>
                                    <td>{this.state.instructions}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ReceiptModal
