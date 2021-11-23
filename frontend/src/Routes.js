import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LoginPage } from './views/auth/LogInPage'
import SignUpPage from './views/auth/SignUpPage'
import Dashboard from './views/dashboard/Dashboard'
import PrivateRoute from './auth/PrivateRoute'
import RestCardDetail from './views/common/RestCardDetail/RestCardDetail'
import { DashRoutes } from './views/dashboard/DashRoutes'
import Header from './views/dashboard/Header'
import Persona from './views/common/Persona/Persona'
import Cart from './views/Cart/Cart'

export const Routes = () => (
    <Router>
        <Header />
        {/* <Switch> */}
        {/* <PrivateRoute path="/dashboard">
                    <Dashboard></Dashboard>
                </PrivateRoute>
                <Route path="/dashboard/restaurant-details" exact>
                    <RestCardDetail />
                </Route> */}
        {/* <Route path="/Cart">
                {/* <Header /> */}
        {/* <Cart></Cart> */}
        {/* </Route>  */}
        {/* } */}

        <Route path="/">
            {/* <Header /> */}
            <DashRoutes></DashRoutes>
        </Route>
        {/* <Route path="*" component={NotFound} /> */}
        {/* </Switch> */}
    </Router>
)
function NotFound() {
    return <>You have landed on a page that doesn't exist</>
}

// auth={false}
