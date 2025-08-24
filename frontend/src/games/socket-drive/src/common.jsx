import React, { useEffect, useState } from 'react'

export function usePageVisible() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const handleVisibilityChange = () => {
            setVisible(document.visibilityState === 'visible')
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    return visible
}

export function useLoadingAssets() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading assets
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return loading
}

export function Instructions({ children }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                padding: '20px',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '14px',
                pointerEvents: 'none',
                textAlign: 'center'
            }}
        >
            {children}
        </div>
    )
} 