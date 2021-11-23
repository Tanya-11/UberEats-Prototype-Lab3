import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useContext, useCallback, useEffect } from 'react'
import SignUpPage from './views/auth/SignUpPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Dashboard from './views/Customer/dashboard/Dashboard'
import Persona from '@views/common/Persona/Persona'
import { LoginPage } from '@views/auth/LogInPage'
import Header from './views/Customer/dashboard/Header'
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail'
import OrderDetails from './views/Customer/orders/OrderDashboard'
import CustomerProfile from './views/Customer/profile/CustomerProfile'
import Cart from './views/Customer/cart/Cart'
import PrivateRoute from './auth/PrivateRoute'
import RestProfile from './views/restaurant/Profile'
import About from './views/restaurant/About'
import ViewOrder from './views/restaurant/ViewOrders'
import CompleteOrders from './views/restaurant/CompletedOrders'
import ActiveOrders from './views/restaurant/ActiveOrders'
import { useSelector} from 'react-redux'

import Axios from 'axios'
function App() {
    const userLoginStatus = useSelector((state) => state.userLogin)
    const restLoginStatus =  useSelector((state) => state.restLogin)

 
    Axios.defaults.headers.common = {
        'Authorization': 'Bearer ' + userLoginStatus?.token
    };
    // Axios.defaults.withCredentials=true;
    // const verifyUser = useCallback( () => {
    //     Axios.post('http://localhost:3001/api/refreshToken')        
    //    .then(async response => {
    //        console.log("res");
    //       if (response.status==200) {
    //         const data = await response.data
    //         setUserContext(oldValues => {
    //           return { ...oldValues, token: data.token }
    //         })
    //       } else {
    //         setUserContext(oldValues => {
    //           return { ...oldValues, token: null }
    //         })
    //       }
    //       // call refreshToken every 5 minutes to renew the authentication token.
    //       setTimeout(verifyUser, 5 * 60 * 1000)
    //     })
    //     .catch(err=>{
    //         console.error(err);
    //        // throw new Error(err)
    //     })
    //   }, [setUserContext])
    
    //   useEffect(() => {
    //     verifyUser()
    //   }, [verifyUser])
    
    return (
        <div className="parent-container">
            <Router>
                <Route path="/" exact>
                    <Persona />
                </Route>
                <Route path="/user-login" exact>
                    <LoginPage data={'customer'} />
                </Route>
                <Route path="/restaurant-login" exact>
                    <LoginPage data={'restaurant'} />
                </Route>
                <Route path="/user-signup" exact>
                    <SignUpPage data={'customer'} />
                </Route>
                <Route path="/restaurant-signup" exact>
                    <SignUpPage data={'restaurant'} />
                </Route>
                 <PrivateRoute path="/dashboard">
                    <div className="header">
                        <Header />
                    </div>
                    <div className="mainContent">
                        <Route path="/dashboard" exact>
                            <Dashboard></Dashboard>
                        </Route>
                        <Route path="/dashboard/restaurant-details" exact>
                            <RestCardDetail />
                        </Route>
                        <Route path="/dashboard/cart-details" exact>
                            <Cart></Cart>
                        </Route>
                        <Route path="/dashboard/order-details" exact>
                            <OrderDetails></OrderDetails>
                        </Route>
                    </div>
                 </PrivateRoute>
                <PrivateRoute path="/customer-profile" exact>
                    <CustomerProfile />
                </PrivateRoute>
                <Route path="/rest-dashboard">
                    <div className="profile">
                        <RestProfile />
                        <Route path="/rest-dashboard/about" exact>
                            <div className="about">
                                <About />
                            </div>
                        </Route>
                        <Route path="/rest-dashboard/dishes" exact>
                            <div className="dish">
                                <ViewOrder />{' '}
                            </div>
                        </Route>
                        <Route path="/rest-dashboard/active" exact>
                            <ActiveOrders />
                        </Route>
                        <Route path="/rest-dashboard/completed" exact>
                            <CompleteOrders />
                        </Route>
                    </div>
                </Route>
            </Router>
        </div>
    )
}

export default App
