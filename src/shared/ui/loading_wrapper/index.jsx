import styles from './style.module.css'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { useLocation } from 'react-router-dom'

export const LoadingWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [location])

  return loading ? (
    <div className={styles.centredContainer}>
      <CircularProgress />
    </div>
  ) : (
    children
  )
}
