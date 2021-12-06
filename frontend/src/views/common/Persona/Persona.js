import React from 'react'
import { useHistory } from 'react-router-dom'
import './Persona.css'

const Persona = () => {
    const history = useHistory()
    return (
        <div class="Persona">
            <span className="ubereats-logo"></span>
            <div class="PersonaWrapper">
                <div
                    class="restaurant"
                    onClick={() => {
                        history.push('/restaurant-login')
                    }}
                >
                    <div class="restaurantImg"></div>
                    <h4 className="persona-heading">Restaurant</h4>
                </div>
                <div
                    class="customer"
                    onClick={() => {
                        history.push('/user-login')
                    }}
                >
                    <div class="customerImg"></div>
                    <h4 className="persona-heading">Customer</h4>
                </div>
            </div>
        </div>
    )
}

export default Persona
