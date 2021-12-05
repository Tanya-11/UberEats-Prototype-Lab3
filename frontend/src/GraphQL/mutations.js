import { gql } from '@apollo/client'

export const PLACE_ORDER = gql`
    mutation PlaceCustomerOrder(
        $orderStatus: String!
        $restId: String!
        $date: String!
        $price: Float
        $user: CustomerInput
        $orders: [OrderInput]
    ) {
        placeCart(
            orderStatus: $orderStatus
            restId: $restId
            user: $user
            date: $date
            orders: $orders
            price: $price
        ) {
            orderStatus
        }
    }
`
export const SAVE_PROFILE = gql`
    mutation SaveUserProfile(
        $userId: String!
        $name: String
        $username: String
        $city: String
        $state: String
        $nickName: String
        $phoneNo: Float
        $country: String
        $addressLine1: String
        $description: String
        $openHrs: String
        $delivery: Boolean
        $pickedUp: Boolean
    ) {
        saveProfile(
            userId: $userId
            name: $name
            username: $username
            city: $city
            state: $state
            nickName: $nickName
            phoneNo: $phoneNo
            country: $country
            addressLine1: $addressLine1
            description: $description
            openHrs: $openHrs
            delivery: $delivery
            pickedUp: $pickedUp
        ) {
            username
        }
    }
`
export const ADD_DISH = gql`
    mutation NewDish(
        $restRef: String
        $dishName: String
        $ingredients: String
        $price: Float
        $description: String
        $category: String
        $id: String
    ) {
        newDish(
            restRef: $restRef
            dishName: $dishName
            ingredients: $ingredients
            price: $price
            description: $description
            category: $category
            id: $id
        ) {
            username
        }
    }
`
export const UPDATE_ORDER_STATUS = gql`
    mutation UpdateOrderStatus($orderId: String!, $orderStatus: String, $date: String) {
        updateOrderStatus(orderId: $orderId, orderStatus: $orderStatus, date: $date) {
            orderStatus
        }
    }
`
