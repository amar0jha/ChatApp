import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenNames } from './screenname';
import SplashScreen from '../screens/splash';
import BottomTab from './bottomtab';
import ChatScreen from '../screens/chat';
import SearchScreen from '../screens/search';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    animation: 'slide_from_right',
                }}>
                <Stack.Screen
                    component={SplashScreen}
                    name={ScreenNames.Splash}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    component={BottomTab}
                    name={ScreenNames.BottomTab}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    component={SearchScreen}
                    name={ScreenNames.Search}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    component={ChatScreen}
                    name={ScreenNames.Chat}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
