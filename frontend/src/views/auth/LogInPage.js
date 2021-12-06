import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    userLogInProgress,
    userLogInFail,
    userLogInSuccess,
    restLogInSuccess,
    restLogInFail,
    restLogInProgress,
    role,
} from '../../redux/actions/actions'
import Axios from 'axios'
import './AuthN.css'
import { Alert } from 'react-bootstrap'
require('dotenv').config()
export const LoginPage = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [emailPlaceholder, setEmailPlaceholder] = useState('Type Email')
    const [passwordPlaceholder, setPasswordPlaceholder] = useState('Type Password')
    const [signUpURL, setSignUpURL] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const userLoginStatus = useSelector((state) => state.userLogin)
    const restLoginStatus = useSelector((state) => state.restLogin)
    const [showPassInput, setShowPassInput] = useState(false)
    const { REACT_APP_WHITELISTED_DOMAINS } = process.env
    Axios.defaults.withCredentials = true

    useEffect(() => {
        if (props.data === 'restaurant') {
            setEmailPlaceholder('Restaurant Email')
            setPasswordPlaceholder('Restaurant Password')
            setSignUpURL('/restaurant-signup')
        } else {
            setEmailPlaceholder('User Email')
            setPasswordPlaceholder('User Password')
            setSignUpURL('/user-signup')
        }
    }, [])

    const dispatchRole = (persona) => {
        console.log('in dispatch')
        return dispatch(
            role({
                role: persona,
            })
        )
    }

    const dispatchSuccessAction = (persona, token, user_id) => {
        switch (persona) {
            case 'customer':
                return dispatch(
                    userLogInSuccess({
                        token: token,
                        user: emailValue,
                        user_id: user_id,
                    })
                )
            case 'restaurant':
                return dispatch(
                    restLogInSuccess({
                        token: token,
                        user: emailValue,
                        user_id: user_id,
                    })
                )
        }
    }
    const dispatchFailAction = (persona, token, user_id) => {
        switch (persona) {
            case 'customer':
                return dispatch(
                    userLogInFail({
                        token: token,
                        user: emailValue,
                        user_id: user_id,
                    })
                )
            case 'restaurant':
                return dispatch(
                    restLogInFail({
                        token: token,
                        user: emailValue,
                        user_id: user_id,
                    })
                )
        }
    }
    const dispatchInProgressAction = (persona, user_id) => {
        console.log('persoan', persona)
        switch (persona) {
            case 'customer':
                return dispatch(
                    userLogInProgress({
                        token: 'In Progress',
                        user: emailValue,
                        user_id: user_id,
                    })
                )
            case 'restaurant':
                return dispatch(
                    restLogInProgress({
                        token: 'In Progress',
                        user: emailValue,
                        user_id: user_id,
                    })
                )
        }
    }
    const goToPersons = () => {
        history.push('/')
    }

    const onNextClicked = (e) => {
        console.log(REACT_APP_WHITELISTED_DOMAINS)
        e.preventDefault()
        Axios.post(`${REACT_APP_WHITELISTED_DOMAINS}/api/login`, {
            username: emailValue,
            password: passwordValue,
            persona: props.data,
        })
            .then((res) => {
                console.log('success', res)
                localStorage.setItem('address', JSON.stringify(res?.data?.address))

                dispatchSuccessAction(props.data, res.data.token, res.data.user)
                dispatchRole(props.data)
                console.log(`persona${props.data}`)
                if (props.data === 'customer') {
                    history.push('/dashboard')
                } else history.push('/rest-dashboard/about')
            })
            .catch((err) => {
                dispatchFailAction(props.data, '')
                console.log('in catch', err)
                setErrorMsg('Wrong Username or Password')
                //  throw err
            })
    }
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="logo" onClick={goToPersons} />
                <h2>Welcome Back</h2>
                {errorMsg && (
                    <Alert variant="danger" className="danger">
                        {errorMsg}
                    </Alert>
                )}
                <div className="login-form">
                    <input
                        className="login-input"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        type="email"
                        placeholder={emailPlaceholder}
                    />
                    {
                        <input
                            className="login-input"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            type="password"
                            placeholder={passwordPlaceholder}
                        />
                    }

                    <button
                        className="login-btn"
                        // disabled={!emailValue || !passwordValue}
                        onClick={(e) => onNextClicked(e)}
                    >
                        Next
                    </button>
                    <button
                        className="login-btn"
                        onClick={() => {
                            history.push(signUpURL)
                            //  dispatchInProgressAction(props.data)
                        }}
                    >
                        New to Uber? Sign Up!
                    </button>
                </div>
            </div>
        </div>
    )
}
