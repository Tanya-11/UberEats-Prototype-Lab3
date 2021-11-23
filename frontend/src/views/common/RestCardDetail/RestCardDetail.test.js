import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RestCardDetail from './RestCardDetail'

describe('<RestCardDetail />', () => {
    test('it should mount', () => {
        render(<RestCardDetail />)

        const restCardDetail = screen.getByTestId('RestCardDetail')

        expect(restCardDetail).toBeInTheDocument()
    })
})
