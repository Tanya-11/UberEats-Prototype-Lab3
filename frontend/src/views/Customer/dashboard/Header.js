import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Header.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Modal from '../../common/Modal/Modal'
import CartModal from '../cart/CartModal'

const Header = () => {
    const [isPopUp, setIsPopUp] = useState(false)
    const history = useHistory()
    const [showCartPopUp, setCartPopUp] = useState(false)
    const count = useSelector((state) => state?.cart)
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
        <div class="header-container">
            <div class="uber-logo" onClick={navigateToDashboard}></div>
            <div class="cart">
                <button onClick={goToOrder} className="cart-btn-wrapper">
                    <ShoppingCartOutlinedIcon className="cartIcon" />
                    <input className="cart-btn" type="text" disabled value={cartLen}></input>
                </button>
            </div>
            {showCartPopUp && <CartModal data={showCartPopUp} modal={goToOrder}></CartModal>}
            <div class="user-logo" onClick={showPopUp} />
            {isPopUp && (
                <div class="modal-wrapper">
                    <Modal />
                </div>
            )}
        </div>
    )
}

export default Header
