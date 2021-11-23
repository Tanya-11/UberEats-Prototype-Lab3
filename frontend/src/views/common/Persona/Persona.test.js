import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Persona from './Persona'

describe('<Persona />', () => {
    test('it should mount', () => {
        render(<Persona />)

        const persona = screen.getByTestId('Persona')

        expect(persona).toBeInTheDocument()
    })
})
