import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            networkMode: 'online',
        },
    },
});

export default function RootLayout() {
    NavigationBar.setVisibilityAsync('hidden');

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
