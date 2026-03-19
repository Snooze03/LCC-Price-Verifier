import { Stack } from 'expo-router';
import {
    QueryClient,
    QueryClientProvider,
} from 'node_modules/@tanstack/react-query/build/legacy';

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            ></Stack>
        </QueryClientProvider>
    );
}
