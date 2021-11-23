import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userOrderPlaced } from '../../../redux/actions/actions'
class NewOrderModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide: this.props.data,
        }
        this.handleCart = this.handleCart.bind(this)
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
        this.props.modal()
    }
    componentDidMount() {
        console.log(this.props)
    }

    handleCart() {
        this.props.dispatch(userOrderPlaced([]))
        this.handleModalShowHide()
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showHide}>
                    <Modal.Body>
                        Your order contains items from {this.props.rest1}. Create a new order to add
                        item to {this.props.rest2}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Continue
                        </Button>
                        <Button variant="secondary" onClick={() => this.handleCart()}>
                            Create New Order
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({ cart: state.cart })
export default connect(mapStateToProps)(NewOrderModal)
