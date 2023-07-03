import React, { useEffect } from 'react'
import { Navigation } from '../src/navigation/index'
import { Provider } from 'react-redux'
import { AppStateProvider } from './contexts/AppStateContext'
import {store} from '../store/configStore'
import { UIManager, Platform, LogBox, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppLogic from './AppLogic'
import 'react-native-gesture-handler'

const App = () => {
    // if (__DEV__) {
    //     import('./reactotron').then(() => console.log('Reactotron Configured'))
    // }

    // LogBox.ignoreLogs(['new NativeEventEmitter', 'RCTBridge', '[react-native-gesture-handler]'])
    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true)
            }
        }
    }, [])

    return (
        <>
            <GestureHandlerRootView style={styles.container}>
               <Provider store={store}>
                        <AppStateProvider>
                            <AppLogic>
                                <Navigation />
                            </AppLogic>
                        </AppStateProvider>
                </Provider>
            </GestureHandlerRootView>
        </>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
