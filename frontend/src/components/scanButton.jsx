import { Pressable, Text, StyleSheet } from 'react-native';
import { ScanLine } from 'lucide-react-native';
import { router } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';

export function ScanButton() {
    const [permission, requestPermission] = useCameraPermissions();

    function handleScan() {
        requestPermission();

        if (permission.granted) {
            router.push('/camera/scan');
        }
    }

    return (
        <Pressable style={styles.scanHereButton} onPress={handleScan}>
            <ScanLine size={45} />
            <Text style={[styles.text, { color: '#4A90D9' }]}>scan</Text>
            <Text style={[styles.text, { color: '#ffed47' }]}>here</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    scanHereButton: {
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 50,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#d0d0d0',
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 32,
        fontWeight: 'bold',
    },
});
