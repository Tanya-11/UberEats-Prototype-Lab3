import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { userOrderCountEdit } from '../../../redux/actions/actions'

class CartModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide: this.props.data,
            orders: this.props.cart,
            checkout:false
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
        this.props.modal()
    }

    setQuantity(e,index){
        console.log(e.target.value);
        e.preventDefault();
        console.log(index);
        console.log(this.props);
        if(isNaN(parseInt(e.target.value))){
            console.log('in nan');
            this.setState({
                checkout:true
            })

            this.props.dispatch(
                userOrderCountEdit(
                    {
                        text: parseInt(e.target.value),
                        dishId: this.props.cart[index].dishId,
                        dishName: this.props.cart[index].dishName,
                        restId: this.props.cart[index].restId,
                        restName: this.props.cart[index].restName,
                        price:0,
                    }
                )
            )
        }
        else{
            console.log('in right');
            this.setState({
                checkout:false
            })
        this.props.dispatch(
            userOrderCountEdit(
                {
                    text: parseInt(e.target.value),
                    dishId: this.props.cart[index].dishId,
                    dishName: this.props.cart[index].dishName,
                    restId: this.props.cart[index].restId,
                    restName: this.props.cart[index].restName,
                    price: this.props.cart[index].price,
                }
            )
        )
    }
       // this.state.orders[index].text = parseInt(e.target.value);
    //    this.setState((prev)=>({
    //        ...prev,
    //     orders:this.state.orders[index].text
    //    }))
    }
    handleCheckout() {
        this.handleModalShowHide()
        this.props.history.push('/dashboard/cart-details')
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showHide}>
                    <Modal.Header onClick={() => this.handleModalShowHide()}>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.orders && this.state.orders.length > 0 && (
                            <div className="cart-wrapper">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Quantity</th>
                                            <th>Dish</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.orders.map((order, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type='number'
                                                    value={order.text}
                                                        // min='0'
                                                        // max='20'
                                                    onChange={e=>this.setQuantity(e,index)}
                                                    />                                                 
                                                    </td>
                                                <td>{order.dishName}</td>
                                                <td>{isNaN(order.text)? 0 : order.text *    order.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                        {this.state.orders && this.state.orders.length === 0 && (
                            <div className="cart-wrapper">
                                <span className="text">No Items in Cart</span>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.orders.length > 0 && (
                            <Button variant="primary" onClick={() => this.handleCheckout()}
                            disabled={this.state.checkout}>
                                Proceed to Checkout
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({ cart: state.cart })
export default withRouter(connect(mapStateToProps)(CartModal))
