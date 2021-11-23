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
} from '../../redux/actions/actions'
import Axios from 'axios'
import './AuthN.scss'
import { Alert } from 'react-bootstrap'


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

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        console.log(props.data)
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

    const dispatchSuccessAction = (persona,token, user_id) => {
        console.log('persoan', persona)
        switch (persona) {
            case 'customer':
                return dispatch(
                    userLogInSuccess({
                        token: token,
                        user: emailValue,
                        user_id: user_id
                    })
                )
            case 'restaurant':
                console.log("ij rsst");
                return dispatch(
                    restLogInSuccess({
                        token: token,
                        user: emailValue,
                        user_id: user_id
                    })
                )
        }
    }
    const dispatchFailAction = (persona, token,user_id) => {
        switch (persona) {
            case 'customer':
                return dispatch(
                    userLogInFail({
                        token: token,
                        user: emailValue,
                        user_id: user_id
                    })
                )
            case 'restaurant':
                return dispatch(
                    restLogInFail({
                        token: token,
                        user: emailValue,
                        user_id: user_id
                    })
                )
        }
    }
    const dispatchInProgressAction = (persona,user_id) => {
        console.log('persoan', persona)
        switch (persona) {
            case 'customer':
                return dispatch(
                    userLogInProgress({
                        token: 'In Progress',
                        user: emailValue,
                        user_id: user_id
                    })
                )
            case 'restaurant':
                return dispatch(
                    restLogInProgress({
                        token: 'In Progress',
                        user: emailValue,
                        user_id: user_id
                    })
                )
        }
    }

    const onNextClicked = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/api/login', {
            username: emailValue,
            password: passwordValue,
            persona: props.data,
        })
            .then((res) => {
                console.log('success', res)
                localStorage.setItem('address', JSON.stringify(res?.data?.address))
       
                dispatchSuccessAction(props.data, res.data.token, res.data.user)
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
    const getPassword = () => {
        setShowPassInput(true)
        if (props.data === 'restaurant') {
            if (restLoginStatus.isLoggedIn && restLoginStatus.text.user === emailValue) {
                history.push('/rest-dashboard/about')
            } else {
                dispatch(restLogInProgress('In progress'))
            }
        } else if (userLoginStatus.isLoggedIn && userLoginStatus.text.user === emailValue) {
            history.push('/dashboard')
        } else {
            console.log('prognsbnsj', userLoginStatus)
        }
    }
    const goToPersons = () => {
        history.push('/')
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="logo" onClick={goToPersons} />
                <h1>Welcome Back</h1>
                {errorMsg && (
                    <Alert variant="danger" className="fail">
                        {errorMsg}
                    </Alert>
                )}
                <div className="login-form">
                    {/* <input
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        type="text"
                        placeholder={namePlaceholder}
                    /> */}
                    <input
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        type="email"
                        placeholder={emailPlaceholder}
                    />
                    {
                   // showPassInput && 
                    (
                        <input
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            type="password"
                            placeholder={passwordPlaceholder}
                        />
                    )}
                    {/* {
                  //  !showPassInput &&
                     (
                        <button
                            // disabled={!emailValue || !passwordValue}
                            onClick={getPassword}
                        >
                            Next
                        </button>
                    )} */}
                    {
                 //   showPassInput && 
                    (
                        <button
                            // disabled={!emailValue || !passwordValue}
                            onClick={e=>onNextClicked(e)}
                        >
                            Next
                        </button>
                    )}
                    <button
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
