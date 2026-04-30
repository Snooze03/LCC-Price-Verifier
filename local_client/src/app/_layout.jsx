import { Stack } from 'expo-router';
import {
    QueryClient,
    QueryClientProvider,
} from 'node_modules/@tanstack/react-query/build/legacy';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

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
