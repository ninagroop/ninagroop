import React, { useState, useEffect } from "react"
import { reactLocalStorage } from "reactjs-localstorage"

const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
  const [store, _updateStore] = useState([])

  const updateStore = val => {
    _updateStore(val)
    reactLocalStorage.setObject("store", val)
  }

  useEffect(() => {
    let storedStore = reactLocalStorage.getObject("store")

    // Check if there are no entries, if so change the empty object to an empty array
    if (Object.keys(storedStore).length === 0) {
      storedStore = {}
    }
    updateStore(storedStore)
  }, [])

  return (
    <StoreContext.Provider value={[store, updateStore]}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
