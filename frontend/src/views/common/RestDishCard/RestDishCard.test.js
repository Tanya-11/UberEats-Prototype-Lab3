import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RestDishCard from './RestDishCard'

describe('<RestDishCard />', () => {
    test('it should mount', () => {
        render(<RestDishCard />)

        const restDishCard = screen.getByTestId('RestDishCard')

        expect(restDishCard).toBeInTheDocument()
    })
})
