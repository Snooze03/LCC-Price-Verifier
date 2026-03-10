import { Pressable, Text, StyleSheet } from 'react-native';
import { ScanLine } from 'lucide-react-native';
import { router } from 'expo-router';

export function ScanButton() {
    return (
        <Pressable
            style={styles.scanhereButton}
            onPress={() => router.push('/camera/scan')}
        >
            <ScanLine size={38} color="black" />
            <Text style={styles.textScan}>scan</Text>
            <Text style={styles.textHere}>here</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    scanhereButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#D8DCDE',
        paddingHorizontal: 60,
        paddingVertical: 12,
    },
    textScan: {
        textTransform: 'uppercase',
        color: '#4A90D9',
        fontSize: 34,
    },
    textHere: {
        textTransform: 'uppercase',
        color: '#E8D84A',
        fontSize: 34,
    },
});
