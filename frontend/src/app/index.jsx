import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
    return (
        <View>
            <Text>Test</Text>
            <Button
                title="Press me"
                onPress={() => router.push('store/price-verifier')}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
