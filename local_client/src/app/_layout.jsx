import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Directory, File, Paths } from 'expo-file-system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { setBaseUrl } from '@/api/local.api';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
    defaultOptions: { queries: { networkMode: 'online' } },
});

export default function RootLayout() {
    const [hasConfig, setHasConfig] = useState(null);

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');

        try {
            const configDirectory = new Directory(Paths.document, 'config');
            const config = new File(configDirectory, 'config.txt');

            // Checks if app already has a config in
            if (configDirectory.exists && config.exists) {
                // sets axios base url using config
                setBaseUrl(config.textSync());
                setHasConfig(true);
            } else {
                setHasConfig(false);
            }
        } catch (error) {
            console.error('Config evaluation failed:', error);
            setHasConfig(false);
        } finally {
            SplashScreen.hideAsync();
        }
    }, []);

    if (hasConfig === null) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar hidden={true} />
            <Stack screenOptions={{ headerShown: false }}>
                {/* In development comment the stack below, so different store accounts can be tested */}
                <Stack.Screen
                    name="index"
                    redirect={hasConfig ? true : false}
                />
            </Stack>
        </QueryClientProvider>
    );
}
