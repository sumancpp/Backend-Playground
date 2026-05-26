import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const dataContext = createContext()

const UserContext = ({ children }) => {
  const [userData,setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const serverUrl = "http://localhost:8000"

  const getUserdata = async () => {
    try {
      const { data } = await axios.get(serverUrl + "/getuserdata", {
        withCredentials: true
      })

      setUserData(data)

    } catch (error) {
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserdata()
  }, [])

  return (
    <dataContext.Provider value={{ userData, setUserData, serverUrl, getUserdata, loading }}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext