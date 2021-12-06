import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    userLogInSuccess,
    userLogInFail,
    restLogInSuccess,
    restLogInFail,
} from '../../redux/actions/actions'
import './AuthN.css'
import Axios from 'axios'
import { Alert } from 'react-bootstrap'
require('dotenv').config()
const SignUpPage = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log("onSignUp="+JSON.stringify(onSignUp));
    // console.log("props="+JSON.stringify(props));

    // if(!props.auth){
    //     return (<Redirect to="/login"></Redirect>);
    // }
    const [errorMsg, setErrorMsg] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [cityValue, setcityValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [emailPlaceholder, setEmailPlaceholder] = useState('TType Email')
    const [passwordPlaceholder, setPasswordPlaceholder] = useState('Type Password')
    const [namePlaceholder, setNamePlaceholder] = useState('Type Name')
    const [cityPlaceholder, setCityPlaceholder] = useState('Type City')
    const [signUpURL, setSignUpURL] = useState('')
    const server = process.env.REACT_APP_WHITELISTED_DOMAINS
    Axios.defaults.withCredentials = true

    useEffect(() => {
        console.log(props.data)
        if (props.data === 'restaurant') {
            setEmailPlaceholder('Restaurant Email')
            setNamePlaceholder('Restaurant Name')
            setPasswordPlaceholder('Restaurant Password')
            setCityPlaceholder('Restaurant Location')
            setSignUpURL('/rest-dashboard/about')
        } else {
            setEmailPlaceholder('User Email')
            setNamePlaceholder('User Name')
            setPasswordPlaceholder('User Password')
            setSignUpURL('/dashboard')
        }
    }, [])
    const onSignUpClicked = () => {
        Axios.post(`${server}/api/signup`, {
            name: nameValue,
            username: emailValue,
            password: passwordValue,
            city: cityValue,
            persona: props.data,
        })
            .then((res) => {
                console.log(res)
                if (props.data === 'customer')
                    dispatch(
                        userLogInSuccess({
                            token: res?.data?.token,
                            user: emailValue,
                            user_id: res?.data.user,
                        })
                    )
                else {
                    dispatch(
                        restLogInSuccess({
                            token: res?.data?.token,
                            user: emailValue,
                            user_id: res?.data.user,
                        })
                    )
                }
                history.push(signUpURL)
            })
            .catch((err) => {
                console.log(err)
                setErrorMsg('Error in Signing up')
                if (props.data === 'customer')
                    dispatch(
                        userLogInFail({
                            text: null,
                            user: emailValue,
                        })
                    )
                else
                    dispatch(
                        restLogInFail({
                            text: token || null,
                            user: emailValue,
                        })
                    )
            })
        //    mapDispatchToProps.onSignUp(text);
    }
    const goToPersons = () => {
        history.push('/')
    }
    return (
        <div class="login-container">
            <div class="login-wrapper">
                <div class="logo" onClick={goToPersons} />
                <h2>Let's get started</h2>
                {errorMsg && (
                    <Alert variant="danger" class="fail">
                        {errorMsg}
                    </Alert>
                )}
                <div class="login-form">
                    <input
                        className="login-input"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        type="text"
                        placeholder={namePlaceholder}
                    />
                    <input
                        className="login-input"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        type="email"
                        placeholder={emailPlaceholder}
                    />
                    <input
                        className="login-input"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        type="password"
                        placeholder={passwordPlaceholder}
                    />
                    {props.data === 'restaurant' && (
                        <input
                            className="login-input"
                            value={cityValue}
                            onChange={(e) => setcityValue(e.target.value)}
                            type="text"
                            placeholder={cityPlaceholder}
                        />
                    )}
                    <button
                        className="login-btn"
                        // disabled={!emailValue || !passwordValue || !confirmPasswordValue }
                        onClick={onSignUpClicked}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

// const mapStateToProps = state => (
//     console.log("mapStateToProps-"+state),
//     {
//     props: state,
// });

export default SignUpPage
