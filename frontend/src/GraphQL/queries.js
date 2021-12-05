import { gql } from '@apollo/client'
export const LOAD_PROFILE = gql`
    query Profile($customer: String!) {
        customerProfile(username: $customer) {
            name
            username
            city
            state
            country
            fav {
                restaurant
            }
            phoneNo
            nickName
            imageURL
            dishes {
                dishName
                ingredients
                price
                description
                category
                id
            }
            delivery
            pickedUp
            openHrs
            addressLine1
        }
    }
`

export const DASH_SEARCH = gql`
    query FetchSearch(
        $searchTabText: String!
        $category: String!
        $delivery: Boolean!
        $pickUp: Boolean!
        $city: String
    ) {
        search(
            searchTabText: $searchTabText
            category: $category
            delivery: $delivery
            pickUp: $pickUp
            city: $city
        ) {
            city
            imageURL
            state
            username
            phoneNo
            openHrs
            description
            name
            addressLine1
            city
            country
            delivery
            pickedUp
            dishes {
                dishName
                ingredients
                price
                description
                category
            }
        }
    }
`
export const GET_FAV = gql`
    query Profile($customer: String!) {
        customerProfile(username: $customer) {
            fav {
                restaurant
            }
        }
    }
`

export const GET_PAST_ORDERS_CUSTOMER = gql`
    query CustPastOrders($customer: String!) {
        customerPastOrders(user: $customer) {
            customer {
                user_id
                username
            }
            restId
            dishes {
                dishName
                price
                quantity
            }
            date
            price
        }
    }
`
export const GET_CANCEL_ORDERS_CUSTOMER = gql`
    query CustCancelOrders($customer: String!) {
        customerCancelledOrders(user: $customer) {
            customer {
                user_id
                username
            }
            restId
            dishes {
                dishName
                price
                quantity
            }
            date
            price
        }
    }
`
export const GET_ACTIVE_ORDERS_CUSTOMER = gql`
    query CustActiveOrders($customer: String!) {
        customerActiveOrders(user: $customer) {
            customer {
                user_id
                username
            }
            restId
            dishes {
                dishName
                price
                quantity
            }
            date
            price
        }
    }
`
export const GET_ACTIVE_ORDERS_RESTAURANT = gql`
    query RestActiveOrders($customer: String!) {
        activeOrders(user: $customer) {
            id
            orderStatus
            customer {
                user_id
                username
            }
            restId
            dishes {
                dishName
                price
                quantity
            }
            date
            price
        }
    }
`
export const GET_COMPLETE_ORDERS_RESTAURANT = gql`
    query RestCompleteOrders($customer: String!) {
        restCompleteOrders(user: $customer) {
            id
            orderStatus
            customer {
                user_id
                username
            }
            restId
            dishes {
                dishName
                price
                quantity
            }
            date
            price
        }
    }
`
