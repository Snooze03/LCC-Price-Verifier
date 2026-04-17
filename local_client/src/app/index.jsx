import { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '@/components/ui/container';
import { LoginDialog } from '@/components/loginDialog';

export default function Index() {
    const router = useRouter();
    const [showLogin, setShowLogin] = useState(false);

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.card}>
                <Button
                    title="Price Verifier"
                    onPress={() => router.push('store')}
                />
            </View>

            <View style={styles.card}>
                <Button title="Admin Panel" onPress={setShowLogin} />
            </View>

            {/* Show login modal */}
            {showLogin && (
                <LoginDialog
                    isVisible={showLogin}
                    setIsVisible={setShowLogin}
                />
            )}
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
    },
    card: {
        width: '40%',
        height: '40%',
        padding: 25,
        backgroundColor: 'white',
    },
});
