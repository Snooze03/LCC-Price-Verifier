import { Stack } from 'expo-router';
import {
    QueryClient,
    QueryClientProvider,
} from 'node_modules/@tanstack/react-query/build/legacy';

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                    name="camera/scan"
                    options={{
                        headerBackButtonDisplayMode: 'generic',
                        headerTitle: 'Back',
                        headerTransparent: true,
                        headerBlurEffect: 'systemMaterialDark',
                        headerTintColor: 'white',
                    }}
                />
            </Stack>
        </QueryClientProvider>
    );
}
