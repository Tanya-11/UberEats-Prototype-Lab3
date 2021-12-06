import React, { useContext, useCallback, useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import { userLogInFail, userLogInSuccess } from '../../src/redux/actions/actions'
const PrivateRoute = (restOfProps) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userLoginStatus = useSelector((state) => state.userLogin)
    const restLoginStatus = useSelector((state) => state.restLogin)
    let isAuth = userLoginStatus.isLoggedIn || restLoginStatus.isLoggedIn
    Axios.defaults.withCredentials = true
    const { REACT_APP_WHITELISTED_DOMAINS } = process.env
    const verifyUser = useCallback(() => {
        Axios.get(`${REACT_APP_WHITELISTED_DOMAINS}/api/refreshToken`)
            .then(async (response) => {
                console.log(response)
                if (response) {
                    const data = await response
                    dispatch(
                        userLogInSuccess({
                            token: data?.data.token ?? '',
                            user: userLoginStatus.user,
                            user_id: userLoginStatus.user_id,
                        })
                    )
                } else {
                    console.error('errrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
                    isAuth = false
                    // dispatch(
                    //     userLogInFail({
                    //         token: '',
                    //         user: userLoginStatus.user,
                    //     })
                    // )
                }
                // call refreshToken every 5 minutes to renew the authentication token.
                setTimeout(verifyUser, 50 * 60 * 1000)
            })
            .catch((err) => {
                isAuth = false
                console.error(err)
                //   dispatch(
                //     userLogInFail({
                //         token : '',
                //         user: userLoginStatus.user,
                //     })
                // )
            })
    }, [])

    // useEffect(() => {
    //     verifyUser()
    // }, [verifyUser])
    console.log('this', isAuth)
    return isAuth ? <Route {...restOfProps}></Route> : <Redirect to="/" />
}

export default PrivateRoute
