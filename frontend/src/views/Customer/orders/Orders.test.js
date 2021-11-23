import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import OrderDetails from './OrderDetails'

describe('<OrderDetails />', () => {
    test('it should mount', () => {
        render(<OrderDetails />)

        const orderDetails = screen.getByTestId('OrderDetails')

        expect(orderDetails).toBeInTheDocument()
    })
})
