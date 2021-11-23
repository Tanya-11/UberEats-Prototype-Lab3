// import React from "react";
// import { Redirect, Route } from "react-router-dom";

// export const PrivateRoute = props => {
//     const user = null;
//     return  user ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
//     (<Redirect  to="/login"  />);
// };

import React,{useContext, useCallback, useEffect} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import Axios from 'axios';
import {
  userLogInFail,
  userLogInSuccess,

} from '../../src/redux/actions/actions'
const PrivateRoute = (restOfProps) => {
     const dispatch = useDispatch()

    // const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userLoginStatus = useSelector((state) => state.userLogin)
    const restLoginStatus = useSelector((state) => state.restLogin)
    const isAuth = userLoginStatus.isLoggedIn || restLoginStatus.isLoggedIn
    Axios.defaults.withCredentials=true;
    const verifyUser =  useCallback(() => {
        
        Axios.post('http://localhost:3001/api/refreshToken')        
       .then( async response => {
          if (response) {
            const data =  await response.data
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+data);
            localStorage.setItem('cook',data)

            dispatch(
              userLogInSuccess({
                  text:  data.token ,
                  user: userLoginStatus.user,
              })
          )
            render = <Route {...restOfProps}></Route>;
          } else {
   
            dispatch(
              userLogInFail({
                  text:  null ,
                  user: userLoginStatus.user,
              })
          )
          }
          // call refreshToken every 5 minutes to renew the authentication token.
          setTimeout(verifyUser, 50 * 60 * 1000)
        })
        .catch(err=>{
            console.error( err);
        })
      }
    , [])
    
      useEffect(() => {
        verifyUser()
     }, [verifyUser])
    console.log('this',  restOfProps.path)
    return isAuth? 
      <Route {...restOfProps}></Route>
      :<h1>Loading</h1>
    

}

export default PrivateRoute
