import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useContext, useCallback, useEffect } from 'react'
import SignUpPage from './views/auth/SignUpPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Dashboard from './views/Customer/dashboard/Dashboard'
import Persona from './views/common/Persona/Persona'
import { LoginPage } from './views/auth/LogInPage'
import Header from './views/Customer/dashboard/Header'
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail'
import OrderDetails from './views/Customer/orders/OrderDashboard'
import PastOrders from './views/Customer/orders/PastOrders'
import CustomerActiveOrders from './views/Customer/orders/CustomerActiveOrders'
import CustomerCancelledOrders from './views/Customer/orders/CancelledOrders'
import CustomerProfile from './views/Customer/profile/CustomerProfile'
import Cart from './views/Customer/cart/Cart'
import PrivateRoute from './auth/PrivateRoute'
import RestProfile from './views/restaurant/Profile'
import About from './views/restaurant/About'
import ViewOrder from './views/restaurant/ViewOrders'
import CompleteOrders from './views/restaurant/CompletedOrders'
import ActiveOrders from './views/restaurant/ActiveOrders'
import { useSelector } from 'react-redux'
require('dotenv').config()
import Axios from 'axios'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql error ${message}`)
        })
    }
})
const { REACT_APP_WHITELISTED_DOMAINS } = process.env
console.log(REACT_APP_WHITELISTED_DOMAINS)
const link = from([errorLink, new HttpLink({ uri: `${REACT_APP_WHITELISTED_DOMAINS}/graphql` })])

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
})
function App() {
    const store = useSelector((state) => state)
    let token

    if (store?.role === 'customer') token = store?.userLogin?.token
    else token = store?.restLogin?.token
    Axios.defaults.headers.common = {
        Authorization: 'Bearer ' + token,
    }

    return (
        <ApolloProvider client={client}>
            <div class="parent-container">
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
                        <div class="header">
                            <Header />
                        </div>
                        <div class="mainContent">
                            <Route path="/dashboard" exact>
                                <Dashboard></Dashboard>
                            </Route>
                            <Route path="/dashboard/restaurant-details" exact>
                                <RestCardDetail />
                            </Route>
                            <Route path="/dashboard/cart-details" exact>
                                <Cart></Cart>
                            </Route>
                            {/* <Route path="/dashboard/order-details" exact>
                            <OrderDetails></OrderDetails>
                            
                        </Route> */}

                            <Route path="/dashboard/order-details">
                                <div class="customer-orders">
                                    <div class="left-content">
                                        <OrderDetails />
                                    </div>
                                    <div class="right-content">
                                        <Route path="/dashboard/order-details/past-orders" exact>
                                            <PastOrders></PastOrders>
                                        </Route>
                                        <Route
                                            path="/dashboard/order-details/cancelled-orders"
                                            exact
                                        >
                                            <CustomerCancelledOrders></CustomerCancelledOrders>
                                        </Route>
                                        <Route path="/dashboard/order-details/active-orders" exact>
                                            <CustomerActiveOrders></CustomerActiveOrders>
                                        </Route>
                                    </div>
                                </div>
                            </Route>

                            {/* <Route path="/dashboard/active-orders" exact>
                            <OrderDetails></OrderDetails>
                        </Route>
                        <Route path="/dashboard/cancelled-orders" exact>
                            <OrderDetails></OrderDetails>
                        </Route> */}
                        </div>
                    </PrivateRoute>
                    <PrivateRoute path="/customer-profile" exact>
                        <CustomerProfile />
                    </PrivateRoute>
                    <Route path="/rest-dashboard">
                        <div class="profile">
                            <RestProfile />
                            <Route path="/rest-dashboard/about" exact>
                                <div class="about">
                                    <About />
                                </div>
                            </Route>
                            <Route path="/rest-dashboard/dishes" exact>
                                <div class="dish">
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
        </ApolloProvider>
    )
}

export default App
