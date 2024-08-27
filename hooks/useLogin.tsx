'use client'

import { useEffect, useState } from 'react'

const useLogin = () => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Check session storage for auth token on initial load
    const token = sessionStorage.getItem('authToken')
    if (token === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

    setLoading(false)
  }, [])

  const login = (username: string, password: string) => {
    if (isAuthenticated) return

    setLoading(true)
    let error

    console.log(
      username,
      process.env.NEXT_PUBLIC_USERNAME,
      password,
      process.env.NEXT_PUBLIC_PASSWORD
    )

    if (
      username === process.env.NEXT_PUBLIC_USERNAME &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      sessionStorage.setItem(
        'authToken',
        process.env.NEXT_PUBLIC_AUTH_TOKEN as string
      )
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      error = new Error('Invalid credentials')
    }

    setLoading(false)

    return error
  }

  return { loading, isAuthenticated, login }
}

export default useLogin
