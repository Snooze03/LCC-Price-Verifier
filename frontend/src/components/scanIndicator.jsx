import { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { ChevronsDown } from 'lucide-react-native';

export function ScanIndicator() {
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

    return (
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <View style={styles.scanHereButton}>
                <Text style={[styles.text, { color: '#4A90D9' }]}>scan</Text>
                <Text style={[styles.text, { color: '#ffed47' }]}>here</Text>
                <ChevronsDown size={45} />
            </View>
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
