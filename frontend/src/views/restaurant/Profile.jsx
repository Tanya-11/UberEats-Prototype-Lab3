import React, { Component } from 'react'
import './Profile.scss'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { USER_LOGOUT } from '../../redux/actions/actions'
import localStorage from 'redux-persist/es/storage'

class RestProfile extends Component {
    constructor() {
        super()
        this.logOut = this.logOut.bind(this)
    }

    logOut = () => {
        this.props.dispatch({ type: USER_LOGOUT })
        localStorage.removeItem('deliveryMode')
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>Restaurant Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey="/rest-dashboard/about">
                            <Nav.Link href="/rest-dashboard/about">About</Nav.Link>
                            <Nav.Link href="/rest-dashboard/dishes">View/Edit/Add Dishes</Nav.Link>
                            <NavDropdown title="Orders" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/rest-dashboard/active">
                                    Active
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/rest-dashboard/completed">
                                    Completed
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={this.logOut}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
const mapStateToProps = (state) => state

export default connect(mapStateToProps)(RestProfile)
