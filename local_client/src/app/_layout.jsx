import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { File, Paths } from 'expo-file-system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { setBaseUrl } from '@/api/local.api';

// Prevent splash screen hiding until we checked config file
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'online',
        },
    },
});

export default function RootLayout() {
    NavigationBar.setVisibilityAsync('hidden');
    const router = useRouter();

    // effect to check if config exists
    useEffect(() => {
        async function initializeApp() {
            try {
                const config = new File(Paths.document, 'config', 'config.txt');

                if (config.exists && config.textSync().length > 0) {
                    await setBaseUrl(config.textSync());
                    // comment router below when developing
                    router.replace('store');
                }
            } catch (error) {
                console.error('Check config Error: ', error);
            } finally {
                await SplashScreen.hideAsync();
            }
        }

        initializeApp();
    });

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar hidden={true} />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            ></Stack>
        </QueryClientProvider>
    );
}
