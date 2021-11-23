import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Modal from './Modal'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('<Modal />', () => {
  test('it should mount', () => {
    render(<Modal />)

    const modal = screen.getByTestId('Modal')
    expect(modal).toBeInTheDocument()
    const initialState = { output: 10 }
    const mockStore = configureStore()
    let store, wrapper

    it('Shows "Profile"', () => {
      store = mockStore(initialState)
      const { getByText } = render(
        <Provider store={store}>
          <App />
        </Provider>
      )

      expect(getByText('Profile')).not.toBeNull()
    })
  })
})
