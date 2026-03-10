import { Pressable, Text, StyleSheet } from 'react-native';
import { ScanLine } from 'lucide-react-native';

export function ScanHere() {
    return (
        <Pressable style={styles.scanherebutton}>
            <ScanLine size={40} color="black" />
            <Text style={styles.textscan}>scan</Text>
            <Text style={styles.texthere}>here</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    textscan: {
        textTransform: 'uppercase',
        color: '#4A90D9',
        fontSize: 34,
    },
    texthere: {
        textTransform: 'uppercase',
        color: '#E8D84A',
        fontSize: 34,
    },
    scanherebutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
        margin: 12,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 0.8,
        borderRadius: 10,
        borderColor: '#D8DCDE',
        alignSelf: 'flex-start', // w-fit
        paddingHorizontal: 80, // px-20
        paddingVertical: 12,
    },
});
