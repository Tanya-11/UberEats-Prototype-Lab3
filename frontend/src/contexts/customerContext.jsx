import React, { useState } from "react"

const AuthContext = React.createContext([{}, () => {}])

let initialState = {}

const AuthProvider = props => {
  const [state, setState] = useState(initialState)

  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }