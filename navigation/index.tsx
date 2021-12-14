/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import MoviesListScreen from '../screens/MoviesListScreen';
import MovieScreen from '../screens/MovieScreen';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: '#f0df1b',
            }}
        >
            <Stack.Screen
                name="MoviesListScreen"
                component={MoviesListScreen}
                options={{
                    title: 'Films',
                    headerStyle: {
                        backgroundColor: 'rgba(31,31,31,0.92)',
                    },
                    headerTitleStyle: {
                        fontFamily: 'bangers',
                        fontSize: 22,
                        color: '#f0df1b',
                    }
                }}
            />
            <Stack.Screen
                name="MovieScreen"
                component={MovieScreen}
                options={({route}) => ({
                    title: route.params?.title,
                    headerStyle: {
                        backgroundColor: 'rgba(31,31,31,0.92)',
                    },
                    headerTitleStyle: {
                        fontFamily: 'bangers',
                        fontSize: 22,
                        color: '#f0df1b',
                    },
                })}
            />
        </Stack.Navigator>
    );
}
