import React, { createContext, ReactChild, ReactElement, ReactNode, useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

const AppStateContext = createContext('active')

interface IProps {
    children: ReactNode | ReactChild | ReactElement
}

export const AppStateProvider = (props: IProps) => {
    const { children } = props
    const [state, setState] = useState<AppStateStatus>('active')

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange)

        return () => {
            subscription.remove()
        }
    }, [])

    const handleAppStateChange = (appState: AppStateStatus) => {
        setState(appState)
    }

    return <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
}

export default AppStateContext
