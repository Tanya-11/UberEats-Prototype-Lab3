import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Header.scss'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Modal from '../../common/Modal/Modal'
import CartModal from '../cart/CartModal'

const Header = () => {
    const [deliveryMode, setDeliveryMode] = useState(true)
    const [location, setLocation] = useState('')
    const [searchString, setSearchString] = useState('')
    const [isPopUp, setIsPopUp] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const [showCartPopUp, setCartPopUp] = useState(false)
    const count = useSelector((state) => state.cart)
    const [cartLen, setCartLen] = useState(0)
    Axios.defaults.withCredentials = true

    useEffect(() => {
        console.log('count', count)
        let temp = 0
        if (count.length > 0) {
            count.forEach((element) => {
                temp += element.text
            })
        }
        setCartLen(temp)
    }, [count])
    const navigateToDashboard = () => {
        history.push('/dashboard')
    }
    const goToOrder = () => {
        setCartPopUp(!showCartPopUp)
    }
    const showPopUp = () => {
        console.log(`clicked${isPopUp}`)
        setIsPopUp(!isPopUp)
    }

    return (
        <div className="header-container">
            <div className="uber-logo" onClick={navigateToDashboard}></div>
            <div className="cart">
                <button onClick={goToOrder}>
                    <ShoppingCartOutlinedIcon className="cartIcon" />
                    <input type="text" disabled value={cartLen}></input>
                </button>
            </div>
            {showCartPopUp && <CartModal data={showCartPopUp} modal={goToOrder}></CartModal>}
            <div className="user-logo" onClick={showPopUp} />
            {isPopUp && (
                <div className="modal-wrapper">
                    <Modal />
                </div>
            )}
        </div>
    )
}

export default Header
