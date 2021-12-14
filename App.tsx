import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import createStore from './redux/createStore';

export default function App() {
    console.disableYellowBox = true;
    const store = createStore();
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <Navigation/>
                    <StatusBar/>
                </Provider>
            </SafeAreaProvider>
        );
    }
}
