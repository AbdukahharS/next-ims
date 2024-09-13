import { useEffect, useState } from 'react'

/**
 * Custom hook to check if the device is a phone based on screen width.
 * @param {number} breakpoint - The maximum screen width (in pixels) to consider as a phone. Default is 768px.
 * @returns {boolean} - True if the device is a phone, false otherwise.
 */
export const useIsPhone = (breakpoint: number = 768): boolean => {
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    // Function to check if the device width is less than or equal to the breakpoint
    const checkIsPhone = () => {
      if (typeof window !== 'undefined') {
        setIsPhone(window.innerWidth <= breakpoint)
      }
    }

    // Initial check
    checkIsPhone()

    // Listen for window resize events
    window.addEventListener('resize', checkIsPhone)

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkIsPhone)
  }, [breakpoint])

  return isPhone
}
