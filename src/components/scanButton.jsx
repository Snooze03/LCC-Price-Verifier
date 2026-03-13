import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import { ChevronsDown } from 'lucide-react-native';
import { router } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';
import { useEffect, useRef } from 'react';

export function ScanButton() {
    const [permission, requestPermission] = useCameraPermissions();
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 15,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    function handleScan() {
        requestPermission();
        if (permission.granted) {
            router.push('/camera/scan');
        }
    }

    return (
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <Pressable style={styles.scanHereButton} onPress={handleScan}>
                <Text style={[styles.text, { color: '#4A90D9' }]}>scan</Text>
                <Text style={[styles.text, { color: '#ffed47' }]}>here</Text>
                <ChevronsDown size={45} />
            </Pressable>
        </Animated.View>
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
