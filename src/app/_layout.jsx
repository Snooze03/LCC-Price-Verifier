import '../styles/global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
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
    );
}
