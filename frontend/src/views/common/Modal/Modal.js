import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import * as ACTIONS from '../../../redux/actions/actions'
import './Modal.css'
import Axios from 'axios'

const Modal = () => {
    const dispatch = useDispatch()
    const server = process.env.REACT_APP_WHITELISTED_DOMAINS

    const history = useHistory()
    const customer = useSelector((state) => state.userLogin)

    const logOut = () => {
        Axios.post(`${server}/api/logout`, {
            user: customer.user_id,
        })
            .then((res) => {
                dispatch({ type: ACTIONS.USER_LOGOUT })
            })
            .catch((err) => console.log(err))
    }
    return (
        <div class="modal-container">
            <ul className="modal-list-items">
                <li
                    className="modal-list-item"
                    onClick={() => {
                        history.push('/customer-profile')
                    }}
                >
                    Profile
                </li>
                <hr />
                <li
                    className="modal-list-item"
                    onClick={() => {
                        history.push('/dashboard/order-details/past-orders')
                    }}
                >
                    Orders
                </li>
                <hr />
                <li className="modal-list-item" onClick={logOut}>
                    Log Out <LogoutIcon />
                </li>
            </ul>
        </div>
    )
}

export default Modal
