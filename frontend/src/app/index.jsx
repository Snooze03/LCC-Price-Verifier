import { View, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Button
                title="Price Verifier"
                onPress={() => router.push('store')}
            />
            <Button title="Admin Panel" onPress={() => router.push('admin')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});
