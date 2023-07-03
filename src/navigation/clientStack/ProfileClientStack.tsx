import { createStackNavigator } from '@react-navigation/stack'

import React from 'react'
import Profile from '../../screens/Profile'

const ProfileClientStack = () => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                component={Profile}
                name={'Profile'}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileClientStack
